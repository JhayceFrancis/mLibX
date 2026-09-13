import { MediaItem } from '../types';

export class MetadataAggregator {
  private mediaItems: MediaItem[] = [];

  constructor(initialData: MediaItem[] = []) {
    this.mediaItems = initialData;
  }

  // Simulate fetching and merging data from different sources
  public aggregate(newData: MediaItem[]) {
    // In a real implementation, this would merge items with the same standard ID (e.g., IMDB ID, AniList ID)
    // Here we just merge by title for simplicity in the simulation
    newData.forEach(newItem => {
      const existingItemIndex = this.mediaItems.findIndex(item => item.title.toLowerCase() === newItem.title.toLowerCase());
      
      if (existingItemIndex !== -1) {
        const existingItem = this.mediaItems[existingItemIndex];
        
        // Merge platforms (unique)
        const mergedPlatforms = Array.from(new Set([...existingItem.platforms, ...newItem.platforms]));
        
        // Use the highest rating (or could average)
        const mergedRating = Math.max(existingItem.rating, newItem.rating);
        
        // Merge genres
        const mergedGenres = Array.from(new Set([...existingItem.genres, ...newItem.genres]));

        this.mediaItems[existingItemIndex] = {
          ...existingItem,
          platforms: mergedPlatforms,
          rating: mergedRating,
          genres: mergedGenres,
          progress: newItem.progress !== undefined ? newItem.progress : existingItem.progress,
          status: newItem.status !== 'unwatched' ? newItem.status : existingItem.status, // Favor in_progress/watched
        };
      } else {
        this.mediaItems.push(newItem);
      }
    });
  }

  public getAll(): MediaItem[] {
    return [...this.mediaItems];
  }

  public searchAndFilter(params: {
    query?: string;
    type?: string;
    status?: string;
    genre?: string;
    platform?: string;
    sortBy?: 'title_asc' | 'title_desc' | 'rating_desc' | 'year_desc' | 'recently_added';
  }): MediaItem[] {
    let results = [...this.mediaItems];

    if (params.query) {
      const lowerQuery = params.query.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery)
      );
    }

    if (params.type && params.type !== 'all') {
      results = results.filter(item => item.type === params.type);
    }

    if (params.status && params.status !== 'all') {
      results = results.filter(item => item.status === params.status);
    }

    if (params.genre && params.genre !== 'all') {
      results = results.filter(item => item.genres.includes(params.genre as string));
    }

    if (params.platform && params.platform !== 'all') {
      results = results.filter(item => item.platforms.includes(params.platform as string));
    }

    switch (params.sortBy) {
      case 'title_asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating_desc':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'year_desc':
        results.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'recently_added':
      default:
        // Mock recent addition sorting by using ID loosely or lastUpdated
        results.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));
        break;
    }

    return results;
  }

  public getAvailableGenres(): string[] {
    const genres = new Set<string>();
    this.mediaItems.forEach(item => item.genres.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
  }

  public getAvailablePlatforms(): string[] {
    const platforms = new Set<string>();
    this.mediaItems.forEach(item => item.platforms.forEach(p => platforms.add(p)));
    return Array.from(platforms).sort();
  }
}
