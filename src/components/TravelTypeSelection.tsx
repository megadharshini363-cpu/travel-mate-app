import React, { useState } from 'react';
import { Language, TravelType } from '../types';
import { translations } from '../i18n/translations';
import { User, Users, HeartHandshake, ShieldCheck, Check, Sparkles, AlertCircle, Plus, Minus } from 'lucide-react';

interface TravelTypeSelectionProps {
  currentLanguage: Language;
  currentType: TravelType;
  onSelectType: (type: TravelType, config?: any) => void;
  onConfirm: () => void;
}

export const TravelTypeSelection: React.FC<TravelTypeSelectionProps> = ({
  currentLanguage,
  currentType,
  onSelectType,
  onConfirm,
}) => {
  const t = translations[currentLanguage];
  const [selected, setSelected] = useState<TravelType>(currentType || 'solo');

  // Family details state
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);

  // Group preferences state
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [allowChatInvites, setAllowChatInvites] = useState(true);

  const handleSelect = (type: TravelType) => {
    setSelected(type);
    if (type === 'family') {
      onSelectType('family', { familyConfig: { adults: adultsCount, children: childrenCount } });
    } else if (type === 'group') {
      onSelectType('group', { groupPreferences: { verifiedOnly, allowChatInvites, interests: ['Heritage', 'Trekking', 'Nature'] } });
    } else {
      onSelectType('solo');
    }
  };

  const handleConfirm = () => {
    if (selected === 'family') {
      onSelectType('family', { familyConfig: { adults: adultsCount, children: childrenCount } });
    } else if (selected === 'group') {
      onSelectType('group', { groupPreferences: { verifiedOnly, allowChatInvites, interests: ['Heritage', 'Trekking', 'Nature'] } });
    } else {
      onSelectType('solo');
    }
    onConfirm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white flex flex-col justify-between p-5 max-w-md mx-auto shadow-2xl relative overflow-y-auto">
      {/* Background glow effects */}
      <div className="absolute top-2 -right-20 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="pt-4 pb-2 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TAILORED EXPERIENCE</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          {t.howToTravel}
        </h1>
        <p className="text-xs text-slate-300 mt-1.5 max-w-xs mx-auto">
          {t.travelTypeSubtitle}
        </p>
      </div>

      {/* Cards List */}
      <div className="space-y-4 my-auto py-3 relative z-10">
        {/* Card 1: Solo Travel */}
        <div
          onClick={() => handleSelect('solo')}
          className={`cursor-pointer rounded-2xl p-4.5 border transition-all duration-200 relative overflow-hidden ${
            selected === 'solo'
              ? 'bg-gradient-to-br from-teal-900/60 via-slate-900 to-slate-900 border-teal-400 ring-2 ring-teal-400/50 shadow-xl shadow-teal-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                  selected === 'solo'
                    ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  {t.soloTravel}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{t.soloDesc}</p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                selected === 'solo'
                  ? 'bg-teal-400 border-teal-400 text-slate-950'
                  : 'border-slate-700 bg-slate-800/40 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{t.soloFeature1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-teal-400 font-bold">•</span>
              <span>{t.soloFeature2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-teal-400 font-bold">•</span>
              <span>{t.soloFeature3}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-teal-400 font-bold">•</span>
              <span>{t.soloFeature4}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Family Travel */}
        <div
          onClick={() => handleSelect('family')}
          className={`cursor-pointer rounded-2xl p-4.5 border transition-all duration-200 relative overflow-hidden ${
            selected === 'family'
              ? 'bg-gradient-to-br from-cyan-900/60 via-slate-900 to-slate-900 border-cyan-400 ring-2 ring-cyan-400/50 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                  selected === 'family'
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  {t.familyTravel}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{t.familyDesc}</p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                selected === 'family'
                  ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                  : 'border-slate-700 bg-slate-800/40 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{t.familyFeature1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{t.familyFeature2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{t.familyFeature3}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{t.familyFeature4}</span>
            </div>
          </div>

          {/* Interactive Family Count Inputs if selected */}
          {selected === 'family' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-around text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium">Adults:</span>
                <div className="flex items-center gap-1.5 bg-slate-800 rounded-lg p-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                    className="w-5 h-5 flex items-center justify-center rounded bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-4 text-center font-bold text-cyan-300">
                    {adultsCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdultsCount(adultsCount + 1)}
                    className="w-5 h-5 flex items-center justify-center rounded bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="w-[1px] h-6 bg-slate-800" />

              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium">Children:</span>
                <div className="flex items-center gap-1.5 bg-slate-800 rounded-lg p-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-5 h-5 flex items-center justify-center rounded bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-4 text-center font-bold text-cyan-300">
                    {childrenCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount(childrenCount + 1)}
                    className="w-5 h-5 flex items-center justify-center rounded bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Connect With New People */}
        <div
          onClick={() => handleSelect('group')}
          className={`cursor-pointer rounded-2xl p-4.5 border transition-all duration-200 relative overflow-hidden ${
            selected === 'group'
              ? 'bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 border-amber-400 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                  selected === 'group'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  {t.groupTravel}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{t.groupDesc}</p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                selected === 'group'
                  ? 'bg-amber-400 border-amber-400 text-slate-950'
                  : 'border-slate-700 bg-slate-800/40 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{t.groupFeature1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span>{t.groupFeature2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span>{t.groupFeature3}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span>{t.groupFeature4}</span>
            </div>
          </div>

          {/* Group safety & privacy controls preview */}
          {selected === 'group' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">
                  Verified Travelers Only:
                </span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">
                  Consent-based Chat Invites:
                </span>
                <input
                  type="checkbox"
                  checked={allowChatInvites}
                  onChange={(e) => setAllowChatInvites(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>
              <div className="text-[10px] text-amber-400/90 flex items-center gap-1 pt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>Instant user block & anti-harassment reporting active</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="pt-3 pb-4 relative z-10">
        <button
          onClick={handleConfirm}
          type="button"
          className="w-full py-4 px-6 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 hover:opacity-95 active:scale-[0.99] transition-all shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2"
        >
          <span>{t.selectTravelTypeBtn}</span>
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};
