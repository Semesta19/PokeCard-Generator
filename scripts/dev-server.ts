/**
 * Server lokal untuk development (npm run dev).
 * Menjalankan fungsi di folder /api lewat Express + Vite middleware.
 * Di Vercel file ini TIDAK dipakai — Vercel menjalankan /api sebagai serverless function.
 */
import express from 'express';
import dotenv from 'dotenv';
import generateCard from '../api/generate-card.ts';
import generateDna from '../api/generate-dna.ts';
import health from '../api/health.ts';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => health(req, res as any));
app.post('/api/generate-card', (req, res) => generateCard(req, res as any));
app.post('/api/generate-dna', (req, res) => generateDna(req, res as any));

async function start() {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dev server: http://localhost:${PORT}`);
  });
}

start();