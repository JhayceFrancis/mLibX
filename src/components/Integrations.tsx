import React, { useMemo, useState } from 'react';
import { Integration, IntegrationCategory } from '../types';
import { cn } from '../utils';
import { Check, Link, RefreshCcw, AlertTriangle, X, ShieldCheck } from 'lucide-react';

interface IntegrationsProps {
  integrations: Integration[];
  connectIntegration: (id: string, apiKey: string) => void;
  disconnectIntegration: (id: string) => void;
  triggerSync: (id: string) => void;
}

const ALL_CATEGORIES: IntegrationCategory[] = [
  'Anime Films & TV Series',
  'TV Series',
  'Films',
  'Adult'
];

export function Integrations({ integrations, connectIntegration, disconnectIntegration, triggerSync }: IntegrationsProps) {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [authKey, setAuthKey] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<IntegrationCategory, Integration[]>();
    ALL_CATEGORIES.forEach(cat => map.set(cat, []));

    integrations.forEach(item => {
      item.categories.forEach(cat => {
        if (map.has(cat)) {
          map.get(cat)!.push(item);
        }
      });
    });
    return map;
  }, [integrations]);

  const handleConnectClick = (item: Integration) => {
    if (item.connected) {
      disconnectIntegration(item.id);
    } else {
      setSelectedIntegration(item);
      setAuthKey('');
      setAuthError(null);
    }
  };

  const handleValidateHandshake = async () => {
    if (!authKey.trim()) {
      setAuthError('API Key or Token is required');
      return;
    }
    
    setIsAuthenticating(true);
    setAuthError(null);
    
    // Simulate handshake and payload validation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (authKey === 'fail') {
      setAuthError('Authentication failed. Invalid payload response.');
      setIsAuthenticating(false);
      return;
    }

    connectIntegration(selectedIntegration!.id, authKey);
    setIsAuthenticating(false);
    setSelectedIntegration(null);
    setAuthKey('');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12 relative">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-100">Service Integrations</h2>
        <p className="text-zinc-400 mt-1">Connect your media servers and trackers for cross-platform synchronization.</p>
      </div>

      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-300 border-b border-zinc-800 pb-2">{category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <div 
                key={`${category}-${item.id}`} 
                className={cn(
                  "relative group rounded-2xl p-5 border transition-all duration-200",
                  item.connected 
                    ? "bg-zinc-900 border-zinc-700 hover:border-zinc-600" 
                    : "bg-zinc-950 border-zinc-800/60 hover:bg-zinc-900/50"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                      style={{ backgroundColor: `${item.color}20`, color: item.color }}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-100">{item.name}</h4>
                      <p className="text-xs text-zinc-500 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    {item.connected ? (
                      <>
                        {item.status === 'active' && <span className="flex h-2 w-2 rounded-full bg-emerald-500" />}
                        {item.status === 'syncing' && <RefreshCcw className="w-3 h-3 text-blue-400 animate-spin" />}
                        {item.status === 'error' && <AlertTriangle className="w-3 h-3 text-red-400" />}
                        <span className="text-zinc-400">
                          {item.status === 'active' ? `Synced ${item.lastSync}` : item.status}
                        </span>
                      </>
                    ) : (
                      <span className="text-zinc-600">Not connected</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.connected && (
                      <button
                        onClick={() => triggerSync(item.id)}
                        disabled={item.status === 'syncing'}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <RefreshCcw className={cn("w-3 h-3", item.status === 'syncing' && "animate-spin")} />
                        Sync
                      </button>
                    )}
                    <button
                      onClick={() => handleConnectClick(item)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        item.connected 
                          ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                          : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      )}
                    >
                      {item.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Authentication Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: `${selectedIntegration.color}20`, color: selectedIntegration.color }}
                >
                  {selectedIntegration.name.charAt(0)}
                </div>
                <h3 className="font-medium text-zinc-100">Connect to {selectedIntegration.name}</h3>
              </div>
              <button 
                onClick={() => !isAuthenticating && setSelectedIntegration(null)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                disabled={isAuthenticating}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-zinc-400">
                Please enter your API Key or OAuth Token for {selectedIntegration.name} to establish a secure handshake.
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">API Key / Token</label>
                <input
                  type="password"
                  value={authKey}
                  onChange={(e) => setAuthKey(e.target.value)}
                  placeholder="e.g. 1a2b3c4d5e6f7g8h9i0j"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  disabled={isAuthenticating}
                />
                {authError && (
                  <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {authError}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-zinc-800 bg-zinc-900/50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedIntegration(null)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                disabled={isAuthenticating}
              >
                Cancel
              </button>
              <button 
                onClick={handleValidateHandshake}
                disabled={isAuthenticating || !authKey}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-colors",
                  isAuthenticating 
                    ? "bg-emerald-500/50 text-emerald-100 cursor-not-allowed" 
                    : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    Validating Handshake...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Connect & Validate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
