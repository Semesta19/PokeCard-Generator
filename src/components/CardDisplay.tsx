import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Download,
  Maximize2,
  Rotate3d,
  Share2,
  Check,
} from 'lucide-react';
import { PokemonDna } from '../types/pokemon';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface CardDisplayProps {
  cardDisplayName?: string;
  japaneseName?: string;
  cardImageUrl: string | null;
  dna: PokemonDna;
  isGenerating: boolean;
  onOpenFullModal: () => void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  cardDisplayName,
  japaneseName,
  cardImageUrl,
  dna,
  isGenerating,
  onOpenFullModal,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [holoEnabled, setHoloEnabled] = useState(true);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const effectiveCardName = cardDisplayName?.trim() || dna.name;
  const displayJapanese = japaneseName?.trim() || toJapaneseName(effectiveCardName);

  // Card tilt calculator for both Mouse and Finger Touch (HP & Tablet)
  const updateCardTilt = (clientX: number, clientY: number) => {
    if (!cardRef.current || isGenerating) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const clampedX = Math.max(0, Math.min(rect.width, x));
    const clampedY = Math.max(0, Math.min(rect.height, y));

    const rotX = -((clampedY - centerY) / centerY) * 16;
    const rotY = ((clampedX - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (clampedX / rect.width) * 100,
      y: (clampedY / rect.height) * 100,
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isGenerating) return;
    isInteractingRef.current = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    updateCardTilt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isGenerating) return;
    if (e.pointerType === 'mouse' || isInteractingRef.current) {
      updateCardTilt(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isInteractingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const handlePointerCancel = () => {
    isInteractingRef.current = false;
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isGenerating || e.touches.length === 0) return;
    isInteractingRef.current = true;
    updateCardTilt(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isGenerating || e.touches.length === 0) return;
    updateCardTilt(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isInteractingRef.current = false;
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  // Device orientation / Gyroscope tilt
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (isInteractingRef.current || isGenerating) return;
      if (e.gamma !== null && e.beta !== null) {
        const rotY = Math.max(-16, Math.min(16, e.gamma * 0.45));
        const rotX = Math.max(-16, Math.min(16, (e.beta - 45) * 0.45));
        setRotateX(rotX);
        setRotateY(rotY);
        setGlarePosition({
          x: Math.max(10, Math.min(90, 50 + (rotY / 16) * 35)),
          y: Math.max(10, Math.min(90, 50 - (rotX / 16) * 35)),
        });
      }
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [isGenerating]);

  // Mobile & Desktop Download
  const handleDownload = async () => {
    if (!cardImageUrl) return;
    setIsDownloading(true);

    try {
      const cleanName = effectiveCardName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filename = `${cleanName}-${dna.name.toLowerCase()}-63x88-card.png`;

      const response = await fetch(cardImageUrl);
      const blob = await response.blob();
      const file = new File([blob], filename, { type: 'image/png' });

      const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `Kartu ${displayJapanese}`,
          });
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 2500);
          setIsDownloading(false);
          return;
        } catch (shareErr: any) {
          if (shareErr.name === 'AbortError') {
            setIsDownloading(false);
            return;
          }
        }
      }

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch {
      try {
        const link = document.createElement('a');
        link.href = cardImageUrl;
        link.download = `${effectiveCardName}-card.png`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {}
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!cardImageUrl) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="ios-glass rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between gap-4 relative overflow-hidden">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2 truncate">
          <span className="text-xs font-mono font-bold text-white tracking-wider truncate">
            {displayJapanese}
          </span>
          <span className="text-[11px] text-white/50 hidden sm:inline">
            · {dna.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHoloEnabled(!holoEnabled)}
            className={`ios-glass-button flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg cursor-pointer ${
              holoEnabled ? 'text-white bg-white/20' : 'text-white/40'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Holo</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="ios-glass-button flex items-center gap-1 text-[11px] text-white/70 hover:text-white px-2.5 py-1 rounded-lg cursor-pointer"
          >
            <Rotate3d className="w-3 h-3" />
            <span>Balik</span>
          </button>
        </div>
      </div>

      {/* 3D Card */}
      <div className="w-full flex flex-col items-center justify-center py-2 select-none perspective-[1200px]">
        <div
          ref={cardRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${
              isFlipped ? rotateY + 180 : rotateY
            }deg) scale3d(1, 1, 1)`,
            transition: isInteractingRef.current
              ? 'none'
              : rotateX === 0 && rotateY === 0
              ? 'transform 0.45s ease-out'
              : 'transform 0.08s ease-out',
            transformStyle: 'preserve-3d',
            touchAction: 'none',
          }}
          className="relative w-[260px] sm:w-[290px] md:w-[310px] aspect-[63/88] rounded-2xl cursor-grab active:cursor-grabbing shadow-2xl transition-shadow touch-none select-none"
        >
          {/* FRONT */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-black/90 border border-white/20 shadow-2xl flex flex-col pointer-events-none"
          >
            {isGenerating && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <p className="text-xs font-mono font-bold text-white">
                  {displayJapanese}
                </p>
              </div>
            )}

            {cardImageUrl ? (
              <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={cardImageUrl}
                  alt={`${displayJapanese} Pokémon Card`}
                  className="w-full h-full object-cover rounded-[13px]"
                />

                {holoEnabled && (
                  <>
                    <div
                      className="absolute inset-0 holo-overlay rounded-[13px]"
                      style={{
                        backgroundPosition: `${glarePosition.x}% ${glarePosition.y}%`,
                        opacity: 0.55,
                      }}
                    />
                    <div className="absolute inset-0 holo-stars rounded-[13px] opacity-30" />
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-between p-3.5 text-center bg-zinc-950 text-white/50 relative">
                <div className="w-full flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5 text-left">
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      {dna.stage}
                    </span>
                    <span className="text-sm font-bold font-mono text-white tracking-wider">
                      {displayJapanese}
                    </span>
                  </div>
                  <div className="text-right font-mono text-xs text-white/80 font-bold">
                    HP {dna.hp}
                  </div>
                </div>

                <div className="w-full flex-1 flex flex-col items-center justify-center space-y-1.5 py-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                <div className="w-full pt-1.5 border-t border-white/10 text-left font-mono text-[10px] text-white/60 space-y-1">
                  {dna.ability?.name && (
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1 py-0.2 rounded bg-red-700 text-white font-bold text-[8px] uppercase tracking-wider">
                          Ability
                        </span>
                        <span className="font-bold text-white text-[9.5px]">
                          {dna.ability.name}
                        </span>
                      </div>
                      {dna.ability.description && (
                        <p className="text-[8px] text-white/50 line-clamp-1 italic leading-tight pl-0.5">
                          {dna.ability.description}
                        </p>
                      )}
                    </div>
                  )}

                  {dna.attacks[0] && (
                    <div className="space-y-0.5">
                      <div className="flex justify-between font-bold text-white/90 text-[9.5px]">
                        <span>{dna.attacks[0].name}</span>
                        <span>{dna.attacks[0].damage}</span>
                      </div>
                      {dna.attacks[0].description && (
                        <p className="text-[8px] text-white/50 line-clamp-1 italic leading-tight pl-0.5">
                          {dna.attacks[0].description}
                        </p>
                      )}
                    </div>
                  )}

                  {dna.attacks[1] && (
                    <div className="space-y-0.5">
                      <div className="flex justify-between font-bold text-white/90 text-[9.5px]">
                        <span>{dna.attacks[1].name}</span>
                        <span>{dna.attacks[1].damage}</span>
                      </div>
                      {dna.attacks[1].description && (
                        <p className="text-[8px] text-white/50 line-clamp-1 italic leading-tight pl-0.5">
                          {dna.attacks[1].description}
                        </p>
                      )}
                    </div>
                  )}

                  {dna.flavorText && (
                    <div className="pt-0.5 border-t border-white/5 text-[8px] text-white/50 line-clamp-1 italic">
                      "{dna.flavorText}"
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
          </div>

          {/* BACK */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-zinc-950 border border-white/20 shadow-2xl flex flex-col items-center justify-center p-5 pointer-events-none"
          >
            <div className="w-full h-full rounded-xl border border-white/10 bg-zinc-900/90 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="relative w-20 h-20 rounded-full border border-white/20 bg-zinc-950 flex items-center justify-center">
                <div className="w-full h-1 bg-white/20 absolute" />
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-white/30 z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-xs font-bold tracking-widest text-white/80 uppercase font-mono">
                  POKÉMON
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. TOMBOL DOWNLOAD (TANPA ADA CETAK FISIK) */}
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!cardImageUrl || isDownloading}
            onClick={handleDownload}
            className="ios-glass-primary flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-xs disabled:opacity-40 cursor-pointer shadow-lg transition-all"
          >
            {isDownloading ? (
              <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-black" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-black" />
                <span>Download Kartu (PNG)</span>
              </>
            )}
          </button>

          {cardImageUrl && (
            <>
              <button
                type="button"
                onClick={onOpenFullModal}
                className="ios-glass-button p-3 rounded-2xl text-white/70 hover:text-white cursor-pointer"
                title="Perbesar"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="ios-glass-button p-3 rounded-2xl text-white/70 hover:text-white cursor-pointer"
                title="Salin Link"
              >
                {copiedShare ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
