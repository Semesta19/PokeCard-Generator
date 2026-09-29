import React from 'react';
import { PokemonDna, CardAttack } from '../types/pokemon';

interface CardTextEditorProps {
  dna: PokemonDna;
  onUpdateDna: (updatedDna: PokemonDna) => void;
}

export const CardTextEditor: React.FC<CardTextEditorProps> = ({ dna, onUpdateDna }) => {
  const handleUpdateAbility = (field: 'name' | 'description', value: string) => {
    const currentAbility = dna.ability || {
      name: `${dna.name} Synergy`,
      description: '',
    };
    onUpdateDna({
      ...dna,
      ability: {
        ...currentAbility,
        [field]: value,
      },
    });
  };

  const handleUpdateAttack = (
    index: number,
    field: 'name' | 'damage' | 'description',
    value: string
  ) => {
    const attacks = [...dna.attacks];
    while (attacks.length <= index) {
      attacks.push({
        name: index === 0 ? 'Serangan 1' : 'Serangan 2',
        damage: index === 0 ? '120' : '280',
        energy: [dna.type],
        description: '',
      });
    }

    attacks[index] = {
      ...attacks[index],
      [field]: value,
    };

    onUpdateDna({ ...dna, attacks });
  };

  const attack1: CardAttack = dna.attacks[0] || {
    name: 'Serangan 1',
    damage: '120',
    energy: [dna.type],
    description: '',
  };

  const attack2: CardAttack = dna.attacks[1] || {
    name: 'Serangan 2',
    damage: '280',
    energy: [dna.type, dna.type],
    description: '',
  };

  return (
    <div className="space-y-4">
      {/* 4. TULIS KEMAMPUAN */}
      <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
            4. Tulis Kemampuan (Ability)
          </h3>
          <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-200 font-bold text-[9px] uppercase tracking-wider font-mono">
            Ability
          </span>
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Nama Kemampuan</span>
            <input
              type="text"
              value={dna.ability?.name || ''}
              onChange={(e) => handleUpdateAbility('name', e.target.value)}
              placeholder="Contoh: Zombie Ascendance"
              className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs font-semibold text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Deskripsi Kemampuan</span>
            <textarea
              rows={2}
              value={dna.ability?.description || ''}
              onChange={(e) => handleUpdateAbility('description', e.target.value)}
              placeholder="Contoh: Once during your turn, you may..."
              className="ios-glass-input w-full p-2.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 5. TULIS SERANGAN 1 DAN 2 */}
      <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
        <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
          5. Tulis Serangan 1 & 2
        </h3>

        {/* Serangan 1 */}
        <div className="p-3 rounded-xl bg-black/25 border border-white/10 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-1">
              <span className="text-[10px] text-white/50 block font-medium">Nama Serangan 1</span>
              <input
                type="text"
                value={attack1.name}
                onChange={(e) => handleUpdateAttack(0, 'name', e.target.value)}
                placeholder="Contoh: Endless Tape Roll"
                className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs font-semibold text-white placeholder-white/30 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-white/50 block font-medium">Damage</span>
              <input
                type="text"
                value={attack1.damage}
                onChange={(e) => handleUpdateAttack(0, 'damage', e.target.value)}
                placeholder="120"
                className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white focus:outline-none text-center"
              />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Deskripsi Serangan 1</span>
            <textarea
              rows={2}
              value={attack1.description}
              onChange={(e) => handleUpdateAttack(0, 'description', e.target.value)}
              placeholder="Deskripsi efek serangan 1..."
              className="ios-glass-input w-full p-2 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Serangan 2 */}
        <div className="p-3 rounded-xl bg-black/25 border border-white/10 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-1">
              <span className="text-[10px] text-white/50 block font-medium">Nama Serangan 2</span>
              <input
                type="text"
                value={attack2.name}
                onChange={(e) => handleUpdateAttack(1, 'name', e.target.value)}
                placeholder="Contoh: Crystal Wing Storm"
                className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs font-semibold text-white placeholder-white/30 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-white/50 block font-medium">Damage</span>
              <input
                type="text"
                value={attack2.damage}
                onChange={(e) => handleUpdateAttack(1, 'damage', e.target.value)}
                placeholder="280"
                className="ios-glass-input w-full px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white focus:outline-none text-center"
              />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Deskripsi Serangan 2</span>
            <textarea
              rows={2}
              value={attack2.description}
              onChange={(e) => handleUpdateAttack(1, 'description', e.target.value)}
              placeholder="Deskripsi efek serangan 2..."
              className="ios-glass-input w-full p-2 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 6. TULIS LORE */}
      <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-2">
        <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
          6. Tulis Lore
        </h3>
        <textarea
          rows={2}
          value={dna.flavorText}
          onChange={(e) => onUpdateDna({ ...dna, flavorText: e.target.value })}
          placeholder="Tulis kutipan cerita atau lore kartu di sini..."
          className="ios-glass-input w-full p-2.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none leading-relaxed italic"
        />
      </div>
    </div>
  );
};
