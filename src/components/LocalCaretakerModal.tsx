import React, { useState, useEffect } from 'react';
import { Caretaker, Language, CaretakerRequest } from '../types';
import { translations } from '../i18n/translations';
import {
  X,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Calendar,
  Send,
  Star,
  UserCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';

interface LocalCaretakerModalProps {
  currentLanguage: Language;
  onClose: () => void;
  onRequestCaretaker: (request: CaretakerRequest) => void;
}

export const LocalCaretakerModal: React.FC<LocalCaretakerModalProps> = ({
  currentLanguage,
  onClose,
  onRequestCaretaker,
}) => {
  const t = translations[currentLanguage];

  const [caretakers, setCaretakers] = useState<Caretaker[]>([
    {
      id: 'ct-1',
      name: 'Senthil Murugan',
      phone: '+91 94432 18765',
      languages: ['Tamil', 'English', 'Malayalam'],
      serviceArea: 'Ooty & Nilgiris',
      experience: '8+ years wildlife & hill guide',
      serviceCharge: '₹1,200 / day',
      rating: 4.9,
      reviewCount: 142,
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      verified: true,
      availability: 'Available Today',
      status: 'approved',
      bio: 'Native Nilgiris resident. Specializes in hidden tea trails, Toda tribal culture, and safe mountain driving routes.',
    },
    {
      id: 'ct-2',
      name: 'Ananya Ramanathan',
      phone: '+91 98401 23456',
      languages: ['Tamil', 'English', 'Hindi'],
      serviceArea: 'Madurai & Chettinad',
      experience: '6+ years temple heritage & culinary historian',
      serviceCharge: '₹1,500 / day',
      rating: 4.9,
      reviewCount: 98,
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      verified: true,
      availability: 'Available Today',
      status: 'approved',
      bio: 'Madurai local with master’s degree in South Indian Epigraphy. Guides authentic temple walks, night food streets, and Chettinad palatial mansions.',
    },
    {
      id: 'ct-3',
      name: 'Karthik Subramanian',
      phone: '+91 94863 77123',
      languages: ['Tamil', 'English', 'Telugu'],
      serviceArea: 'Rameshwaram & Dhanushkodi',
      experience: '5+ years coastal pilgrimage & eco-tourism',
      serviceCharge: '₹1,100 / day',
      rating: 4.8,
      reviewCount: 86,
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      verified: true,
      availability: 'Book in Advance',
      status: 'approved',
      bio: 'Deep knowledge of Pamban Strait history, 22 sacred theertham rituals, and safe off-beat visits to the ghost town of Dhanushkodi.',
    },
    {
      id: 'ct-4',
      name: 'Muthuvel Raja',
      phone: '+91 97890 55432',
      languages: ['Tamil', 'English', 'Malayalam'],
      serviceArea: 'Valparai & Pollachi',
      experience: '10+ years rainforest & tea plantation naturalist',
      serviceCharge: '₹1,400 / day',
      rating: 5.0,
      reviewCount: 110,
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      verified: true,
      availability: 'Available Today',
      status: 'approved',
      bio: 'Certified Western Ghats naturalist. Guides bird watching, Sholayar dam treks, and spots lion-tailed macaques responsibly.',
    },
  ]);

  // Modal views
  const [activeView, setActiveView] = useState<'browse' | 'chat' | 'request' | 'register' | 'admin'>('browse');
  const [selectedCaretaker, setSelectedCaretaker] = useState<Caretaker | null>(null);

  // Live Simulated Chat State
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'caretaker'; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');

  // Request Assistance Form State
  const [reqDate, setReqDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [reqTravelers, setReqTravelers] = useState(2);
  const [reqNotes, setReqNotes] = useState('Need assistance with local guidance, authentic food spots, and safe transport.');
  const [reqSuccess, setReqSuccess] = useState(false);

  // Caretaker Registration Workflow State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regArea, setRegArea] = useState('Ooty & Nilgiris');
  const [regExp, setRegExp] = useState('5 years local resident');
  const [regCharge, setRegCharge] = useState('₹1,200 / day');
  const [regLanguages, setRegLanguages] = useState('Tamil, English');
  const [regSuccess, setRegSuccess] = useState(false);

  // Open Chat
  const handleStartChat = (ct: Caretaker) => {
    setSelectedCaretaker(ct);
    setChatMessages([
      {
        sender: 'caretaker',
        text: `Vanakkam! I am ${ct.name}, your verified caretaker for ${ct.serviceArea}. How can I assist you with your upcoming journey?`,
        time: 'Just now',
      },
    ]);
    setActiveView('chat');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedCaretaker) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Now' },
    ]);
    setChatInput('');

    // Simulated responsive reply from verified guide
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'caretaker',
          text: `Thank you for reaching out! I have noted your request regarding "${userMsg.slice(0, 30)}...". I am ready to assist you during your visit to ${selectedCaretaker.serviceArea}. You can also call me directly or submit a formal booking request!`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  // Open Request Form
  const handleOpenRequest = (ct: Caretaker) => {
    setSelectedCaretaker(ct);
    setActiveView('request');
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaretaker) return;

    const newRequest: CaretakerRequest = {
      id: `req-${Date.now()}`,
      caretakerId: selectedCaretaker.id,
      caretakerName: selectedCaretaker.name,
      serviceArea: selectedCaretaker.serviceArea,
      date: reqDate,
      travelersCount: reqTravelers,
      notes: reqNotes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onRequestCaretaker(newRequest);
    setReqSuccess(true);
    setTimeout(() => {
      setReqSuccess(false);
      setActiveView('browse');
    }, 2000);
  };

  // Submit Registration
  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) return;

    const newCt: Caretaker = {
      id: `ct-${Date.now()}`,
      name: regName.trim(),
      phone: regPhone.trim(),
      languages: regLanguages.split(',').map((s) => s.trim()),
      serviceArea: regArea,
      experience: regExp,
      serviceCharge: regCharge,
      rating: 5.0,
      reviewCount: 1,
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      verified: false,
      availability: 'Available Today',
      status: 'pending',
      bio: 'New caretaker applicant awaiting administrative background check.',
    };

    setCaretakers((prev) => [newCt, ...prev]);
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setActiveView('browse');
    }, 2000);
  };

  // Admin Toggle Caretaker Status
  const handleAdminApprove = (id: string) => {
    setCaretakers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved', verified: true } : c))
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[92vh] sm:h-[88vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-400 p-0.5 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                {t.localCaretakerTitle}
              </h2>
              <span className="text-[10px] text-emerald-400 font-semibold">
                Tamil Nadu Verified Native Assistance
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

        {/* View Switcher Bar */}
        <div className="flex border-b border-slate-800 px-3 py-1.5 bg-slate-950 text-xs gap-2">
          <button
            onClick={() => setActiveView('browse')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeView === 'browse'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Caretakers
          </button>
          <button
            onClick={() => setActiveView('register')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeView === 'register'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            + {t.registerAsCaretaker}
          </button>
          <button
            onClick={() => setActiveView('admin')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeView === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin Panel
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* VIEW 1: BROWSE CARETAKERS */}
          {activeView === 'browse' && (
            <div className="space-y-3.5">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl text-slate-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Connect directly with verified local residents for personalized tours, heritage walks, emergency response, and off-beat local secrets.
                </span>
              </div>

              {caretakers
                .filter((c) => c.status === 'approved')
                .map((caretaker) => (
                  <div
                    key={caretaker.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-emerald-500/40 transition-colors shadow-md"
                  >
                    <div className="flex gap-3">
                      <img
                        src={caretaker.photoUrl}
                        alt={caretaker.name}
                        className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-white text-sm">
                            {caretaker.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </div>

                        <div className="text-[11px] text-teal-400 font-medium mt-0.5">
                          📍 {caretaker.serviceArea}
                        </div>

                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                          <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{caretaker.rating}</span>
                            <span className="text-slate-500 font-normal">
                              ({caretaker.reviewCount})
                            </span>
                          </span>
                          <span>•</span>
                          <span>{caretaker.experience}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {caretaker.bio}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                      <div>
                        <strong>Languages:</strong> {caretaker.languages.join(', ')}
                      </div>
                      <div className="text-right">
                        <strong>Charge:</strong>{' '}
                        <span className="text-emerald-300 font-bold">
                          {caretaker.serviceCharge}
                        </span>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <a
                        href={`tel:${caretaker.phone.replace(/[^0-9]/g, '')}`}
                        className="flex-1 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold flex items-center justify-center gap-1.5 text-xs transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.callCaretaker}</span>
                      </a>

                      <button
                        onClick={() => handleStartChat(caretaker)}
                        className="flex-1 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold flex items-center justify-center gap-1.5 text-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{t.chatWithCaretaker}</span>
                      </button>

                      <button
                        onClick={() => handleOpenRequest(caretaker)}
                        className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-1 text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                      >
                        <span>{t.requestAssistance}</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* VIEW 2: LIVE CHAT WITH CARETAKER */}
          {activeView === 'chat' && selectedCaretaker && (
            <div className="flex flex-col h-full space-y-3">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedCaretaker.photoUrl}
                    alt={selectedCaretaker.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-white text-xs">
                      {selectedCaretaker.name}
                    </h5>
                    <span className="text-[10px] text-emerald-400">
                      Online • {selectedCaretaker.serviceArea}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView('browse')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Back to List
                </button>
              </div>

              {/* Chat Message Box */}
              <div className="flex-1 min-h-[300px] max-h-[380px] overflow-y-auto space-y-2 p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-2.5 rounded-2xl text-xs ${
                        msg.sender === 'user'
                          ? 'bg-teal-500 text-slate-950 rounded-br-none font-medium'
                          : 'bg-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-70 block text-right mt-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-teal-400 text-slate-950 font-bold hover:bg-teal-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* VIEW 3: REQUEST ASSISTANCE FORM */}
          {activeView === 'request' && selectedCaretaker && (
            <form onSubmit={handleSubmitRequest} className="space-y-3.5">
              {reqSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Assistance request submitted to {selectedCaretaker.name}!</span>
                </div>
              )}

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <img
                  src={selectedCaretaker.photoUrl}
                  alt={selectedCaretaker.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-white text-xs">
                    Booking: {selectedCaretaker.name}
                  </h4>
                  <p className="text-[11px] text-teal-400">
                    Area: {selectedCaretaker.serviceArea} • {selectedCaretaker.serviceCharge}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Travel Date:
                </label>
                <input
                  type="date"
                  value={reqDate}
                  onChange={(e) => setReqDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Number of Travelers:
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={reqTravelers}
                  onChange={(e) => setReqTravelers(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Specific Assistance Needed / Notes:
                </label>
                <textarea
                  value={reqNotes}
                  onChange={(e) => setReqNotes(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  placeholder="e.g. Guided tour for elderly parents, hidden food stops, language translation..."
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveView('browse')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 hover:bg-emerald-400"
                >
                  Confirm Assistance
                </button>
              </div>
            </form>
          )}

          {/* VIEW 4: JOIN AS CARETAKER REGISTRATION */}
          {activeView === 'register' && (
            <form onSubmit={handleSubmitRegistration} className="space-y-3">
              {regSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Application submitted! Pending admin review.</span>
                </div>
              )}

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-300">
                Are you a local resident of Tamil Nadu with deep knowledge of your district? Join our verified network to guide tourists and earn directly.
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Manikandan V."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Phone Number (with caller consent):
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Service Area:
                </label>
                <input
                  type="text"
                  value={regArea}
                  onChange={(e) => setRegArea(e.target.value)}
                  placeholder="e.g. Thanjavur & Kumbakonam"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Languages Spoken:
                </label>
                <input
                  type="text"
                  value={regLanguages}
                  onChange={(e) => setRegLanguages(e.target.value)}
                  placeholder="e.g. Tamil, English, Hindi"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Experience:
                  </label>
                  <input
                    type="text"
                    value={regExp}
                    onChange={(e) => setRegExp(e.target.value)}
                    placeholder="e.g. 7 years temple guide"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Day Rate:
                  </label>
                  <input
                    type="text"
                    value={regCharge}
                    onChange={(e) => setRegCharge(e.target.value)}
                    placeholder="e.g. ₹1,200 / day"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 hover:bg-teal-300 transition-all"
              >
                Submit Caretaker Application
              </button>
            </form>
          )}

          {/* VIEW 5: ADMIN APPROVAL PANEL */}
          {activeView === 'admin' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-2xl text-amber-200">
                <span className="font-bold block text-xs">
                  Administrative Verification Dashboard
                </span>
                <span className="text-[11px]">
                  Review and approve pending caretaker applications before listing them live to tourists.
                </span>
              </div>

              {caretakers.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-white text-xs">{c.name}</h5>
                    <span className="text-[11px] text-slate-400">
                      {c.serviceArea} • {c.phone}
                    </span>
                    <div className="mt-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          c.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        Status: {c.status}
                      </span>
                    </div>
                  </div>

                  {c.status !== 'approved' && (
                    <button
                      onClick={() => handleAdminApprove(c.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                    >
                      Approve
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
