import React from 'react';
import { cn, SIDEBAR_ITEMS, TabId } from '../utils';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 pt-8 flex flex-col items-center justify-center text-center overflow-visible">
        <img 
          src="/mLibX.svg" 
          alt="mLibX Logo"
          className="w-full h-16 object-contain object-center scale-150 transition-transform duration-300"
        />
        <div className="flex flex-col items-center gap-1.5 mt-6">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium leading-tight">
            Media Metadata<br/>Library Sync
          </span>
          <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold px-2.5 py-0.5 bg-emerald-500/10 rounded-full">
            Extension v1.0.0
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              activeTab === item.id 
                ? "bg-zinc-800 text-zinc-100" 
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            )}
          >
            <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-emerald-400" : "")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors">
          <LogOut className="w-4 h-4" />
          Lock Dashboard
        </button>
      </div>
    </aside>
  );
}
