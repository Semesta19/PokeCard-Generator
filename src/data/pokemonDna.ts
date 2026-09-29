import { PokemonDna } from '../types/pokemon';

export const POKEMON_PRESETS: PokemonDna[] = [
  {
    id: 'articuno',
    name: 'Articuno',
    category: 'Legendary Bird',
    type: 'Water',
    stage: 'ex',
    hp: 310,
    palette: 'icy cyan, glacier blue, deep royal navy, pure frost white, and silver metallic foil',
    costume: 'High-collared royal frost mantle layered with crystalline feathers, ice-forged pauldrons, delicate diamond-dust embroidery, regal ice-sovereign vestments framing the head',
    hairstyle: 'Swept-back modern hairstyle with frosted cyan tips, crystallized icy highlights, and subtle sub-zero shimmer',
    energyEffects: 'Swirling sub-zero blizzard vortex, diamond-dust sparkles, levitating ice shards, radiant glacial aura surrounding the shoulders',
    environment: 'Glacial Himalayan summit crowned with jagged frost peaks, misty blizzard clouds, and a faint shimmering aurora borealis in the polar twilight',
    holographicPattern: 'Crystal shatter diffraction, rainbow prism beams across the feathers, metallic silver border embossing, and iridescent cold foil glint',
    ability: {
      name: 'Glacial Ascendance',
      description: 'As long as this Pokémon is in the Active Spot, your Water Pokémon take 30 less damage from attacks from your opponent’s Pokémon.'
    },
    attacks: [
      {
        name: 'Frost Cyclone',
        energy: ['Water', 'Water', 'Colorless'],
        damage: '120',
        description: 'Move all Energy from this Pokémon to your Benched Pokémon in any way you like.'
      },
      {
        name: 'Crystal Wing Storm',
        energy: ['Water', 'Water', 'Colorless', 'Colorless'],
        damage: '280',
        description: 'Discard 2 Energy from this Pokémon. This attack also does 30 damage to each of your opponent’s Benched Pokémon.'
      }
    ],
    weakness: 'Lightning ×2',
    resistance: 'Fighting -30',
    retreatCost: 3,
    rarity: 'Ultra Rare Secret Illustration Rare (SAR ★★★)',
    flavorText: 'A legendary bird of ice. It is said to appear to those who are pure of heart and share its burden of the frozen skies.',
    illustrator: 'Frostborne Studios'
  },
  {
    id: 'charizard',
    name: 'Charizard',
    category: 'Flame Dragon',
    type: 'Fire',
    stage: 'ex',
    hp: 330,
    palette: 'blazing ember orange, crimson red, volcanic obsidian black, burnished gold, and deep cerulean fire',
    costume: 'Armored dragon-knight trenchcoat with volcanic obsidian pauldrons, flame-tipped dragon wing mantle, golden fiery clasps, and high ember collar',
    hairstyle: 'Textured dynamic hair styled with flame-swept warm amber tips and subtle glowing fiery streaks',
    energyEffects: 'Violent swirling inferno vortex, floating volcanic embers, radiant heat distortion ripples, crackling fiery corona',
    environment: 'Caldera of an active volcano at dusk, rivers of molten lava, plume of volcanic ash, and fiery sparks illuminating the rugged basalt cliffs',
    holographicPattern: 'Flame burst radial diffraction, molten gold hot foil borders, rainbow holographic sheen interacting with ember particles',
    ability: {
      name: 'Infernal Command',
      description: 'Once during your turn, when you play this card from your hand, you may search your deck for up to 3 Basic Fire Energy cards and attach them to your Pokémon.'
    },
    attacks: [
      {
        name: 'Burning Darkness',
        energy: ['Fire', 'Fire'],
        damage: '180+',
        description: 'This attack does 30 more damage for each Prize card your opponent has taken.'
      },
      {
        name: 'Volcanic Cataclysm',
        energy: ['Fire', 'Fire', 'Colorless'],
        damage: '300',
        description: 'Discard 2 Energy from this Pokémon. Burn the opponent’s Active Pokémon.'
      }
    ],
    weakness: 'Grass ×2',
    resistance: 'None',
    retreatCost: 2,
    rarity: 'Special Illustration Rare (SAR ★★★)',
    flavorText: 'It spits fire that is hot enough to melt boulders. Known to cause wildfires unintentionally.',
    illustrator: 'Ignis Prime'
  },
  {
    id: 'pikachu',
    name: 'Pikachu',
    category: 'Mouse / Electric Mascot',
    type: 'Lightning',
    stage: 'Basic',
    hp: 200,
    palette: 'vibrant lightning yellow, electric gold, matte black accents, crimson cheek accents, and neon white voltage',
    costume: 'High-end cyber-streetwear bomber jacket with lightning bolt motifs, glowing neon piping, ear-inspired collar silhouettes, and black techwear details',
    hairstyle: 'Sharp modern messy-fringe crop with electric golden highlights and lightning-infused spark tips',
    energyEffects: 'Crackling electric arc plasma, zapping neon lightning bolts, hovering yellow electrical sparks, static field corona',
    environment: 'Futuristic Neo-Tokyo downtown street at rain-soaked midnight with dazzling neon signs and holographic thunderclouds',
    holographicPattern: 'Lightning beam diffraction foil, golden holographic electric circuitry, metallic yellow border lines',
    ability: {
      name: 'Static Overcharge',
      description: 'Whenever this Pokémon is damaged by an attack, flip a coin. If heads, the Attacking Pokémon is now Paralyzed.'
    },
    attacks: [
      {
        name: 'Thunderbolt Pulse',
        energy: ['Lightning', 'Colorless'],
        damage: '90',
        description: 'You may discard all Lightning Energy from this Pokémon to do 60 more damage.'
      },
      {
        name: 'Volt Tackle Maximum',
        energy: ['Lightning', 'Lightning', 'Colorless'],
        damage: '240',
        description: 'This Pokémon does 30 damage to itself. Discard an Energy from your opponent’s Active Pokémon.'
      }
    ],
    weakness: 'Fighting ×2',
    resistance: 'Metal -30',
    retreatCost: 1,
    rarity: 'Secret Illustration Rare ★★★',
    flavorText: 'When it smashes its cheeks together, it releases a powerful blast of electricity capable of lighting up whole cities.',
    illustrator: 'VoltLab Studio'
  },
  {
    id: 'blastoise',
    name: 'Blastoise',
    category: 'Shellfish Titan',
    type: 'Water',
    stage: 'ex',
    hp: 330,
    palette: 'deep cobalt blue, aquatic cyan, polished steel chrome, ocean foam white, and warm sandy cream',
    costume: 'Heavy hydro-mechanical naval armor with polished chrome hydro-cannons resting on armored shoulders, sea-dragon turtle shell pauldrons, waterproof nautical trench',
    hairstyle: 'Short wave-textured marine crop with ocean-blue highlights and subtle droplet shimmer',
    energyEffects: 'High-pressure hydro vortex swirls, oceanic sea spray, floating translucent water spheres, turbulent tidal surge',
    environment: 'Raging open ocean during a massive sea storm, crashing tidal waves against rocky sea stacks, sun breaking through storm clouds',
    holographicPattern: 'Water ripple concentric foil, metallic ocean chrome borders, deep blue prism foil finish',
    ability: {
      name: 'Torrential Pump',
      description: 'Once during your turn, you may attach any number of Basic Water Energy cards from your hand to your Pokémon in any way you like.'
    },
    attacks: [
      {
        name: 'Twin Cannons',
        energy: ['Water', 'Water'],
        damage: '140',
        description: 'Discard up to 2 Basic Water Energy cards from your hand to do 70 more damage for each card discarded.'
      },
      {
        name: 'Hydro Pressure Deluge',
        energy: ['Water', 'Water', 'Water'],
        damage: '280',
        description: 'This attack does 30 damage to each of your opponent’s Benched Pokémon with damage counters.'
      }
    ],
    weakness: 'Lightning ×2',
    resistance: 'None',
    retreatCost: 3,
    rarity: 'Ultra Rare SAR ★★★',
    flavorText: 'The rocket cannons on its shell fire jets of water capable of punching holes through thick steel sheets.',
    illustrator: 'Abyssal Forge'
  },
  {
    id: 'gengar',
    name: 'Gengar',
    category: 'Shadow Shadow Pokémon',
    type: 'Psychic',
    stage: 'ex',
    hp: 310,
    palette: 'spectral midnight purple, deep amethyst violet, shadow black, eerie crimson eye glow, and ghost magenta',
    costume: 'Victorian phantom-tailored shadowy velvet trenchcoat with spiked silhouette collar, spectral gas trims, menacing dark pocket accents, and eerie grin embroidery',
    hairstyle: 'Spiky phantom shadow-styled hair with deep violet tips that seem to dissolve into purple smoke',
    energyEffects: 'Swirling purple spectral ectoplasm, mischievous phantom mist, floating eerie violet flames, dimensional shadow distortion',
    environment: 'Gothic misty graveyard at midnight beneath a blood-red crescent moon, ancient mossy headstones, and swirling spectral wisps',
    holographicPattern: 'Dark phantom prism foil, violet starburst diffraction, holographic shadowy ripples over matte card frame',
    ability: {
      name: 'Nightmare Lurk',
      description: 'When this Pokémon is on your Bench, your opponent cannot play Item cards from their hand.'
    },
    attacks: [
      {
        name: 'Poltergeist Wrath',
        energy: ['Psychic', 'Psychic'],
        damage: '60×',
        description: 'Your opponent reveals their hand. This attack does 60 damage for each Trainer card you find there.'
      },
      {
        name: 'Shadow Dimension Hole',
        energy: ['Psychic', 'Darkness', 'Colorless'],
        damage: '230',
        description: 'Put 3 damage counters on each of your opponent’s Pokémon in any way you like.'
      }
    ],
    weakness: 'Darkness ×2',
    resistance: 'Fighting -30',
    retreatCost: 2,
    rarity: 'Special Secret Rare ★★★',
    flavorText: 'It hides in people’s shadows. When it steals someone’s shadow, the temperature drops by nearly 10 degrees.',
    illustrator: 'Phantom Shade'
  },
  {
    id: 'lucario',
    name: 'Lucario',
    category: 'Aura Guardian',
    type: 'Fighting',
    stage: 'Stage 1',
    hp: 270,
    palette: 'aura cobalt blue, deep midnight charcoal, steel spike silver, warm cream chest fur, and radiant cyan aura',
    costume: 'Martial arts aura-master gi with chest spike metal clasp, tailored charcoal wraps, blue monk mantles, and fingerless steel-spiked combat gauntlets',
    hairstyle: 'Athletic windswept dark hair with glowing cobalt aura strands and sleek silhouette spikes',
    energyEffects: 'Glowing cyan Aura Sphere spinning between hands, radiant spirit energy ripples, wave-form pulse particles',
    environment: 'Ancient mountaintop shrine above a sea of misty clouds at dawn, cherry blossom petals caught in swirling aura currents',
    holographicPattern: 'Aura wave diffraction foil, silver metallic foil border with embossed martial arts wave motifs',
    ability: {
      name: 'Aura Sense',
      description: 'Once during your turn, you may look at the top 3 cards of your opponent’s deck. You may put them back in any order.'
    },
    attacks: [
      {
        name: 'Aura Sphere Burst',
        energy: ['Fighting', 'Fighting'],
        damage: '130',
        description: 'This attack’s damage isn’t affected by Weakness, Resistance, or any other effects on your opponent’s Active Pokémon.'
      },
      {
        name: 'Close Combat Maximum',
        energy: ['Fighting', 'Colorless', 'Colorless'],
        damage: '250',
        description: 'During your opponent’s next turn, this Pokémon takes 30 more damage from attacks.'
      }
    ],
    weakness: 'Psychic ×2',
    resistance: 'None',
    retreatCost: 1,
    rarity: 'Ultra Rare SAR ★★★',
    flavorText: 'It reads the thoughts and movements of others by sensing the aura waves emitted by all living things.',
    illustrator: 'Aura Arts'
  },
  {
    id: 'mewtwo',
    name: 'Mewtwo',
    category: 'Genetic Psionic',
    type: 'Psychic',
    stage: 'ex',
    hp: 310,
    palette: 'cosmic pearl white, royal psychic purple, iridescent lilac, deep obsidian, and glowing cyan telekinesis',
    costume: 'Sleek biomechanical psionic coat with high genetic collar, purple energy conduit tubing along the spine, silver armor clasps, and flowing astral cape',
    hairstyle: 'Sleek silver-platinum hair with subtle purple undertones, swept effortlessly backward by invisible psychic waves',
    energyEffects: 'Orbiting psionic energy spheres, distorting gravity waves, radiant purple psychic aura, floating shattered glass physics',
    environment: 'Shattered high-tech genetic laboratory chamber with glowing stasis tubes, neon sparks, and debris suspended mid-air by telekinesis',
    holographicPattern: 'Psionic spiral diffraction foil, iridescent rainbow mother-of-pearl finish, metallic purple foil typography',
    ability: {
      name: 'Psionic Dominance',
      description: 'Your opponent’s Pokémon in play with Rule Boxes cannot use any Abilities.'
    },
    attacks: [
      {
        name: 'Psychic Infinity',
        energy: ['Psychic', 'Colorless'],
        damage: '40+',
        description: 'This attack does 30 more damage for each Energy attached to all Pokémon in play.'
      },
      {
        name: 'Supernova Blast',
        energy: ['Psychic', 'Psychic', 'Psychic'],
        damage: '270',
        description: 'Discard all Energy attached to this Pokémon. Prevent all damage done to this Pokémon during your opponent’s next turn.'
      }
    ],
    weakness: 'Darkness ×2',
    resistance: 'Fighting -30',
    retreatCost: 2,
    rarity: 'Secret Illustration Rare ★★★',
    flavorText: 'Created by a scientist after years of horrific gene-splicing experiments. Its psychic powers are unmatched.',
    illustrator: 'GeneTech Archive'
  },
  {
    id: 'rayquaza',
    name: 'Rayquaza',
    category: 'Sky High Dragon',
    type: 'Dragon',
    stage: 'VMAX',
    hp: 330,
    palette: 'emerald dragon green, radiant gold runes, crimson accents, matte black scales, and cosmic ozone blue',
    costume: 'High-altitude dragon-lord armor draped with golden runic streamers, jade dragon-scale shoulder guards, aerodynamic flight collar, and black pilot leather',
    hairstyle: 'Windswept jet-black hair with vibrant emerald streaks and subtle gold flecks that mimic celestial dragon runes',
    energyEffects: 'Ozone atmospheric friction sparks, golden ancient energy runes orbiting in circles, green cosmic dragon aura trails',
    environment: 'The boundary between Earth and outer space at sunset, curved Earth horizon below with glowing auroras and meteor showers',
    holographicPattern: 'Golden runic embossed foil, green emerald diffraction glitter, metallic dual-tone border lines',
    ability: {
      name: 'Azure Pulse',
      description: 'Once during your turn, you may discard your hand and draw 3 cards.'
    },
    attacks: [
      {
        name: 'Max Burst',
        energy: ['Fire', 'Lightning'],
        damage: '20+',
        description: 'You may discard any amount of basic Fire Energy or basic Lightning Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way.'
      },
      {
        name: 'Dragon Ascent Ultimate',
        energy: ['Fire', 'Lightning', 'Colorless'],
        damage: '300',
        description: 'Discard 3 Energy from this Pokémon. This attack ignores all defensive effects.'
      }
    ],
    weakness: 'None',
    resistance: 'None',
    retreatCost: 2,
    rarity: 'Ultra Rare Secret Rare ★★★',
    flavorText: 'It flies endlessly through the ozone layer. It is said that would Rayquaza descend to ground level, a catastrophic clash would begin.',
    illustrator: 'Stratosphere Studio'
  },
  {
    id: 'umbreon',
    name: 'Umbreon',
    category: 'Moonlight Pokémon',
    type: 'Darkness',
    stage: 'Stage 1',
    hp: 280,
    palette: 'midnight noir black, glowing neon golden rings, deep slate gray, and subtle dark crimson eyes',
    costume: 'Sleek luxury noir tuxedo coat with luminescent golden ring embroidery along the lapels, velvet trims, and high nocturnal stand collar',
    hairstyle: 'Glossy pitch-black hair with faint golden highlights that mimic lunar halos under moonlight',
    energyEffects: 'Glowing neon yellow lunar rings hovering, dark midnight stardust particles, subtle shadow silhouette smoke',
    environment: 'Cobblestone city rooftop in Paris or Kyoto under a massive golden full moon and starry celestial night sky',
    holographicPattern: 'Moonlight mirror foil, gold ring diffraction overlay, dark metallic sheen that glimmers at angles',
    ability: {
      name: 'Dark Signal',
      description: 'When you play this Pokémon from your hand to evolve 1 of your Pokémon, you may switch in 1 of your opponent’s Benched Pokémon to the Active Spot.'
    },
    attacks: [
      {
        name: 'Moonlight Blade',
        energy: ['Darkness', 'Colorless', 'Colorless'],
        damage: '160+',
        description: 'If this Pokémon has any damage counters on it, this attack does 80 more damage.'
      }
    ],
    weakness: 'Grass ×2',
    resistance: 'None',
    retreatCost: 2,
    rarity: 'Moonbreon Alt Art Secret Rare ★★★',
    flavorText: 'When exposed to the moon’s aura, the rings on its body glow faintly and it gains a mysterious psychic power.',
    illustrator: 'Nocturne Atelier'
  },
  {
    id: 'sylveon',
    name: 'Sylveon',
    category: 'Intertwining Pokémon',
    type: 'Fairy',
    stage: 'Stage 1',
    hp: 260,
    palette: 'pastel blush pink, baby cyan blue, cream porcelain white, soft violet, and sparkling holographic glitter',
    costume: 'Haute-couture pastel dream coat with flowing silk feeler ribbons, bow-tie brooches, mother-of-pearl buttons, and gentle whimsical capelet',
    hairstyle: 'Soft wavy pastel hair with gentle pink-to-cyan gradient ombre and ribbon-woven braids',
    energyEffects: 'Floating pastel ribbons of fairy energy, magical twinkling sparkles, gentle heart-shaped light glints, soothing aura waves',
    environment: 'Sunlit enchanted flower meadow with oversized pastel mushrooms, floating dandelion seeds, and sunbeams breaking through mist',
    holographicPattern: 'Pastel rainbow prism foil, heart and ribbon holographic stamp, iridescent pink glitter finish',
    ability: {
      name: 'Fairy Charm Soothe',
      description: 'Your opponent’s Active Pokémon cannot attack during their next turn if this Pokémon is in the Active Spot.'
    },
    attacks: [
      {
        name: 'Precious Ribbon Melody',
        energy: ['Psychic', 'Colorless', 'Colorless'],
        damage: '150',
        description: 'Heal 50 damage from each of your Benched Pokémon.'
      }
    ],
    weakness: 'Metal ×2',
    resistance: 'Darkness -30',
    retreatCost: 2,
    rarity: 'Special Art Rare ★★★',
    flavorText: 'It sends a soothing aura from its ribbon-like feelers to calm fights and neutralize hostile intentions.',
    illustrator: 'Dreamland Pastel'
  },
  {
    id: 'greninja',
    name: 'Greninja',
    category: 'Ninja Shinobi',
    type: 'Water',
    stage: 'Stage 2',
    hp: 300,
    palette: 'deep ninja navy, oceanic cyan, bright bubble-gum magenta scarf cowl, cream chest, and shuriken white',
    costume: 'Modern shinobi tactical coat with extended magenta tongue-scarf cowl wrapped high around the neck, water-resistant navy ninja fabrics, and stealth gauntlets',
    hairstyle: 'Sleek dark styled hair with cyan-streaked ninja headband and sharp stealth silhouette',
    energyEffects: 'Spinning Water Shurikens hovering at fingertips, translucent water ripples, splashing droplet particles, swift shadow silhouettes',
    environment: 'Bamboo forest at twilight under a waterfall, moss-covered rocks with glistening water spray and misty shadows',
    holographicPattern: 'Shuriken cross-diffraction foil, glossy water droplets embossed into the card surface, deep navy metallic border',
    ability: {
      name: 'Concealed Cards',
      description: 'Once during your turn, you may discard an Energy card from your hand. If you do, draw 2 cards.'
    },
    attacks: [
      {
        name: 'Moonlight Shuriken',
        energy: ['Water', 'Water', 'Colorless'],
        damage: '90×',
        description: 'Discard 2 Energy from this Pokémon. This attack does 90 damage to 2 of your opponent’s Pokémon.'
      },
      {
        name: 'Shadow Mirage Strike',
        energy: ['Water', 'Darkness', 'Colorless'],
        damage: '240',
        description: 'Switch this Pokémon with 1 of your Benched Pokémon.'
      }
    ],
    weakness: 'Lightning ×2',
    resistance: 'None',
    retreatCost: 1,
    rarity: 'Illustration Rare SAR ★★★',
    flavorText: 'It creates throwing stars out of compressed water. When it spins them and throws them at high speed, these stars can split metal in two.',
    illustrator: 'Shinobi Arts'
  },
  {
    id: 'dragonite',
    name: 'Dragonite',
    category: 'Dragon Courier',
    type: 'Dragon',
    stage: 'Stage 2',
    hp: 320,
    palette: 'warm amber orange, gentle cream, emerald green inner-wing accents, and radiant golden sunlight',
    costume: 'Vintage aviator leather flight bomber jacket with fur shearling collar, brass dragon goggles around the neck, and warm orange dragon-crest embroidery',
    hairstyle: 'Charming warm brown wind-blown aviator hair with subtle golden sun-bleached tips',
    energyEffects: 'Golden atmospheric comet trails, gentle swirling gust clouds, radiant warm sunlight sparks, celestial dragon aura',
    environment: 'Soaring high above rolling white cloudbanks at golden hour sunset, with distant islands visible in the azure sea below',
    holographicPattern: 'Golden sunburst holographic foil, rainbow reflection across clouds, classic silver foil card borders',
    ability: {
      name: 'Dragon Messenger',
      description: 'Once during your turn, you may search your deck for a Supporter card, reveal it, and put it into your hand.'
    },
    attacks: [
      {
        name: 'Dragon Gale',
        energy: ['Water', 'Lightning'],
        damage: '250',
        description: 'This attack does 20 damage to each of your Benched Pokémon.'
      }
    ],
    weakness: 'None',
    resistance: 'None',
    retreatCost: 3,
    rarity: 'Secret Rare ★★★',
    flavorText: 'It is said to make its home somewhere in the boundless sea. It guides shipwrecked crews back to safety.',
    illustrator: 'Aero Vanguard'
  },
  {
    id: 'lugia',
    name: 'Lugia',
    category: 'Diving Guardian of the Sea',
    type: 'Colorless',
    stage: 'VSTAR',
    hp: 320,
    palette: 'pristine silver white, deep ocean navy blue, silver-tipped wing accents, and storm cloud gray',
    costume: 'High-ceremonial aerodynamic ocean guardian robe with silver wing-shaped lapels, deep navy back plate, and sleek oceanic tailored silhouette',
    hairstyle: 'Flowing silver-white hair swept dynamically by sea winds with subtle iridescent navy sheen',
    energyEffects: 'Violent hurricane vortex, swirling ocean cyclone funnel, silver atmospheric blast waves, lightning sparks in cloud',
    environment: 'Whirl Islands during a raging sea tempest, monumental ocean whirlpools below and swirling storm clouds illuminated by flashes of lightning',
    holographicPattern: 'Silver metallic VSTAR embossed foil, cyclone diffraction lines, brilliant rainbow shimmer along the wing borders',
    ability: {
      name: 'Summoning Star',
      description: 'During your turn, you may put up to 2 Colorless Pokémon from your discard pile onto your Bench. (You can’t use more than 1 VSTAR Power in a game.)'
    },
    attacks: [
      {
        name: 'Tempest Aeroblast',
        energy: ['Colorless', 'Colorless', 'Colorless', 'Colorless'],
        damage: '220',
        description: 'You may discard a Stadium in play. If you do, this attack does 60 more damage.'
      }
    ],
    weakness: 'Lightning ×2',
    resistance: 'Fighting -30',
    retreatCost: 2,
    rarity: 'Special Art Rare (Alt Art) ★★★',
    flavorText: 'It sleeps in deep ocean trenches. If it flaps its wings, it is said to cause a 40-day storm.',
    illustrator: 'Silver Wing Works'
  },
  {
    id: 'mew',
    name: 'Mew',
    category: 'New Species / Origin',
    type: 'Psychic',
    stage: 'ex',
    hp: 250,
    palette: 'delicate bubblegum pink, cosmic pastel purple, sparkling nebula cyan, and celestial white',
    costume: 'Lightweight ethereal astral jacket with whimsical long tail-ribbon sash, translucent bubble pauldron accents, and glowing pink seams',
    hairstyle: 'Playful soft pink wispy hair floating weightlessly as if in zero-gravity space',
    energyEffects: 'Translucent pink psychic force bubbles, swirling miniature star constellations, sparkling pastel fairy dust',
    environment: 'Floating weightlessly in deep cosmic space amidst colorful nebulae, distant glittering stars, and floating planetary dust',
    holographicPattern: 'Full-card bubble diffraction foil, iridescent pink prismatic shine, silver chrome border filigree',
    ability: {
      name: 'Restart',
      description: 'Once during your turn, you may draw cards until you have 3 cards in your hand.'
    },
    attacks: [
      {
        name: 'Genome Hack',
        energy: ['Colorless', 'Colorless', 'Colorless'],
        damage: '—',
        description: 'Choose 1 of your opponent’s Active Pokémon’s attacks and use it as this attack.'
      }
    ],
    weakness: 'Darkness ×2',
    resistance: 'Fighting -30',
    retreatCost: 0,
    rarity: 'Secret Illustration Rare ★★★',
    flavorText: 'Its DNA is said to contain the genetic codes of all Pokémon, so it can use all kinds of moves.',
    illustrator: 'Cosmic Play'
  },
  {
    id: 'gardevoir',
    name: 'Gardevoir',
    category: 'Embrace Pokémon',
    type: 'Psychic',
    stage: 'ex',
    hp: 310,
    palette: 'emerald mint green, pure gown white, ruby red chest crystal, and soft telepathic rose pink',
    costume: 'Flowing haute couture evening gown coat with mint green structured capelet, prominent ruby heart crystal brooch, and elegant porcelain gloves',
    hairstyle: 'Stylized elegant mint green bob with flowing sculptural curls framing the face and ears',
    energyEffects: 'Miniature black hole distortion aura, shimmering pink telepathic light petals, protective dimensional barrier glow',
    environment: 'Grand ballroom terrace overlooking a twilight rose garden beneath a violet starry sky, soft candlelight and magical particles',
    holographicPattern: 'Prismatic crystal shard foil, ruby foil chest stamp, metallic silver lace border details',
    ability: {
      name: 'Psychic Embrace',
      description: 'As often as you like during your turn, you may attach a Basic Psychic Energy card from your discard pile to 1 of your Psychic Pokémon. If you do, put 2 damage counters on that Pokémon.'
    },
    attacks: [
      {
        name: 'Miracle Force',
        energy: ['Psychic', 'Psychic', 'Colorless'],
        damage: '190',
        description: 'This Pokémon recovers from all Special Conditions.'
      }
    ],
    weakness: 'Darkness ×2',
    resistance: 'Fighting -30',
    retreatCost: 2,
    rarity: 'Special Illustration Rare ★★★',
    flavorText: 'To protect its Trainer, it will expend all its psychic power to create a small black hole.',
    illustrator: 'Grace Studio'
  },
  {
    id: 'tyranitar',
    name: 'Tyranitar',
    category: 'Armor Pokémon',
    type: 'Darkness',
    stage: 'Stage 2',
    hp: 340,
    palette: 'heavy olive army green, jagged slate gray armor, obsidian black chest vents, and desert sand gold',
    costume: 'Heavy ballistic juggernaut plate jacket with reinforced carapace pauldrons, jagged chest ventilation grilles, and heavy tactical combat armor',
    hairstyle: 'Aggressive spiky undercut with olive-tinted jagged tips and textured fortress styling',
    energyEffects: 'Crushing sandstorm whirlwind, flying rocky debris, seismic ground fissure shockwaves, dark crushing aura',
    environment: 'Demolished rocky mountain canyon during a blinding desert sandstorm, shattered boulders and dust plumes',
    holographicPattern: 'Rock-crush angular diffraction foil, matte textured card frame with glossy dark foil highlights',
    ability: {
      name: 'Sand Stream Terror',
      description: 'As long as this Pokémon is in the Active Spot, put 1 damage counter on each Pokémon in play (both yours and your opponent’s) between turns.'
    },
    attacks: [
      {
        name: 'Mountain Smasher',
        energy: ['Fighting', 'Darkness', 'Darkness'],
        damage: '280',
        description: 'Discard the top 3 cards of your deck. This attack deals 30 damage to each opponent benched Pokémon.'
      }
    ],
    weakness: 'Grass ×2',
    resistance: 'None',
    retreatCost: 4,
    rarity: 'Illustration Rare ★★★',
    flavorText: 'It has the power to destroy a whole mountain to make its nest. This Pokémon often wanders through mountains looking for opponents.',
    illustrator: 'Basalt Vanguard'
  }
];

