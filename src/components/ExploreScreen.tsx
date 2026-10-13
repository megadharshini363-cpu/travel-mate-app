import React, { useState, useMemo } from 'react';
import { Destination, Language, TravelType } from '../types';
import { translations } from '../i18n/translations';
import { destinationsData } from '../data/destinations';
import { Search, MapPin, Star, Filter, ArrowRight, Compass } from 'lucide-react';

interface ExploreScreenProps {
  currentLanguage: Language;
  onSelectDestination: (dest: Destination) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  currentLanguage,
  onSelectDestination,
}) => {
  const t = translations[currentLanguage];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Places' },
    { id: 'popular', label: 'Popular' },
    { id: 'hidden', label: 'Hidden Gems' },
    { id: 'hill', label: 'Hill Stations' },
    { id: 'temple', label: 'Temples & Heritage' },
    { id: 'nature', label: 'Nature & Falls' },
  ];

  const filtered = useMemo(() => {
    return destinationsData.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.city.toLowerCase().includes(search.toLowerCase()) ||
        d.district.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'popular') return d.category === 'popular';
      if (selectedCategory === 'hidden') return d.category === 'hidden';
      if (selectedCategory === 'hill')
        return d.tags.some((t) => t.toLowerCase().includes('hill'));
      if (selectedCategory === 'temple')
        return (
          d.tags.some((t) => t.toLowerCase().includes('temple')) ||
          d.tags.some((t) => t.toLowerCase().includes('heritage'))
        );
      if (selectedCategory === 'nature')
        return (
          d.tags.some((t) => t.toLowerCase().includes('waterfall')) ||
          d.tags.some((t) => t.toLowerCase().includes('nature'))
        );
      return true;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 max-w-md mx-auto p-4">
      <div className="pt-2 pb-4">
        <h1 className="text-xl font-extrabold text-white">
          Explore Tamil Nadu
        </h1>
        <p className="text-xs text-slate-400">
          Discover all 38 districts, heritage towns & virgin landscapes
        </p>

        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, district, temple or hill station..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      <div className="space-y-4">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest)}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:border-teal-500/50 transition-all shadow-md group"
          >
            <div className="relative h-44">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute top-3 left-3 flex gap-1.5">
                {dest.category === 'hidden' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase shadow">
                    Hidden Gem
                  </span>
                )}
                {dest.category === 'popular' && (
                  <span className="px-2 py-0.5 rounded-full bg-teal-500 text-slate-950 text-[10px] font-black uppercase shadow">
                    Popular
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1 border border-slate-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{dest.rating}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[11px] text-teal-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>{dest.city}, {dest.state}</span>
                </div>
                <h3 className="font-extrabold text-white text-base truncate">
                  {dest.nameLocal?.[currentLanguage] || dest.name}
                </h3>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Est. Cost
                </span>
                <span className="text-xs font-bold text-teal-300">
                  {dest.estimatedCost}
                </span>
              </div>

              <button
                type="button"
                className="py-1.5 px-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 flex items-center gap-1"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
