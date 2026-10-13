import React, { useState, useMemo } from 'react';
import { Destination, Language, TravelType, BookedPackage } from '../types';
import { translations } from '../i18n/translations';
import { destinationsData } from '../data/destinations';
import {
  X,
  Package,
  Check,
  Sparkles,
  Info,
  Car,
  Hotel,
  Utensils,
  Camera,
  Percent,
  CheckCircle2,
  Calendar,
  Users,
} from 'lucide-react';

interface DynamicPackageModalProps {
  initialDestination?: Destination;
  currentLanguage: Language;
  travelType: TravelType;
  onClose: () => void;
  onBookPackage: (pkg: BookedPackage) => void;
}

export const DynamicPackageModal: React.FC<DynamicPackageModalProps> = ({
  initialDestination,
  currentLanguage,
  travelType,
  onClose,
  onBookPackage,
}) => {
  const t = translations[currentLanguage];

  const [destinationId, setDestinationId] = useState(
    initialDestination ? initialDestination.id : 'ooty'
  );
  const [selectedCategory, setSelectedCategory] = useState<'budget' | 'standard' | 'premium'>('standard');
  const [daysCount, setDaysCount] = useState(3);
  const [travelersCount, setTravelersCount] = useState(
    travelType === 'family' ? 3 : travelType === 'group' ? 4 : 1
  );
  const [transportMode, setTransportMode] = useState<'bus' | 'train' | 'cab'>('cab');
  const [includeActivities, setIncludeActivities] = useState(true);
  const [includeFullBoardFood, setIncludeFullBoardFood] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const selectedDestination = useMemo(() => {
    return destinationsData.find((d) => d.id === destinationId) || destinationsData[0];
  }, [destinationId]);

  // Dynamic pricing calculation engine
  const calculation = useMemo(() => {
    // Base multipliers
    const catMultiplier = selectedCategory === 'budget' ? 1.0 : selectedCategory === 'standard' ? 1.6 : 2.5;
    const travelTypeDiscount = travelType === 'group' ? 0.85 : travelType === 'family' ? 0.9 : 1.0;

    // Transport cost
    let transportBasePerPerson = 600; // bus
    if (transportMode === 'train') transportBasePerPerson = 900;
    if (transportMode === 'cab') transportBasePerPerson = 1800;
    if (selectedCategory === 'premium') transportBasePerPerson *= 1.5;
    const transportTotal = Math.round(transportBasePerPerson * travelersCount);

    // Accommodation cost per night
    let hotelRatePerNight = 1200; // budget
    if (selectedCategory === 'standard') hotelRatePerNight = 2800;
    if (selectedCategory === 'premium') hotelRatePerNight = 6500;
    // Room count: 2 persons per room
    const roomsCount = Math.ceil(travelersCount / 2);
    const accommodationTotal = Math.round(hotelRatePerNight * roomsCount * (daysCount - 1 || 1));

    // Food per person per day
    const foodDailyPerPerson = selectedCategory === 'budget' ? 350 : selectedCategory === 'standard' ? 650 : 1200;
    const foodTotal = includeFullBoardFood
      ? Math.round(foodDailyPerPerson * travelersCount * daysCount * travelTypeDiscount)
      : Math.round(foodDailyPerPerson * 0.4 * travelersCount * daysCount);

    // Activities entry fees & passes
    const activitiesBase = selectedCategory === 'budget' ? 300 : selectedCategory === 'standard' ? 750 : 1800;
    const activitiesTotal = includeActivities
      ? Math.round(activitiesBase * travelersCount * (daysCount > 1 ? 1.5 : 1.0))
      : 0;

    // Subtotal
    const subtotal = transportTotal + accommodationTotal + foodTotal + activitiesTotal;

    // GST & Service charge (5% state tourism tax)
    const serviceTax = Math.round(subtotal * 0.05);

    const totalEstimated = subtotal + serviceTax;

    return {
      transport: transportTotal,
      accommodation: accommodationTotal,
      food: foodTotal,
      activities: activitiesTotal,
      serviceTax,
      totalEstimated,
      perPerson: Math.round(totalEstimated / travelersCount),
    };
  }, [
    selectedCategory,
    destinationId,
    daysCount,
    travelersCount,
    transportMode,
    includeActivities,
    includeFullBoardFood,
    travelType,
  ]);

  const handleConfirmBooking = () => {
    const pkg: BookedPackage = {
      id: `pkg-${Date.now()}`,
      destinationId,
      destinationName: selectedDestination.name,
      packageType: selectedCategory,
      travelType,
      travelersCount,
      durationDays: daysCount,
      startDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      totalEstimatedPrice: calculation.totalEstimated,
      priceBreakdown: {
        transport: calculation.transport,
        accommodation: calculation.accommodation,
        food: calculation.food,
        activities: calculation.activities,
        serviceTax: calculation.serviceTax,
      },
      transportType: transportMode.toUpperCase(),
      hotelCategory:
        selectedCategory === 'budget'
          ? 'Standard Non-AC / Dorm'
          : selectedCategory === 'standard'
          ? '3-Star Deluxe Hotel'
          : '5-Star Heritage Resort',
      status: 'confirmed',
    };

    onBookPackage(pkg);
    setBookingConfirmed(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[92vh] sm:h-[88vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-cyan-400 p-0.5 flex items-center justify-center">
              <Package className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                {t.packagesTitle}
              </h2>
              <span className="text-[10px] text-teal-400 font-semibold">
                Dynamic Real-time Calculator • Tamil Nadu
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {bookingConfirmed && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Package selection saved successfully to My Trips!</span>
            </div>
          )}

          {/* Destination & Travelers Control */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Select Destination:
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              >
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.district})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Duration (Days):
                </label>
                <select
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value={1}>1 Day</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
                  <option value={5}>5 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Travelers:
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Transportation Preference:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['bus', 'train', 'cab'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTransportMode(mode)}
                    className={`py-1.5 px-2 rounded-xl text-center text-xs font-bold uppercase transition-all border ${
                      transportMode === mode
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Three Package Categories */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-2">
              Choose Package Tier:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Budget */}
              <button
                type="button"
                onClick={() => setSelectedCategory('budget')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedCategory === 'budget'
                    ? 'bg-gradient-to-b from-teal-950 to-slate-900 border-teal-400 ring-1 ring-teal-400 shadow-md'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-teal-400 block">
                  Affordable
                </span>
                <h4 className="font-bold text-white text-xs mt-0.5">Budget</h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                  Dorm/Economy stay & shared travel
                </p>
              </button>

              {/* Standard */}
              <button
                type="button"
                onClick={() => setSelectedCategory('standard')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedCategory === 'standard'
                    ? 'bg-gradient-to-b from-cyan-950 to-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-md'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-cyan-400 block">
                  Popular
                </span>
                <h4 className="font-bold text-white text-xs mt-0.5">Standard</h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                  3-Star AC stays & private transport
                </p>
              </button>

              {/* Premium */}
              <button
                type="button"
                onClick={() => setSelectedCategory('premium')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedCategory === 'premium'
                    ? 'bg-gradient-to-b from-amber-950 to-slate-900 border-amber-400 ring-1 ring-amber-400 shadow-md'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-amber-400 block">
                  Luxury
                </span>
                <h4 className="font-bold text-white text-xs mt-0.5">Premium</h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                  5-Star heritage & VIP tours
                </p>
              </button>
            </div>
          </div>

          {/* Transparent Cost Breakdown */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <h4 className="font-bold text-white text-xs flex items-center justify-between">
              <span>{t.costBreakdown}</span>
              <span className="text-[10px] font-normal text-slate-400">
                Transparent Estimate
              </span>
            </h4>

            <div className="space-y-1.5 pt-1 text-[11px] text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-teal-400" />
                  <span>{t.transport} ({transportMode}):</span>
                </span>
                <span className="font-semibold text-white">
                  ₹{calculation.transport.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.accommodation} ({selectedCategory}):</span>
                </span>
                <span className="font-semibold text-white">
                  ₹{calculation.accommodation.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.food} ({daysCount} days):</span>
                </span>
                <span className="font-semibold text-white">
                  ₹{calculation.food.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.activities}:</span>
                </span>
                <span className="font-semibold text-white">
                  ₹{calculation.activities.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.serviceTax} (5%):</span>
                </span>
                <span className="font-semibold text-white">
                  ₹{calculation.serviceTax.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Estimated Box */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {t.totalEstimated}
                </span>
                <span className="text-[11px] text-teal-300">
                  ≈ ₹{calculation.perPerson.toLocaleString()} {t.perPerson}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xl font-black text-white bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  ₹{calculation.totalEstimated.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Notice distinguishing estimated vs confirmed provider prices */}
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Displayed prices are transparent real-time algorithmic estimates. Final confirmed pricing may slightly adjust depending on seasonal hotel room inventory and surge bus/cab timings.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={handleConfirmBooking}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.bookPackageBtn} ({selectedCategory.toUpperCase()})</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
