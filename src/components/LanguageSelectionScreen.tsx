import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Compass, Check, Sparkles, Globe } from 'lucide-react';

interface LanguageSelectionScreenProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onConfirm: () => void;
  isInitialOnboarding?: boolean;
}

const languagesList: { code: Language; label: string; subLabel: string; region: string }[] = [
  { code: 'en', label: 'English', subLabel: 'English', region: 'Global & India' },
  { code: 'ta', label: 'தமிழ்', subLabel: 'Tamil', region: 'தமிழ்நாடு (Tamil Nadu)' },
  { code: 'hi', label: 'हिंदी', subLabel: 'Hindi', region: 'भारत (India)' },
  { code: 'ml', label: 'മലയാളം', subLabel: 'Malayalam', region: 'കേരളം (South India)' },
  { code: 'te', label: 'తెలుగు', subLabel: 'Telugu', region: 'ఆంధ్ర & తెలంగాణ' },
];

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  currentLanguage,
  onSelectLanguage,
  onConfirm,
  isInitialOnboarding = true,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white flex flex-col justify-between p-6 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-28 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header with App Logo & Tagline */}
      <div className="pt-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-emerald-400 p-0.5 shadow-xl shadow-teal-500/25 mb-4 animate-bounce duration-1000">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Compass className="w-10 h-10 text-teal-400 animate-spin-slow" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TAMIL NADU TOURISM AI</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
          {t.appName}
        </h1>
        <p className="text-sm text-slate-300 mt-2 px-4 leading-relaxed font-medium">
          {t.tagline}
        </p>
      </div>

      {/* Language Options Card */}
      <div className="my-auto py-6 relative z-10">
        <div className="flex items-center gap-2 mb-4 px-1">
          <Globe className="w-4 h-4 text-teal-400" />
          <h2 className="text-base font-semibold text-slate-200">
            {t.selectLanguage}
          </h2>
        </div>

        <div className="space-y-3">
          {languagesList.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                type="button"
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 border-teal-400 shadow-lg shadow-teal-500/10 ring-1 ring-teal-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-base flex items-center gap-2">
                      {lang.label}
                      {lang.code !== 'en' && (
                        <span className="text-xs text-slate-400 font-normal">
                          ({lang.subLabel})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {lang.region}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-teal-400 border-teal-400 text-slate-950'
                      : 'border-slate-700 bg-slate-800/50 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 text-center mt-3">
          {t.chooseLanguageDesc}
        </p>
      </div>

      {/* Action Button */}
      <div className="pb-4 relative z-10">
        <button
          onClick={onConfirm}
          type="button"
          className="w-full py-4 px-6 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 hover:opacity-95 active:scale-[0.99] transition-all shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2"
        >
          <span>{t.continueBtn}</span>
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};
