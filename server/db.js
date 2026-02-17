import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Database from 'better-sqlite3';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'site_content.db');

const VALID_LANGS = new Set(['en', 'es']);

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function parseJsonArray(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeLang(lang) {
  return VALID_LANGS.has(lang) ? lang : 'en';
}

function mapProfileRow(row, lang = 'en') {
  const locale = normalizeLang(lang);
  const image = row.image_asset_id ? `/api/assets/${row.image_asset_id}` : row.image_path;
  return {
    slug: row.slug,
    name: row.name,
    initials: row.initials,
    iconKey: row.icon_key,
    title: row[`title_${locale}`],
    role: row[`role_${locale}`],
    bio: row[`bio_${locale}`],
    description: parseJsonArray(row[`card_desc_${locale}`]),
    education: parseJsonArray(row[`education_${locale}`]),
    experience: parseJsonArray(row[`experience_${locale}`]),
    skills: parseJsonArray(row.skills),
    email: row.email,
    cvPdf: row.cv_pdf,
    image,
  };
}

export function openDatabase() {
  ensureDataDir();
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  runMigrations(db);
  return db;
}

function runMigrations(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS media_assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_key TEXT NOT NULL UNIQUE,
      filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      data BLOB NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leadership_profiles (
      slug TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      initials TEXT NOT NULL,
      icon_key TEXT NOT NULL DEFAULT 'code',
      title_en TEXT NOT NULL,
      title_es TEXT NOT NULL,
      role_en TEXT NOT NULL,
      role_es TEXT NOT NULL,
      bio_en TEXT NOT NULL,
      bio_es TEXT NOT NULL,
      card_desc_en TEXT NOT NULL,
      card_desc_es TEXT NOT NULL,
      education_en TEXT NOT NULL,
      education_es TEXT NOT NULL,
      experience_en TEXT NOT NULL,
      experience_es TEXT NOT NULL,
      skills TEXT NOT NULL,
      email TEXT,
      cv_pdf TEXT,
      image_asset_id INTEGER,
      image_path TEXT,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (image_asset_id) REFERENCES media_assets(id)
    );
  `);
}

export function upsertLeadershipProfile(db, profile) {
  const statement = db.prepare(`
    INSERT INTO leadership_profiles (
      slug, sort_order, name, initials, icon_key,
      title_en, title_es, role_en, role_es, bio_en, bio_es,
      card_desc_en, card_desc_es, education_en, education_es,
      experience_en, experience_es, skills, email, cv_pdf, image_path
    ) VALUES (
      @slug, @sortOrder, @name, @initials, @iconKey,
      @titleEn, @titleEs, @roleEn, @roleEs, @bioEn, @bioEs,
      @cardDescEn, @cardDescEs, @educationEn, @educationEs,
      @experienceEn, @experienceEs, @skills, @email, @cvPdf, @imagePath
    )
    ON CONFLICT(slug) DO UPDATE SET
      sort_order = excluded.sort_order,
      name = excluded.name,
      initials = excluded.initials,
      icon_key = excluded.icon_key,
      title_en = excluded.title_en,
      title_es = excluded.title_es,
      role_en = excluded.role_en,
      role_es = excluded.role_es,
      bio_en = excluded.bio_en,
      bio_es = excluded.bio_es,
      card_desc_en = excluded.card_desc_en,
      card_desc_es = excluded.card_desc_es,
      education_en = excluded.education_en,
      education_es = excluded.education_es,
      experience_en = excluded.experience_en,
      experience_es = excluded.experience_es,
      skills = excluded.skills,
      email = excluded.email,
      cv_pdf = excluded.cv_pdf,
      image_path = excluded.image_path,
      updated_at = CURRENT_TIMESTAMP
  `);

  statement.run({
    slug: profile.slug,
    sortOrder: profile.sortOrder,
    name: profile.name,
    initials: profile.initials,
    iconKey: profile.iconKey,
    titleEn: profile.title.en,
    titleEs: profile.title.es,
    roleEn: profile.role.en,
    roleEs: profile.role.es,
    bioEn: profile.bio.en,
    bioEs: profile.bio.es,
    cardDescEn: JSON.stringify(profile.description.en),
    cardDescEs: JSON.stringify(profile.description.es),
    educationEn: JSON.stringify(profile.education.en),
    educationEs: JSON.stringify(profile.education.es),
    experienceEn: JSON.stringify(profile.experience.en),
    experienceEs: JSON.stringify(profile.experience.es),
    skills: JSON.stringify(profile.skills),
    email: profile.email ?? null,
    cvPdf: profile.cvPdf ?? null,
    imagePath: profile.imagePath ?? null,
  });
}

export function upsertMediaAsset(db, { assetKey, filename, mimeType, data }) {
  const upsert = db.prepare(`
    INSERT INTO media_assets (asset_key, filename, mime_type, data)
    VALUES (@assetKey, @filename, @mimeType, @data)
    ON CONFLICT(asset_key) DO UPDATE SET
      filename = excluded.filename,
      mime_type = excluded.mime_type,
      data = excluded.data
  `);
  upsert.run({ assetKey, filename, mimeType, data });

  const row = db.prepare(`
    SELECT id FROM media_assets WHERE asset_key = ?
  `).get(assetKey);

  return row?.id ?? null;
}

export function attachProfileImage(db, slug, assetId) {
  db.prepare(`
    UPDATE leadership_profiles
    SET image_asset_id = ?, updated_at = CURRENT_TIMESTAMP
    WHERE slug = ?
  `).run(assetId, slug);
}

export function getLeadershipProfiles(db, lang = 'en') {
  const rows = db.prepare(`
    SELECT *
    FROM leadership_profiles
    ORDER BY sort_order ASC, name ASC
  `).all();
  return rows.map((row) => mapProfileRow(row, lang));
}

export function getLeadershipProfileBySlug(db, slug, lang = 'en') {
  const row = db.prepare(`
    SELECT *
    FROM leadership_profiles
    WHERE slug = ?
    LIMIT 1
  `).get(slug);
  return row ? mapProfileRow(row, lang) : null;
}

export function getAssetById(db, id) {
  return db.prepare(`
    SELECT id, filename, mime_type, data
    FROM media_assets
    WHERE id = ?
    LIMIT 1
  `).get(id);
}

export { DB_PATH, normalizeLang };
