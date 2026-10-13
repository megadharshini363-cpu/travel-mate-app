import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Home, Compass, MapPin, Sparkles, User } from 'lucide-react';

export type NavTab = 'home' | 'explore' | 'my-trips' | 'assistant' | 'profile';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLanguage: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];

  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
    { id: 'explore', label: t.navExplore, icon: <Compass className="w-5 h-5" /> },
    { id: 'my-trips', label: t.navMyTrips, icon: <MapPin className="w-5 h-5" /> },
    { id: 'assistant', label: t.navAiAssistant, icon: <Sparkles className="w-5 h-5" /> },
    { id: 'profile', label: t.navProfile, icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 text-slate-400 py-1.5 px-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all duration-200 relative ${
                isActive ? 'text-teal-400 font-bold' : 'hover:text-slate-200 font-medium'
              }`}
            >
              <div
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110 -translate-y-0.5' : ''
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-[65px]">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
