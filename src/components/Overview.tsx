import React from 'react';
import { Activity, Tv, Film, Link as LinkIcon, RefreshCcw, Database, HardDrive, CheckCircle2 } from 'lucide-react';
import { Integration, StorageConfig, SyncStats } from '../types';

interface OverviewProps {
  stats: SyncStats;
  integrations: Integration[];
  storage: StorageConfig[];
}

export function Overview({ stats, integrations, storage }: OverviewProps) {
  const activeIntegrations = integrations.filter(i => i.connected);
  const activeStorage = storage.filter(s => s.connected);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-100">Dashboard Overview</h2>
        <p className="text-zinc-400 mt-1">Real-time status of your cross-platform media synchronization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Total Items Tracked</h3>
            <Database className="w-4 h-4 text-zinc-500" />
          </div>
          <p className="text-3xl font-semibold text-zinc-100 mt-2">{stats.totalItems.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-4 text-xs text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Up to date</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Active Integrations</h3>
            <LinkIcon className="w-4 h-4 text-zinc-500" />
          </div>
          <p className="text-3xl font-semibold text-zinc-100 mt-2">{activeIntegrations.length}</p>
          <div className="flex items-center gap-2 mt-4 text-xs text-zinc-400">
            <span>Across {new Set(activeIntegrations.map(i => i.category)).size} categories</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Pending Syncs</h3>
            <RefreshCcw className="w-4 h-4 text-zinc-500" />
          </div>
          <p className="text-3xl font-semibold text-zinc-100 mt-2">{stats.pendingChanges}</p>
          <div className="flex items-center gap-2 mt-4 text-xs text-zinc-400">
            <span>Next sync in 2 mins</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Cloud Storage</h3>
            <HardDrive className="w-4 h-4 text-zinc-500" />
          </div>
          <p className="text-3xl font-semibold text-zinc-100 mt-2">{activeStorage.length}</p>
          <div className="flex items-center gap-2 mt-4 text-xs text-zinc-400">
            <span>E2E Encryption Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-zinc-100 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { id: 1, action: 'Synced watch history', service: 'Trakt ↔ Plex', time: '2 mins ago', icon: Tv, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { id: 2, action: 'Updated Anime progress', service: 'AniList', time: '15 mins ago', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { id: 3, action: 'Cloud Backup Completed', service: 'Google Drive', time: '2 hours ago', icon: HardDrive, color: 'text-purple-400', bg: 'bg-purple-400/10' },
              { id: 4, action: 'New Movie Added', service: 'Radarr', time: '5 hours ago', icon: Film, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            ].map(log => (
              <div key={log.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors">
                <div className={`p-2 rounded-lg ${log.bg} ${log.color}`}>
                  <log.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-200">{log.action}</p>
                  <p className="text-xs text-zinc-500">{log.service}</p>
                </div>
                <span className="text-xs text-zinc-500">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-zinc-100 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 text-zinc-950 hover:bg-emerald-400 rounded-xl text-sm font-medium transition-colors">
              <RefreshCcw className="w-4 h-4" />
              Force Global Sync
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors">
              <HardDrive className="w-4 h-4" />
              Manual Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
