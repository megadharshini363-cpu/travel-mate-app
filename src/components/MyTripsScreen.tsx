import React, { useState } from 'react';
import { Language, SavedItinerary, BookedPackage, CaretakerRequest } from '../types';
import { translations } from '../i18n/translations';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Package,
  ShieldCheck,
  Trash2,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface MyTripsScreenProps {
  currentLanguage: Language;
  savedItineraries: SavedItinerary[];
  bookedPackages: BookedPackage[];
  caretakerRequests: CaretakerRequest[];
  onOpenTripPlanner: () => void;
  onOpenPackages: () => void;
  onDeleteItinerary: (id: string) => void;
}

export const MyTripsScreen: React.FC<MyTripsScreenProps> = ({
  currentLanguage,
  savedItineraries,
  bookedPackages,
  caretakerRequests,
  onOpenTripPlanner,
  onOpenPackages,
  onDeleteItinerary,
}) => {
  const t = translations[currentLanguage];
  const [activeTab, setActiveTab] = useState<'itineraries' | 'packages' | 'caretakers'>('itineraries');

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 max-w-md mx-auto p-4">
      <div className="pt-2 pb-3">
        <h1 className="text-xl font-extrabold text-white">
          {t.navMyTrips}
        </h1>
        <p className="text-xs text-slate-400">
          Manage your saved schedules, packages & local guide bookings
        </p>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 gap-2 mt-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'itineraries'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400'
            }`}
          >
            AI Itineraries ({savedItineraries.length})
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'packages'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400'
            }`}
          >
            Packages ({bookedPackages.length})
          </button>
          <button
            onClick={() => setActiveTab('caretakers')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'caretakers'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400'
            }`}
          >
            Caretakers ({caretakerRequests.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Saved Itineraries */}
      {activeTab === 'itineraries' && (
        <div className="space-y-3 pt-1">
          {savedItineraries.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-900 border border-slate-800 rounded-3xl">
              <Sparkles className="w-10 h-10 text-teal-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-sm">No saved itineraries yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Use the AI Smart Trip Planner to generate day-by-day schedules with timings and cost estimates.
              </p>
              <button
                onClick={onOpenTripPlanner}
                className="mt-4 px-4 py-2 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs"
              >
                Plan a New Trip
              </button>
            </div>
          ) : (
            savedItineraries.map((itin) => (
              <div
                key={itin.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-teal-400 uppercase">
                      {itin.days} Days • {itin.travelType.toUpperCase()}
                    </span>
                    <h3 className="font-extrabold text-white text-base mt-0.5">
                      {itin.destinationName}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Starts on {itin.startDate} • {itin.travelers} traveler(s)
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteItinerary(itin.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400"
                    title="Delete Itinerary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  {itin.schedule.map((day) => (
                    <div
                      key={day.dayNumber}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
                    >
                      <div className="font-bold text-teal-300 text-[11px]">
                        Day {day.dayNumber}: {day.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {day.activities.length} planned activities: {day.activities.map((a) => a.place).join(' → ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Booked Packages */}
      {activeTab === 'packages' && (
        <div className="space-y-3 pt-1">
          {bookedPackages.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-900 border border-slate-800 rounded-3xl">
              <Package className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-sm">No packages selected yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Customize dynamic packages for Solo, Family, or Group travel with transparent price breakdown.
              </p>
              <button
                onClick={onOpenPackages}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Browse Packages
              </button>
            </div>
          ) : (
            bookedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase">
                      {pkg.packageType} Package
                    </span>
                    <h3 className="font-extrabold text-white text-base mt-1">
                      {pkg.destinationName}
                    </h3>
                  </div>

                  <span className="text-sm font-black text-teal-300">
                    ₹{pkg.totalEstimatedPrice.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                  <div>Transport: {pkg.transportType}</div>
                  <div>Hotel: {pkg.hotelCategory}</div>
                  <div>Travelers: {pkg.travelersCount}</div>
                  <div>Duration: {pkg.durationDays} Days</div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
                  <span className="text-emerald-400 font-bold">
                    ✓ Status: Confirmed
                  </span>
                  <span className="text-slate-400">
                    Est. Quote ID: {pkg.id.slice(-6)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Caretaker Requests */}
      {activeTab === 'caretakers' && (
        <div className="space-y-3 pt-1">
          {caretakerRequests.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-900 border border-slate-800 rounded-3xl">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-sm">No caretaker requests</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Connect with verified native guides in Ooty, Madurai, Rameshwaram, or Valparai for personalized guidance.
              </p>
            </div>
          ) : (
            caretakerRequests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {req.caretakerName}
                    </h4>
                    <p className="text-[11px] text-teal-400">
                      Service Area: {req.serviceArea}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Confirmed
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 pt-1">
                  <div><strong>Date:</strong> {req.date}</div>
                  <div><strong>Travelers:</strong> {req.travelersCount}</div>
                  <div className="text-slate-400 mt-1">"{req.notes}"</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
