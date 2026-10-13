import React, { useState } from 'react';
import { Language, TravelType } from '../types';
import { translations } from '../i18n/translations';
import { Compass, Globe, ShieldAlert, Users, User, HeartHandshake, PhoneCall, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  travelType: TravelType;
  onOpenTravelTypeModal: () => void;
  onOpenEmergencyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  travelType,
  onOpenTravelTypeModal,
  onOpenEmergencyModal,
}) => {
  const t = translations[currentLanguage];
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languagesList: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN • English' },
    { code: 'ta', label: 'தமிழ் • Tamil' },
    { code: 'hi', label: 'हिंदी • Hindi' },
    { code: 'ml', label: 'മലയാളം • ML' },
    { code: 'te', label: 'తెలుగు • TE' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* App Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-0.5 shadow-md shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent block leading-tight">
              TravelMate
            </span>
            <span className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase block">
              Tamil Nadu
            </span>
          </div>
        </div>

        {/* Right Action Icons: SOS, Travel Type Pill, Language Selector */}
        <div className="flex items-center gap-2">
          {/* Emergency SOS Button */}
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            title="Emergency SOS & Helplines"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/25 active:scale-95 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[11px]">SOS</span>
          </button>

          {/* Travel Style Badge */}
          <button
            type="button"
            onClick={onOpenTravelTypeModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 active:scale-95 transition-all"
          >
            {travelType === 'solo' && <User className="w-3.5 h-3.5 text-teal-400" />}
            {travelType === 'family' && <Users className="w-3.5 h-3.5 text-cyan-400" />}
            {travelType === 'group' && <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />}
            <span className="capitalize text-[11px]">{travelType}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 p-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Globe className="w-4 h-4 text-teal-400" />
              <span className="uppercase text-[11px] font-bold">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowLangMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl py-1.5 z-50 overflow-hidden">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Select Language
                  </div>
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        currentLanguage === lang.code
                          ? 'text-teal-400 font-bold bg-teal-500/10'
                          : 'text-slate-200 font-medium'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {currentLanguage === lang.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
