/**
 * Vercel Serverless Function: POST /api/generate-dna
 * Membuat "DNA" kartu untuk Pokémon custom memakai model teks OpenAI.
 * Jika gagal, client otomatis memakai generator berbasis aturan (createDefaultDnaForName).
 */

type Req = { method?: string; body?: any };
type Res = { status(code: number): Res; json(body: unknown): void };

const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const TEXT_MODEL = process.env.OPENAI_TEXT_MODEL || 'gpt-4.1-mini';

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const { pokemonName } = req.body || {};

    if (!pokemonName || typeof pokemonName !== 'string') {
      res.status(400).json({ error: 'Pokemon name is required.' });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: 'OPENAI_API_KEY is not configured.' });
      return;
    }

    const prompt = `You are an elite Japanese trading card game designer and Pokémon lore master.
Analyze the Pokémon or character: "${pokemonName}".
Generate authentic, high-end thematic DNA for creating a human-transformed collectible card in the style of Ultra Rare Secret Illustration Rare (SAR) cards.

Return a JSON object conforming strictly to this structure:
{
  "name": "${pokemonName}",
  "category": "e.g. Flame Dragon, Glacial Sovereign, Shadow Phantom",
  "type": "One of: Water, Fire, Grass, Lightning, Psychic, Fighting, Darkness, Metal, Dragon, Fairy, Colorless",
  "stage": "One of: Basic, Stage 1, Stage 2, ex, VMAX, Tera ex",
  "hp": integer (between 200 and 340),
  "palette": "detailed color palette with primary and accent metallic/foil shades",
  "costume": "highly detailed human haute-couture / armor / streetwear clothing inspired by ${pokemonName} motifs and silhouettes to frame the human face",
  "hairstyle": "modern dynamic hairstyle matching ${pokemonName}'s aesthetic, highlights, and colors",
  "energyEffects": "elemental particle effects, swirling auras, glowing lightning/ice/fire/shadows",
  "environment": "epic atmospheric setting, weather, and background scenery",
  "holographicPattern": "diffraction foil pattern, holographic reflections, and metallic border details",
  "ability": {
    "name": "Original thematic ability name",
    "description": "Original authentic card game ability rule description"
  },
  "attacks": [
    {
      "name": "Signature Move 1",
      "energy": ["Type1", "Type2"],
      "damage": "e.g. 120",
      "description": "Short move effect description"
    },
    {
      "name": "Signature Ultimate Move 2",
      "energy": ["Type1", "Type2", "Colorless"],
      "damage": "e.g. 260",
      "description": "Ultimate damage and effect description"
    }
  ],
  "weakness": "e.g. Lightning ×2",
  "resistance": "e.g. Fighting -30 or None",
  "retreatCost": integer (1 to 4),
  "rarity": "Special Illustration Rare (SAR ★★★)",
  "flavorText": "2 sentences of legendary collectible flavor lore.",
  "illustrator": "Creative studio name"
}`;

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [
          { role: 'system', content: 'You reply with a single valid JSON object and nothing else.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(50_000),
    });

    const payload: any = await response.json().catch(() => null);

    if (!response.ok) {
      res.status(response.status).json({
        error: payload?.error?.message || 'Failed to generate Pokémon DNA.',
      });
      return;
    }

    const content: string | undefined = payload?.choices?.[0]?.message?.content;
    const parsed = content ? JSON.parse(content) : null;

    if (!parsed || !parsed.name) {
      res.status(502).json({ error: 'Model returned invalid DNA.' });
      return;
    }

    res.status(200).json({
      success: true,
      dna: {
        ...parsed,
        id: String(parsed.name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
      },
      source: 'ai',
    });
  } catch (error: any) {
    console.error('Error generating Pokémon DNA:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate Pokémon DNA.' });
  }
}