import React, { useState } from 'react';
import { Printer, X } from 'lucide-react';
import { PokemonDna } from '../types/pokemon';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardImageUrl: string;
  dna: PokemonDna;
  cardDisplayName?: string;
  japaneseName?: string;
  bottomCopyright?: string;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  cardImageUrl,
  dna,
  cardDisplayName,
  japaneseName,
  bottomCopyright = '@2026 Bapack-Bapack DeadStar',
}) => {
  const [layoutMode, setLayoutMode] = useState<'single' | 'sheet9'>('single');

  if (!isOpen) return null;

  const effectiveName = cardDisplayName?.trim() || dna.name;
  const displayJp = japaneseName?.trim() || toJapaneseName(effectiveName);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-100">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh] text-zinc-300 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                <span>Lembar Cetak Kartu Fisik</span>
                <span className="font-mono text-zinc-400 font-normal">
                  {displayJp} [{effectiveName}]
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Ukuran standar kartu 63×88 mm untuk card sleeve atau binder
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Layout Toggle */}
        <div className="flex items-center justify-between bg-zinc-950 p-2 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Mode Tata Letak:</span>
            <div className="flex p-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <button
                type="button"
                onClick={() => setLayoutMode('single')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  layoutMode === 'single'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                1 Kartu (Skala 100% 63×88mm)
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('sheet9')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  layoutMode === 'sheet9'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Lembar 9 Kartu (3×3 Binder)
              </button>
            </div>
          </div>

          <div className="text-xs text-zinc-400 font-mono hidden sm:block">
            63 mm × 88 mm (2.48" × 3.46")
          </div>
        </div>

        {/* Printable Preview Sheet */}
        <div className="bg-white text-zinc-900 p-6 rounded-xl min-h-[400px] flex items-center justify-center overflow-auto print:p-0 print:m-0 print:border-none">
          {layoutMode === 'single' ? (
            <div className="relative p-4 border border-dashed border-zinc-300">
              {/* Corner Cutting Marks */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-zinc-900" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-zinc-900" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-zinc-900" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-zinc-900" />

              <div
                style={{ width: '63mm', height: '88mm' }}
                className="overflow-hidden rounded-xl shadow-lg border border-zinc-200"
              >
                <img
                  src={cardImageUrl}
                  alt={effectiveName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[10px] text-zinc-500 text-center mt-2 font-mono">
                {displayJp} · 63mm × 88mm · {bottomCopyright}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: '45mm', height: '62.8mm' }}
                  className="overflow-hidden rounded-lg shadow-sm border border-zinc-300 relative group"
                >
                  <img
                    src={cardImageUrl}
                    alt={`${effectiveName} #${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 text-[8px] bg-white/80 px-1 rounded font-mono">
                    #{i + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Print instructions */}
        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-1">
          <p className="font-medium text-zinc-200">Panduan Pencetakan:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[11px]">
            <li>Gunakan kertas glossy photo paper 250–300 gsm.</li>
            <li>Di jendela cetak printer, pastikan opsi <strong>Scale</strong> diatur ke <strong>100% (Actual size)</strong> agar pas dengan card sleeve 63×88 mm.</li>
          </ul>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-medium text-xs transition-colors border border-zinc-700"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" /> Buka Menu Cetak
          </button>
        </div>
      </div>
    </div>
  );
};
