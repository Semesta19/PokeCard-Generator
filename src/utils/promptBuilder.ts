import { PokemonDna, GenerationSettings } from '../types/pokemon';
import { toJapaneseName } from './japaneseTransliterate';

export function buildPokemonCardPrompt(dna: PokemonDna, settings?: Partial<GenerationSettings>): string {
  const facePercent = settings?.facePriorityPercent || 33;
  // If user provided a custom card name (e.g. 'Aziz' while theme is 'Mewtwo')
  const cardDisplayName = settings?.customCardName?.trim() ? settings.customCardName.trim() : dna.name;
  // Japanese Katakana script adapted to the name (e.g. 'アジズ' for 'Aziz')
  // STRICT RULE: The name on the card MUST be in Japanese Katakana ONLY. Zero Latin text.
  const japaneseName = settings?.japaneseName?.trim() || toJapaneseName(cardDisplayName);
  const stageSuffix = dna.stage === 'Basic' ? '' : ` ${dna.stage}`;
  const fullCardTitle = `${japaneseName}${stageSuffix}`;
  // Bottom copyright footer requested by user (replaces standard @2022 Pokemon/Nintendo)
  const bottomCopyright = settings?.bottomCopyright?.trim() || '@2026 Bapack-Bapack DeadStar';

  const attackListText = dna.attacks
    .map(
      (atk, idx) =>
        `- Attack ${idx + 1}: "${atk.name}" (${atk.energy.join('/')}) - Damage: ${atk.damage}. Printed Description: "${atk.description}"`
    )
    .join('\n');

  const abilityText =
    dna.ability && dna.ability.name
      ? `- Ability: "${dna.ability.name}". Printed Description: "${dna.ability.description}"`
      : '';

  return `Create an ultra-premium Japanese collectible trading card in standard 63x88 mm vertical ratio, featuring the EXACT IDENTICAL PERSON from the uploaded portrait photo in a prominent CHEST-UP composition (occupying 1/3 of the card), accompanied by the authentic ${dna.name.toUpperCase()} creature in dynamic action in the background, titled EXCLUSIVELY in authentic Japanese Katakana typography with ZERO Latin/English alphabet letters.

════════════════════════════════════════════════════════════════
1. ABSOLUTE TOP PRIORITY: LOCK IDENTITY & PRESERVE FACIAL STRUCTURE
════════════════════════════════════════════════════════════════
- [LOCK IDENTITY]: The uploaded photo is the STRICT UNCOMPROMISING GROUND TRUTH for the human face.
- MUST BE 100% IDENTICAL: The person on the card MUST be immediately, unmistakably recognizable as the exact same individual from the uploaded photo.
- DO NOT CHANGE, MORPH, RESHAPE, OR DISTORT THE FACIAL STRUCTURE.
- PRESERVE PRECISELY:
  * Exact jawline, chin curvature, cheekbone width, and skull geometry.
  * Exact eye shape, eyelid fold, pupil spacing, iris color, and gaze.
  * Exact nose bridge, nose tip shape, and nostril proportion.
  * Exact lip contour, mouth width, and smile/neutral expression.
  * Exact skin tone, realistic skin pores, subtle micro-textures, and authentic facial marks.
- ABSOLUTELY NO 2D CARTOON, NO ANIME ILLUSTRATION, NO CEL-SHADING, NO PLASTIC DOLL SMOOTHING, NO AIRBRUSHED MORPHING.
- RENDERING STYLE: Ultra-crisp photorealistic cinematic portrait photography (8K, shot on 85mm portrait lens, shallow depth of field, real tangible human skin).

════════════════════════════════════════════════════════════════
2. CARD PRESENTATION: ISOLATED CARD GRAPHIC ONLY (ZERO HANDS)
════════════════════════════════════════════════════════════════
- [ONLY GENERATE THE TRADING CARD GRAPHIC ITSELF]: The image must be strictly the isolated 2D collectible trading card in standard vertical 63x88 mm format, filling the canvas with clean, sharp borders.
- [ABSOLUTELY NO HANDS]:
  * DO NOT render any human hands, fingers, thumbs, palms, or wrists holding, pinching, or grasping the card.
  * DO NOT render any hands in the background behind or around the card.
  * NO person holding the card in hand.
  * NO tabletop, NO desk, NO fingers gripping the card edges, NO presentation mockup.
  * The entire render is solely the flat rectangular collectible card graphic itself from corner to corner.

════════════════════════════════════════════════════════════════
3. FRAMING: DADA KE ATAS (CHEST-UP BUST SHOT) & WAJAH 1/3 DOMINAN
════════════════════════════════════════════════════════════════
- COMPOSITION: DADA KE ATAS (CHEST-UP / BUST PORTRAIT).
- From upper chest, collarbones, and armored shoulders up to the crown of the head.
- DO NOT PULL THE CAMERA BACK. DO NOT RENDER WAIST-DOWN OR FULL-BODY.
- [DOMINANT 1/3 CARD PROPORTION]: The face and head MUST visually occupy approximately ONE THIRD (30%–35%) of the entire 63x88 mm card's vertical height and canvas area.
- The face is positioned front-and-center as the ultimate focal point of the artwork.
- THEMATIC CHEST & SHOULDER ATTIRE:
  * Around the chest, collar, and shoulders, the person wears haute-couture tactical armor tailored to ${dna.name}'s motifs: ${dna.costume}.
  * Color palette: ${dna.palette}.
  * The clothing and armored collar frame and emphasize the prominent identical face.

════════════════════════════════════════════════════════════════
4. BACKGROUND: ORIGINAL ${dna.name.toUpperCase()} IN DYNAMIC BATTLE ACTION
════════════════════════════════════════════════════════════════
- In the background, directly behind and flanking the person's shoulders, THE AUTHENTIC ORIGINAL CREATURE "${dna.name}" IS ACTIVELY BATTLING!
- The authentic ${dna.name} creature is fully visible performing its iconic battle move:
  * Energy Effects: ${dna.energyEffects}
  * Environment: ${dna.environment}
- ${dna.name} is rendered in cinematic, photorealistic creature detail (authentic anatomy, glowing elemental surges, realistic textures).
- The creature's elemental power radiates dramatic rim lighting across the person's shoulders and hair, creating an epic "Master & Partner" battle scene while leaving the human face clear, sharp, and perfectly lit.

════════════════════════════════════════════════════════════════
5. CARD HEADER: STRICTLY JAPANESE SCRIPT ONLY (ZERO LATIN / ENGLISH NAME)
════════════════════════════════════════════════════════════════
- [EXCLUSIVE JAPANESE KATAKANA SCRIPT FOR CHARACTER NAME]:
  * The character name printed on the card header MUST BE EXCLUSIVELY in authentic Japanese Katakana script: "${japaneseName}".
  * [CRITICAL NEGATIVE CONSTRAINT - NO LATIN TEXT FOR CHARACTER NAME]:
    - ABSOLUTELY DO NOT PRINT THE LATIN / ENGLISH NAME "${cardDisplayName}" ANYWHERE ON THE CARD!
    - ZERO Latin alphabet letters for the character name, ZERO English spelling, ZERO Romanized subtitle, NO "${cardDisplayName}".
    - The character's title on the card is ONLY AND STRICTLY written in Japanese Katakana characters: "${japaneseName}".
  * Printed prominently across the card header in bold authentic Japanese TCG typography in Katakana: "${japaneseName}".
  * Embossed with clean silver & titanium foil typography.
  * The partner Pokémon in the background remains "${dna.name}".
- HP: "${dna.hp} HP"
- ELEMENTAL TYPE: ${dna.type} Type symbol in upper right
- STAGE BADGE: "${dna.stage}" badge in upper left corner

════════════════════════════════════════════════════════════════
6. CARD FRAME & HOLOGRAPHIC FOIL (STANDARD 63x88 MM)
════════════════════════════════════════════════════════════════
- Standard vertical 63x88 mm trading card format.
- Outer borders: Embossed metallic foil with rounded corners.
- Holographic effect: ${dna.holographicPattern} with prismatic rainbow diffraction highlights and subtle micro-stars, leaving the human face clean and crisp.

════════════════════════════════════════════════════════════════
7. BOTTOM GAME STATS, RULES & EXACT CARD DESCRIPTIONS
════════════════════════════════════════════════════════════════
[EXACT TEXT PRINTED ON THE CARD]:
${abilityText ? `${abilityText}\n` : ''}${attackListText}
- Bottom Lore Box / Flavor Text Description: "${dna.flavorText}"
- Weakness: ${dna.weakness}
- Resistance: ${dna.resistance}
- Retreat Cost: ${dna.retreatCost} Colorless Energy
- Rarity: ${dna.rarity}
- Illustrator Credit: "Illus. ${dna.illustrator}"
- Rule box: "When your ${dna.stage} is Knocked Out, your opponent takes 2 Prize cards."
- [BOTTOM COPYRIGHT LINE]: "${bottomCopyright}"
  * Printed in micro-typography along the very bottom edge border: "${bottomCopyright}".
  * STRICT REQUIREMENT: Replace any default "@2022 Pokemon / Nintendo / Creatures / GAME FREAK" with the exact custom text: "${bottomCopyright}".

════════════════════════════════════════════════════════════════
FINAL SUMMARY
════════════════════════════════════════════════════════════════
Render ONLY the isolated 2D collectible card graphic (63x88 mm) titled EXCLUSIVELY in authentic Japanese Katakana script "${japaneseName}" with ABSOLUTELY ZERO Latin/English letters of "${cardDisplayName}" anywhere on the card, and NO hands holding or behind the card. The human face must be an EXACT 100% IDENTICAL photographic match to the uploaded photo with unchanged facial structure, framed chest-up so the face and head dominate 1/3 of the card, with authentic ${dna.name} actively unleashing its powers in the background, and bottom footer copyright reading "${bottomCopyright}".
${settings?.customPromptAdditions ? `\nADDITIONAL USER DIRECTIVES:\n${settings.customPromptAdditions}` : ''}`;
}
