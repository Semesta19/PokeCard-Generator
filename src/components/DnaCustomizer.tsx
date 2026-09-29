import React from 'react';
import { RotateCcw } from 'lucide-react';
import { PokemonDna, PokemonType } from '../types/pokemon';
import { POKEMON_PRESETS } from '../data/pokemonDna';

interface DnaCustomizerProps {
  dna: PokemonDna;
  onUpdateDna: (updatedDna: PokemonDna) => void;
  facePriorityPercent: number;
  onChangeFacePriority: (percent: number) => void;
}

export const DnaCustomizer: React.FC<DnaCustomizerProps> = ({
  dna,
  onUpdateDna,
}) => {
  const elementTypes: PokemonType[] = [
    'Water',
    'Fire',
    'Grass',
    'Lightning',
    'Psychic',
    'Fighting',
    'Darkness',
    'Metal',
    'Dragon',
    'Fairy',
    'Colorless',
  ];

  const handleResetToPreset = () => {
    const original = POKEMON_PRESETS.find((p) => p.id === dna.id);
    if (original) {
      onUpdateDna(original);
    }
  };

  return (
    <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
          7. Pengaturan HP, Elemen & Kostum
        </h3>

        <button
          type="button"
          onClick={handleResetToPreset}
          className="ios-glass-button text-[11px] text-white/70 hover:text-white px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <span className="text-[10px] text-white/50 block font-medium">HP (Hit Points)</span>
          <input
            type="number"
            value={dna.hp}
            onChange={(e) => onUpdateDna({ ...dna, hp: Number(e.target.value) || 300 })}
            className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-white/50 block font-medium">Tipe Elemen</span>
          <select
            value={dna.type}
            onChange={(e) => onUpdateDna({ ...dna, type: e.target.value as PokemonType })}
            className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none bg-black/70"
          >
            {elementTypes.map((typ) => (
              <option key={typ} value={typ} className="bg-zinc-900 text-white">
                {typ}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2 pt-1 border-t border-white/10">
        <div className="space-y-1">
          <span className="text-[10px] text-white/50 block font-medium">Kostum / Pakaian</span>
          <input
            type="text"
            value={dna.costume}
            onChange={(e) => onUpdateDna({ ...dna, costume: e.target.value })}
            placeholder="Deskripsi pakaian..."
            className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Aksi Monster Background</span>
            <input
              type="text"
              value={dna.energyEffects}
              onChange={(e) => onUpdateDna({ ...dna, energyEffects: e.target.value })}
              placeholder="Efek energi monster..."
              className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Latar Arena</span>
            <input
              type="text"
              value={dna.environment}
              onChange={(e) => onUpdateDna({ ...dna, environment: e.target.value })}
              placeholder="Latar arena..."
              className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
