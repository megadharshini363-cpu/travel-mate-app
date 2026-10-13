export type Language = 'en' | 'ta' | 'hi' | 'ml' | 'te';

export type TravelType = 'solo' | 'family' | 'group';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  language: Language;
  travelType: TravelType;
  phone?: string;
  familyConfig?: {
    adults: number;
    children: number;
  };
  groupPreferences?: {
    verifiedOnly: boolean;
    interests: string[];
    allowChatInvites: boolean;
  };
  savedDestinationIds: string[];
  favoritePlaceIds: string[];
  bookedPackages: BookedPackage[];
  caretakerRequests: CaretakerRequest[];
  savedItineraries: SavedItinerary[];
}

export interface Attraction {
  id: string;
  name: string;
  category: 'sightseeing' | 'historical' | 'nature' | 'adventure' | 'spiritual';
  description: string;
  image: string;
  entryFee: string;
  openingHours: string;
  coordinates: [number, number]; // [lat, lng]
}

export interface LocalFood {
  id: string;
  name: string;
  image: string;
  isVegetarian: boolean;
  approxPrice: string;
  recommendedRestaurants: string[];
  description: string;
}

export interface Hotel {
  id: string;
  name: string;
  type: 'budget' | 'luxury' | 'family';
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
  bookingUrl?: string;
}

export interface EmergencyService {
  name: string;
  type: 'hospital' | 'police' | 'pharmacy' | 'helpline';
  address: string;
  contactNumber: string;
  distanceKm: number;
  coordinates?: [number, number];
  available24x7: boolean;
}

export interface TouristReview {
  id: string;
  destinationId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  photos?: string[];
  videos?: string[];
  helpfulCount: number;
  reported?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  nameLocal?: { [key in Language]?: string };
  city: string;
  district: string;
  state: 'Tamil Nadu';
  tagline: string;
  description: string;
  image: string;
  galleryImages: string[];
  category: 'popular' | 'hidden' | 'trending' | 'weekend' | 'budget';
  rating: number;
  reviewCount: number;
  estimatedCost: string;
  coordinates: [number, number];
  bestTimeToVisit: string;
  idealDays: number;
  attractions: Attraction[];
  foods: LocalFood[];
  hotels: Hotel[];
  emergencyServices: EmergencyService[];
  tags: string[];
}

export interface ItineraryActivity {
  id: string;
  time: string;
  place: string;
  description: string;
  duration: string;
  travelTime: string;
  estimatedCost: string;
  category: 'sightseeing' | 'food' | 'adventure' | 'relaxation';
  tips?: string;
  nextPlace?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: ItineraryActivity[];
}

export interface SavedItinerary {
  id: string;
  destinationId: string;
  destinationName: string;
  startDate: string;
  days: number;
  travelers: number;
  totalBudget: number;
  travelType: TravelType;
  schedule: ItineraryDay[];
  createdAt: string;
}

export interface Caretaker {
  id: string;
  name: string;
  phone: string;
  languages: string[];
  serviceArea: string;
  experience: string;
  serviceCharge: string;
  rating: number;
  reviewCount: number;
  photoUrl: string;
  verified: boolean;
  availability: 'Available Today' | 'Book in Advance';
  status: 'approved' | 'pending' | 'rejected';
  bio: string;
}

export interface CaretakerRequest {
  id: string;
  caretakerId: string;
  caretakerName: string;
  serviceArea: string;
  date: string;
  travelersCount: number;
  notes: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface GroupTrip {
  id: string;
  title: string;
  destination: string;
  destinationId: string;
  dates: string;
  totalSpots: number;
  joinedCount: number;
  hostName: string;
  hostAvatar: string;
  hostVerified: boolean;
  estimatedCostPerPerson: number;
  interests: string[];
  description: string;
  joinedMembers: {
    name: string;
    avatar: string;
    verified: boolean;
  }[];
}

export interface BookedPackage {
  id: string;
  destinationId: string;
  destinationName: string;
  packageType: 'budget' | 'standard' | 'premium';
  travelType: TravelType;
  travelersCount: number;
  durationDays: number;
  startDate: string;
  totalEstimatedPrice: number;
  priceBreakdown: {
    transport: number;
    accommodation: number;
    food: number;
    activities: number;
    serviceTax: number;
  };
  transportType: string;
  hotelCategory: string;
  status: 'confirmed' | 'pending';
}
