export type IntegrationCategory = 
  | 'Anime Films & TV Series'
  | 'TV Series'
  | 'Films'
  | 'Adult';

export interface Integration {
  id: string;
  name: string;
  categories: IntegrationCategory[];
  description: string;
  connected: boolean;
  status: 'active' | 'error' | 'syncing' | 'idle';
  lastSync?: string;
  color: string;
}

export type StorageProvider = 'Google Drive' | 'OneDrive' | 'Dropbox';

export interface StorageConfig {
  provider: StorageProvider;
  connected: boolean;
  lastBackup?: string;
  autoBackup: boolean;
  backupInterval: 'hourly' | 'daily' | 'weekly';
  encryptionEnabled: boolean;
  encryptionKeySet: boolean;
}

export interface LogItem {
  id: number;
  type: 'sync' | 'backup' | 'error';
  service: string;
  detail: string;
  time: string;
  status: 'success' | 'error';
}

export interface SyncStats {
  totalItems: number;
  lastSyncTime: string;
  activeIntegrations: number;
  pendingChanges: number;
}

export type MediaType = 'anime' | 'tv' | 'movie' | 'asian_drama' | 'adult';
export type WatchStatus = 'watched' | 'unwatched' | 'in_progress';
export type Theme = 'dark' | 'light' | 'cyberpunk' | 'dracula' | 'nord';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  status: WatchStatus;
  genres: string[];
  releaseYear: number;
  rating: number; // 0-100
  platforms: string[]; // ['Plex', 'AniList', 'Trakt']
  posterUrl?: string; // Optional image URL
  progress?: number; // 0-100 percentage
  description?: string;
  lastUpdated?: string;
}
