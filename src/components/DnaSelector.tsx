import React, { useState } from 'react';
import { Search, Wand2, Dna, Edit3 } from 'lucide-react';
import { PokemonDna } from '../types/pokemon';
import { POKEMON_PRESETS, createDefaultDnaForName } from '../data/pokemonDna';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface DnaSelectorProps {
  cardDisplayName: string;
  onChangeCardDisplayName: (name: string) => void;
  japaneseName: string;
  onChangeJapaneseName: (japanese: string) => void;
  currentDna: PokemonDna;
  onSelectDna: (dna: PokemonDna) => void;
  onCustomGenerateDna: (name: string) => Promise<void>;
  isGeneratingDna: boolean;
}

export const DnaSelector: React.FC<DnaSelectorProps> = ({
  cardDisplayName,
  onChangeCardDisplayName,
  japaneseName,
  onChangeJapaneseName,
  currentDna,
  onSelectDna,
  onCustomGenerateDna,
  isGeneratingDna,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [customInputName, setCustomInputName] = useState('');

  const filteredPresets = POKEMON_PRESETS.filter((preset) => {
    const matchesSearch =
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedTypeFilter === 'All' || preset.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleCustomTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputName.trim()) return;
    const newDna = createDefaultDnaForName(customInputName.trim());
    onSelectDna(newDna);
    if (!cardDisplayName.trim()) {
      onChangeCardDisplayName(newDna.name);
      onChangeJapaneseName(toJapaneseName(newDna.name));
    }
  };

  const handleAiCraftSubmit = async () => {
    if (!customInputName.trim()) return;
    await onCustomGenerateDna(customInputName.trim());
  };

  return (
    <div className="space-y-4">
      {/* 2. NAMA KARAKTER */}
      <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
            2. Nama Karakter
          </h3>
          <span className="text-[11px] font-mono text-white/50">
            Aksara Jepang
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Nama</span>
            <input
              type="text"
              value={cardDisplayName}
              onChange={(e) => {
                const val = e.target.value;
                onChangeCardDisplayName(val);
                onChangeJapaneseName(toJapaneseName(val));
              }}
              placeholder="Contoh: Aziz, Andika..."
              className="ios-glass-input w-full px-3 py-2 rounded-xl text-xs font-semibold text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-white/50 block font-medium">Tulisan Jepang di Kartu</span>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={japaneseName}
                onChange={(e) => onChangeJapaneseName(e.target.value)}
                placeholder="アジズ"
                className="ios-glass-input flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold text-white placeholder-white/30 focus:outline-none"
              />
              {cardDisplayName !== currentDna.name && (
                <button
                  type="button"
                  onClick={() => {
                    onChangeCardDisplayName(currentDna.name);
                    onChangeJapaneseName(toJapaneseName(currentDna.name));
                  }}
                  className="ios-glass-button px-2.5 py-1.5 rounded-xl text-[11px] text-white/70 hover:text-white cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PILIH KARAKTER */}
      <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
            3. Pilih Karakter
          </h3>

          <div className="flex p-0.5 rounded-xl bg-black/30 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              Pustaka ({POKEMON_PRESETS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Wand2 className="w-3 h-3" /> Ketik Sendiri
            </button>
          </div>
        </div>

        {activeTab === 'presets' && (
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Cari Pokémon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ios-glass-input w-full pl-8 pr-3 py-1.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {['All', 'Psychic', 'Fire', 'Water', 'Lightning', 'Dragon', 'Darkness'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedTypeFilter(type)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedTypeFilter === type
                        ? 'bg-white/20 text-white border border-white/20 shadow-sm'
                        : 'bg-black/20 text-white/50 hover:text-white/80 border border-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {filteredPresets.map((preset) => {
                const isSelected = currentDna.id === preset.id;
                const presetJp = toJapaneseName(preset.name);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      onSelectDna(preset);
                      if (!cardDisplayName || cardDisplayName === currentDna.name) {
                        onChangeCardDisplayName(preset.name);
                        onChangeJapaneseName(presetJp);
                      }
                    }}
                    className={`relative text-left p-2.5 rounded-xl transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white/20 border border-white/40 text-white shadow-lg'
                        : 'ios-glass-subtle hover:bg-white/10 text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white truncate">
                        {preset.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {preset.stage}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-white/50 truncate">
                      {presetJp}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-white/40 mt-2 pt-1 border-t border-white/10">
                      <span>{preset.type}</span>
                      <span className="font-mono text-white/60">{preset.hp} HP</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-2 p-3 rounded-xl bg-black/20 border border-white/10">
            <form onSubmit={handleCustomTypeSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik nama Pokémon..."
                value={customInputName}
                onChange={(e) => setCustomInputName(e.target.value)}
                className="ios-glass-input flex-1 px-3 py-1.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!customInputName.trim()}
                className="ios-glass-button px-3 py-1.5 rounded-xl text-xs text-white font-medium disabled:opacity-40 cursor-pointer"
              >
                Pakai
              </button>
              <button
                type="button"
                disabled={!customInputName.trim() || isGeneratingDna}
                onClick={handleAiCraftSubmit}
                className="ios-glass-primary px-3 py-1.5 rounded-xl text-xs font-medium disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                {isGeneratingDna ? (
                  <div className="w-3 h-3 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Wand2 className="w-3 h-3" />
                )}
                <span>AI Craft</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
