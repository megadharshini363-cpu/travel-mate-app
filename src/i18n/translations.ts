import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  selectLanguage: string;
  continueBtn: string;
  welcomeSubtitle: string;
  chooseLanguageDesc: string;
  
  // Auth
  login: string;
  register: string;
  createAccount: string;
  forgotPassword: string;
  usernameOrEmail: string;
  password: string;
  fullName: string;
  showPassword: string;
  hidePassword: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  loginAsGuest: string;
  authSuccess: string;
  invalidCredentials: string;
  passwordResetSent: string;

  // Travel Type
  howToTravel: string;
  travelTypeSubtitle: string;
  soloTravel: string;
  soloDesc: string;
  soloFeature1: string;
  soloFeature2: string;
  soloFeature3: string;
  soloFeature4: string;
  familyTravel: string;
  familyDesc: string;
  familyFeature1: string;
  familyFeature2: string;
  familyFeature3: string;
  familyFeature4: string;
  groupTravel: string;
  groupDesc: string;
  groupFeature1: string;
  groupFeature2: string;
  groupFeature3: string;
  groupFeature4: string;
  selectTravelTypeBtn: string;

  // Dashboard
  searchPlaceholder: string;
  popularDestinations: string;
  hiddenAreas: string;
  trendingPlaces: string;
  weekendGetaways: string;
  budgetFriendly: string;
  recommendedForYou: string;
  nearbyAttractions: string;
  explore: string;
  viewAll: string;
  perPerson: string;
  rating: string;
  cost: string;

  // Destination Details
  overview: string;
  attractions: string;
  localFood: string;
  hotels: string;
  emergencyServices: string;
  reviews: string;
  planTripWithAi: string;
  viewPackages: string;
  openGoogleMaps: string;
  entryFee: string;
  timing: string;
  veg: string;
  nonVeg: string;
  recommendedEateries: string;
  perNight: string;
  callNow: string;
  emergencyNotice: string;
  writeReview: string;
  yourRating: string;
  shareExperience: string;
  submitReview: string;
  reviewPhotos: string;
  reviewVideos: string;
  allMedia: string;

  // AI Trip Planner
  tripPlannerTitle: string;
  tripPlannerSubtitle: string;
  destination: string;
  startingLocation: string;
  travelDates: string;
  numberOfDays: string;
  numberOfTravelers: string;
  totalBudget: string;
  interests: string;
  preferredTimings: string;
  generateItineraryBtn: string;
  generatingItinerary: string;
  day: string;
  estimatedCost: string;
  expectedDuration: string;
  travelDistance: string;
  saveItinerary: string;
  editActivity: string;
  addActivity: string;
  removeActivity: string;

  // Dynamic Packages
  packagesTitle: string;
  budgetPackage: string;
  standardPackage: string;
  premiumPackage: string;
  costBreakdown: string;
  transport: string;
  accommodation: string;
  food: string;
  activities: string;
  serviceTax: string;
  totalEstimated: string;
  estimatedPriceNote: string;
  bookPackageBtn: string;

  // Local Caretaker
  localCaretakerTitle: string;
  localCaretakerSubtitle: string;
  verifiedGuide: string;
  languagesSpoken: string;
  serviceArea: string;
  experience: string;
  charges: string;
  contactCaretaker: string;
  callCaretaker: string;
  chatWithCaretaker: string;
  requestAssistance: string;
  registerAsCaretaker: string;
  adminVerification: string;

  // AI Assistant
  aiAssistantTitle: string;
  aiAssistantSubtitle: string;
  askAnything: string;
  send: string;
  suggestedQuestions: string;

  // Navigation
  navHome: string;
  navExplore: string;
  navMyTrips: string;
  navAiAssistant: string;
  navProfile: string;

  // Profile
  myProfile: string;
  travelPreferences: string;
  savedDestinations: string;
  upcomingTrips: string;
  caretakerBookings: string;
  appSettings: string;
  logout: string;
  changeLanguage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'TravelMate AI',
    tagline: 'Your Smart AI Companion for Tamil Nadu Tourism',
    selectLanguage: 'Choose Your Language',
    continueBtn: 'Continue',
    welcomeSubtitle: 'Discover ancient temples, misty hill stations, and hidden virgin landscapes of Tamil Nadu',
    chooseLanguageDesc: 'Select your preferred language. You can change this anytime from Settings.',

    login: 'Login',
    register: 'Register',
    createAccount: 'Create Account',
    forgotPassword: 'Forgot Password?',
    usernameOrEmail: 'Username or Email',
    password: 'Password',
    fullName: 'Full Name',
    showPassword: 'Show',
    hidePassword: 'Hide',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    loginAsGuest: 'Explore as Guest',
    authSuccess: 'Login successful!',
    invalidCredentials: 'Invalid username or password',
    passwordResetSent: 'Password reset link sent to your email',

    howToTravel: 'How would you like to travel?',
    travelTypeSubtitle: 'We will personalize destinations, packages, and emergency safety around your style',
    soloTravel: 'Solo Travel',
    soloDesc: 'Explore freely with safety-first solo guidance',
    soloFeature1: 'Solo traveler safety shield & 24/7 SOS',
    soloFeature2: 'Budget-friendly boutique hostels',
    soloFeature3: 'Personalized flexible itinerary',
    soloFeature4: 'Live location sharing with guardians',
    familyTravel: 'Family Travel',
    familyDesc: 'Comfortable & memorable vacations for all ages',
    familyFeature1: 'Family-friendly resorts & spacious suites',
    familyFeature2: 'Child-safe attractions & relaxed pace',
    familyFeature3: 'Nutritious & kid-friendly food spots',
    familyFeature4: 'Dedicated family transport options',
    groupTravel: 'Connect With New People',
    groupDesc: 'Join exciting group journeys & meet fellow travelers',
    groupFeature1: 'Verified traveler community profiles',
    groupFeature2: 'Group travel packages & split costs',
    groupFeature3: 'In-app group chats & joining requests',
    groupFeature4: 'Consent-based privacy & blocking controls',
    selectTravelTypeBtn: 'Confirm Travel Style',

    searchPlaceholder: 'Where do you want to explore in Tamil Nadu?',
    popularDestinations: 'Popular Destinations',
    hiddenAreas: 'Hidden Areas & Secret Spots',
    trendingPlaces: 'Trending Tourist Places',
    weekendGetaways: 'Weekend Getaways',
    budgetFriendly: 'Budget-Friendly Trips',
    recommendedForYou: 'Recommended For You',
    nearbyAttractions: 'Nearby Attractions',
    explore: 'Explore',
    viewAll: 'View All',
    perPerson: 'per person',
    rating: 'Rating',
    cost: 'Est. Cost',

    overview: 'Overview',
    attractions: 'Attractions',
    localFood: 'Famous Food',
    hotels: 'Hotels & Stays',
    emergencyServices: 'Emergency Services',
    reviews: 'Reviews',
    planTripWithAi: 'Plan AI Trip',
    viewPackages: 'View Packages',
    openGoogleMaps: 'Open in Google Maps',
    entryFee: 'Entry Fee',
    timing: 'Timing',
    veg: 'Vegetarian',
    nonVeg: 'Non-Vegetarian',
    recommendedEateries: 'Best Local Restaurants',
    perNight: 'night',
    callNow: 'Call Now',
    emergencyNotice: 'Verified Government & Medical Helplines in Tamil Nadu',
    writeReview: 'Write a Review',
    yourRating: 'Your Rating',
    shareExperience: 'Share your travel experience...',
    submitReview: 'Submit Review',
    reviewPhotos: 'Travel Photos',
    reviewVideos: 'Travel Videos',
    allMedia: 'All Photos & Videos',

    tripPlannerTitle: 'AI Smart Trip Planner',
    tripPlannerSubtitle: 'Optimized hour-by-hour schedules powered by intelligent AI',
    destination: 'Destination',
    startingLocation: 'Starting From',
    travelDates: 'Travel Dates',
    numberOfDays: 'Trip Duration (Days)',
    numberOfTravelers: 'Number of Travelers',
    totalBudget: 'Total Estimated Budget (₹)',
    interests: 'Interests & Vibes',
    preferredTimings: 'Preferred Daily Schedule',
    generateItineraryBtn: 'Generate AI Itinerary',
    generatingItinerary: 'Crafting personalized itinerary...',
    day: 'Day',
    estimatedCost: 'Est. Cost',
    expectedDuration: 'Visit Duration',
    travelDistance: 'Travel Time & Distance',
    saveItinerary: 'Save to My Trips',
    editActivity: 'Edit',
    addActivity: 'Add Activity',
    removeActivity: 'Remove',

    packagesTitle: 'Dynamic Travel Packages',
    budgetPackage: 'Budget Package',
    standardPackage: 'Standard Package',
    premiumPackage: 'Premium Package',
    costBreakdown: 'Transparent Cost Breakdown',
    transport: 'Transportation',
    accommodation: 'Accommodation',
    food: 'Food & Dining',
    activities: 'Sightseeing & Activities',
    serviceTax: 'GST & Service Charge',
    totalEstimated: 'Total Estimated Cost',
    estimatedPriceNote: 'Estimated prices may vary based on seasonal booking rates.',
    bookPackageBtn: 'Select Package',

    localCaretakerTitle: 'Local Caretakers & Guides',
    localCaretakerSubtitle: 'Connect with verified native residents for personalized assistance',
    verifiedGuide: 'Verified Caretaker',
    languagesSpoken: 'Languages',
    serviceArea: 'Service Area',
    experience: 'Experience',
    charges: 'Charges',
    contactCaretaker: 'Contact Caretaker',
    callCaretaker: 'Call Provider',
    chatWithCaretaker: 'Chat Now',
    requestAssistance: 'Request Assistance',
    registerAsCaretaker: 'Join as Caretaker',
    adminVerification: 'Admin Verification Panel',

    aiAssistantTitle: 'Tamil Nadu AI Guide',
    aiAssistantSubtitle: 'Ask anything about places, foods, routes & hidden secrets',
    askAnything: 'Ask in English, Tamil, Hindi, Malayalam, or Telugu...',
    send: 'Send',
    suggestedQuestions: 'Suggested questions for you:',

    navHome: 'Home',
    navExplore: 'Explore',
    navMyTrips: 'My Trips',
    navAiAssistant: 'AI Assistant',
    navProfile: 'Profile',

    myProfile: 'My Profile',
    travelPreferences: 'Travel Preferences',
    savedDestinations: 'Saved Destinations',
    upcomingTrips: 'Upcoming Trips',
    caretakerBookings: 'Caretaker Bookings',
    appSettings: 'Settings & Language',
    logout: 'Logout',
    changeLanguage: 'Change Language',
  },

  ta: {
    appName: 'TravelMate AI',
    tagline: 'தமிழ்நாடு சுற்றுலாவுக்கான உங்கள் புத்திசாலி AI வழிகாட்டி',
    selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    continueBtn: 'தொடரவும்',
    welcomeSubtitle: 'தமிழ்நாட்டின் வரலாற்று சிறப்புமிக்க கோயில்கள், மலைவாசஸ்தலங்கள் மற்றும் மறைக்கப்பட்ட எழில்மிகு இடங்களை கண்டறியுங்கள்',
    chooseLanguageDesc: 'உங்கள் மொழியை தேர்வு செய்யுங்கள். இதை அமைப்புகள் பக்கத்தில் எப்போது வேண்டுமானாலும் மாற்றலாம்.',

    login: 'உள்நுழைய',
    register: 'பதிவு செய்ய',
    createAccount: 'கணக்கு தொடங்கு',
    forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
    usernameOrEmail: 'பயனர்பெயர் அல்லது மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    fullName: 'முழு பெயர்',
    showPassword: 'காட்டு',
    hidePassword: 'மறை',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    loginAsGuest: 'விருந்தினராக தொடரவும்',
    authSuccess: 'வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்!',
    invalidCredentials: 'தவறான பயனர்பெயர் அல்லது கடவுச்சொல்',
    passwordResetSent: 'கடவுச்சொல் மாற்றும் இணைப்பு அனுப்பப்பட்டது',

    howToTravel: 'எப்படி பயணம் செய்ய விரும்புகிறீர்கள்?',
    travelTypeSubtitle: 'உங்கள் பயண பாணிக்கு ஏற்ப இடங்கள், தொகுப்புகள் மற்றும் பாதுகாப்பு வழங்கப்படும்',
    soloTravel: 'தனிநபர் பயணம் (Solo)',
    soloDesc: 'பாதுகாப்பு வசதிகளுடன் சுதந்திரமாக ஊர் சுற்றலாம்',
    soloFeature1: '24/7 SOS அவசர உதவி & பாதுகாப்பு கவசம்',
    soloFeature2: 'குறைந்த பட்ஜெட் தங்கும் விடுதிகள்',
    soloFeature3: 'தனிப்பயனாக்கப்பட்ட நெகிழ்வான திட்டம்',
    soloFeature4: 'குடும்பத்தினருடன் நேரலை இருப்பிட பகிர்வு',
    familyTravel: 'குடும்பப் பயணம் (Family)',
    familyDesc: 'அனைத்து வயதினருக்கும் வசதியான மறக்க முடியாத பயணம்',
    familyFeature1: 'குடும்பத்திற்கு உகந்த ஹோட்டல்கள் & அறைகள்',
    familyFeature2: 'குழந்தைகளுக்கான பாதுகாப்பான ஈர்ப்புகள்',
    familyFeature3: 'ஆரோக்கியமான சுவையான உணவகங்கள்',
    familyFeature4: 'பிரத்யேக குடும்ப வாகன வசதிகள்',
    groupTravel: 'புதிய பயணிகளுடன் இணைதல்',
    groupDesc: 'குழுப் பயணங்களில் இணைந்து புதிய நண்பர்களை சந்தியுங்கள்',
    groupFeature1: 'சரிபார்க்கப்பட்ட பயணிகள் சுயவிவரங்கள்',
    groupFeature2: 'குழு பயண தொகுப்புகள் & செலவு பகிர்வு',
    groupFeature3: 'குழு அரட்டை & பயண அனுமதி கோரிக்கைகள்',
    groupFeature4: 'பாதுகாப்பான தனியுரிமை & பிளாக் செய்யும் வசதி',
    selectTravelTypeBtn: 'பயண பாணியை உறுதிசெய்',

    searchPlaceholder: 'தமிழ்நாட்டில் எங்கு செல்ல விரும்புகிறீர்கள்?',
    popularDestinations: 'பிரபலமான இடங்கள் (Popular Destinations)',
    hiddenAreas: 'மறைக்கப்பட்ட இடங்கள் (Hidden Areas & Secret Spots)',
    trendingPlaces: 'டிரெண்டிங் சுற்றுலாத் தலங்கள்',
    weekendGetaways: 'வார இறுதி உலாக்கள்',
    budgetFriendly: 'குறைந்த பட்ஜெட் பயணங்கள்',
    recommendedForYou: 'உங்களுக்கான பரிந்துரைகள்',
    nearbyAttractions: 'அருகிலுள்ள இடங்கள்',
    explore: 'ஆராய்க',
    viewAll: 'அனைத்தும்',
    perPerson: 'ஒரு நபருக்கு',
    rating: 'மதிப்பீடு',
    cost: 'மதிப்பிடப்பட்ட செலவு',

    overview: 'கண்ணோட்டம்',
    attractions: 'சுற்றுலாத் தலங்கள்',
    localFood: 'பாரம்பரிய உணவுகள்',
    hotels: 'ஹோட்டல்கள் & தங்குமிடம்',
    emergencyServices: 'அவசர கால சேவைகள்',
    reviews: 'பயணிகள் கருத்துக்கள்',
    planTripWithAi: 'AI உடன் திட்டமிடு',
    viewPackages: 'சுற்றுலா தொகுப்புகள்',
    openGoogleMaps: 'Google Maps-ல் பார்க்க',
    entryFee: 'நுழைவு கட்டணம்',
    timing: 'நேரம்',
    veg: 'சைவம்',
    nonVeg: 'அசைவம்',
    recommendedEateries: 'சிறந்த உள்ளூர் உணவகங்கள்',
    perNight: 'இரவு',
    callNow: 'உடனே அழைக்க',
    emergencyNotice: 'தமிழ்நாடு அரசு & மருத்துவ அவசர உதவி எண்கள்',
    writeReview: 'கருத்து எழுதுக',
    yourRating: 'உங்கள் மதிப்பீடு',
    shareExperience: 'உங்கள் அனுபவத்தை பகிருங்கள்...',
    submitReview: 'சமர்ப்பிக்கவும்',
    reviewPhotos: 'பயண புகைப்படங்கள்',
    reviewVideos: 'சுற்றுலா வீடியோக்கள்',
    allMedia: 'புகைப்படங்கள் & வீடியோக்கள்',

    tripPlannerTitle: 'AI ஸ்மார்ட் பயணத் திட்டம்',
    tripPlannerSubtitle: 'செயற்கை நுண்ணறிவு மூலம் துல்லியமான மணிநேர அட்டவணை',
    destination: 'சேருமிடம்',
    startingLocation: 'தொடக்க இடம்',
    travelDates: 'பயண தேதிகள்',
    numberOfDays: 'பயண நாட்கள்',
    numberOfTravelers: 'பயணிகள் எண்ணிக்கை',
    totalBudget: 'மொத்த பட்ஜெட் (₹)',
    interests: 'விருப்பங்கள்',
    preferredTimings: 'தினசரி பயண நேரம்',
    generateItineraryBtn: 'AI அட்டவணை உருவாக்குக',
    generatingItinerary: 'தனிப்பயனாக்கப்பட்ட அட்டவணை உருவாகிறது...',
    day: 'நாள்',
    estimatedCost: 'மதிப்பிடப்பட்ட செலவு',
    expectedDuration: 'செலவிடும் நேரம்',
    travelDistance: 'பயண தூரம் & நேரம்',
    saveItinerary: 'என் பயணங்களில் சேமி',
    editActivity: 'திருத்து',
    addActivity: 'செயல்பாடு சேர்க்க',
    removeActivity: 'நீக்க',

    packagesTitle: 'சுற்றுலா தொகுப்புகள் & கட்டணங்கள்',
    budgetPackage: 'பட்ஜெட் தொகுப்பு (Budget)',
    standardPackage: 'ஸ்டாண்டர்ட் தொகுப்பு (Standard)',
    premiumPackage: 'பிரீமியம் தொகுப்பு (Premium)',
    costBreakdown: 'தெளிவான கட்டண விவரம்',
    transport: 'போக்குவரத்து',
    accommodation: 'தங்குமிடம்',
    food: 'உணவு & சிற்றுண்டி',
    activities: 'பார்வையிடுதல் & சாகசங்கள்',
    serviceTax: 'ஜிஎஸ்டி & சேவை வரி',
    totalEstimated: 'மொத்த மதிப்பீடு',
    estimatedPriceNote: 'பருவமழை மற்றும் தேதிகளைப் பொறுத்து கட்டணங்கள் மாறக்கூடும்.',
    bookPackageBtn: 'தொகுப்பை தேர்வு செய்',

    localCaretakerTitle: 'உள்ளூர் பராமரிப்பாளர் (Local Caretaker)',
    localCaretakerSubtitle: 'நேரடி வழிகாட்டுதலுக்கு சரிபார்க்கப்பட்ட உள்ளூர் வழிகாட்டிகளுடன் தொடர்பு கொள்ளுங்கள்',
    verifiedGuide: 'சரிபார்க்கப்பட்ட வழிகாட்டி',
    languagesSpoken: 'தெரிந்த மொழிகள்',
    serviceArea: 'சேவை பகுதி',
    experience: 'அனுபவம்',
    charges: 'கட்டணம்',
    contactCaretaker: 'தொடர்பு கொள்ள',
    callCaretaker: 'அழைக்க',
    chatWithCaretaker: 'உரையாட',
    requestAssistance: 'உதவி கோருக',
    registerAsCaretaker: 'வழிகாட்டியாக இணைய',
    adminVerification: 'நிர்வாகி சரிபார்ப்பு பலகை',

    aiAssistantTitle: 'தமிழ்நாடு AI வழிகாட்டி',
    aiAssistantSubtitle: 'சுற்றுலா தலங்கள், உணவு, பாதைகள் குறித்து எதை வேண்டுமானாலும் கேளுங்கள்',
    askAnything: 'தமிழ், ஆங்கிலம், இந்தி, மலையாளம் அல்லது தெலுங்கில் கேளுங்கள்...',
    send: 'அனுப்பு',
    suggestedQuestions: 'உங்களுக்கான பரிந்துரை கேள்விகள்:',

    navHome: 'முகப்பு',
    navExplore: 'ஆராய்க',
    navMyTrips: 'என் பயணங்கள்',
    navAiAssistant: 'AI உதவியாளர்',
    navProfile: 'சுயவிவரம்',

    myProfile: 'என் சுயவிவரம்',
    travelPreferences: 'பயண விருப்பங்கள்',
    savedDestinations: 'சேமிக்கப்பட்ட இடங்கள்',
    upcomingTrips: 'வரவிருக்கும் பயணங்கள்',
    caretakerBookings: 'வழிகாட்டி முன்பதிவுகள்',
    appSettings: 'அமைப்புகள் & மொழி',
    logout: 'வெளியேறு',
    changeLanguage: 'மொழியை மாற்று',
  },

  hi: {
    appName: 'TravelMate AI',
    tagline: 'तमिलनाडु पर्यटन के लिए आपका स्मार्ट AI साथी',
    selectLanguage: 'अपनी भाषा चुनें',
    continueBtn: 'आगे बढ़ें',
    welcomeSubtitle: 'तमिलनाडु के ऐतिहासिक मंदिरों, शांत हिल स्टेशनों और छिपे हुए खूबसूरत स्थानों की खोज करें',
    chooseLanguageDesc: 'अपनी पसंदीदा भाषा चुनें। आप इसे कभी भी सेटिंग्स में बदल सकते हैं।',

    login: 'लॉग इन करें',
    register: 'रजिस्टर करें',
    createAccount: 'नया खाता बनाएं',
    forgotPassword: 'पासवर्ड भूल गए?',
    usernameOrEmail: 'उपयोगकर्ता नाम या ईमेल',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    showPassword: 'दिखाएं',
    hidePassword: 'छिपाएं',
    dontHaveAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से खाता है?',
    loginAsGuest: 'अतिथि के रूप में देखें',
    authSuccess: 'सफलतापूर्वक लॉग इन हुआ!',
    invalidCredentials: 'अमान्य विवरण',
    passwordResetSent: 'पासवर्ड रीसेट लिंक भेजा गया',

    howToTravel: 'आप कैसे यात्रा करना पसंद करेंगे?',
    travelTypeSubtitle: 'हम आपकी पसंद के अनुसार स्थान, पैकेज और सुरक्षा सुविधाएं तैयार करेंगे',
    soloTravel: 'अकेले यात्रा (Solo Travel)',
    soloDesc: 'पूरी सुरक्षा और स्वतंत्रता के साथ यात्रा करें',
    soloFeature1: '24/7 SOS आपातकालीन सहायता',
    soloFeature2: 'किफायती और सुरक्षित हॉस्टल',
    soloFeature3: 'व्यक्तिगत लचीला यात्रा कार्यक्रम',
    soloFeature4: 'परिजनों के साथ लाइव लोकेशन शेयरिंग',
    familyTravel: 'पारिवारिक यात्रा (Family Travel)',
    familyDesc: 'सभी उम्र के लोगों के लिए आरामदायक और यादगार छुट्टियां',
    familyFeature1: 'परिवार के अनुकूल होटल और सुइट्स',
    familyFeature2: 'बच्चों के लिए सुरक्षित पर्यटन स्थल',
    familyFeature3: 'पौष्टिक और स्वादिष्ट स्थानीय भोजन',
    familyFeature4: 'विशेष पारिवारिक परिवहन व्यवस्था',
    groupTravel: 'नए यात्रियों से जुड़ें (Group Travel)',
    groupDesc: 'समूह यात्राओं में शामिल हों और नए मित्र बनाएं',
    groupFeature1: 'सत्यापित यात्रियों की प्रोफाइल',
    groupFeature2: 'ग्रुप पैकेज और साझा खर्चे',
    groupFeature3: 'इन-ऐप ग्रुप चैट और जुड़ने का अनुरोध',
    groupFeature4: 'सहमति-आधारित गोपनीयता और सुरक्षा',
    selectTravelTypeBtn: 'यात्रा शैली चुनें',

    searchPlaceholder: 'आप तमिलनाडु में कहाँ घूमना चाहते हैं?',
    popularDestinations: 'लोकप्रिय स्थान (Popular Destinations)',
    hiddenAreas: 'छिपे हुए गुप्त स्थान (Hidden Areas)',
    trendingPlaces: 'ट्रेंडिंग पर्यटन स्थल',
    weekendGetaways: 'वीकेंड ट्रिप्स',
    budgetFriendly: 'किफायती यात्राएं',
    recommendedForYou: 'आपके लिए अनुशंसित',
    nearbyAttractions: 'आस-पास के आकर्षण',
    explore: 'खोजें',
    viewAll: 'सभी देखें',
    perPerson: 'प्रति व्यक्ति',
    rating: 'रेटिंग',
    cost: 'अनुमानित लागत',

    overview: 'अवलोकन',
    attractions: 'मुख्य आकर्षण',
    localFood: 'प्रसिद्ध भोजन',
    hotels: 'होटल और आवास',
    emergencyServices: 'आपातकालीन सेवाएं',
    reviews: 'समीक्षाएं',
    planTripWithAi: 'AI से प्लान करें',
    viewPackages: 'पैकेज देखें',
    openGoogleMaps: 'Google Maps में खोलें',
    entryFee: 'प्रवेश शुल्क',
    timing: 'समय',
    veg: 'शाकाहारी',
    nonVeg: 'मांसाहारी',
    recommendedEateries: 'प्रसिद्ध रेस्तरां',
    perNight: 'प्रति रात',
    callNow: 'कॉल करें',
    emergencyNotice: 'तमिलनाडु सरकार और मेडिकल हेल्पलाइन',
    writeReview: 'समीक्षा लिखें',
    yourRating: 'आपकी रेटिंग',
    shareExperience: 'अपना यात्रा अनुभव साझा करें...',
    submitReview: 'सबमिट करें',
    reviewPhotos: 'यात्रा तस्वीरें',
    reviewVideos: 'रिव्यू वीडियो',
    allMedia: 'सभी फोटो और वीडियो',

    tripPlannerTitle: 'AI स्मार्ट ट्रिप प्लानर',
    tripPlannerSubtitle: 'बुद्धिमान AI द्वारा तैयार किया गया सटीक यात्रा कार्यक्रम',
    destination: 'गंतव्य',
    startingLocation: 'शुरुआती स्थान',
    travelDates: 'यात्रा की तारीखें',
    numberOfDays: 'दिनों की संख्या',
    numberOfTravelers: 'यात्रियों की संख्या',
    totalBudget: 'कुल बजट (₹)',
    interests: 'रुचियां',
    preferredTimings: 'दैनिक समय',
    generateItineraryBtn: 'AI यात्रा कार्यक्रम बनाएं',
    generatingItinerary: 'कार्यक्रम तैयार हो रहा है...',
    day: 'दिन',
    estimatedCost: 'अनुमानित लागत',
    expectedDuration: 'समय अवधि',
    travelDistance: 'दूरी और समय',
    saveItinerary: 'मेरी यात्राओं में सहेजें',
    editActivity: 'संपादित करें',
    addActivity: 'जोड़ें',
    removeActivity: 'हटाएं',

    packagesTitle: 'यात्रा पैकेज और मूल्य',
    budgetPackage: 'बजट पैकेज',
    standardPackage: 'स्टैंडर्ड पैकेज',
    premiumPackage: 'प्रीमियम पैकेज',
    costBreakdown: 'स्पष्ट मूल्य विवरण',
    transport: 'परिवहन',
    accommodation: 'आवास',
    food: 'भोजन',
    activities: 'गतिविधियां',
    serviceTax: 'टैक्स और शुल्क',
    totalEstimated: 'कुल अनुमानित मूल्य',
    estimatedPriceNote: 'ऋतु और उपलब्धता के अनुसार मूल्य भिन्न हो सकते हैं।',
    bookPackageBtn: 'पैकेज चुनें',

    localCaretakerTitle: 'स्थानीय केयरटेकर और गाइड',
    localCaretakerSubtitle: 'व्यक्तिगत सहायता के लिए सत्यापित स्थानीय गाइड से संपर्क करें',
    verifiedGuide: 'सत्यापित केयरटेकर',
    languagesSpoken: 'भाषाएं',
    serviceArea: 'सेवा क्षेत्र',
    experience: 'अनुभव',
    charges: 'शुल्क',
    contactCaretaker: 'संपर्क करें',
    callCaretaker: 'कॉल करें',
    chatWithCaretaker: 'चैट करें',
    requestAssistance: 'सहायता का अनुरोध करें',
    registerAsCaretaker: 'केयरटेकर के रूप में जुड़ें',
    adminVerification: 'एडमिन पैनल',

    aiAssistantTitle: 'तमिलनाडु AI सहायक',
    aiAssistantSubtitle: 'स्थानों, भोजन और मार्गों के बारे में कुछ भी पूछें',
    askAnything: 'हिंदी, तमिल, अंग्रेजी, आदि में पूछें...',
    send: 'भेजें',
    suggestedQuestions: 'सुझाए गए प्रश्न:',

    navHome: 'होम',
    navExplore: 'खोजें',
    navMyTrips: 'मेरी यात्राएं',
    navAiAssistant: 'AI सहायक',
    navProfile: 'प्रोफ़ाइल',

    myProfile: 'मेरी प्रोफ़ाइल',
    travelPreferences: 'यात्रा प्राथमिकताएं',
    savedDestinations: 'सहेजे गए स्थान',
    upcomingTrips: 'आगामी यात्राएं',
    caretakerBookings: 'केयरटेकर बुकिंग',
    appSettings: 'सेटिंग्स और भाषा',
    logout: 'लॉगआउट',
    changeLanguage: 'भाषा बदलें',
  },

  ml: {
    appName: 'TravelMate AI',
    tagline: 'തമിഴ്നാട് ടൂറിസത്തിനായുള്ള നിങ്ങളുടെ സ്മാർട്ട് AI സഹായി',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    continueBtn: 'തുടരുക',
    welcomeSubtitle: 'തമിഴ്നാടിന്റെ ചരിത്രപ്രസിദ്ധമായ ക്ഷേത്രങ്ങളും സുന്ദരമായ ഹിൽസ്റ്റേഷനുകളും രഹസ്യ കേന്ദ്രങ്ങളും കണ്ടെത്തൂ',
    chooseLanguageDesc: 'നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക. ഇത് പിന്നീട് ക്രമീകരണങ്ങളിൽ മാറ്റാം.',

    login: 'ലോഗിൻ',
    register: 'രജിസ്റ്റർ ചെയ്യുക',
    createAccount: 'അക്കൗണ്ട് തുടങ്ങുക',
    forgotPassword: 'പാസ്‌വേഡ് മറന്നോ?',
    usernameOrEmail: 'യൂസർനെയിം അല്ലെങ്കിൽ ഇമെയിൽ',
    password: 'പാസ്‌വേഡ്',
    fullName: 'മുഴുവൻ പേര്',
    showPassword: 'കാണിക്കുക',
    hidePassword: 'മറയ്ക്കുക',
    dontHaveAccount: 'അക്കൗണ്ട് ഇല്ലേ?',
    alreadyHaveAccount: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?',
    loginAsGuest: 'അതിഥിയായി തുടരുക',
    authSuccess: 'ലോഗിൻ വിജയകരം!',
    invalidCredentials: 'തെറ്റായ വിവരങ്ങൾ',
    passwordResetSent: 'പാസ്‌വേഡ് മാറ്റാനുള്ള ലിങ്ക് അയച്ചു',

    howToTravel: 'എങ്ങനെ യാത്ര ചെയ്യാൻ ആഗ്രഹിക്കുന്നു?',
    travelTypeSubtitle: 'നിങ്ങളുടെ ശൈലിക്ക് അനുയോജ്യമായ കേന്ദ്രങ്ങളും പാക്കേജുകളും നൽകുന്നു',
    soloTravel: 'ഏകാംഗ യാത്ര (Solo Travel)',
    soloDesc: 'സുരക്ഷിതത്വത്തോടെ സ്വതന്ത്രമായി യാത്ര ചെയ്യാം',
    soloFeature1: '24/7 SOS സുരക്ഷാ പരിരക്ഷ',
    soloFeature2: 'ചെലവ് കുറഞ്ഞ സുരക്ഷിത ഹോസ്റ്റലുകൾ',
    soloFeature3: 'വ്യക്തിഗത യാത്രാ പദ്ധതി',
    soloFeature4: 'ലൈവ് ലൊക്കേഷൻ പങ്കിടൽ',
    familyTravel: 'കുടുംബ യാത്ര (Family Travel)',
    familyDesc: 'എല്ലാ പ്രായക്കാർക്കും ആസ്വാദ്യകരമായ അവധിക്കാലം',
    familyFeature1: 'ഫാമിലി സ്യൂട്ടുകളും മികച്ച ഹോട്ടലുകളും',
    familyFeature2: 'കുട്ടികൾക്കായുള്ള സുരക്ഷിത ആകർഷണങ്ങൾ',
    familyFeature3: 'രുചികരവും ആരോഗ്യകരവുമായ ഭക്ഷണം',
    familyFeature4: 'പ്രത്യേക യാത്രാ വാഹനങ്ങൾ',
    groupTravel: 'പുതിയ സഞ്ചാരികളോടൊപ്പം (Group Travel)',
    groupDesc: 'ഗ്രൂപ്പ് യാത്രകളിൽ പങ്കെടുക്കൂ, പുതിയ സുഹൃത്തുക്കളെ നേടൂ',
    groupFeature1: 'വെരിഫൈഡ് പ്രൊഫൈലുകൾ',
    groupFeature2: 'ചെലവ് പങ്കിട്ടുള്ള ഗ്രൂപ്പ് പാക്കേജുകൾ',
    groupFeature3: 'ഇൻ-ആപ്പ് ഗ്രൂപ്പ് ചാറ്റും അഭ്യർത്ഥനകളും',
    groupFeature4: 'സ്വകാര്യതയും ബ്ലോക്ക് ചെയ്യാനുള്ള സൗകര്യവും',
    selectTravelTypeBtn: 'യാത്രാ ശൈലി തിരഞ്ഞെടുക്കുക',

    searchPlaceholder: 'തമിഴ്നാട്ടിൽ എവിടെ സന്ദർശിക്കണം?',
    popularDestinations: 'ജനപ്രിയ സ്ഥലങ്ങൾ (Popular Destinations)',
    hiddenAreas: 'രഹസ്യ കേന്ദ്രങ്ങൾ (Hidden Areas)',
    trendingPlaces: 'ട്രെൻഡിംഗ് വിനോദസഞ്ചാര കേന്ദ്രങ്ങൾ',
    weekendGetaways: 'വാരാന്ത്യ യാത്രകൾ',
    budgetFriendly: 'കുറഞ്ഞ ചെലവിലെ യാത്രകൾ',
    recommendedForYou: 'നിങ്ങൾക്കായി ശുപാർശ ചെയ്യുന്നത്',
    nearbyAttractions: 'സമീപത്തുള്ള സ്ഥലങ്ങൾ',
    explore: 'കണ്ടെത്തുക',
    viewAll: 'എല്ലാം കാണുക',
    perPerson: 'ഒരാൾക്ക്',
    rating: 'റേറ്റിംഗ്',
    cost: 'ചെലവ്',

    overview: 'വിവരണം',
    attractions: 'പ്രധാന ആകർഷണങ്ങൾ',
    localFood: 'പ്രസിദ്ധമായ ഭക്ഷണങ്ങൾ',
    hotels: 'ഹോട്ടലുകൾ',
    emergencyServices: 'അടിയന്തര സേവനങ്ങൾ',
    reviews: 'അഭിപ്രായങ്ങൾ',
    planTripWithAi: 'AI വഴി പ്ലാൻ ചെയ്യാം',
    viewPackages: 'പാക്കേജുകൾ കാണുക',
    openGoogleMaps: 'Google Maps-ൽ തുറക്കുക',
    entryFee: 'പ്രവേശന ഫീസ്',
    timing: 'സമയം',
    veg: 'വെജിറ്റേറിയൻ',
    nonVeg: 'നോൺ-വെജിറ്റേറിയൻ',
    recommendedEateries: 'പ്രശസ്ത ഭക്ഷണശാലകൾ',
    perNight: 'ഒരു രാത്രിക്ക്',
    callNow: 'വിളിക്കുക',
    emergencyNotice: 'തമിഴ്നാട് സർക്കാർ & മെഡിക്കൽ ഹെൽപ്പ് ലൈനുകൾ',
    writeReview: 'അഭിപ്രായം രേഖപ്പെടുത്തുക',
    yourRating: 'റേറ്റിംഗ് നൽകുക',
    shareExperience: 'നിങ്ങളുടെ അനുഭവം പങ്കിടുക...',
    submitReview: 'സമർപ്പിക്കുക',
    reviewPhotos: 'യാത്രാ ചിത്രങ്ങൾ',
    reviewVideos: 'റിവ്യൂ വീഡിയോകൾ',
    allMedia: 'എല്ലാ ഫോട്ടോകളും വീഡിയോകളും',

    tripPlannerTitle: 'AI സ്മാർട്ട് ട്രിപ്പ് പ്ലാനർ',
    tripPlannerSubtitle: 'AI തയ്യാറാക്കിയ മികച്ച യാത്രാ ക്രമം',
    destination: 'സ്ഥലം',
    startingLocation: 'ആരംഭിക്കുന്ന സ്ഥലം',
    travelDates: 'യാത്രാ തീയതികൾ',
    numberOfDays: 'ദിവസങ്ങളുടെ എണ്ണം',
    numberOfTravelers: 'യാത്രക്കാരുടെ എണ്ണം',
    totalBudget: 'ആകെ ബഡ്ജറ്റ് (₹)',
    interests: 'താൽപ്പര്യങ്ങൾ',
    preferredTimings: 'സമയക്രമം',
    generateItineraryBtn: 'AI യാത്രാ ക്രമം ഉണ്ടാക്കുക',
    generatingItinerary: 'തയ്യാറാക്കുന്നു...',
    day: 'ദിവസം',
    estimatedCost: 'ചെലവ്',
    expectedDuration: 'സന്ദർശന സമയം',
    travelDistance: 'ദൂരവും സമയവും',
    saveItinerary: 'സേവ് ചെയ്യുക',
    editActivity: 'തിരുത്തുക',
    addActivity: 'ചേർക്കുക',
    removeActivity: 'ഒഴിവാക്കുക',

    packagesTitle: 'യാത്രാ പാക്കേജുകൾ',
    budgetPackage: 'ബജറ്റ് പാക്കേജ്',
    standardPackage: 'സ്റ്റാൻഡേർഡ് പാക്കേജ്',
    premiumPackage: 'പ്രീമിയം പാക്കേജ്',
    costBreakdown: 'ചെലവ് വിവരങ്ങൾ',
    transport: 'യാത്രാ സൗകര്യം',
    accommodation: 'താമസം',
    food: 'ഭക്ഷണം',
    activities: 'കാഴ്ചകൾ & ആക്ടിവിറ്റികൾ',
    serviceTax: 'ടാക്സ് & സർവീസ് ചാർജ്ജ്',
    totalEstimated: 'ആകെ ചെലവ്',
    estimatedPriceNote: 'സീസൺ അനുസരിച്ച് നിരക്കുകളിൽ മാറ്റം വരാം.',
    bookPackageBtn: 'പാക്കേജ് തിരഞ്ഞെടുക്കുക',

    localCaretakerTitle: 'ലോക്കൽ കെയർടേക്കർ & ഗൈഡ്',
    localCaretakerSubtitle: 'നേരിട്ടുള്ള സഹായത്തിനായി പരിശോധിച്ച പ്രാദേശിക ഗൈഡുകളുമായി ബന്ധപ്പെടുക',
    verifiedGuide: 'പരിശോധിച്ച ഗൈഡ്',
    languagesSpoken: 'സംസാരിക്കുന്ന ഭാഷകൾ',
    serviceArea: 'സർവീസ് മേഖല',
    experience: 'പരിചയം',
    charges: 'നിരക്കുകൾ',
    contactCaretaker: 'ബന്ധപ്പെടുക',
    callCaretaker: 'വിളിക്കുക',
    chatWithCaretaker: 'ചാറ്റ് ചെയ്യുക',
    requestAssistance: 'സഹായം അഭ്യർത്ഥിക്കുക',
    registerAsCaretaker: 'ഗൈഡായി രജിസ്റ്റർ ചെയ്യാം',
    adminVerification: 'അഡ്മിൻ പാനൽ',

    aiAssistantTitle: 'തമിഴ്നാട് AI സഹായി',
    aiAssistantSubtitle: 'സ്ഥലങ്ങൾ, ഭക്ഷണങ്ങൾ, വഴികൾ എന്നിവയെക്കുറിച്ച് എന്തു ചോദിക്കാം',
    askAnything: 'മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ചോദിക്കൂ...',
    send: 'അയക്കുക',
    suggestedQuestions: 'നിങ്ങൾക്കായുള്ള ചോദ്യങ്ങൾ:',

    navHome: 'ഹോം',
    navExplore: 'എക്സ്പ്ലോർ',
    navMyTrips: 'എന്റെ യാത്രകൾ',
    navAiAssistant: 'AI സഹായി',
    navProfile: 'പ്രൊഫൈൽ',

    myProfile: 'എന്റെ പ്രൊഫൈൽ',
    travelPreferences: 'യാത്രാ താൽപ്പര്യങ്ങൾ',
    savedDestinations: 'സേവ് ചെയ്ത സ്ഥലങ്ങൾ',
    upcomingTrips: 'വരാനിരിക്കുന്ന യാത്രകൾ',
    caretakerBookings: 'ബുക്കിംഗുകൾ',
    appSettings: 'ക്രമീകരണങ്ങൾ & ഭാഷ',
    logout: 'ലോഗൗട്ട്',
    changeLanguage: 'ഭാഷ മാറ്റുക',
  },

  te: {
    appName: 'TravelMate AI',
    tagline: 'తమిళనాడు పర్యాటకం కోసం మీ స్మార్ట్ AI సహచరుడు',
    selectLanguage: 'భాషను ఎంచుకోండి',
    continueBtn: 'కొనసాగించండి',
    welcomeSubtitle: 'తమిళనాడు ప్రసిద్ధ ఆలయాలు, ఆహ్లాదకరమైన హిల్ స్టేషన్లు మరియు దాగివున్న ప్రకృతి అందాలను అన్వేషించండి',
    chooseLanguageDesc: 'మీకు అనుకూలమైన భాషను ఎంచుకోండి. దీన్ని ఎప్పుడైనా సెట్టింగ్స్‌లో మార్చుకోవచ్చు.',

    login: 'లాగిన్',
    register: 'రిజిస్టర్',
    createAccount: 'ఖాతా తెరవండి',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    usernameOrEmail: 'యూజర్‌నేమ్ లేదా ఈమెయిల్',
    password: 'పాస్‌వర్డ్',
    fullName: 'పూర్తి పేరు',
    showPassword: 'చూపించు',
    hidePassword: 'దాచు',
    dontHaveAccount: 'ఖాతా లేదా?',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    loginAsGuest: 'గెస్ట్‌గా కొనసాగండి',
    authSuccess: 'లాగిన్ విజయవంతమైంది!',
    invalidCredentials: 'సరైన వివరాలు నమోదు చేయండి',
    passwordResetSent: 'పాస్‌వర్డ్ రీసెట్ లింక్ పంపబడింది',

    howToTravel: 'మీరు ఎలా ప్రయాణించాలనుకుంటున్నారు?',
    travelTypeSubtitle: 'మీ ప్రయాణ శైలికి తగిన గమ్యస్థానాలు, ప్యాకేజీలు మరియు భద్రతను మేము అందిస్తాము',
    soloTravel: 'సోలో ప్రయాణం (Solo Travel)',
    soloDesc: 'పూర్తి భద్రత మరియు స్వేచ్ఛతో విహరించండి',
    soloFeature1: '24/7 SOS అత్యవసర సహాయం',
    soloFeature2: 'బడ్జెట్ హాస్టల్స్ మరియు స్టేస్',
    soloFeature3: 'వ్యక్తిగతీకరించిన ఫ్లెక్సిబుల్ ప్లాన్',
    soloFeature4: 'కుటుంబంతో లైవ్ లొకేషన్ షేరింగ్',
    familyTravel: 'కుటుంబ ప్రయాణం (Family Travel)',
    familyDesc: 'అన్ని వయసుల వారికి సౌకర్యవంతమైన ప్రయాణం',
    familyFeature1: 'ఫ్యామిలీ హోటళ్లు మరియు గదులు',
    familyFeature2: 'పిల్లలకు సురక్షితమైన ఆకర్షణలు',
    familyFeature3: 'ఆరోగ్యకరమైన స్థానిక ఆహారం',
    familyFeature4: 'ప్రత్యేక ఫ్యామిలీ వాహనాలు',
    groupTravel: 'కొత్త యాత్రికులతో కలవండి (Group Travel)',
    groupDesc: 'గ్రూప్ ట్రిప్పులలో చేరి కొత్త స్నేహితులను కనుగొనండి',
    groupFeature1: 'ధృవీకరించబడిన ప్రొఫైల్స్',
    groupFeature2: 'గ్రూప్ ప్యాకేజీలు & ఖర్చుల పంపకం',
    groupFeature3: 'ఇన్-యాప్ గ్రూప్ చాట్ & రిక్వెస్ట్‌లు',
    groupFeature4: 'గోప్యత మరియు బ్లాకింగ్ నియంత్రణలు',
    selectTravelTypeBtn: 'శైలిని ఎంచుకోండి',

    searchPlaceholder: 'తమిళనాడులో ఎక్కడికి వెళ్లాలనుకుంటున్నారు?',
    popularDestinations: 'ప్రసిద్ధ ప్రదేశాలు (Popular Destinations)',
    hiddenAreas: 'దాగివున్న రహస్య ప్రదేశాలు (Hidden Areas)',
    trendingPlaces: 'ట్రెండింగ్ పర్యాటక ప్రదేశాలు',
    weekendGetaways: 'వీకెండ్ పర్యటనలు',
    budgetFriendly: 'బడ్జెట్ ప్రయాణాలు',
    recommendedForYou: 'మీ కోసం సిఫార్సులు',
    nearbyAttractions: 'సమీప ఆకర్షణలు',
    explore: 'అన్వేషించండి',
    viewAll: 'అన్నీ చూడండి',
    perPerson: 'ఒక్కొక్కరికి',
    rating: 'రేటింగ్',
    cost: 'అంచనా వ్యయం',

    overview: 'సమీక్ష',
    attractions: 'దర్శనీయ స్థలాలు',
    localFood: 'ప్రసిద్ధ వంటకాలు',
    hotels: 'హోటళ్ళు & వసతి',
    emergencyServices: 'అత్యవసర సేవలు',
    reviews: 'యాత్రికుల సమీక్షలు',
    planTripWithAi: 'AI తో ప్లాన్ చేయండి',
    viewPackages: 'ప్యాకేజీలు చూడండి',
    openGoogleMaps: 'Google Maps లో చూడండి',
    entryFee: 'ప్రవేశ రుసుము',
    timing: 'సమయాలు',
    veg: 'శాకాహారం',
    nonVeg: 'మాంసాహారం',
    recommendedEateries: 'ప్రసిద్ధ రెస్టారెంట్లు',
    perNight: 'రాత్రికి',
    callNow: 'కాల్ చేయండి',
    emergencyNotice: 'తమిళనాడు ప్రభుత్వ & వైద్య అత్యవసర హెల్ప్‌లైన్లు',
    writeReview: 'సమీక్ష రాయండి',
    yourRating: 'మీ రేటింగ్',
    shareExperience: 'మీ ప్రయాణ అనుభవాన్ని పంచుకోండి...',
    submitReview: 'సమర్పించండి',
    reviewPhotos: 'ప్రయాణ ఫోటోలు',
    reviewVideos: 'రివ్యూ వీడియోలు',
    allMedia: 'అన్ని ఫోటోలు మరియు వీడియోలు',

    tripPlannerTitle: 'AI స్మార్ట్ ట్రిప్ ప్లానర్',
    tripPlannerSubtitle: 'AI ద్వారా రూపొందించబడిన వివరణాత్మక ప్రయాణ ప్రణాళిక',
    destination: 'గమ్యస్థానం',
    startingLocation: 'ప్రారంభ స్థానం',
    travelDates: 'ప్రయాణ తేదీలు',
    numberOfDays: 'రోజుల సంఖ్య',
    numberOfTravelers: 'యాత్రికుల సంఖ్య',
    totalBudget: 'మొత్తం బడ్జెట్ (₹)',
    interests: 'ఆసక్తులు',
    preferredTimings: 'సమయాలు',
    generateItineraryBtn: 'AI ప్రణాళికను రూపొందించండి',
    generatingItinerary: 'రూపొందిస్తోంది...',
    day: 'రోజు',
    estimatedCost: 'అంచనా వ్యయం',
    expectedDuration: 'సమయం',
    travelDistance: 'దూరం మరియు సమయం',
    saveItinerary: 'సేవ్ చేసుకోండి',
    editActivity: 'సవరించండి',
    addActivity: 'జోడించండి',
    removeActivity: 'తొలగించండి',

    packagesTitle: 'ప్రయాణ ప్యాకేజీలు',
    budgetPackage: 'బడ్జెట్ ప్యాకేజీ',
    standardPackage: 'స్టాండర్డ్ ప్యాకేజీ',
    premiumPackage: 'ప్రీమియం ప్యాకేజీ',
    costBreakdown: 'ఖర్చుల వివరాలు',
    transport: 'రవాణా',
    accommodation: 'వసతి',
    food: 'ఆహారం',
    activities: 'దర్శనీయ స్థలాలు & కార్యకలాపాలు',
    serviceTax: 'టాక్స్ & సర్వీస్ ఛార్జ్',
    totalEstimated: 'మొత్తం అంచనా వ్యయం',
    estimatedPriceNote: 'సీజన్ ప్రకారం ధరల్లో మార్పులు ఉండవచ్చు.',
    bookPackageBtn: 'ప్యాకేజీని ఎంచుకోండి',

    localCaretakerTitle: 'స్థానిక కేర్‌టేకర్ & గైడ్',
    localCaretakerSubtitle: 'వ్యక్తిగత సహాయం కోసం ధృవీకరించబడిన స్థానిక గైడ్‌లను సంప్రదించండి',
    verifiedGuide: 'ధృవీకరించబడిన గైడ్',
    languagesSpoken: 'మాట్లాడే భాషలు',
    serviceArea: 'సేవా ప్రాంతం',
    experience: 'అనుభవం',
    charges: 'రుసుము',
    contactCaretaker: 'సంప్రదించండి',
    callCaretaker: 'కాల్ చేయండి',
    chatWithCaretaker: 'చాట్ చేయండి',
    requestAssistance: 'సహాయం కోరండి',
    registerAsCaretaker: 'గైడ్‌గా చేరండి',
    adminVerification: 'అడ్మిన్ ప్యానెల్',

    aiAssistantTitle: 'తమిళనాడు AI సహాయకుడు',
    aiAssistantSubtitle: 'ప్రదేశాలు, ఆహారం, మార్గాల గురించి ఏదైనా అడగండి',
    askAnything: 'తెలుగు లేదా ఇంగ్లీషులో అడగండి...',
    send: 'పంపండి',
    suggestedQuestions: 'సిఫార్సు చేయబడిన ప్రశ్నలు:',

    navHome: 'హోమ్',
    navExplore: 'ఎక్స్‌ప్లోర్',
    navMyTrips: 'నా ట్రిప్పులు',
    navAiAssistant: 'AI సహాయకుడు',
    navProfile: 'ప్రొఫైల్',

    myProfile: 'నా ప్రొఫైల్',
    travelPreferences: 'ప్రయాణ ప్రాధాన్యతలు',
    savedDestinations: 'సేవ్ చేసిన ప్రదేశాలు',
    upcomingTrips: 'రాబోయే ప్రయాణాలు',
    caretakerBookings: 'కేర్‌టేకర్ బుకింగ్‌లు',
    appSettings: 'సెట్టింగ్‌లు & భాష',
    logout: 'లాగౌట్',
    changeLanguage: 'భాషను మార్చండి',
  },
};
