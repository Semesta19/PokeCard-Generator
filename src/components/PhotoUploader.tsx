import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, X } from 'lucide-react';

interface PhotoUploaderProps {
  portraitImage: string | null;
  onSelectImage: (dataUrl: string | null) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ portraitImage, onSelectImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) onSelectImage(result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 720 }, height: { ideal: 960 }, facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setCameraError('Tidak dapat mengakses kamera.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      onSelectImage(canvas.toDataURL('image/jpeg', 0.95));
      stopCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/90 tracking-wide uppercase">
          1. Upload Wajah
        </h3>

        {portraitImage && (
          <button
            type="button"
            onClick={() => onSelectImage(null)}
            className="ios-glass-button text-[11px] text-white/70 hover:text-white px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" /> Ganti
          </button>
        )}
      </div>

      {cameraError && (
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs">
          {cameraError}
        </div>
      )}

      {!portraitImage && !isCameraActive && (
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="ios-glass-button rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-105 transition-all">
              <Upload className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-white/90">Upload Foto</span>
          </button>

          <button
            type="button"
            onClick={startCamera}
            className="ios-glass-button rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-105 transition-all">
              <Camera className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-white/90">Kamera</span>
          </button>
        </div>
      )}

      {isCameraActive && (
        <div className="relative rounded-2xl overflow-hidden bg-black/50 border border-white/10 aspect-[3/4] max-h-[300px] mx-auto flex items-center justify-center">
          <video ref={videoRef} playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 px-4 z-10">
            <button
              type="button"
              onClick={capturePhoto}
              className="ios-glass-primary px-4 py-2 rounded-full font-medium text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" /> Ambil Foto
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="ios-glass-button px-3 py-2 rounded-full text-white/80 text-xs cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {portraitImage && (
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 aspect-[3/4] max-h-[260px] mx-auto flex items-center justify-center shadow-lg">
          <img src={portraitImage} alt="Wajah" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};
