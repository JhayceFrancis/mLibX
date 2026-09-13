import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { Integrations } from './components/Integrations';
import { Storage } from './components/Storage';
import { Settings } from './components/Settings';
import { History } from './components/History';
import { Library } from './components/Library';
import { ExtensionPopup } from './components/ExtensionPopup';
import { INITIAL_STORAGE } from './data';
import { TabId } from './utils';
import { Puzzle } from 'lucide-react';
import { MediaType, LogItem, Integration, MediaItem, Theme } from './types';
import { getIntegrations, getMedia, getLogs, updateIntegration } from './lib/db';
import { syncIntegration } from './lib/engine';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  
  // Storage stays local to this component for now as it's UI preferences
  const [storage, setStorage] = useState(INITIAL_STORAGE);
  
  // IndexedDB State
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('mlibx-theme') as Theme) || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mlibx-theme', theme);
  }, [theme]);

  useEffect(() => {
    loadRealData();
  }, []);

  const loadRealData = async () => {
    setIntegrations(await getIntegrations());
    setMedia(await getMedia());
    setLogs(await getLogs());
  };

  const stats = {
    totalItems: media.length,
    movies: media.filter(m => m.type === 'movie').length,
    shows: media.filter(m => m.type === 'tv' || m.type === 'asian_drama' || m.type === 'anime').length,
    lastSyncTime: logs.length > 0 ? 'Recently' : 'Never',
    activeIntegrations: integrations.filter(i => i.connected).length,
    pendingChanges: 0,
  };

  const connectIntegration = async (id: string, apiKey: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;
    
    const updated = { ...integration, connected: true, status: 'active' as const, lastSync: new Date().toISOString() };
    await updateIntegration(updated);
    await loadRealData(); // Refresh UI
  };

  const disconnectIntegration = async (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;
    
    const updated = { ...integration, connected: false, status: 'idle' as const, lastSync: undefined };
    await updateIntegration(updated);
    await loadRealData(); // Refresh UI
  };

  const triggerSync = async (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;

    // Set optimistic UI state to 'syncing'
    setIntegrations(prev => prev.map(item =>
      item.id === id ? { ...item, status: 'syncing' } : item
    ));

    // Call REAL API engine
    await syncIntegration(integration);
    
    // Pull fresh data from IndexedDB
    await loadRealData();
  };

  const toggleStorage = (provider: string) => {
    setStorage(prev => prev.map(item => {
      if (item.provider === provider) {
        return { ...item, connected: !item.connected };
      }
      return item;
    }));
  };

  const toggleBackup = (provider: string) => {
    setStorage(prev => prev.map(item => {
      if (item.provider === provider) {
        return { ...item, autoBackup: !item.autoBackup };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 relative">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Simulated Browser Extension Toolbar */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <button 
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-sm font-medium text-zinc-300 shadow-lg transition-colors group"
        >
          <Puzzle className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
          Extension Popup
        </button>
        
        <ExtensionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
      
      <main className="pl-64 min-h-screen pt-12">
        <div className="max-w-6xl mx-auto p-8 lg:p-12">
          {activeTab === 'overview' && (
            <Overview stats={stats} integrations={integrations} storage={storage} />
          )}
          
          {activeTab === 'library' && (
            <Library initialMedia={media} />
          )}
          
          {activeTab === 'integrations' && (
            <Integrations 
              integrations={integrations} 
              connectIntegration={connectIntegration} 
              disconnectIntegration={disconnectIntegration} 
              triggerSync={triggerSync}
            />
          )}
          
          {activeTab === 'storage' && (
            <Storage storage={storage} toggleStorage={toggleStorage} toggleBackup={toggleBackup} />
          )}
          
          {activeTab === 'history' && (
            <History logs={logs} />
          )}
          
          {activeTab === 'settings' && (
            <Settings storage={storage} theme={theme} onThemeChange={setTheme} />
          )}
        </div>
      </main>
    </div>
  );
}
