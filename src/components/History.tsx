import React from 'react';
import { History as HistoryIcon, Download, Upload, Server, Search } from 'lucide-react';
import { LogItem } from '../types';

interface HistoryProps {
  logs: LogItem[];
}

export function History({ logs }: HistoryProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100">Sync History</h2>
          <p className="text-zinc-400 mt-1">Review recent synchronizations and backup logs.</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-900/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Detail</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {log.type === 'sync' && <Server className="w-4 h-4 text-blue-400" />}
                      {log.type === 'backup' && <Upload className="w-4 h-4 text-purple-400" />}
                      {log.type === 'error' && <HistoryIcon className="w-4 h-4 text-red-400" />}
                      <span className="capitalize text-zinc-300">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-200">
                    {log.service}
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    {log.detail}
                  </td>
                  <td className="px-6 py-4">
                    {log.status === 'success' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-zinc-500">
                    {log.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
