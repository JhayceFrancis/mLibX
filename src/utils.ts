import React from 'react';
import { Settings, Cloud, Link, LayoutDashboard, History, Shield, Globe, Library as LibraryIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'library', label: 'Media Library', icon: LibraryIcon },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'storage', label: 'Cloud Storage & E2E', icon: Cloud },
  { id: 'history', label: 'Sync History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;

export type TabId = typeof SIDEBAR_ITEMS[number]['id'];
