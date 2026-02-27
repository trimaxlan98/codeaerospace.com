import { Buffer } from 'node:buffer';
import process from 'node:process';
import cors from 'cors';
import express from 'express';
import {
  openDatabase,
  normalizeLang,
  getLeadershipProfiles,
  getLeadershipProfileBySlug,
  getAssetById,
  upsertMediaAsset,
  attachProfileImage,
} from './db.js';
import { connectRedis, getCache, setCache, delCache } from './redis.js';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const CACHE_TTL = 3600; // 1 hour

const app = express();
const apiPort = Number(process.env.API_PORT || 3001);
const db = openDatabase();

// Connect to Redis
connectRedis();

app.use(cors());
app.use(express.json({ limit: '8mb' }));

// Cache middleware
const cacheMiddleware = (ttl = CACHE_TTL) => async (req, res, next) => {
  if (req.method !== 'GET') return next();

  const lang = normalizeLang(req.query.lang);
  const cacheKey = `cache:${req.path}:${lang}`;

  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      res.json(cached);
      return;
    }

    // Override res.json to store the response in cache
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      setCache(cacheKey, body, ttl);
      return originalJson(body);
    };
    next();
  } catch (err) {
    next();
  }
};

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'codeaerospace-content-api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/leadership', cacheMiddleware(), (req, res) => {
  const lang = normalizeLang(req.query.lang);
  const items = getLeadershipProfiles(db, lang);
  res.json({ items, lang });
});

app.get('/api/leadership/:slug', cacheMiddleware(), (req, res) => {
  const lang = normalizeLang(req.query.lang);
  const { slug } = req.params;
  const profile = getLeadershipProfileBySlug(db, slug, lang);
  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }
  res.json(profile);
});

app.get('/api/assets/:assetId', (req, res) => {
  const assetId = Number(req.params.assetId);
  if (!Number.isFinite(assetId)) {
    res.status(400).json({ error: 'Invalid asset id' });
    return;
  }

  const asset = getAssetById(db, assetId);
  if (!asset) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  res.setHeader('Content-Type', asset.mime_type);
  res.setHeader('Cache-Control', 'public, max-age=604800');
  res.send(asset.data);
});

app.post('/api/assets', async (req, res) => {
  const {
    assetKey,
    filename,
    mimeType,
    dataBase64,
    profileSlug,
  } = req.body ?? {};

  if (!assetKey || !filename || !mimeType || !dataBase64) {
    res.status(400).json({ error: 'assetKey, filename, mimeType and dataBase64 are required' });
    return;
  }

  let buffer;
  try {
    buffer = Buffer.from(dataBase64, 'base64');
  } catch {
    res.status(400).json({ error: 'Invalid base64 payload' });
    return;
  }

  if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) {
    res.status(400).json({ error: `Image must be between 1 byte and ${MAX_IMAGE_BYTES} bytes` });
    return;
  }

  const assetId = upsertMediaAsset(db, {
    assetKey,
    filename,
    mimeType,
    data: buffer,
  });

  if (profileSlug) {
    attachProfileImage(db, profileSlug, assetId);
  }

  // Invalidate all API caches when data changes
  await delCache('cache:*');

  res.status(201).json({
    id: assetId,
    url: `/api/assets/${assetId}`,
    bytes: buffer.length,
  });
});

const server = app.listen(apiPort, () => {
  // eslint-disable-next-line no-console
  console.log(`SQLite API listening on http://localhost:${apiPort}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    db.close();
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    db.close();
    process.exit(0);
  });
});
