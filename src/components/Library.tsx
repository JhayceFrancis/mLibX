import React, { useState, useMemo } from 'react';
import { Search, Filter, Play, CheckCircle2, Clock, Star, Film, Tv, PlaySquare } from 'lucide-react';
import { MediaItem, MediaType, WatchStatus } from '../types';
import { MetadataAggregator } from '../services/metadataService';
import { cn } from '../utils';

interface LibraryProps {
  initialMedia: MediaItem[];
}

export function Library({ initialMedia }: LibraryProps) {
  const aggregator = useMemo(() => new MetadataAggregator(initialMedia), [initialMedia]);
  
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title_asc' | 'title_desc' | 'rating_desc' | 'year_desc' | 'recently_added'>('recently_added');

  const availableGenres = useMemo(() => aggregator.getAvailableGenres(), [aggregator]);
  const availablePlatforms = useMemo(() => aggregator.getAvailablePlatforms(), [aggregator]);

  const filteredMedia = useMemo(() => {
    return aggregator.searchAndFilter({
      query,
      type: typeFilter,
      status: statusFilter,
      genre: genreFilter,
      platform: platformFilter,
      sortBy
    });
  }, [aggregator, query, typeFilter, statusFilter, genreFilter, platformFilter, sortBy]);

  const getTypeIcon = (type: MediaType) => {
    switch(type) {
      case 'anime': return <PlaySquare className="w-4 h-4" />;
      case 'movie': return <Film className="w-4 h-4" />;
      case 'tv': return <Tv className="w-4 h-4" />;
      case 'asian_drama': return <Tv className="w-4 h-4 text-pink-400" />;
      case 'adult': return <Film className="w-4 h-4 text-purple-400" />;
      default: return <Film className="w-4 h-4" />;
    }
  };

  const getStatusDisplay = (status: WatchStatus) => {
    switch(status) {
      case 'watched': return { icon: CheckCircle2, label: 'Watched', color: 'text-emerald-400' };
      case 'in_progress': return { icon: Play, label: 'Watching', color: 'text-blue-400' };
      case 'unwatched': return { icon: Clock, label: 'Unwatched', color: 'text-zinc-400' };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100">Media Library</h2>
          <p className="text-zinc-400 mt-1">Search, filter, and manage your aggregated media collection.</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by title or description..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Type</label>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Types</option>
              <option value="anime">Anime</option>
              <option value="movie">Movie</option>
              <option value="tv">TV Series</option>
              <option value="asian_drama">Asian Drama</option>
              <option value="adult">Adult</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="watched">Watched</option>
              <option value="in_progress">In Progress</option>
              <option value="unwatched">Unwatched</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Genre</label>
            <select 
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Genres</option>
              {availableGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Platform</label>
            <select 
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Platforms</option>
              {availablePlatforms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Sort By</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="recently_added">Recently Added</option>
              <option value="title_asc">Title (A-Z)</option>
              <option value="title_desc">Title (Z-A)</option>
              <option value="rating_desc">Highest Rated</option>
              <option value="year_desc">Newest Release</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMedia.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-zinc-500">No media items found matching your filters.</p>
          </div>
        )}
        
        {filteredMedia.map(item => {
          const statusMeta = getStatusDisplay(item.status);
          const StatusIcon = statusMeta.icon;

          return (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col h-full">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
                      {getTypeIcon(item.type)}
                      {item.type.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-medium text-zinc-500">{item.releaseYear}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 font-medium text-sm bg-emerald-400/10 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {item.rating}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-zinc-100 leading-tight mb-2">{item.title}</h3>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.genres.map(genre => (
                    <span key={genre} className="text-xs px-2 py-0.5 rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="px-5 pb-5 mt-auto space-y-4">
                {item.status !== 'unwatched' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-500", item.status === 'watched' ? 'bg-emerald-500' : 'bg-blue-500')}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <StatusIcon className={cn("w-4 h-4", statusMeta.color)} />
                    <span className={statusMeta.color}>{statusMeta.label}</span>
                  </div>

                  <div className="flex gap-1">
                    {item.platforms.map((platform, idx) => (
                      <span key={idx} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-400" title={`Synced from ${platform}`}>
                        {platform.substring(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
