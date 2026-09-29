/** Vercel Serverless Function: GET /api/health */

type Req = { method?: string };
type Res = { status(code: number): Res; json(body: unknown): void };

export default function handler(_req: Req, res: Res) {
  res.status(200).json({
    status: 'ok',
    hasApiKey: !!process.env.OPENAI_API_KEY,
    timestamp: new Date().toISOString(),
  });
}