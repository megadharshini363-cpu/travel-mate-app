import React, { useState, useMemo } from 'react';
import { Destination, Language, TravelType } from '../types';
import { translations } from '../i18n/translations';
import { destinationsData } from '../data/destinations';
import {
  Search,
  Star,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Filter,
  X,
  Flame,
  Coffee,
  Coins,
  ThumbsUp,
  Navigation,
} from 'lucide-react';

interface HomeDashboardProps {
  currentLanguage: Language;
  travelType: TravelType;
  onSelectDestination: (dest: Destination) => void;
  onOpenTripPlanner: (dest?: Destination) => void;
  onOpenPackages: (dest?: Destination) => void;
  onOpenCaretakers: () => void;
  onOpenGroupCommunity: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  currentLanguage,
  travelType,
  onSelectDestination,
  onOpenTripPlanner,
  onOpenPackages,
  onOpenCaretakers,
  onOpenGroupCommunity,
}) => {
  const t = translations[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterTag, setSelectedFilterTag] = useState<string>('all');

  // Filter destinations based on search query
  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    return destinationsData.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        (d.nameLocal &&
          Object.values(d.nameLocal).some((loc) => loc?.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  // Section 1: Popular Destinations (Strictly Tamil Nadu)
  const popularDestinations = useMemo(() => {
    return destinationsData.filter((d) => d.category === 'popular');
  }, []);

  // Section 2: Hidden Areas & Hidden Spots (Immediately after Popular Destinations!)
  const hiddenAreas = useMemo(() => {
    return destinationsData.filter((d) => d.category === 'hidden');
  }, []);

  // Section 3: Trending Tourist Places
  const trendingPlaces = useMemo(() => {
    return destinationsData.filter(
      (d) => d.category === 'trending' || d.tags.includes('Trending') || d.id === 'coimbatore' || d.id === 'madurai'
    );
  }, []);

  // Section 4: Weekend Getaways
  const weekendGetaways = useMemo(() => {
    return destinationsData.filter(
      (d) => d.category === 'weekend' || d.tags.includes('Weekend Getaway') || d.id === 'yercaud' || d.id === 'mahabalipuram'
    );
  }, []);

  // Section 5: Budget-Friendly Trips
  const budgetFriendlyTrips = useMemo(() => {
    return destinationsData.filter(
      (d) => d.category === 'budget' || d.tags.includes('Budget Friendly') || d.id === 'hogenakkal' || d.id === 'kolli-hills'
    );
  }, []);

  // Section 6: Recommended For You (Personalized dynamically based on Solo / Family / Group travel type)
  const recommendedForYou = useMemo(() => {
    if (travelType === 'solo') {
      return destinationsData.filter((d) =>
        ['kolli-hills', 'ooty', 'valparai', 'dhanushkodi'].includes(d.id)
      );
    } else if (travelType === 'family') {
      return destinationsData.filter((d) =>
        ['kodaikanal', 'madurai', 'mahabalipuram', 'thanjavur'].includes(d.id)
      );
    } else {
      return destinationsData.filter((d) =>
        ['kolli-hills', 'valparai', 'rameshwaram', 'pichavaram'].includes(d.id)
      );
    }
  }, [travelType]);

  // Section 7: Nearby Attractions / Explore Next
  const nearbyAttractions = useMemo(() => {
    return destinationsData.filter((d) =>
      ['pichavaram', 'chettinad', 'megamalai', 'yercaud'].includes(d.id)
    );
  }, []);

  // Renders a Destination Card matching exact specification:
  // - Destination image
  // - City and state
  // - Short description
  // - Estimated travel cost
  // - Rating
  // - Explore button
  const renderDestinationCard = (dest: Destination, isHiddenBadge: boolean = false) => {
    const localizedName = dest.nameLocal?.[currentLanguage] || dest.name;

    return (
      <div
        key={dest.id}
        className="shrink-0 w-[270px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-teal-500/50 transition-all duration-300 group"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {isHiddenBadge ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                💎 Hidden Gem
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-teal-500/90 backdrop-blur-md text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                ★ Popular
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1 border border-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{dest.rating}</span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3">
            <div className="text-[11px] font-medium text-teal-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-400" />
              <span>{dest.city}, {dest.state}</span>
            </div>
            <h3 className="font-extrabold text-white text-base leading-tight truncate">
              {localizedName}
            </h3>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {dest.description}
          </p>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {t.cost}
              </span>
              <span className="text-xs font-bold text-teal-300">
                {dest.estimatedCost}
              </span>
            </div>

            <button
              onClick={() => onSelectDestination(dest)}
              type="button"
              className="py-1.5 px-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 shadow-md shadow-teal-500/20 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>{t.explore}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 max-w-md mx-auto">
      {/* Hero Search Section */}
      <div className="p-4 pt-3 pb-2 sticky top-[57px] z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Badges & Shortcuts */}
      <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => onOpenTripPlanner()}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/40 text-teal-300 font-bold hover:bg-teal-500/30 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>AI Smart Trip Planner</span>
        </button>

        <button
          onClick={onOpenCaretakers}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:border-slate-700 transition-all"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local Caretakers</span>
        </button>

        {travelType === 'group' && (
          <button
            onClick={onOpenGroupCommunity}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold"
          >
            <span>Group Community</span>
          </button>
        )}
      </div>

      {/* Search Results Display if active */}
      {filteredSearchResults !== null ? (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-200">
              Search Results ({filteredSearchResults.length})
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-teal-400 font-medium hover:underline"
            >
              Clear Search
            </button>
          </div>

          {filteredSearchResults.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-900 rounded-3xl border border-slate-800">
              <Compass className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">
                No Tamil Nadu destinations found for "{searchQuery}"
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for Ooty, Madurai, Kolli Hills, Valparai, or Pichavaram.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredSearchResults.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex gap-3 cursor-pointer hover:border-teal-500/50 transition-all"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-teal-400 font-medium">
                          {dest.city}, {dest.state}
                        </span>
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-0.5">
                          ★ {dest.rating}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        {dest.nameLocal?.[currentLanguage] || dest.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {dest.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800">
                      <span className="text-[11px] font-semibold text-teal-300">
                        {dest.estimatedCost}
                      </span>
                      <span className="text-[11px] font-bold text-teal-400 flex items-center gap-1">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* STANDARD ORDERED DASHBOARD SECTIONS */
        <div className="space-y-6 mt-2">
          {/* ========================================================
              SECTION 1: Popular Destinations (Strictly Tamil Nadu)
              ======================================================== */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{t.popularDestinations}</span>
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                </h2>
                <p className="text-[11px] text-slate-400">
                  Iconic temples, queens of hill stations, and heritage coasts
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
              {popularDestinations.map((dest) => renderDestinationCard(dest, false))}
            </div>
          </section>

          {/* ========================================================
              SECTION 2: Hidden Areas (Strictly immediately after Popular!)
              ======================================================== */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{t.hiddenAreas}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
                    Unexplored
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Lesser-known serene spots away from crowded tourist circuits
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
              {hiddenAreas.map((dest) => renderDestinationCard(dest, true))}
            </div>
          </section>

          {/* ========================================================
              SECTION 3: Trending Tourist Places
              ======================================================== */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{t.trendingPlaces}</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Top trending spiritual centers and cultural wonders
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
              {trendingPlaces.map((dest) => renderDestinationCard(dest, dest.category === 'hidden'))}
            </div>
          </section>

          {/* ========================================================
              SECTION 4: Weekend Getaways
              ======================================================== */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-cyan-400" />
                  <span>{t.weekendGetaways}</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Quick 1-2 day refreshing retreats across Tamil Nadu
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
              {weekendGetaways.map((dest) => renderDestinationCard(dest, dest.category === 'hidden'))}
            </div>
          </section>

          {/* ========================================================
              SECTION 5: Budget-Friendly Trips
              ======================================================== */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>{t.budgetFriendly}</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  High experience adventures under ₹3,000 per person
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
              {budgetFriendlyTrips.map((dest) => renderDestinationCard(dest, dest.category === 'hidden'))}
            </div>
          </section>

          {/* ========================================================
              SECTION 6: Recommended For You
              ======================================================== */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-teal-400" />
                  <span>{t.recommendedForYou}</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Curated for your current <strong className="text-teal-300 capitalize">{travelType}</strong> travel style
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
              {recommendedForYou.map((dest) => renderDestinationCard(dest, dest.category === 'hidden'))}
            </div>
          </section>

          {/* ========================================================
              SECTION 7: Nearby Attractions
              ======================================================== */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>{t.nearbyAttractions}</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Hidden sanctuaries and coastal escapes to visit next
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar">
              {nearbyAttractions.map((dest) => renderDestinationCard(dest, dest.category === 'hidden'))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
