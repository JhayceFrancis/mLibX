import { addMediaBatch, addLog, updateIntegration } from './db';
import { MediaItem, Integration } from '../types';

export async function syncIntegration(integration: Integration): Promise<boolean> {
  try {
    if (integration.id === 'anilist') {
      await syncAniList(integration);
    } else if (integration.id === 'tvdb' || integration.id === 'tmdb' || integration.id === 'trakt') {
      // Using TVMaze as a free real-world stand-in for general tracker API tests
      await syncTVMaze(integration);
    } else {
      // Fallback for providers not strictly implemented in this real-world demo
      await addLog({
        id: Date.now(),
        type: 'error',
        service: integration.name,
        detail: `No real-world public API route currently mapped for ${integration.name}.`,
        time: new Date().toISOString(),
        status: 'error'
      });
      return false;
    }
    
    // Update integration status on success
    await updateIntegration({
      ...integration,
      status: 'active',
      lastSync: new Date().toISOString()
    });
    return true;
  } catch (error: any) {
    await addLog({
      id: Date.now(),
      type: 'error',
      service: integration.name,
      detail: error.message || 'Sync failed due to a network or API error.',
      time: new Date().toISOString(),
      status: 'error'
    });
    
    await updateIntegration({
      ...integration,
      status: 'error'
    });
    return false;
  }
}

// REAL GRAPHQL API CALL TO ANILIST
async function syncAniList(integration: Integration) {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title { romaji english }
          status
          averageScore
          genres
          description
          seasonYear
        }
      }
    }
  `;

  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ query })
  });

  if (!res.ok) throw new Error('AniList API rejected the request.');
  
  const json = await res.json();
  const mediaList = json.data.Page.media;

  const newItems: MediaItem[] = mediaList.map((item: any) => ({
    id: `anilist_${item.id}`,
    title: item.title.english || item.title.romaji,
    type: 'anime',
    status: 'unwatched', // Default mapped
    genres: item.genres,
    releaseYear: item.seasonYear || new Date().getFullYear(),
    rating: item.averageScore || 0,
    platforms: [integration.name],
    progress: 0,
    description: item.description?.replace(/<[^>]*>?/gm, '') || 'No description provided.',
    lastUpdated: new Date().toISOString()
  }));

  await addMediaBatch(newItems);
  
  await addLog({
    id: Date.now(),
    type: 'sync',
    service: integration.name,
    detail: `Successfully processed & stored ${newItems.length} trending items from AniList.`,
    time: new Date().toISOString(),
    status: 'success'
  });
}

// REAL REST API CALL TO TVMAZE
async function syncTVMaze(integration: Integration) {
  const res = await fetch('https://api.tvmaze.com/shows');
  if (!res.ok) throw new Error('TVMaze API rejected the request.');
  
  const json = await res.json();
  // Limit to top 10 for performance in sync test
  const mediaList = json.slice(0, 10);

  const newItems: MediaItem[] = mediaList.map((item: any) => ({
    id: `tvmaze_${item.id}`,
    title: item.name,
    type: 'tv',
    status: 'unwatched',
    genres: item.genres,
    releaseYear: item.premiered ? parseInt(item.premiered.substring(0, 4)) : new Date().getFullYear(),
    rating: item.rating?.average ? item.rating.average * 10 : 0, // convert 10-point to 100-point
    platforms: [integration.name],
    progress: 0,
    description: item.summary?.replace(/<[^>]*>?/gm, '') || 'No description provided.',
    lastUpdated: new Date().toISOString()
  }));

  await addMediaBatch(newItems);

  await addLog({
    id: Date.now(),
    type: 'sync',
    service: integration.name,
    detail: `Successfully processed & stored ${newItems.length} shows via public metadata API.`,
    time: new Date().toISOString(),
    status: 'success'
  });
}
