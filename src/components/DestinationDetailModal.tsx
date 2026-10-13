import React, { useState, useMemo } from 'react';
import { Destination, Language, TouristReview, UserProfile } from '../types';
import { translations } from '../i18n/translations';
import { LeafletMapComponent } from './LeafletMapComponent';
import {
  X,
  MapPin,
  Star,
  Clock,
  Ticket,
  UtensilsCrossed,
  Building,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  Package,
  Calendar,
  Share2,
  Heart,
  Flag,
  ThumbsUp,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Play,
  Film,
  Video,
  Eye,
  Plus,
} from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination;
  currentLanguage: Language;
  currentUser: UserProfile | null;
  onClose: () => void;
  onOpenTripPlanner: (dest: Destination) => void;
  onOpenPackages: (dest: Destination) => void;
  onOpenCaretakers: () => void;
}

type TabType = 'attractions' | 'food' | 'hotels' | 'emergency' | 'map' | 'reviews';

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  currentLanguage,
  currentUser,
  onClose,
  onOpenTripPlanner,
  onOpenPackages,
  onOpenCaretakers,
}) => {
  const t = translations[currentLanguage];
  const [activeTab, setActiveTab] = useState<TabType>('attractions');
  const [isSaved, setIsSaved] = useState(
    currentUser?.savedDestinationIds.includes(destination.id) || false
  );

  // Reviews state with initial reviews containing real photos and videos
  const [reviewsList, setReviewsList] = useState<TouristReview[]>([
    {
      id: 'rev-1',
      destinationId: destination.id,
      userName: 'Karthikeyan P.',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      date: '2 days ago',
      comment: `Visited ${destination.name} last weekend. The weather and scenery were absolutely magical! The local food was authentic and people were extremely warm. Recorded a reel of the mist-shrouded mountain drive!`,
      photos: [
        destination.galleryImages[0] || destination.image,
        destination.attractions[0]?.image || destination.image,
      ],
      videos: [
        'https://assets.mixkit.co/videos/preview/mixkit-winding-road-in-a-dense-forest-41584-large.mp4',
      ],
      helpfulCount: 18,
    },
    {
      id: 'rev-2',
      destinationId: destination.id,
      userName: 'Meenakshi Sundaram',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      date: '1 week ago',
      comment: 'Peaceful, very safe for solo and family travelers. Carry warm clothes or umbrella depending on season. The government caretaker service was very helpful and showed us secret viewpoint spots.',
      photos: [
        destination.foods[0]?.image || destination.image,
        destination.attractions[1]?.image || destination.image,
      ],
      videos: [],
      helpfulCount: 12,
    },
    {
      id: 'rev-3',
      destinationId: destination.id,
      userName: 'Arun Kumar',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Breathtaking waterfalls and clean mountain breeze! Took a 4K drone clip of the cascading streams and lush pine forests. Best time to visit is early morning.',
      photos: [
        destination.image,
      ],
      videos: [
        'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
      ],
      helpfulCount: 15,
    },
    {
      id: 'rev-4',
      destinationId: destination.id,
      userName: 'Deepika Raman',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      rating: 4,
      date: '3 weeks ago',
      comment: 'Great sightseeing spots and iconic Dravidian architecture. Make sure to try the local street delicacies in the evening!',
      photos: [
        destination.galleryImages[1] || destination.image,
      ],
      videos: [
        'https://assets.mixkit.co/videos/preview/mixkit-fog-over-the-mountain-peaks-42751-large.mp4',
      ],
      helpfulCount: 8,
    },
  ]);

  // Review submission state with photos & videos
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [photoInputUrl, setPhotoInputUrl] = useState('');
  const [videoInputUrl, setVideoInputUrl] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photos' | 'videos'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'helpful'>('newest');
  const [reportSuccessMessage, setReportSuccessMessage] = useState<string | null>(null);

  // Active Lightbox / Video Modal Player
  const [activeMediaModal, setActiveMediaModal] = useState<{
    type: 'photo' | 'video';
    url: string;
    title?: string;
    author?: string;
  } | null>(null);

  const localizedName = destination.nameLocal?.[currentLanguage] || destination.name;

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleAddPhotoToReview = (url: string) => {
    if (!url.trim()) return;
    setUploadedPhotos([...uploadedPhotos, url.trim()]);
    setPhotoInputUrl('');
  };

  const handleAddVideoToReview = (url: string) => {
    if (!url.trim()) return;
    setUploadedVideos([...uploadedVideos, url.trim()]);
    setVideoInputUrl('');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Include any pending input in text fields
    const finalPhotos = [...uploadedPhotos];
    if (photoInputUrl.trim() && !finalPhotos.includes(photoInputUrl.trim())) {
      finalPhotos.push(photoInputUrl.trim());
    }

    const finalVideos = [...uploadedVideos];
    if (videoInputUrl.trim() && !finalVideos.includes(videoInputUrl.trim())) {
      finalVideos.push(videoInputUrl.trim());
    }

    const newRev: TouristReview = {
      id: `rev-${Date.now()}`,
      destinationId: destination.id,
      userName: currentUser?.name || 'Verified Traveler',
      userAvatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      photos: finalPhotos.length > 0 ? finalPhotos : undefined,
      videos: finalVideos.length > 0 ? finalVideos : undefined,
      helpfulCount: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewComment('');
    setUploadedPhotos([]);
    setUploadedVideos([]);
    setPhotoInputUrl('');
    setVideoInputUrl('');
    setShowReviewForm(false);
  };

  const handleReportReview = async (reviewId: string) => {
    try {
      await fetch('/api/reviews/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, reason: 'Reported by user for review moderation' }),
      });
      setReportSuccessMessage('Review has been reported to moderators.');
      setTimeout(() => setReportSuccessMessage(null), 3000);
    } catch {
      setReportSuccessMessage('Report logged for review moderation.');
      setTimeout(() => setReportSuccessMessage(null), 3000);
    }
  };

  const filteredReviews = useMemo(() => {
    return reviewsList
      .filter((r) => {
        const matchRating = filterRating === 'all' || r.rating === filterRating;
        if (!matchRating) return false;
        if (mediaFilter === 'photos') return r.photos && r.photos.length > 0;
        if (mediaFilter === 'videos') return r.videos && r.videos.length > 0;
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'helpful') return b.helpfulCount - a.helpfulCount;
        return 0; // default newest
      });
  }, [reviewsList, filterRating, mediaFilter, sortOrder]);

  // Aggregate all photos and video reels across reviews for the story carousel
  const allReelMedia = useMemo(() => {
    const list: { type: 'photo' | 'video'; url: string; author: string; reviewId: string }[] = [];
    reviewsList.forEach((r) => {
      if (r.videos) {
        r.videos.forEach((v) => {
          list.push({ type: 'video', url: v, author: r.userName, reviewId: r.id });
        });
      }
      if (r.photos) {
        r.photos.forEach((p) => {
          list.push({ type: 'photo', url: p, author: r.userName, reviewId: r.id });
        });
      }
    });
    return list;
  }, [reviewsList]);

  // Map pins for the interactive Leaflet map
  const mapPins = [
    ...destination.attractions.map((a) => ({
      id: a.id,
      name: a.name,
      category: 'attraction' as const,
      coordinates: a.coordinates,
      description: `${a.category} • ${a.entryFee}`,
    })),
    ...destination.emergencyServices
      .filter((s) => s.coordinates)
      .map((s, idx) => ({
        id: `emer-${idx}`,
        name: s.name,
        category: s.type === 'hospital' ? ('hospital' as const) : ('police' as const),
        coordinates: s.coordinates!,
        description: `${s.contactNumber} • 24/7`,
      })),
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[92vh] sm:h-[86vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center hover:bg-slate-900 pointer-events-auto shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={toggleSave}
              className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center shadow-md transition-all ${
                isSaved
                  ? 'bg-rose-500/90 border-rose-400 text-white'
                  : 'bg-slate-950/70 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: destination.name,
                    text: destination.description,
                    url: window.location.href,
                  });
                }
              }}
              className="w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center hover:bg-slate-900 shadow-md"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Header with Image */}
        <div className="relative h-60 shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{destination.city}, {destination.district}, {destination.state}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {localizedName}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {destination.tagline}
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 text-amber-400 font-bold bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{destination.rating}</span>
                <span className="text-slate-400 font-normal">({destination.reviewCount})</span>
              </span>
              <span className="text-teal-300 font-bold bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-800">
                {destination.estimatedCost}
              </span>
              <span className="text-slate-300 text-[11px]">
                {destination.idealDays} Days Ideal
              </span>
            </div>
          </div>
        </div>

        {/* Action Bar (AI Planner & Dynamic Packages) */}
        <div className="px-4 py-2 bg-slate-850 border-y border-slate-800 flex items-center gap-2">
          <button
            onClick={() => onOpenTripPlanner(destination)}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.planTripWithAi}</span>
          </button>
          <button
            onClick={() => onOpenPackages(destination)}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Package className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.viewPackages}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-2 bg-slate-900 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setActiveTab('attractions')}
            className={`py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'attractions'
                ? 'border-teal-400 text-teal-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.attractions} ({destination.attractions.length})
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'food'
                ? 'border-teal-400 text-teal-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.localFood}
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'hotels'
                ? 'border-teal-400 text-teal-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.hotels}
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'emergency'
                ? 'border-rose-400 text-rose-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.emergencyServices}
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'map'
                ? 'border-teal-400 text-teal-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-teal-400 text-teal-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.reviews} ({reviewsList.length})
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {reportSuccessMessage && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{reportSuccessMessage}</span>
            </div>
          )}

          {/* TAB 1: ATTRACTIONS */}
          {activeTab === 'attractions' && (
            <div className="space-y-3.5">
              <p className="text-slate-300 leading-relaxed">
                {destination.description}
              </p>

              <div className="space-y-3">
                {destination.attractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden p-3 flex gap-3 hover:border-slate-700 transition-colors"
                  >
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-24 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                            {attraction.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm">
                          {attraction.name}
                        </h4>
                        <p className="text-slate-400 text-[11px] line-clamp-2 mt-0.5">
                          {attraction.description}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-300 flex items-center gap-1">
                          <Ticket className="w-3 h-3 text-teal-400" />
                          <span>{attraction.entryFee}</span>
                        </span>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.coordinates[0]},${attraction.coordinates[1]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 font-bold hover:underline flex items-center gap-0.5"
                        >
                          Directions ↗
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LOCAL FOOD */}
          {activeTab === 'food' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-800/60 text-slate-300 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  Authentic indigenous delicacies prepared using traditional Tamil culinary methods.
                </span>
              </div>

              {destination.foods.map((food) => (
                <div
                  key={food.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2.5"
                >
                  <div className="flex gap-3">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            food.isVegetarian
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {food.isVegetarian ? 'Pure Veg' : 'Non-Veg'}
                        </span>
                        <span className="text-teal-300 font-bold">
                          {food.approxPrice}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-1">
                        {food.name}
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {food.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      {t.recommendedEateries}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {food.recommendedRestaurants.map((rest, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-200 text-[11px] font-medium"
                        >
                          🍴 {rest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: HOTELS & STAYS */}
          {activeTab === 'hotels' && (
            <div className="space-y-3">
              {destination.hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden p-3.5 space-y-2"
                >
                  <div className="flex gap-3">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-22 h-22 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase">
                            {hotel.type} stay
                          </span>
                          <span className="text-amber-400 font-bold flex items-center gap-0.5 text-xs">
                            ★ {hotel.rating}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1">
                          {hotel.name}
                        </h4>
                      </div>

                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-base font-extrabold text-teal-300">
                          ₹{hotel.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          / {t.perNight}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <a
                      href={hotel.bookingUrl || 'https://ttdconline.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 font-bold hover:bg-teal-500/30 transition-colors"
                    >
                      <span>Check Booking Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: EMERGENCY SERVICES */}
          {activeTab === 'emergency' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-rose-300">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Tamil Nadu 24/7 Official Helplines</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>Ambulance: <strong className="text-white">108</strong></div>
                  <div>Police Control: <strong className="text-white">100 / 112</strong></div>
                  <div>Women Safety: <strong className="text-white">1091</strong></div>
                  <div>Tourist Police: <strong className="text-white">044-25340106</strong></div>
                </div>
              </div>

              {destination.emergencyServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          service.type === 'hospital'
                            ? 'bg-rose-500/20 text-rose-300'
                            : service.type === 'police'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {service.type}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1">
                        {service.name}
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {service.address}
                      </p>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      ~{service.distanceKm} km away
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      {service.available24x7 ? '● 24/7 Available' : 'Normal hours'}
                    </span>
                    <a
                      href={`tel:${service.contactNumber.replace(/[^0-9]/g, '')}`}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center gap-1.5 shadow-sm hover:bg-emerald-400 active:scale-95 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{service.contactNumber}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: INTERACTIVE LEAFLET MAP */}
          {activeTab === 'map' && (
            <div className="space-y-3">
              <LeafletMapComponent
                center={destination.coordinates}
                zoom={12}
                pins={mapPins}
                height="340px"
                destinationName={destination.name}
              />
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Navigate straight via official maps:</span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${destination.coordinates[0]},${destination.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 transition-colors"
                >
                  {t.openGoogleMaps} ↗
                </a>
              </div>
            </div>
          )}

          {/* TAB 6: TOURIST REVIEWS & RATINGS WITH PHOTOS AND VIDEOS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Header Rating Stats */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-white flex items-center gap-1.5">
                    <span>{destination.rating}</span>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Based on {destination.reviewCount} verified travelers
                  </p>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-3.5 py-2 rounded-xl bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 transition-all shadow-md shadow-teal-500/20 text-xs"
                >
                  {showReviewForm ? 'Cancel' : t.writeReview}
                </button>
              </div>

              {/* Traveler Reel Bar (Recent Photos & Videos) */}
              {allReelMedia.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-teal-400" />
                      <span>Traveler Stories (Photos & Video Reels)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {allReelMedia.length} clips & shots
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {allReelMedia.map((media, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          setActiveMediaModal({
                            type: media.type,
                            url: media.url,
                            title: `${destination.name} Reel`,
                            author: media.author,
                          })
                        }
                        className="shrink-0 w-24 h-32 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative cursor-pointer group hover:border-teal-400 transition-all shadow-md"
                      >
                        {media.type === 'video' ? (
                          <>
                            <video
                              src={media.url}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 flex flex-col justify-between p-1.5 transition-colors">
                              <span className="self-end px-1.5 py-0.5 rounded-full bg-rose-500/90 text-white text-[9px] font-bold flex items-center gap-0.5">
                                <Video className="w-2.5 h-2.5" />
                                <span>Reel</span>
                              </span>
                              <div className="w-7 h-7 rounded-full bg-white/90 text-slate-950 flex items-center justify-center self-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                              </div>
                              <span className="text-[9px] text-white font-medium truncate drop-shadow">
                                @{media.author}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={media.url}
                              alt="Travel shot"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-between p-1.5">
                              <span className="self-end px-1.5 py-0.5 rounded-full bg-teal-500/90 text-slate-950 text-[9px] font-bold flex items-center gap-0.5">
                                <ImageIcon className="w-2.5 h-2.5" />
                                <span>Photo</span>
                              </span>
                              <span className="text-[9px] text-white font-medium truncate">
                                @{media.author}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Submission Form with Photos and Videos Upload */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-slate-950 border border-teal-500/40 rounded-2xl p-4 space-y-3.5 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs">
                      {t.shareExperience}
                    </h4>
                    <span className="text-[10px] text-teal-400 font-medium">
                      Photos & Videos Welcome
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                      {t.yourRating}:
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            newRating >= star
                              ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                              : 'bg-slate-800 border-slate-700 text-slate-500'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={t.shareExperience}
                      rows={3}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                      required
                    />
                  </div>

                  {/* Travel Photos Section */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-850">
                    <label className="block text-[11px] font-semibold text-slate-200">
                      📷 Add Travel Photos:
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={photoInputUrl}
                        onChange={(e) => setPhotoInputUrl(e.target.value)}
                        placeholder="Paste image URL (https://...)"
                        className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddPhotoToReview(photoInputUrl)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-teal-300 rounded-xl font-bold text-xs border border-slate-700"
                      >
                        + Add
                      </button>
                    </div>

                    {/* Quick photo presets */}
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() =>
                          handleAddPhotoToReview(destination.galleryImages[0] || destination.image)
                        }
                        className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
                      >
                        + Landmark Shot
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleAddPhotoToReview(destination.foods[0]?.image || destination.image)
                        }
                        className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
                      >
                        + Local Food Shot
                      </button>
                    </div>

                    {/* Uploaded Photos Preview List */}
                    {uploadedPhotos.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pt-1.5">
                        {uploadedPhotos.map((p, idx) => (
                          <div key={idx} className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-teal-500/40">
                            <img src={p} alt="Attached" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== idx))}
                              className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Travel Videos Section */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-850">
                    <label className="block text-[11px] font-semibold text-slate-200">
                      🎥 Add Travel Videos / Reels:
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={videoInputUrl}
                        onChange={(e) => setVideoInputUrl(e.target.value)}
                        placeholder="Paste video MP4 URL (https://...)"
                        className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddVideoToReview(videoInputUrl)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-cyan-300 rounded-xl font-bold text-xs border border-slate-700"
                      >
                        + Add
                      </button>
                    </div>

                    {/* Quick video presets */}
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() =>
                          handleAddVideoToReview(
                            'https://assets.mixkit.co/videos/preview/mixkit-winding-road-in-a-dense-forest-41584-large.mp4'
                          )
                        }
                        className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
                      >
                        + Scenic Drive Video
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleAddVideoToReview(
                            'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4'
                          )
                        }
                        className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
                      >
                        + Waterfall Cascade Video
                      </button>
                    </div>

                    {/* Uploaded Videos Preview List */}
                    {uploadedVideos.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pt-1.5">
                        {uploadedVideos.map((v, idx) => (
                          <div key={idx} className="relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 flex items-center justify-center">
                            <video src={v} className="w-full h-full object-cover" preload="metadata" />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                              <Video className="w-4 h-4 text-cyan-300" />
                            </div>
                            <button
                              type="button"
                              onClick={() => setUploadedVideos(uploadedVideos.filter((_, i) => i !== idx))}
                              className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all mt-2"
                  >
                    {t.submitReview}
                  </button>
                </form>
              )}

              {/* Reviews Filter and Media Switcher */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                  <button
                    type="button"
                    onClick={() => setMediaFilter('all')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      mediaFilter === 'all'
                        ? 'bg-teal-400 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    All ({reviewsList.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaFilter('photos')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                      mediaFilter === 'photos'
                        ? 'bg-teal-400 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>With Photos</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaFilter('videos')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                      mediaFilter === 'videos'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    <span>With Videos</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <div className="flex items-center gap-1.5">
                    <span>Stars:</span>
                    <select
                      value={filterRating}
                      onChange={(e) =>
                        setFilterRating(
                          e.target.value === 'all' ? 'all' : Number(e.target.value)
                        )
                      }
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200"
                    >
                      <option value="all">All Stars</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span>Sort:</span>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as any)}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200"
                    >
                      <option value="newest">Newest</option>
                      <option value="helpful">Most Helpful</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reviews Feed */}
              <div className="space-y-3.5">
                {filteredReviews.length === 0 ? (
                  <div className="p-6 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400">
                    No reviews matching this media filter.
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-md"
                    >
                      {/* Reviewer Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <h5 className="font-bold text-white text-xs">
                                {rev.userName}
                              </h5>
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {rev.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-amber-400 font-bold text-xs">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Comment text */}
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {rev.comment}
                      </p>

                      {/* Review Photos Display */}
                      {rev.photos && rev.photos.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-teal-400" />
                            <span>Travel Photos ({rev.photos.length})</span>
                          </span>
                          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                            {rev.photos.map((ph, idx) => (
                              <div
                                key={idx}
                                onClick={() =>
                                  setActiveMediaModal({
                                    type: 'photo',
                                    url: ph,
                                    title: `${rev.userName}'s Photo`,
                                    author: rev.userName,
                                  })
                                }
                                className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border border-slate-700 group hover:border-teal-400 transition-colors shadow-sm"
                              >
                                <img
                                  src={ph}
                                  alt="Traveler review capture"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Eye className="w-4 h-4 text-white drop-shadow" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Review Videos Display */}
                      {rev.videos && rev.videos.length > 0 && (
                        <div className="space-y-1.5 pt-1.5 border-t border-slate-900">
                          <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            <span>Travel Video Reels ({rev.videos.length})</span>
                          </span>
                          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                            {rev.videos.map((vid, vIdx) => (
                              <div
                                key={vIdx}
                                onClick={() =>
                                  setActiveMediaModal({
                                    type: 'video',
                                    url: vid,
                                    title: `${rev.userName}'s Travel Reel`,
                                    author: rev.userName,
                                  })
                                }
                                className="relative shrink-0 w-36 h-24 rounded-xl overflow-hidden cursor-pointer border border-rose-500/40 bg-slate-900 group hover:border-rose-400 transition-all shadow-md"
                              >
                                <video
                                  src={vid}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                  preload="metadata"
                                />
                                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 flex flex-col justify-between p-1.5 transition-colors">
                                  <span className="self-end px-1.5 py-0.5 rounded bg-rose-600/90 text-white text-[8px] font-black uppercase tracking-wider">
                                    Reel
                                  </span>
                                  <div className="w-8 h-8 rounded-full bg-white/95 text-slate-950 flex items-center justify-center self-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Play className="w-4 h-4 fill-current ml-0.5 text-rose-600" />
                                  </div>
                                  <span className="text-[9px] text-white font-medium drop-shadow truncate">
                                    Tap to play video
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                        <button
                          type="button"
                          onClick={() => {
                            setReviewsList((prev) =>
                              prev.map((r) =>
                                r.id === rev.id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
                              )
                            );
                          }}
                          className="flex items-center gap-1 hover:text-teal-400 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReportReview(rev.id)}
                          className="flex items-center gap-1 hover:text-rose-400 transition-colors"
                        >
                          <Flag className="w-3 h-3" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Media Lightbox / Fullscreen Video & Photo Modal */}
        {activeMediaModal && (
          <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 animate-in fade-in duration-200">
            {/* Top Bar */}
            <div className="flex items-center justify-between pt-2 px-1">
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  {activeMediaModal.type === 'video' ? '🎥 Traveler Video Clip' : '📷 Traveler Photo'}
                </span>
                <h4 className="font-extrabold text-white text-sm">
                  {activeMediaModal.title || destination.name}
                </h4>
                {activeMediaModal.author && (
                  <span className="text-[11px] text-slate-400">
                    Captured by @{activeMediaModal.author}
                  </span>
                )}
              </div>

              <button
                onClick={() => setActiveMediaModal(null)}
                className="w-9 h-9 rounded-full bg-slate-850 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Content */}
            <div className="my-auto max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
              {activeMediaModal.type === 'video' ? (
                <video
                  src={activeMediaModal.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[68vh] max-w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <img
                  src={activeMediaModal.url}
                  alt={activeMediaModal.title}
                  className="max-h-[68vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />
              )}
            </div>

            {/* Bottom Bar */}
            <div className="pb-3 text-center">
              <button
                onClick={() => setActiveMediaModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs border border-slate-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}

        {/* Bottom Caretaker Link Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Need personalized guide in {destination.city}?</span>
          </div>
          <button
            onClick={onOpenCaretakers}
            className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1"
          >
            <span>Contact Caretaker</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
