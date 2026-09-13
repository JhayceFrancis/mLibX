import React, { useState, useEffect } from 'react';
import { Monitor, Tv, X, RefreshCcw, Activity, Disc } from 'lucide-react';
import { cn } from '../utils';

interface ExtensionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExtensionPopup({ isOpen, onClose }: ExtensionPopupProps) {
  const [status, setStatus] = useState<'scanning' | 'detected'>('scanning');
  const [media, setMedia] = useState<any>(null);

  // Restart scanning simulation every time the popup opens
  useEffect(() => {
    if (isOpen) {
      setStatus('scanning');
      setMedia(null);
      
      const timer = setTimeout(() => {
        setStatus('detected');
        // Randomly simulate either Crunchyroll or Local Media Player detection
        const isCrunchy = Math.random() > 0.5;
        if (isCrunchy) {
          setMedia({
            title: 'Jujutsu Kaisen',
            subtitle: 'S2 E17 - Thunderclap',
            source: 'Crunchyroll Web',
            progress: 34,
            icon: Tv
          });
        } else {
          setMedia({
            title: 'Dune: Part Two',
            subtitle: 'mkv - 4K HDR',
            source: 'Local Media Player (VLC)',
            progress: 12,
            icon: Disc
          });
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-14 right-4 w-80 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-4 fade-in duration-200">
      {/* Extension Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-inner shadow-emerald-300/20">
            <Activity className="w-4 h-4 text-zinc-950" />
          </div>
          <span className="font-semibold text-sm text-zinc-100 tracking-tight">mLibX</span>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Now Playing</h3>
        
        {status === 'scanning' ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="relative flex h-12 w-12">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-12 w-12 bg-emerald-500/10 items-center justify-center border border-emerald-500/20">
                <Monitor className="w-5 h-5 text-emerald-400" />
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-400 animate-pulse">Detecting media players...</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex gap-3 shadow-inner">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                <media.icon className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-100 truncate">{media.title}</p>
                <p className="text-xs text-zinc-400 truncate">{media.subtitle}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-medium">{media.source}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                <span>Auto-sync progress</span>
                <span>{media.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${media.progress}%` }}
                />
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-sm font-medium transition-colors border border-zinc-700 hover:border-zinc-600 shadow-sm">
              <RefreshCcw className="w-3.5 h-3.5" />
              Force Scrobble
            </button>
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
         <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
            Syncing to Dashboard
         </div>
      </div>
    </div>
  );
}
