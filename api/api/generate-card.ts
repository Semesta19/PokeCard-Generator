/**
 * Vercel Serverless Function: POST /api/generate-card
 * Generates the trading card image with OpenAI gpt-image-2.
 *
 * - Ada foto potret  -> POST /v1/images/edits        (foto dipakai sebagai referensi wajah)
 * - Tanpa foto       -> POST /v1/images/generations  (text-to-image)
 */

type Req = { method?: string; body?: any };
type Res = { status(code: number): Res; json(body: unknown): void };

const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';

// Ukuran mendekati rasio kartu 63x88 (kelipatan 16, valid untuk gpt-image-2)
const SIZE_MAP: Record<string, string> = {
  '1K': '1024x1440',
  '2K': '1536x2144',
};
// Ukuran preset resmi, dipakai kalau ukuran custom ditolak
const FALLBACK_SIZE = '1024x1536';

const VALID_QUALITIES = ['low', 'medium', 'high'] as const;
type Quality = (typeof VALID_QUALITIES)[number];

// JPEG dipakai supaya response tetap di bawah limit 4.5MB milik Vercel
const OUTPUT_FORMAT = 'jpeg';
const OUTPUT_COMPRESSION = 90;

function dataUrlToBlob(dataUrl: string): { blob: Blob; filename: string } | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  const mime = match[1];
  const buffer = Buffer.from(match[2], 'base64');
  const ext = mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : 'jpg';
  return { blob: new Blob([buffer], { type: mime }), filename: `portrait.${ext}` };
}

async function callOpenAI(
  prompt: string,
  portrait: { blob: Blob; filename: string } | null,
  size: string,
  quality: Quality,
): Promise<Response> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };
  const signal = AbortSignal.timeout(280_000);

  if (portrait) {
    const form = new FormData();
    form.append('model', IMAGE_MODEL);
    form.append('prompt', prompt);
    form.append('size', size);
    form.append('quality', quality);
    form.append('output_format', OUTPUT_FORMAT);
    form.append('output_compression', String(OUTPUT_COMPRESSION));
    form.append('n', '1');
    form.append('image[]', portrait.blob, portrait.filename);

    return fetch(`${OPENAI_BASE_URL}/images/edits`, { method: 'POST', headers, body: form, signal });
  }

  return fetch(`${OPENAI_BASE_URL}/images/generations`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt,
      size,
      quality,
      output_format: OUTPUT_FORMAT,
      output_compression: OUTPUT_COMPRESSION,
      n: 1,
    }),
    signal,
  });
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const { prompt, image, quality = 'medium', imageSize = '1K' } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required.' });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({
        error: 'OPENAI_API_KEY belum diatur di server. Tambahkan di Vercel > Project Settings > Environment Variables.',
      });
      return;
    }

    const selectedQuality: Quality = (VALID_QUALITIES as readonly string[]).includes(quality)
      ? (quality as Quality)
      : 'medium';
    const size = SIZE_MAP[imageSize] || SIZE_MAP['1K'];
    const portrait = typeof image === 'string' ? dataUrlToBlob(image) : null;

    let response = await callOpenAI(prompt, portrait, size, selectedQuality);

    // Kalau ukuran custom ditolak, ulangi dengan ukuran preset resmi
    if (response.status === 400) {
      const errText = await response.clone().text();
      if (/size/i.test(errText)) {
        response = await callOpenAI(prompt, portrait, FALLBACK_SIZE, selectedQuality);
      }
    }

    const raw = await response.text();
    let payload: any = null;
    try {
      payload = JSON.parse(raw);
    } catch {
      /* non-JSON response */
    }

    if (!response.ok) {
      const apiMessage: string = payload?.error?.message || raw.slice(0, 300) || 'Request to OpenAI failed.';
      const code: string = payload?.error?.code || '';
      let hint: string | undefined;

      if (response.status === 401) {
        hint = 'OPENAI_API_KEY tidak valid. Periksa kembali API key kamu.';
      } else if (response.status === 403 || /verif/i.test(apiMessage)) {
        hint = 'Akun/organisasi OpenAI kamu mungkin belum punya akses ke gpt-image-2 (cek Organization Verification di platform.openai.com).';
      } else if (response.status === 429 || /billing|quota|credit/i.test(apiMessage)) {
        hint = 'Rate limit atau saldo/kredit OpenAI API habis. Cek Billing di platform.openai.com.';
      } else if (code === 'moderation_blocked' || /safety|moderation/i.test(apiMessage)) {
        hint = 'Diblokir filter keamanan OpenAI. Coba foto lain atau ubah prompt tambahan.';
      }

      res.status(response.status >= 400 && response.status < 600 ? response.status : 500).json({
        error: apiMessage,
        hint,
      });
      return;
    }

    const item = payload?.data?.[0];
    let imageUrl = '';
    if (item?.b64_json) {
      imageUrl = `data:image/${OUTPUT_FORMAT};base64,${item.b64_json}`;
    } else if (item?.url) {
      imageUrl = item.url;
    }

    if (!imageUrl) {
      res.status(500).json({ error: 'OpenAI tidak mengembalikan gambar.' });
      return;
    }

    res.status(200).json({
      success: true,
      imageUrl,
      model: IMAGE_MODEL,
      quality: selectedQuality,
    });
  } catch (error: any) {
    console.error('Error generating card image:', error);
    const isTimeout = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    res.status(isTimeout ? 504 : 500).json({
      error: isTimeout
        ? 'Waktu generate habis. Coba turunkan kualitas ke Fast/Standard atau resolusi 1K.'
        : error?.message || 'Failed to generate card image.',
    });
  }
}