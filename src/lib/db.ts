import { openDB, DBSchema } from 'idb';
import { MediaItem, Integration, LogItem } from '../types';
import { INITIAL_INTEGRATIONS } from '../data';

interface MLibXDB extends DBSchema {
  media: {
    key: string;
    value: MediaItem;
  };
  integrations: {
    key: string;
    value: Integration;
  };
  logs: {
    key: number;
    value: LogItem;
  };
}

let dbPromise: ReturnType<typeof openDB<MLibXDB>> | null = null;

export function initDB() {
  if (!dbPromise) {
    dbPromise = openDB<MLibXDB>('mlibx-store', 1, {
      upgrade(db) {
        db.createObjectStore('media', { keyPath: 'id' });
        db.createObjectStore('integrations', { keyPath: 'id' });
        db.createObjectStore('logs', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

export async function getIntegrations(): Promise<Integration[]> {
  const db = await initDB();
  const items = await db.getAll('integrations');
  if (items.length === 0) {
    // Seed initial integrations if db is empty
    const tx = db.transaction('integrations', 'readwrite');
    for (const i of INITIAL_INTEGRATIONS) {
      tx.store.put(i);
    }
    await tx.done;
    return INITIAL_INTEGRATIONS;
  }
  return items;
}

export async function updateIntegration(integration: Integration) {
  const db = await initDB();
  await db.put('integrations', integration);
}

export async function getMedia(): Promise<MediaItem[]> {
  const db = await initDB();
  return (await db.getAll('media')).sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}

export async function addMediaBatch(items: MediaItem[]) {
  const db = await initDB();
  const tx = db.transaction('media', 'readwrite');
  for (const item of items) {
    tx.store.put(item);
  }
  await tx.done;
}

export async function getLogs(): Promise<LogItem[]> {
  const db = await initDB();
  return (await db.getAll('logs')).sort((a, b) => b.id - a.id);
}

export async function addLog(log: LogItem) {
  const db = await initDB();
  await db.put('logs', log);
}
