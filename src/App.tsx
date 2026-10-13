import React, { useState, useEffect } from 'react';
import {
  Language,
  TravelType,
  UserProfile,
  Destination,
  SavedItinerary,
  BookedPackage,
  CaretakerRequest,
} from './types';
import { translations } from './i18n/translations';
import { destinationsData } from './data/destinations';
import { LanguageSelectionScreen } from './components/LanguageSelectionScreen';
import { AuthScreen } from './components/AuthScreen';
import { TravelTypeSelection } from './components/TravelTypeSelection';
import { Navbar } from './components/Navbar';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { AiTripPlannerModal } from './components/AiTripPlannerModal';
import { DynamicPackageModal } from './components/DynamicPackageModal';
import { LocalCaretakerModal } from './components/LocalCaretakerModal';
import { AiChatbotDrawer } from './components/AiChatbotDrawer';
import { SoloSafetyModal } from './components/SoloSafetyModal';
import { GroupTravelCommunityModal } from './components/GroupTravelCommunityModal';
import { ExploreScreen } from './components/ExploreScreen';
import { MyTripsScreen } from './components/MyTripsScreen';
import { UserProfileScreen } from './components/UserProfileScreen';
import { Sparkles, Bot, PhoneCall, ShieldAlert } from 'lucide-react';

type AppStep = 'language_selection' | 'auth' | 'travel_type' | 'main';

