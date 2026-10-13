import React from 'react';
import { UserProfile, Language, TravelType } from '../types';
import { translations } from '../i18n/translations';
import {
  User,
  Globe,
  Settings,
  Heart,
  LogOut,
  MapPin,
  Package,
  ShieldCheck,
  Star,
  ChevronRight,
  Sparkles,
  Video,
  Film,
  Image as ImageIcon,
} from 'lucide-react';

interface UserProfileScreenProps {
  currentUser: UserProfile;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTravelTypeModal: () => void;
  onLogout: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  currentUser,
  currentLanguage,
  onLanguageChange,
  onOpenTravelTypeModal,
  onLogout,
}) => {
  const t = translations[currentLanguage];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 max-w-md mx-auto p-4">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-black text-white">
                {currentUser.name}
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentUser.email}
            </p>
            <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider border border-teal-500/30">
              <Sparkles className="w-3 h-3" />
              <span>Verified Traveler</span>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Preferences */}
      <div className="mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-xs flex items-center gap-2">
            <User className="w-4 h-4 text-teal-400" />
            <span>{t.travelPreferences}</span>
          </h3>
          <button
            onClick={onOpenTravelTypeModal}
            className="text-[11px] text-teal-400 font-bold hover:underline"
          >
            Change
          </button>
        </div>

        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Active Style
            </span>
            <span className="text-white font-extrabold capitalize text-sm">
              {currentUser.travelType} Travel
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {currentUser.travelType === 'solo'
              ? 'Safety Shield & Hostel Budget'
              : currentUser.travelType === 'family'
              ? 'Family Suite & Child Safe'
              : 'Group Community & Split Cost'}
          </span>
        </div>
      </div>

      {/* My Travel Photos & Video Reels */}
      <div className="mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-xs flex items-center gap-2">
            <Film className="w-4 h-4 text-teal-400" />
            <span>My Travel Photos & Video Reels</span>
          </h3>
          <span className="text-[10px] text-teal-400 font-semibold">
            Verified Submissions
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="relative h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=400&auto=format&fit=crop&q=80"
              alt="Ooty"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] text-teal-300 font-bold">
              📷 Ooty Hills
            </span>
          </div>

          <div className="relative h-24 rounded-xl overflow-hidden border border-rose-500/40 bg-slate-950 flex items-center justify-center">
            <video
              src="https://assets.mixkit.co/videos/preview/mixkit-winding-road-in-a-dense-forest-41584-large.mp4"
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
              <span className="px-1.5 py-0.5 rounded bg-rose-600/90 text-[9px] text-white font-bold flex items-center gap-0.5">
                <Video className="w-2.5 h-2.5" />
                <span>Reel</span>
              </span>
            </div>
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] text-white font-medium truncate max-w-[90%]">
              Kolli Bends
            </span>
          </div>

          <div className="relative h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&auto=format&fit=crop&q=80"
              alt="Madurai Temple"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] text-teal-300 font-bold">
              📷 Madurai
            </span>
          </div>
        </div>
      </div>

      {/* Language Setting */}
      <div className="mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="font-bold text-white text-xs flex items-center gap-2">
          <Globe className="w-4 h-4 text-teal-400" />
          <span>{t.changeLanguage}</span>
        </h3>

        <div className="grid grid-cols-1 gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => onLanguageChange(l.code)}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                currentLanguage === l.code
                  ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-bold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{l.label}</span>
              {currentLanguage === l.code && (
                <span className="w-2 h-2 rounded-full bg-teal-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* App Information & Logout */}
      <div className="mt-4 space-y-2">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-1">
          <div className="text-white font-bold">TravelMate AI • Tamil Nadu Tourism</div>
          <div>Version 2.4.0 (Enterprise Build)</div>
          <div className="text-[11px] text-slate-500 pt-1">
            Official government emergency integration (108/112/1091). All content specialized for Tamil Nadu's 38 districts.
          </div>
        </div>

        <button
          onClick={onLogout}
          type="button"
          className="w-full py-3.5 px-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-500/25 active:scale-95 transition-all mt-3"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
};
