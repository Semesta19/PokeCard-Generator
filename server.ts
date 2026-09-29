import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Generous payload limit for high-resolution base64 portrait photos
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// API: Generate Card Image using Nano Banana Pro (gemini-3-pro-image)
app.post('/api/generate-card', async (req: Request, res: Response) => {
  try {
    const { prompt, image, model = 'gemini-3-pro-image', imageSize = '1K' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required.' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in Settings > Secrets.',
      });
      return;
    }

    // Supported image models:
    // Nano Banana Pro: 'gemini-3-pro-image'
    // Nano Banana 2: 'gemini-3.1-flash-image'
    // Nano Banana Lite: 'gemini-3.1-flash-lite-image'
    const validModels = ['gemini-3-pro-image', 'gemini-3.1-flash-image', 'gemini-3.1-flash-lite-image'];
    const selectedModel = validModels.includes(model) ? model : 'gemini-3-pro-image';

    const parts: any[] = [];

    // If user provided a portrait photo (base64 data URL)
    if (image && typeof image === 'string') {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        parts.push({
          inlineData: {
            mimeType,
            data: base64Data,
          },
        });
      }
    }

    // Append prompt instructions
    parts.push({
      text: prompt,
    });

    // Generate with Gemini image model
    const config: any = {
      imageConfig: {
        aspectRatio: '3:4', // Standard vertical ratio closest to 63x88
      },
    };

    if (selectedModel !== 'gemini-3.1-flash-lite-image') {
      config.imageConfig.imageSize = imageSize === '2K' ? '2K' : '1K';
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts,
      },
      config,
    });

    let generatedImageUrl = '';
    let responseText = '';

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          responseText += part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      // Check if candidate had any finish reason
      const finishReason = candidate?.finishReason || 'NO_IMAGE_RETURNED';
      res.status(500).json({
        error: `Model did not return an image part (Finish reason: ${finishReason}). ${responseText || ''}`,
      });
      return;
    }

    res.json({
      success: true,
      imageUrl: generatedImageUrl,
      model: selectedModel,
      textNotes: responseText,
    });
  } catch (error: any) {
    console.error('Error generating card image:', error);
    const errorMessage = error?.message || 'Failed to generate card image.';
    const isPaidKeyError = /billing|paid|quota|permission|unauthorized|tier/i.test(errorMessage);

    res.status(500).json({
      error: errorMessage,
      isPaidKeyError,
      hint: isPaidKeyError
        ? 'Nano Banana Pro requires an active API key with access to image generation. You can also try selecting Nano Banana 2 or verify your API key.'
        : undefined,
    });
  }
});

// API: Generate thematic Pokémon DNA for custom typed Pokémon
app.post('/api/generate-dna', async (req: Request, res: Response) => {
  try {
    const { pokemonName } = req.body;

    if (!pokemonName || typeof pokemonName !== 'string') {
      res.status(400).json({ error: 'Pokemon name is required.' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
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

    let parsedJson: any = null;

    // Try primary model gemini-3.8-flash, fallback to gemini-flash-latest or gemini-3.1-flash-lite
    const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    for (const m of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: m,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
        if (response.text) {
          parsedJson = JSON.parse(response.text.trim());
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${m} failed for DNA generation, trying next...`, err?.message);
      }
    }

    if (!parsedJson || !parsedJson.name) {
      // Smart fallback using our built-in rule-based DNA generator
      const { createDefaultDnaForName } = await import('./src/data/pokemonDna.ts');
      const fallbackDna = createDefaultDnaForName(pokemonName);
      res.json({ success: true, dna: fallbackDna, source: 'smart-generator' });
      return;
    }

    const dnaWithId = {
      ...parsedJson,
      id: parsedJson.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    };

    res.json({ success: true, dna: dnaWithId, source: 'ai' });
  } catch (error: any) {
    console.error('Error generating Pokémon DNA:', error);
    try {
      const { createDefaultDnaForName } = await import('./src/data/pokemonDna.ts');
      const fallbackDna = createDefaultDnaForName(req.body.pokemonName || 'Custom');
      res.json({ success: true, dna: fallbackDna, source: 'fallback' });
    } catch {
      res.status(500).json({ error: error?.message || 'Failed to generate Pokémon DNA.' });
    }
  }
});

// Configure Vite middleware in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
