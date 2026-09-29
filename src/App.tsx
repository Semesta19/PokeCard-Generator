/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PhotoUploader } from './components/PhotoUploader';
import { DnaSelector } from './components/DnaSelector';
import { CardTextEditor } from './components/CardTextEditor';
import { DnaCustomizer } from './components/DnaCustomizer';
import { CardDisplay } from './components/CardDisplay';
import { CardHistory } from './components/CardHistory';
import { PokemonDna, GenerationSettings, GeneratedCard } from './types/pokemon';
import { POKEMON_PRESETS } from './data/pokemonDna';
import { buildPokemonCardPrompt } from './utils/promptBuilder';
import { toJapaneseName } from './utils/japaneseTransliterate';
import { loadCardHistory, saveCardToStorage, clearCardStorage } from './utils/cardStorage';
import { Sparkles, AlertCircle, X } from 'lucide-react';

export default function App() {
  const defaultPreset = POKEMON_PRESETS.find((p) => p.id === 'mewtwo') || POKEMON_PRESETS[0];
  const [currentDna, setCurrentDna] = useState<PokemonDna>(defaultPreset);
  const [cardDisplayName, setCardDisplayName] = useState<string>('Aziz');
  const [japaneseName, setJapaneseName] = useState<string>(() => toJapaneseName('Aziz'));

  const [portraitImage, setPortraitImage] = useState<string | null>(null);
  const [facePriorityPercent, setFacePriorityPercent] = useState<number>(33);
  const [settings, setSettings] = useState<GenerationSettings>({
    model: 'gemini-3-pro-image',
    facePriorityPercent: 33,
    aspectRatio: '63x88',
    resolution: '1K',
    customCardName: 'Aziz',
    japaneseName: 'アジズ',
    isolatedCardOnly: true,
    bodyCrop: 'bust',
    realismMode: 'photorealistic',
    showOriginalInAction: true,
    includeStatsInArtwork: true,
    holographicIntensity: 'ultra-rare',
  });

  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingDna, setIsGeneratingDna] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showFullModal, setShowFullModal] = useState(false);
  const [history, setHistory] = useState<GeneratedCard[]>([]);

  useEffect(() => {
    let isMounted = true;
    loadCardHistory()
      .then((cards) => {
        if (isMounted && cards && cards.length > 0) {
          setHistory(cards);
        }
      })
      .catch((err) => {
        console.warn('Could not load card history from storage:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const saveToHistory = (newCard: GeneratedCard) => {
    setHistory((prev) => [newCard, ...prev.slice(0, 29)]);
    saveCardToStorage(newCard).catch((err) => {
      console.warn('Failed to persist card to storage:', err);
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    clearCardStorage().catch((err) => {
      console.warn('Failed to clear card storage:', err);
    });
  };

  const compiledPrompt = buildPokemonCardPrompt(currentDna, {
    ...settings,
    facePriorityPercent,
    customCardName: cardDisplayName,
    japaneseName: japaneseName || toJapaneseName(cardDisplayName),
    isolatedCardOnly: true,
  });

  const handleGenerateCard = async () => {
    if (!portraitImage) {
      setErrorMessage('Upload foto wajah terlebih dahulu.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: compiledPrompt,
          image: portraitImage,
          model: settings.model,
          imageSize: settings.resolution,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal menghasilkan gambar kartu.');
      }

      setCardImageUrl(data.imageUrl);

      saveToHistory({
        id: `card-${Date.now()}`,
        timestamp: Date.now(),
        pokemonName: currentDna.name,
        cardDisplayName: cardDisplayName,
        japaneseName: japaneseName || toJapaneseName(cardDisplayName),
        pokemonDna: currentDna,
        imageUrl: data.imageUrl,
        portraitUsed: portraitImage || undefined,
        prompt: compiledPrompt,
        model: settings.model,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat memproses gambar.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomGenerateDna = async (name: string) => {
    setIsGeneratingDna(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/generate-dna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonName: name }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal meracik DNA Pokémon.');
      }
      setCurrentDna(data.dna);
      if (!cardDisplayName.trim()) {
        setCardDisplayName(data.dna.name);
        setJapaneseName(toJapaneseName(data.dna.name));
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal meracik DNA.');
    } finally {
      setIsGeneratingDna(false);
    }
  };

  const effectiveTitle = cardDisplayName || currentDna.name;
  const effectiveJpTitle = japaneseName || toJapaneseName(effectiveTitle);

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col font-sans antialiased relative overflow-x-hidden selection:bg-white/20">
      {/* iOS Ambient Light Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      {/* iOS Translucent Header */}
      <Header
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings((prev) => ({ ...prev, ...newSettings }))}
      />

      {/* Main Workspace */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        {/* Error Alert */}
        {errorMessage && (
          <div className="ios-glass p-3.5 rounded-2xl flex items-center justify-between text-xs text-red-200 border-red-500/30 bg-red-500/10 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT: Ordered Flow (1 to 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Upload Wajah */}
            <PhotoUploader
              portraitImage={portraitImage}
              onSelectImage={(img) => {
                setPortraitImage(img);
                if (errorMessage) setErrorMessage(null);
              }}
            />

            {/* 2. Nama Karakter & 3. Pilih Karakter */}
            <DnaSelector
              cardDisplayName={cardDisplayName}
              onChangeCardDisplayName={(val) => {
                setCardDisplayName(val);
                setSettings((prev) => ({ ...prev, customCardName: val }));
              }}
              japaneseName={japaneseName}
              onChangeJapaneseName={(val) => {
                setJapaneseName(val);
                setSettings((prev) => ({ ...prev, japaneseName: val }));
              }}
              currentDna={currentDna}
              onSelectDna={(dna) => setCurrentDna(dna)}
              onCustomGenerateDna={handleCustomGenerateDna}
              isGeneratingDna={isGeneratingDna}
            />

            {/* 4. Tulis Kemampuan, 5. Tulis Serangan 1 & 2, 6. Tulis Lore */}
            <CardTextEditor
              dna={currentDna}
              onUpdateDna={(updated) => setCurrentDna(updated)}
            />

            {/* 7. Pengaturan HP, Elemen dan Kostum */}
            <DnaCustomizer
              dna={currentDna}
              onUpdateDna={(updated) => setCurrentDna(updated)}
              facePriorityPercent={facePriorityPercent}
              onChangeFacePriority={(pct) => setFacePriorityPercent(pct)}
            />
          </div>

          {/* RIGHT: 8. Tampilan Kartu & Tombol Download + 9. Tombol Generate Kartu */}
          <div className="lg:col-span-5 space-y-3.5 lg:sticky lg:top-20">
            {/* 8. Tampilan Kartu beserta Tombol Download (Tanpa Cetak Fisik) */}
            <CardDisplay
              cardDisplayName={cardDisplayName}
              japaneseName={japaneseName}
              cardImageUrl={cardImageUrl}
              dna={currentDna}
              isGenerating={isGenerating}
              onOpenFullModal={() => setShowFullModal(true)}
            />

            {/* 9. Tombol Generate Kartu */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerateCard}
              className="ios-glass-primary w-full py-4 px-6 rounded-2xl font-bold text-xs tracking-wider uppercase disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Memproses Kartu {effectiveJpTitle}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate Kartu 「{effectiveJpTitle}」</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 11. Riwayat */}
        <CardHistory
          cards={history}
          onSelectCard={(c) => {
            setCardImageUrl(c.imageUrl);
            setCurrentDna(c.pokemonDna);
            if (c.cardDisplayName) setCardDisplayName(c.cardDisplayName);
            if (c.japaneseName) setJapaneseName(c.japaneseName);
            if (c.portraitUsed) setPortraitImage(c.portraitUsed);
          }}
          onClearHistory={handleClearHistory}
        />
      </main>

      {/* Fullscreen Modal */}
      {showFullModal && cardImageUrl && (
        <div
          onClick={() => setShowFullModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full aspect-[63/88] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black cursor-default"
          >
            <img
              src={cardImageUrl}
              alt="Fullscreen Card"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setShowFullModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
