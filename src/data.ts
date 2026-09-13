import { Integration, StorageConfig, MediaItem, LogItem } from './types';

export const INITIAL_INTEGRATIONS: Integration[] = [
  { id: 'anilist', name: 'AniList', categories: ['Anime Films & TV Series'], description: 'Anime and manga tracking', connected: true, status: 'active', lastSync: '10 mins ago', color: '#02a9ff' },
  { id: 'mal', name: 'MyAnimeList', categories: ['Anime Films & TV Series'], description: 'Anime and manga database', connected: false, status: 'idle', color: '#2e51a2' },
  { id: 'kitsu', name: 'Kitsu', categories: ['Anime Films & TV Series'], description: 'Social anime tracker', connected: false, status: 'idle', color: '#e75e45' },
  { id: 'simkl', name: 'Simkl', categories: ['Anime Films & TV Series', 'TV Series', 'Films'], description: 'Track TV, Anime, and Movies', connected: false, status: 'idle', color: '#e24040' },
  { id: 'plex', name: 'Plex', categories: ['Anime Films & TV Series', 'TV Series', 'Films', 'Adult'], description: 'Local media streaming server', connected: false, status: 'idle', color: '#e5a00d' },
  { id: 'emby', name: 'Emby', categories: ['Anime Films & TV Series', 'TV Series', 'Films', 'Adult'], description: 'Open media server', connected: false, status: 'idle', color: '#52b54b' },
  { id: 'jellyfin', name: 'Jellyfin', categories: ['Anime Films & TV Series', 'TV Series', 'Films', 'Adult'], description: 'Free software media system', connected: false, status: 'idle', color: '#00a4dc' },
  { id: 'tautulli', name: 'Tautulli', categories: ['Anime Films & TV Series', 'TV Series', 'Films', 'Adult'], description: 'Plex monitoring and tracking', connected: false, status: 'idle', color: '#e47d17' },
  { id: 'trakt', name: 'Trakt', categories: ['Anime Films & TV Series', 'TV Series', 'Films'], description: 'Automatically track what you watch', connected: true, status: 'active', lastSync: '10 mins ago', color: '#ed1c24' },
  { id: 'tmdb', name: 'TMDB', categories: ['Anime Films & TV Series', 'Films'], description: 'The Movie Database', connected: false, status: 'idle', color: '#01b4e4' },
  { id: 'tvdb', name: 'TVDB', categories: ['Anime Films & TV Series', 'TV Series'], description: 'TheTVDB community database', connected: false, status: 'idle', color: '#2b90d9' },
  { id: 'imdb', name: 'IMDb', categories: ['Anime Films & TV Series', 'TV Series', 'Films'], description: 'Internet Movie Database', connected: false, status: 'idle', color: '#f5c518' },
  { id: 'mdb', name: 'MBD', categories: ['Anime Films & TV Series', 'Films'], description: 'Media database integrations', connected: false, status: 'idle', color: '#a55eea' },
  { id: 'sonarr', name: 'Sonarr', categories: ['TV Series'], description: 'Smart PVR for newsgroup and bittorrent users', connected: false, status: 'idle', color: '#32c1e8' },
  { id: 'radarr', name: 'Radarr', categories: ['Films'], description: 'A fork of Sonarr to work with movies', connected: false, status: 'idle', color: '#ffc230' },
  { id: 'whisparr', name: 'Whisparr', categories: ['Adult'], description: 'Adult content automation', connected: false, status: 'idle', color: '#d9396a' },
  { id: 'stash', name: 'Stash', categories: ['Adult'], description: 'An organizer for your adult content', connected: false, status: 'idle', color: '#563d7c' },
];

export const INITIAL_STORAGE: StorageConfig[] = [
  { provider: 'Google Drive', connected: true, autoBackup: true, backupInterval: 'daily', encryptionEnabled: true, encryptionKeySet: true, lastBackup: '2 hours ago' },
  { provider: 'Dropbox', connected: false, autoBackup: false, backupInterval: 'daily', encryptionEnabled: true, encryptionKeySet: false },
  { provider: 'OneDrive', connected: false, autoBackup: false, backupInterval: 'daily', encryptionEnabled: true, encryptionKeySet: false },
];

export const INITIAL_MEDIA = [];