export function createDefaultDnaForName(name: string): PokemonDna {
  const cleanName = name.trim();
  const lower = cleanName.toLowerCase();

  // Try to find in existing presets
  const match = POKEMON_PRESETS.find(p => p.name.toLowerCase() === lower || p.id === lower);
  if (match) return match;

  // Infer reasonable defaults based on common keywords
  let type: PokemonDna['type'] = 'Colorless';
  let palette = 'metallic silver, energetic gold, and radiant neon accents';
  let costume = `A signature tailored jacket and high-collar mantle custom designed with iconic ${cleanName} motifs, luxury fabric trims, and character emblems`;
  let hairstyle = `Modern textured styling with vibrant highlights echoing ${cleanName}'s signature colors and aesthetic`;
  let energyEffects = `Radiant elemental aura particles, glowing power waves, and swirling thematic energy currents`;
  let environment = `Dramatic thematic arena with atmospheric weather, dynamic lighting, and environmental particles`;

  if (/fire|flame|char|blaze|pyro|cinder/i.test(cleanName)) {
    type = 'Fire';
    palette = 'blazing crimson, fiery orange, burnished gold, and volcanic smoke';
    costume = `Flame-forged high collar leather trenchcoat with ember pauldrons and molten gold trims`;
    energyEffects = `Swirling infernal flames, crackling embers, and intense heat shimmer`;
    environment = `Volcanic ridge at dusk with flowing lava streams and glowing ember clouds`;
  } else if (/water|aqua|hydro|ocean|ice|frost|sea|wave/i.test(cleanName)) {
    type = 'Water';
    palette = 'oceanic azure, deep navy, crystalline ice cyan, and seafoam white';
    costume = `Naval aquatic commander coat with frosted crystalline epaulets and tidal wave embroidery`;
    energyEffects = `High-pressure swirling water vortex, crystal frost sparkles, and ocean spray`;
    environment = `Ocean cliff edge overlooking crashing titanic waves and stormy sea spray`;
  } else if (/spark|bolt|electr|thunder|volt|raichu|zap/i.test(cleanName)) {
    type = 'Lightning';
    palette = 'electric high-voltage yellow, neon amber, sleek carbon black, and plasma white';
    costume = `Cyber-techwear bomber jacket with lightning bolt conduits and glowing neon piping`;
    energyEffects = `Crackling high-voltage lightning arcs, plasma sparks, and static field aura`;
    environment = `Rainy neon metropolis at midnight with thunderclouds flashing overhead`;
  } else if (/leaf|grass|flora|vine|bloom|forest|tree|wood/i.test(cleanName)) {
    type = 'Grass';
    palette = 'lush emerald green, botanical jade, golden sunlight amber, and floral accents';
    costume = `Botanical guardian vestments with woven solar leaf mantle and flower petal lapels`;
    energyEffects = `Swirling razor leaf petals, glowing spore pollen, and radiant solar energy`;
    environment = `Primeval ancient rainforest canopy illuminated by golden sunbeams`;
  } else if (/psych|mind|tele|esp|shadow|ghost|spook|specter/i.test(cleanName)) {
    type = 'Psychic';
    palette = 'mystical amethyst purple, spectral violet, deep void black, and ethereal magenta';
    costume = `Ethereal velvet warlock coat with floating psionic ring collars and shadow silk trims`;
    energyEffects = `Distorting gravity waves, orbiting psychic spheres, and ghostly mist`;
    environment = `Mystical ancient temple surrounded by floating shattered crystals in twilight`;
  } else if (/dark|noir|night|moon|evil|grim/i.test(cleanName)) {
    type = 'Darkness';
    palette = 'midnight obsidian noir, crimson accents, matte charcoal, and lunar silver';
    costume = `Sleek nocturnal rogue coat with shadow-concealing cowl collar and dark metallic accents`;
    energyEffects = `Dark void tendrils, shadowy smoke vortex, and eerie twilight glint`;
    environment = `Gothic moonlit rooftop overlooking an endless misty metropolis`;
  } else if (/dragon|draco|drake|wyrm/i.test(cleanName)) {
    type = 'Dragon';
    palette = 'majestic emerald, royal draconic purple, burnished gold, and celestial starry blue';
    costume = `Dragon-scale battle plate coat with draconic shoulder crests and golden rune embroidery`;
    energyEffects = `Celestial dragon breath aura, swirling cosmic starbursts, and draconic flame`;
    environment = `High sky above the stratosphere with panoramic view of clouds and orbiting meteors`;
  }

  return {
    id: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: cleanName,
    category: `${cleanName} Manifestation`,
    type,
    stage: 'ex',
    hp: 310,
    palette,
    costume,
    hairstyle,
    energyEffects,
    environment,
    holographicPattern: 'Full-card prismatic rainbow diffraction foil, metallic silver frame embossing, authentic physical card printing textures',
    ability: {
      name: `${cleanName} Surge`,
      description: `Once during your turn, you may activate ${cleanName}'s special thematic effect to bolster your Active Pokémon.`
    },
    attacks: [
      {
        name: `${cleanName} Strike`,
        energy: [type, 'Colorless'],
        damage: '130',
        description: `Unleashes the core elemental power of ${cleanName} with devastating impact.`
      },
      {
        name: `Supreme ${cleanName} Impact`,
        energy: [type, type, 'Colorless', 'Colorless'],
        damage: '260',
        description: `A master-level ultimate technique inspired by ${cleanName}.`
      }
    ],
    weakness: 'Colorless ×2',
    resistance: 'None',
    retreatCost: 2,
    rarity: 'Special Illustration Rare (SAR ★★★)',
    flavorText: `The powerful human embodiment of ${cleanName}, commanding ancient elemental forces and legendary status.`,
    illustrator: 'Nano Banana Pro / Studio'
  };
}