export default function App() {
  // Persistence state
  const [currentStep, setCurrentStep] = useState<AppStep>(() => {
    const savedUser = localStorage.getItem('travelmate_user');
    const savedLang = localStorage.getItem('travelmate_lang');
    if (savedUser && savedLang) return 'main';
    if (savedLang) return 'auth';
    return 'language_selection';
  });

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    return (localStorage.getItem('travelmate_lang') as Language) || 'en';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('travelmate_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [travelType, setTravelType] = useState<TravelType>(() => {
    return currentUser?.travelType || 'solo';
  });

  // Main App Navigation Tab
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Modals state
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);
  const [tripPlannerTargetDest, setTripPlannerTargetDest] = useState<Destination | undefined>(undefined);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [packagesTargetDest, setPackagesTargetDest] = useState<Destination | undefined>(undefined);
  const [isCaretakersOpen, setIsCaretakersOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isGroupCommunityOpen, setIsGroupCommunityOpen] = useState(false);
  const [isTravelTypeModalOpen, setIsTravelTypeModalOpen] = useState(false);

  // User Saved Data
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>(() => {
    const local = localStorage.getItem('travelmate_itineraries');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        return [];
      }
    }
    // Pre-populate with realistic starter Tamil Nadu trip
    return [
      {
        id: 'itin-init-1',
        destinationId: 'ooty',
        destinationName: 'Ooty (Udhagamandalam)',
        startDate: '2026-11-20',
        days: 2,
        travelers: 2,
        totalBudget: 6000,
        travelType: 'solo',
        createdAt: '2026-10-12',
        schedule: [
          {
            dayNumber: 1,
            title: 'Day 1 – Heritage & Botanical Gardens',
            activities: [
              {
                id: 'act-1',
                time: '08:30 AM',
                place: 'Government Botanical Garden',
                description: 'Explore 55-acre terraced garden with rare fossils and exotic ferns.',
                duration: '2 hours',
                travelTime: '10 mins',
                estimatedCost: '₹40',
                category: 'sightseeing',
              },
              {
                id: 'act-2',
                time: '01:00 PM',
                place: 'Local Bakery & Hot Varkey',
                description: 'Taste authentic Nilgiri varkey and artisan chocolates.',
                duration: '1 hour',
                travelTime: '15 mins',
                estimatedCost: '₹120',
                category: 'food',
              },
            ],
          },
        ],
      },
    ];
  });

  const [bookedPackages, setBookedPackages] = useState<BookedPackage[]>(() => {
    const local = localStorage.getItem('travelmate_packages');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [caretakerRequests, setCaretakerRequests] = useState<CaretakerRequest[]>(() => {
    const local = localStorage.getItem('travelmate_caretakers');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Language selection change
  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('travelmate_lang', lang);
  };

  const handleLanguageConfirm = () => {
    setCurrentStep('auth');
  };

  // Auth flow success
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setTravelType(user.travelType || 'solo');
    setCurrentStep('travel_type');
  };

  // Travel type select
  const handleTravelTypeSelect = (type: TravelType, config?: any) => {
    setTravelType(type);
    if (currentUser) {
      const updated = { ...currentUser, travelType: type, ...(config || {}) };
      setCurrentUser(updated);
      localStorage.setItem('travelmate_user', JSON.stringify(updated));
    }
  };

  const handleTravelTypeConfirm = () => {
    setCurrentStep('main');
    setIsTravelTypeModalOpen(false);
  };

  // Itinerary handlers
  const handleSaveItinerary = (itinerary: SavedItinerary) => {
    const updated = [itinerary, ...savedItineraries];
    setSavedItineraries(updated);
    localStorage.setItem('travelmate_itineraries', JSON.stringify(updated));
  };

  const handleDeleteItinerary = (id: string) => {
    const updated = savedItineraries.filter((i) => i.id !== id);
    setSavedItineraries(updated);
    localStorage.setItem('travelmate_itineraries', JSON.stringify(updated));
  };

  // Package booking handler
  const handleBookPackage = (pkg: BookedPackage) => {
    const updated = [pkg, ...bookedPackages];
    setBookedPackages(updated);
    localStorage.setItem('travelmate_packages', JSON.stringify(updated));
  };

  // Caretaker request handler
  const handleRequestCaretaker = (request: CaretakerRequest) => {
    const updated = [request, ...caretakerRequests];
    setCaretakerRequests(updated);
    localStorage.setItem('travelmate_caretakers', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('travelmate_user');
    setCurrentUser(null);
    setCurrentStep('auth');
  };

  // 1. First-time Language Selection Screen
  if (currentStep === 'language_selection') {
    return (
      <LanguageSelectionScreen
        currentLanguage={currentLanguage}
        onSelectLanguage={handleLanguageChange}
        onConfirm={handleLanguageConfirm}
      />
    );
  }

  // 2. Authentication Screen
  if (currentStep === 'auth') {
    return (
      <AuthScreen
        currentLanguage={currentLanguage}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // 3. Travel Type Selection Screen (Onboarding stage)
  if (currentStep === 'travel_type') {
    return (
      <TravelTypeSelection
        currentLanguage={currentLanguage}
        currentType={travelType}
        onSelectType={handleTravelTypeSelect}
        onConfirm={handleTravelTypeConfirm}
      />
    );
  }

  // 4. Main App Interface
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-teal-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        travelType={travelType}
        onOpenTravelTypeModal={() => setIsTravelTypeModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main>
        {activeTab === 'home' && (
          <HomeDashboard
            currentLanguage={currentLanguage}
            travelType={travelType}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onOpenTripPlanner={(dest) => {
              setTripPlannerTargetDest(dest);
              setIsTripPlannerOpen(true);
            }}
            onOpenPackages={(dest) => {
              setPackagesTargetDest(dest);
              setIsPackagesOpen(true);
            }}
            onOpenCaretakers={() => setIsCaretakersOpen(true)}
            onOpenGroupCommunity={() => setIsGroupCommunityOpen(true)}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreScreen
            currentLanguage={currentLanguage}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
          />
        )}

        {activeTab === 'my-trips' && (
          <MyTripsScreen
            currentLanguage={currentLanguage}
            savedItineraries={savedItineraries}
            bookedPackages={bookedPackages}
            caretakerRequests={caretakerRequests}
            onOpenTripPlanner={() => setIsTripPlannerOpen(true)}
            onOpenPackages={() => setIsPackagesOpen(true)}
            onDeleteItinerary={handleDeleteItinerary}
          />
        )}

        {activeTab === 'profile' && currentUser && (
          <UserProfileScreen
            currentUser={currentUser}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onOpenTravelTypeModal={() => setIsTravelTypeModalOpen(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Floating AI Chatbot Button (visible throughout the app) */}
      <aside aria-label="Quick Actions" className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2.5">
        {/* Solo Safety SOS quick button */}
        {travelType === 'solo' && (
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="w-11 h-11 rounded-2xl bg-rose-600/90 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 hover:bg-rose-500 active:scale-95 transition-all border border-rose-400/40"
            title="Solo Safety SOS"
          >
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </button>
        )}

        {/* AI Chatbot Floating Trigger */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="group relative flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-teal-500/30 hover:opacity-95 active:scale-95 transition-all"
        >
          <div className="w-6 h-6 rounded-lg bg-slate-950 flex items-center justify-center text-teal-400">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span>TravelMate AI</span>
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping absolute -top-1 -right-1" />
        </button>
      </aside>

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'assistant') {
            setIsChatbotOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        currentLanguage={currentLanguage}
      />

      {/* Destination Details Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          currentLanguage={currentLanguage}
          currentUser={currentUser}
          onClose={() => setSelectedDestination(null)}
          onOpenTripPlanner={(dest) => {
            setSelectedDestination(null);
            setTripPlannerTargetDest(dest);
            setIsTripPlannerOpen(true);
          }}
          onOpenPackages={(dest) => {
            setSelectedDestination(null);
            setPackagesTargetDest(dest);
            setIsPackagesOpen(true);
          }}
          onOpenCaretakers={() => {
            setSelectedDestination(null);
            setIsCaretakersOpen(true);
          }}
        />
      )}

      {/* AI Smart Trip Planner Modal */}
      {isTripPlannerOpen && (
        <AiTripPlannerModal
          initialDestination={tripPlannerTargetDest}
          currentLanguage={currentLanguage}
          travelType={travelType}
          onClose={() => {
            setIsTripPlannerOpen(false);
            setTripPlannerTargetDest(undefined);
          }}
          onSaveItinerary={handleSaveItinerary}
        />
      )}

      {/* Dynamic Packages Modal */}
      {isPackagesOpen && (
        <DynamicPackageModal
          initialDestination={packagesTargetDest}
          currentLanguage={currentLanguage}
          travelType={travelType}
          onClose={() => {
            setIsPackagesOpen(false);
            setPackagesTargetDest(undefined);
          }}
          onBookPackage={handleBookPackage}
        />
      )}

      {/* Local Caretakers Modal */}
      {isCaretakersOpen && (
        <LocalCaretakerModal
          currentLanguage={currentLanguage}
          onClose={() => setIsCaretakersOpen(false)}
          onRequestCaretaker={handleRequestCaretaker}
        />
      )}

      {/* AI Tourism Chatbot Drawer */}
      <AiChatbotDrawer
        currentLanguage={currentLanguage}
        travelType={travelType}
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenTripPlanner={() => {
          setIsChatbotOpen(false);
          setIsTripPlannerOpen(true);
        }}
        onOpenCaretakers={() => {
          setIsChatbotOpen(false);
          setIsCaretakersOpen(true);
        }}
      />

      {/* Solo Safety & Emergency Modal */}
      {isEmergencyOpen && (
        <SoloSafetyModal
          currentLanguage={currentLanguage}
          onClose={() => setIsEmergencyOpen(false)}
        />
      )}

      {/* Group Travel Community Modal */}
      {isGroupCommunityOpen && (
        <GroupTravelCommunityModal
          currentLanguage={currentLanguage}
          onClose={() => setIsGroupCommunityOpen(false)}
        />
      )}

      {/* Travel Type Quick Switch Modal */}
      {isTravelTypeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[92vh] sm:h-[86vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex justify-end">
              <button
                onClick={() => setIsTravelTypeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TravelTypeSelection
                currentLanguage={currentLanguage}
                currentType={travelType}
                onSelectType={handleTravelTypeSelect}
                onConfirm={handleTravelTypeConfirm}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
