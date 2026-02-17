# SQLite Implementation in 5 Steps

1. Prepare assets and CVs in `public/`.
   - Leadership CV files are available at:
   - `/cv/yuritzi-ordaz-cv.pdf`
   - `/cv/alan-rosas-cv.pdf`
   - `/cv_ipn.pdf`

2. Initialize SQLite schema + seed data.
   - Run: `npm run db:init`
   - This creates `data/site_content.db` with:
   - `leadership_profiles` (profile content)
   - `media_assets` (image blobs)

3. Start the content API backed by SQLite.
   - Run: `npm run api:dev`
   - Endpoints:
   - `GET /api/leadership?lang=en|es`
   - `GET /api/leadership/:slug?lang=en|es`
   - `GET /api/assets/:assetId`
   - `POST /api/assets` (base64 image payload)

4. Start frontend.
   - Run: `npm run dev`
   - Leadership now reads from SQLite API when available.
   - If API is down, component falls back to local data.

5. Add/update lightweight images and metadata.
   - Upload image (<= 2MB) via `POST /api/assets`:
   - Payload: `assetKey`, `filename`, `mimeType`, `dataBase64`, `profileSlug`
   - The uploaded image is stored as BLOB and linked to the selected leader.
