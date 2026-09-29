import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { GenerationSettings } from '../types/pokemon';

interface HeaderProps {
  settings: GenerationSettings;
  onUpdateSettings: (newSettings: Partial<GenerationSettings>) => void;
}

const QUALITY_OPTIONS: { value: GenerationSettings['quality']; label: string; note: string }[] = [
  { value: 'low', label: 'Fast', note: 'Cepat' },
  { value: 'medium', label: 'Standard', note: 'Seimbang' },
  { value: 'high', label: 'HD', note: 'Terbaik' },
];

export const Header: React.FC<HeaderProps> = ({ settings, onUpdateSettings }) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 backdrop-blur-2xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-mono text-xs font-semibold shadow-inner">
            卡
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">
            PokéCard AI
          </span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            className="ios-glass-button flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-white/90 hover:text-white cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="font-medium">
              GPT Image 2 · {QUALITY_OPTIONS.find((q) => q.value === settings.quality)?.label}
            </span>
            <Sliders className="w-3.5 h-3.5 text-white/50 ml-0.5" />
          </button>

          {showSettingsDropdown && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl ios-glass p-2.5 z-50 animate-in fade-in zoom-in-95 duration-100 shadow-2xl">
              <div className="space-y-1">
                {QUALITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onUpdateSettings({ quality: opt.value });
                      setShowSettingsDropdown(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-all cursor-pointer ${
                      settings.quality === opt.value
                        ? 'bg-white/20 text-white font-medium'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>GPT Image 2 · {opt.label}</span>
                      <span className="text-[10px] text-white/40">{opt.note}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs px-1">
                <span className="text-white/50">Resolusi</span>
                <div className="flex gap-1">
                  {(['1K', '2K'] as const).map((res) => (
                    <button
                      key={res}
                      type="button"
                      onClick={() => onUpdateSettings({ resolution: res })}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                        settings.resolution === res
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'bg-white/5 text-white/50 hover:text-white'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};