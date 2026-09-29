import React from 'react';
import { Trash2 } from 'lucide-react';
import { GeneratedCard } from '../types/pokemon';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface CardHistoryProps {
  cards: GeneratedCard[];
  onSelectCard: (card: GeneratedCard) => void;
  onClearHistory: () => void;
}

export const CardHistory: React.FC<CardHistoryProps> = ({
  cards,
  onSelectCard,
  onClearHistory,
}) => {
  if (cards.length === 0) return null;

  return (
    <div className="ios-glass rounded-3xl p-5 sm:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
          Riwayat ({cards.length})
        </h3>

        <button
          type="button"
          onClick={onClearHistory}
          className="ios-glass-button text-[11px] text-white/60 hover:text-white px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3 h-3" /> Hapus
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {cards.map((card) => {
          const effectiveName = card.cardDisplayName || card.pokemonName;
          const jpName = card.japaneseName || toJapaneseName(effectiveName);

          return (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 bg-black/40 transition-all flex flex-col shadow-md hover:scale-[1.02]"
            >
              <div className="aspect-[63/88] w-full overflow-hidden bg-black relative">
                <img
                  src={card.imageUrl}
                  alt={effectiveName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-2 text-left">
                  <p className="text-[11px] font-bold font-mono text-white truncate">
                    {jpName}
                  </p>
                  <p className="text-[9px] text-white/50 font-mono truncate">
                    {card.pokemonName}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
