import React, { useState } from 'react';
import { GroupTrip, Language } from '../types';
import { initialGroupTrips } from '../data/groupTrips';
import {
  X,
  HeartHandshake,
  Users,
  ShieldCheck,
  Calendar,
  MessageSquare,
  UserPlus,
  Send,
  Flag,
  Ban,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface GroupTravelCommunityModalProps {
  currentLanguage: Language;
  onClose: () => void;
}

export const GroupTravelCommunityModal: React.FC<GroupTravelCommunityModalProps> = ({
  currentLanguage,
  onClose,
}) => {
  const [trips, setTrips] = useState<GroupTrip[]>(initialGroupTrips);
  const [selectedTrip, setSelectedTrip] = useState<GroupTrip | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  // Group chat simulation
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'Vigneshwaran K. (Host)',
      text: 'Vanakkam travelers! Welcome to the Nilgiris tea trail planning chat. We have 3 spots remaining for our homestay!',
      time: '10:15 AM',
    },
    {
      sender: 'Deepa Rajan',
      text: 'Super excited! Will we be doing the Agaya Gangai waterfall descent on Day 2?',
      time: '10:45 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleJoinTrip = (tripId: string) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId ? { ...t, joinedCount: Math.min(t.totalSpots, t.joinedCount + 1) } : t
      )
    );
    setJoinSuccess('Join request submitted! The verified trip host has been notified.');
    setTimeout(() => setJoinSuccess(null), 3000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'You',
        text: chatInput.trim(),
        time: 'Just now',
      },
    ]);
    setChatInput('');
  };

  const handleBlockReportUser = (userName: string) => {
    setReportSuccess(`User "${userName}" has been blocked and flagged for safety moderation.`);
    setTimeout(() => setReportSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[90vh] sm:h-[84vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 p-0.5 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                Connect With New People
              </h2>
              <span className="text-[10px] text-amber-400 font-semibold">
                Verified Group Journeys • Tamil Nadu
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
          {joinSuccess && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{joinSuccess}</span>
            </div>
          )}

          {reportSuccess && (
            <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{reportSuccess}</span>
            </div>
          )}

          {/* Privacy & Safety Banner */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Traveler Community & Privacy Controls</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every group host is ID-verified. Contact numbers remain private until both travelers accept the connection. Harassment is strictly prohibited with one-tap blocking.
            </p>
          </div>

          {/* Group Chat Drawer View if open */}
          {showChat && selectedTrip ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <h4 className="font-bold text-white text-xs">
                    {selectedTrip.title} (Trip Group)
                  </h4>
                  <span className="text-[10px] text-teal-400">
                    Host: {selectedTrip.hostName}
                  </span>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-xs text-slate-400 hover:text-white font-semibold"
                >
                  Close Chat
                </button>
              </div>

              <div className="h-64 overflow-y-auto space-y-2 p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === 'You' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-[9px] text-slate-400 mb-0.5">
                      {msg.sender} • {msg.time}
                    </span>
                    <div
                      className={`max-w-[85%] p-2.5 rounded-2xl text-xs ${
                        msg.sender === 'You'
                          ? 'bg-amber-400 text-slate-950 rounded-br-none font-medium'
                          : 'bg-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type group message..."
                  className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Trips List */
            <div className="space-y-3.5">
              <h3 className="font-bold text-white text-xs">
                Upcoming Open Group Trips ({trips.length})
              </h3>

              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        📍 {trip.destination}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-0.5">
                        {trip.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {trip.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-900">
                    <div className="text-slate-300">
                      <strong>Dates:</strong> {trip.dates}
                    </div>
                    <div className="text-right">
                      <strong>Est. Split:</strong>{' '}
                      <span className="text-teal-300 font-bold">
                        ₹{trip.estimatedCostPerPerson.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Joined Members preview */}
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-2">
                        {trip.joinedMembers.map((m, idx) => (
                          <img
                            key={idx}
                            src={m.avatar}
                            alt={m.name}
                            title={m.name}
                            className="w-6 h-6 rounded-full border-2 border-slate-950 object-cover"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {trip.joinedCount}/{trip.totalSpots} spots filled
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTrip(trip);
                          setShowChat(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Group Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleJoinTrip(trip.id)}
                        className="py-1.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs active:scale-95 transition-all shadow-sm"
                      >
                        Request to Join
                      </button>
                    </div>
                  </div>

                  {/* Host info and safety report */}
                  <div className="pt-1.5 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span>Host: {trip.hostName}</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    </span>
                    <button
                      onClick={() => handleBlockReportUser(trip.hostName)}
                      className="hover:text-rose-400 flex items-center gap-0.5"
                    >
                      <Ban className="w-3 h-3" />
                      <span>Block / Report</span>
                    </button>
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
