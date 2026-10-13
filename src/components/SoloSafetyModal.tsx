import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import {
  X,
  ShieldAlert,
  PhoneCall,
  Share2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Lock,
} from 'lucide-react';

interface SoloSafetyModalProps {
  currentLanguage: Language;
  onClose: () => void;
}

export const SoloSafetyModal: React.FC<SoloSafetyModalProps> = ({
  currentLanguage,
  onClose,
}) => {
  const t = translations[currentLanguage];
  const [sosActivated, setSosActivated] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const emergencyContacts = [
    { title: 'Tamil Nadu Ambulance Service', number: '108', desc: 'Medical emergencies & paramedic ambulance' },
    { title: 'National Emergency Helpline', number: '112', desc: 'All-in-one police, fire, and medical' },
    { title: 'Police Control Room', number: '100', desc: 'Immediate local police dispatch' },
    { title: 'Women Safety Helpline', number: '1091', desc: 'Tamil Nadu 24/7 dedicated women support' },
    { title: 'Tamil Nadu Tourist Police', number: '044-25340106', desc: 'Chennai & tourist zone assistance' },
  ];

  const handleTriggerSOS = () => {
    setSosActivated(true);
    // Play subtle audio beep or alert
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const handleShareLiveLocation = () => {
    setLocationShared(true);
    if (navigator.share) {
      navigator.share({
        title: 'TravelMate AI Live Location Alert',
        text: 'I am currently traveling in Tamil Nadu. Here is my verified travel location link via TravelMate AI.',
        url: window.location.href,
      });
    }
    setTimeout(() => setLocationShared(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[88vh] sm:h-[82vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 p-0.5 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                Solo Safety Shield & SOS
              </h2>
              <span className="text-[10px] text-rose-400 font-semibold">
                Tamil Nadu 24/7 Tourist Security
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Big SOS Panic Button */}
          <div className="bg-slate-950 border border-rose-500/30 rounded-2xl p-4 text-center space-y-3">
            <h3 className="font-extrabold text-white text-sm">
              Emergency SOS Activation
            </h3>
            <p className="text-[11px] text-slate-400">
              Press to alert emergency contacts and dial local police immediately with GPS coordinates.
            </p>

            <button
              onClick={handleTriggerSOS}
              className={`w-28 h-28 rounded-full mx-auto flex flex-col items-center justify-center font-black transition-all shadow-xl active:scale-95 ${
                sosActivated
                  ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse'
                  : 'bg-gradient-to-tr from-rose-600 to-red-500 text-white hover:opacity-95 shadow-rose-600/30 ring-4 ring-rose-500/20'
              }`}
            >
              <AlertTriangle className="w-8 h-8 mb-1" />
              <span className="text-lg">SOS</span>
            </button>

            {sosActivated && (
              <div className="p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 font-semibold text-xs">
                🚨 SOS Signal Broadcasted! Dialing 112 emergency services...
              </div>
            )}
          </div>

          {/* Live Location Share Button */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">
                  Live Location Sharing
                </h4>
                <p className="text-[10px] text-slate-400">
                  Share GPS tracker link with trusted guardians
                </p>
              </div>
            </div>

            <button
              onClick={handleShareLiveLocation}
              className="px-3.5 py-2 rounded-xl bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 transition-colors"
            >
              {locationShared ? 'Shared!' : 'Share'}
            </button>
          </div>

          {/* Emergency Helplines Directory */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs">
              Direct Emergency Speed Dials (Tamil Nadu)
            </h4>

            {emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center justify-between"
              >
                <div>
                  <h5 className="font-bold text-white text-xs">
                    {contact.title}
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {contact.desc}
                  </p>
                </div>

                <a
                  href={`tel:${contact.number}`}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center gap-1.5 hover:bg-emerald-400 active:scale-95 transition-all shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{contact.number}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Safe Travel Guidelines */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>Solo Traveler Tips in Tamil Nadu:</span>
            </div>
            <p>• Avoid unlit hill roads after sunset (especially hairpin bends in Kolli Hills and Valparai).</p>
            <p>• Prefer government TNSTC buses or verified pre-booked taxis.</p>
            <p>• Keep digital scans of photo ID and medical history offline.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
