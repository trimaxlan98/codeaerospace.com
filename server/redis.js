import { createClient } from 'redis';
import process from 'node:process';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
  url: REDIS_URL,
});

client.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('Redis Client Error:', err);
});

let isConnected = false;

export async function connectRedis() {
  if (isConnected) return;
  try {
    await client.connect();
    isConnected = true;
    // eslint-disable-next-line no-console
    console.log(`Connected to Redis at ${REDIS_URL}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Could not connect to Redis, continuing without cache.', err.message);
  }
}

export async function getCache(key) {
  if (!isConnected) return null;
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error getting cache for key ${key}:`, err);
    return null;
  }
}

export async function setCache(key, value, ttl = 3600) {
  if (!isConnected) return;
  try {
    await client.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error setting cache for key ${key}:`, err);
  }
}

export async function delCache(pattern) {
  if (!isConnected) return;
  try {
    if (pattern.includes('*')) {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
      }
    } else {
      await client.del(pattern);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error deleting cache for pattern ${pattern}:`, err);
  }
}

export default client;
