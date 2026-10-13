import React, { useState } from 'react';
import { Destination, Language, TravelType, ItineraryDay, ItineraryActivity, SavedItinerary } from '../types';
import { translations } from '../i18n/translations';
import { destinationsData } from '../data/destinations';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  Wallet,
  Compass,
  Plus,
  Trash2,
  RefreshCw,
  Save,
  CheckCircle2,
  Navigation,
  ChevronDown,
  ChevronUp,
  Tag,
  ArrowRight,
} from 'lucide-react';

interface AiTripPlannerModalProps {
  initialDestination?: Destination;
  currentLanguage: Language;
  travelType: TravelType;
  onClose: () => void;
  onSaveItinerary: (itinerary: SavedItinerary) => void;
}

export const AiTripPlannerModal: React.FC<AiTripPlannerModalProps> = ({
  initialDestination,
  currentLanguage,
  travelType,
  onClose,
  onSaveItinerary,
}) => {
  const t = translations[currentLanguage];

  // Form states
  const [destinationName, setDestinationName] = useState(
    initialDestination ? initialDestination.name : 'Ooty (Udhagamandalam)'
  );
  const [startingLocation, setStartingLocation] = useState('Chennai, Tamil Nadu');
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [daysCount, setDaysCount] = useState(2);
  const [travelersCount, setTravelersCount] = useState(travelType === 'family' ? 3 : 1);
  const [budget, setBudget] = useState(travelType === 'family' ? 12000 : 5000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Heritage',
    'Scenic Viewpoints',
    'Local Food',
  ]);
  const [startTime, setStartTime] = useState('08:00 AM');
  const [endTime, setEndTime] = useState('08:00 PM');

  // Loading & Itinerary states
  const [isGenerating, setIsGenerating] = useState(false);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[] | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);

  // New activity inline add modal/form
  const [addingDayNumber, setAddingDayNumber] = useState<number | null>(null);
  const [newActPlace, setNewActPlace] = useState('');
  const [newActTime, setNewActTime] = useState('03:30 PM');
  const [newActDesc, setNewActDesc] = useState('');
  const [newActCost, setNewActCost] = useState('₹150');

  const interestsOptions = [
    'Heritage & Temples',
    'Scenic Viewpoints',
    'Tea & Hill Stations',
    'Hidden Gems',
    'Local Food Walks',
    'Adventure & Trekking',
    'Coastal & Beaches',
    'Wildlife & Nature',
  ];

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    setItineraryDays(null);

    try {
      const response = await fetch('/api/gemini/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: destinationName,
          startingLocation,
          dates: startDate,
          days: daysCount,
          travelers: travelersCount,
          budget,
          travelType,
          interests: selectedInterests,
          startTime,
          endTime,
          language: currentLanguage,
        }),
      });

      const data = await response.json();
      if (data.itinerary && Array.isArray(data.itinerary)) {
        // Map activities to add local IDs
        const formatted = data.itinerary.map((d: any, dIdx: number) => ({
          dayNumber: d.dayNumber || dIdx + 1,
          title: d.title || `Day ${dIdx + 1} – Exploration`,
          activities: (d.activities || []).map((a: any, aIdx: number) => ({
            id: `act-${dIdx}-${aIdx}-${Date.now()}`,
            time: a.time || '09:00 AM',
            place: a.place || 'Sightseeing Spot',
            description: a.description || 'Enjoy scenic surroundings and local culture.',
            duration: a.duration || '1.5 hours',
            travelTime: a.travelTime || '15 mins drive',
            estimatedCost: a.estimatedCost || '₹100',
            category: a.category || 'sightseeing',
            tips: a.tips || 'Wear comfortable walking shoes.',
            nextPlace: a.nextPlace,
          })),
        }));
        setItineraryDays(formatted);
      }
    } catch (err) {
      console.error('Error generating AI itinerary:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Activity Manipulation functions
  const handleRemoveActivity = (dayIndex: number, actId: string) => {
    if (!itineraryDays) return;
    const updated = [...itineraryDays];
    updated[dayIndex].activities = updated[dayIndex].activities.filter(
      (a) => a.id !== actId
    );
    setItineraryDays(updated);
  };

  const handleMoveActivity = (dayIndex: number, actIndex: number, direction: 'up' | 'down') => {
    if (!itineraryDays) return;
    const updated = [...itineraryDays];
    const acts = [...updated[dayIndex].activities];
    const targetIndex = direction === 'up' ? actIndex - 1 : actIndex + 1;
    if (targetIndex < 0 || targetIndex >= acts.length) return;

    const temp = acts[actIndex];
    acts[actIndex] = acts[targetIndex];
    acts[targetIndex] = temp;
    updated[dayIndex].activities = acts;
    setItineraryDays(updated);
  };

  const handleAddNewActivity = (dayIndex: number) => {
    if (!itineraryDays || !newActPlace.trim()) return;
    const updated = [...itineraryDays];
    const newActivity: ItineraryActivity = {
      id: `act-custom-${Date.now()}`,
      time: newActTime,
      place: newActPlace.trim(),
      description: newActDesc.trim() || 'Custom planned visit.',
      duration: '1 hour',
      travelTime: '15 mins',
      estimatedCost: newActCost,
      category: 'sightseeing',
      tips: 'Added by traveler',
    };
    updated[dayIndex].activities.push(newActivity);
    setItineraryDays(updated);
    setAddingDayNumber(null);
    setNewActPlace('');
    setNewActDesc('');
  };

  const handleSaveToMyTrips = () => {
    if (!itineraryDays) return;
    const saved: SavedItinerary = {
      id: `itin-${Date.now()}`,
      destinationId: destinationName.toLowerCase().replace(/[^a-z]/g, ''),
      destinationName,
      startDate,
      days: daysCount,
      travelers: travelersCount,
      totalBudget: budget,
      travelType,
      schedule: itineraryDays,
      createdAt: new Date().toISOString(),
    };
    onSaveItinerary(saved);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[92vh] sm:h-[88vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-cyan-400 p-0.5 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                {t.tripPlannerTitle}
              </h2>
              <span className="text-[10px] text-teal-400 font-semibold">
                Tamil Nadu AI Time Scheduler
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {saveSuccess && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Itinerary successfully saved to My Trips!</span>
            </div>
          )}

          {/* Form Configuration Inputs */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-3">
            <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Trip Parameters</span>
            </h3>

            {/* Destination Selection */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                {t.destination} in Tamil Nadu:
              </label>
              <select
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-teal-400"
              >
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.district})
                  </option>
                ))}
              </select>
            </div>

            {/* Starting Location */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                {t.startingLocation}:
              </label>
              <input
                type="text"
                value={startingLocation}
                onChange={(e) => setStartingLocation(e.target.value)}
                placeholder="e.g. Chennai / Coimbatore / Madurai / Bangalore"
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-teal-400"
              />
            </div>

            {/* Grid 2 Cols: Start Date & Days Count */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {t.numberOfDays}:
                </label>
                <select
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value={1}>1 Day (Express)</option>
                  <option value={2}>2 Days (Weekend)</option>
                  <option value={3}>3 Days (Optimal)</option>
                  <option value={4}>4 Days (Deep Tour)</option>
                  <option value={5}>5 Days (Extended)</option>
                </select>
              </div>
            </div>

            {/* Grid 2 Cols: Travelers & Budget */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {t.numberOfTravelers}:
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Budget (₹):
                </label>
                <input
                  type="number"
                  step={500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            {/* Preferred Start & End Times */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Daily Start Time:
                </label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="08:00 AM"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Daily End Time:
                </label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="08:00 PM"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            {/* Interests Chips */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                {t.interests}:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {interestsOptions.map((opt) => {
                  const isSel = selectedInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleInterestToggle(opt)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                        isSel
                          ? 'bg-teal-500/20 border border-teal-400 text-teal-300'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleGenerateItinerary}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 text-slate-950 shadow-md shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.generatingItinerary}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.generateItineraryBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Schedule Display */}
          {itineraryDays && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-white text-sm">
                    Personalized {daysCount}-Day Itinerary
                  </h3>
                  <span className="text-[10px] text-teal-400">
                    Optimized for distance, timings & budget
                  </span>
                </div>

                <button
                  onClick={handleSaveToMyTrips}
                  className="px-3 py-1.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-teal-300 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t.saveItinerary}</span>
                </button>
              </div>

              {itineraryDays.map((day, dayIndex) => (
                <div
                  key={day.dayNumber}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg"
                >
                  {/* Day Header */}
                  <div className="p-3 bg-gradient-to-r from-slate-900 to-slate-850 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-black text-teal-400 tracking-wider">
                        {t.day} {day.dayNumber}
                      </span>
                      <h4 className="font-bold text-white text-xs mt-0.5">
                        {day.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAddingDayNumber(day.dayNumber)}
                      className="px-2 py-1 rounded-lg bg-slate-800 text-teal-300 text-[10px] font-bold hover:bg-slate-700 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{t.addActivity}</span>
                    </button>
                  </div>

                  {/* Add Activity Form if open for this day */}
                  {addingDayNumber === day.dayNumber && (
                    <div className="p-3 bg-slate-900/90 border-b border-slate-800 space-y-2">
                      <div className="font-bold text-white text-[11px]">
                        Add Custom Activity to Day {day.dayNumber}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newActTime}
                          onChange={(e) => setNewActTime(e.target.value)}
                          placeholder="Time (e.g. 03:00 PM)"
                          className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        />
                        <input
                          type="text"
                          value={newActCost}
                          onChange={(e) => setNewActCost(e.target.value)}
                          placeholder="Cost (e.g. ₹100)"
                          className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={newActPlace}
                        onChange={(e) => setNewActPlace(e.target.value)}
                        placeholder="Place / Attraction Name"
                        className="w-full p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={newActDesc}
                        onChange={(e) => setNewActDesc(e.target.value)}
                        placeholder="Short notes or description"
                        className="w-full p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => setAddingDayNumber(null)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddNewActivity(dayIndex)}
                          className="px-2.5 py-1 rounded-lg bg-teal-400 text-slate-950 font-bold text-[10px]"
                        >
                          Add to Schedule
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Day Activities List */}
                  <div className="p-3 space-y-3">
                    {day.activities.map((act, actIndex) => (
                      <div
                        key={act.id}
                        className="relative pl-6 pb-2 border-l border-slate-800 last:border-0 last:pb-0"
                      >
                        {/* Time Dot */}
                        <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-slate-950" />

                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-teal-400">
                              {act.time}
                            </span>
                            <h5 className="font-bold text-white text-xs mt-0.5">
                              {act.place}
                            </h5>
                          </div>

                          {/* Reordering & Delete Controls */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveActivity(dayIndex, actIndex, 'up')}
                              disabled={actIndex === 0}
                              className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveActivity(dayIndex, actIndex, 'down')}
                              disabled={actIndex === day.activities.length - 1}
                              className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveActivity(dayIndex, act.id)}
                              className="p-1 rounded bg-slate-850 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400"
                              title={t.removeActivity}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                          {act.description}
                        </p>

                        {/* Activity details badge bar */}
                        <div className="mt-2 pt-1.5 border-t border-slate-900 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{act.duration}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Navigation className="w-3 h-3 text-slate-500" />
                            <span>{act.travelTime}</span>
                          </span>
                          <span className="flex items-center gap-1 text-teal-300 font-semibold">
                            <Wallet className="w-3 h-3" />
                            <span>{act.estimatedCost}</span>
                          </span>
                          {act.tips && (
                            <span className="text-amber-300/80 italic">
                              Tip: {act.tips}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
