import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Moon, Bell, Shield, Key, HardDrive, CheckCircle2, XCircle, Palette } from 'lucide-react';
import { StorageConfig, Theme } from '../types';

interface SettingsProps {
  storage: StorageConfig[];
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function Settings({ storage, theme, onThemeChange }: SettingsProps) {
  const [masterKey, setMasterKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  const handleSaveKey = () => {
    if (masterKey.trim()) {
      setIsKeySaved(true);
      setTimeout(() => setIsKeySaved(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-100">Settings</h2>
        <p className="text-zinc-400 mt-1">Configure your plugin preferences, appearance, encryption, and notifications.</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Encryption Sub-panel */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Key className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-100">End-to-End Encryption</h3>
                <p className="text-sm text-zinc-400">Manage your master encryption keys for cloud backups (AES-256).</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">Master Encryption Key</label>
                <div className="flex gap-3">
                  <input
                    type="password"
                    value={masterKey}
                    onChange={(e) => setMasterKey(e.target.value)}
                    placeholder="Enter a strong passphrase..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                  <button 
                    onClick={handleSaveKey}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium text-sm rounded-xl transition-colors whitespace-nowrap"
                  >
                    {isKeySaved ? 'Saved!' : 'Save Key'}
                  </button>
                </div>
                <p className="text-xs text-zinc-500">This key never leaves your device. If you lose it, you cannot decrypt your backups.</p>
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <h4 className="text-sm font-medium text-zinc-300 mb-3">Provider Encryption Status</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {storage.map(s => (
                    <div key={s.provider} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <HardDrive className="w-4 h-4 text-zinc-500" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-zinc-200">{s.provider}</p>
                        <p className="text-[10px] text-zinc-500">{s.connected ? 'Connected' : 'Disconnected'}</p>
                      </div>
                      {s.encryptionKeySet ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400/50" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-800 rounded-xl">
                <Globe className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-100">Localization</h3>
                <p className="text-sm text-zinc-400">Choose your preferred language for the dashboard.</p>
              </div>
            </div>
            <div className="mt-6">
              <select className="w-full md:w-64 bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="ko">한국어 (Korean)</option>
                <option value="zh">中文 (Chinese)</option>
              </select>
            </div>
          </div>

          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-800 rounded-xl">
                <Palette className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-100">Theme Engine</h3>
                <p className="text-sm text-zinc-400">Choose your preferred visual aesthetic.</p>
              </div>
            </div>
            <div className="mt-6">
              <select 
                value={theme}
                onChange={(e) => onThemeChange(e.target.value as Theme)}
                className="w-full md:w-64 bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none"
              >
                <option value="dark">Dark Mode (Default)</option>
                <option value="light">Light Mode</option>
                <option value="cyberpunk">Cyberpunk</option>
                <option value="dracula">Dracula</option>
                <option value="nord">Nord</option>
              </select>
            </div>
          </div>

          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-800 rounded-xl">
                  <Shield className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-zinc-100">Adult Content Tracking</h3>
                  <p className="text-sm text-zinc-400">Enable local metadata syncing for adult content (Stash, Whisparr).</p>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-700">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-800 rounded-xl">
                  <Bell className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-zinc-100">Sync Notifications</h3>
                  <p className="text-sm text-zinc-400">Show browser notifications for backup and sync errors.</p>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
