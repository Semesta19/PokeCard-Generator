export type PokemonType = 
  | 'Water' 
  | 'Fire' 
  | 'Grass' 
  | 'Lightning' 
  | 'Psychic' 
  | 'Fighting' 
  | 'Darkness' 
  | 'Metal' 
  | 'Dragon' 
  | 'Fairy' 
  | 'Colorless';

export type CardStage = 'Basic' | 'Stage 1' | 'Stage 2' | 'ex' | 'VMAX' | 'VSTAR' | 'Tera ex' | 'Ancient' | 'Future';

export interface CardAttack {
  name: string;
  energy: PokemonType[];
  damage: string;
  description: string;
}

export interface CardAbility {
  name: string;
  description: string;
}

export interface PokemonDna {
  id: string;
  name: string;
  category: string;
  type: PokemonType;
  secondaryType?: PokemonType;
  stage: CardStage;
  hp: number;
  palette: string;
  costume: string;
  hairstyle: string;
  energyEffects: string;
  environment: string;
  holographicPattern: string;
  ability?: CardAbility;
  attacks: CardAttack[];
  weakness: string;
  resistance: string;
  retreatCost: number;
  rarity: string;
  flavorText: string;
  illustrator: string;
}

export interface GenerationSettings {
  model: 'gpt-image-2';
  quality: 'low' | 'medium' | 'high';
  facePriorityPercent: number; // default 30-35%
  aspectRatio: '63x88';
  resolution: '1K' | '2K';
  customCardName?: string; // Custom name printed on card (e.g. 'Aziz' instead of 'Mewtwo')
  japaneseName?: string; // Japanese Katakana script for card title (e.g. 'アジズ' or 'ミュウツー')
  bottomCopyright?: string; // e.g. '@2026 Bapack-Bapack DeadStar'
  isolatedCardOnly?: boolean; // Strictly card graphic only, no hands holding the card
  bodyCrop?: 'half-body' | 'bust';
  realismMode?: 'photorealistic' | 'cinematic';
  showOriginalInAction?: boolean; // Show original Pokémon creature in action in background
  customPromptAdditions?: string;
  includeStatsInArtwork: boolean;
  holographicIntensity: 'subtle' | 'high' | 'ultra-rare';
}

export interface GeneratedCard {
  id: string;
  timestamp: number;
  pokemonName: string;
  cardDisplayName?: string;
  japaneseName?: string;
  pokemonDna: PokemonDna;
  imageUrl: string;
  portraitUsed?: string;
  prompt: string;
  model: string;
}
