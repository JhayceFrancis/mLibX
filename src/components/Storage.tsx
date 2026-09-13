import React from 'react';
import { Shield, ShieldAlert, Key, DownloadCloud, UploadCloud, RefreshCw } from 'lucide-react';
import { StorageConfig } from '../types';
import { cn } from '../utils';

interface StorageProps {
  storage: StorageConfig[];
  toggleStorage: (provider: string) => void;
  toggleBackup: (provider: string) => void;
}

export function Storage({ storage, toggleStorage, toggleBackup }: StorageProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-100">Cloud Storage & Backups</h2>
        <p className="text-zinc-400 mt-1">Configure your cloud providers and end-to-end encryption (E2E) settings.</p>
      </div>

      <div className="bg-zinc-900/50 border border-emerald-900/30 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
          <Shield className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-emerald-400">End-to-End Encryption Active</h3>
          <p className="text-zinc-400 text-sm mt-1 mb-4 max-w-2xl">
            All your watch history, metadata, and adult content tracking are encrypted locally on your device using AES-256 before being synced to your cloud storage providers. Only you hold the key.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-medium transition-colors">
            <Key className="w-4 h-4" />
            Manage Encryption Keys
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {storage.map((s) => (
          <div key={s.provider} className={cn(
            "rounded-2xl border p-6 flex flex-col transition-all",
            s.connected ? "bg-zinc-900 border-zinc-800" : "bg-zinc-900/30 border-zinc-800/50"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-zinc-100">{s.provider}</h4>
              <button 
                onClick={() => toggleStorage(s.provider)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
                  s.connected ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
                )}
              >
                {s.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            {s.connected ? (
              <div className="mt-auto space-y-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Auto Backup</span>
                  <button 
                    onClick={() => toggleBackup(s.provider)}
                    className={cn(
                      "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                      s.autoBackup ? "bg-emerald-500" : "bg-zinc-700"
                    )}
                  >
                    <span className={cn("inline-block h-3 w-3 transform rounded-full bg-white transition-transform", s.autoBackup ? "translate-x-5" : "translate-x-1")} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-sm text-zinc-400">
                  <span>Frequency</span>
                  <span className="capitalize text-zinc-300">{s.backupInterval}</span>
                </div>
                
                {s.lastBackup && (
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>Last backup</span>
                    <span>{s.lastBackup}</span>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors">
                    <UploadCloud className="w-4 h-4" />
                    Backup Now
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors">
                    <DownloadCloud className="w-4 h-4" />
                    Restore
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-auto pt-4 flex items-center gap-2 text-sm text-zinc-500">
                <ShieldAlert className="w-4 h-4" />
                Connect to enable encrypted backups
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
