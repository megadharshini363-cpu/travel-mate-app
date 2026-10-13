import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory store for caretaker registrations and review reports
interface CaretakerSubmission {
  id: string;
  name: string;
  phone: string;
  languages: string[];
  serviceArea: string;
  experience: string;
  serviceCharge: string;
  photoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const caretakersDB: CaretakerSubmission[] = [
  {
    id: 'ct-1',
    name: 'Senthil Murugan',
    phone: '+91 94432 18765',
    languages: ['Tamil', 'English', 'Malayalam'],
    serviceArea: 'Ooty & Nilgiris',
    experience: '8+ years wildlife & hill guide',
    serviceCharge: '₹1,200 / day',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    status: 'approved',
    submittedAt: '2026-01-15',
  },
  {
    id: 'ct-2',
    name: 'Ananya Ramanathan',
    phone: '+91 98401 23456',
    languages: ['Tamil', 'English', 'Hindi'],
    serviceArea: 'Madurai & Chettinad',
    experience: '6+ years temple heritage & culinary historian',
    serviceCharge: '₹1,500 / day',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    status: 'approved',
    submittedAt: '2026-02-10',
  },
  {
    id: 'ct-3',
    name: 'Karthik Subramanian',
    phone: '+91 94863 77123',
    languages: ['Tamil', 'English', 'Telugu'],
    serviceArea: 'Rameshwaram & Dhanushkodi',
    experience: '5+ years coastal pilgrimage & eco-tourism',
    serviceCharge: '₹1,100 / day',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    status: 'approved',
    submittedAt: '2026-03-01',
  },
  {
    id: 'ct-4',
    name: 'Muthuvel Raja',
    phone: '+91 97890 55432',
    languages: ['Tamil', 'English', 'Malayalam'],
    serviceArea: 'Valparai & Pollachi',
    experience: '10+ years rainforest & tea plantation naturalist',
    serviceCharge: '₹1,400 / day',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    status: 'approved',
    submittedAt: '2026-03-12',
  },
];

const reportedReviewsDB: Array<{ id: string; reviewId: string; reason: string; timestamp: string }> = [];

// API: Get Caretakers
app.get('/api/caretakers', (req: Request, res: Response) => {
  const status = req.query.status as string;
  if (status) {
    return res.json(caretakersDB.filter(c => c.status === status));
  }
  return res.json(caretakersDB);
});

// API: Submit Caretaker Application
app.post('/api/caretakers/register', (req: Request, res: Response) => {
  const { name, phone, languages, serviceArea, experience, serviceCharge, photoUrl } = req.body;
  if (!name || !phone || !serviceArea) {
    return res.status(400).json({ error: 'Name, phone, and service area are required.' });
  }

  const newCaretaker: CaretakerSubmission = {
    id: `ct-${Date.now()}`,
    name,
    phone,
    languages: languages || ['Tamil', 'English'],
    serviceArea,
    experience: experience || 'Certified local resident',
    serviceCharge: serviceCharge || '₹1,000 / day',
    photoUrl: photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    status: 'pending',
    submittedAt: new Date().toISOString().split('T')[0],
  };

  caretakersDB.unshift(newCaretaker);
  return res.status(201).json({ success: true, caretaker: newCaretaker });
});

// API: Admin update caretaker status
app.patch('/api/caretakers/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const caretaker = caretakersDB.find(c => c.id === id);
  if (!caretaker) {
    return res.status(404).json({ error: 'Caretaker not found.' });
  }
  if (status === 'approved' || status === 'rejected' || status === 'pending') {
    caretaker.status = status;
    return res.json({ success: true, caretaker });
  }
  return res.status(400).json({ error: 'Invalid status.' });
});

// API: Report a review
app.post('/api/reviews/report', (req: Request, res: Response) => {
  const { reviewId, reason } = req.body;
  reportedReviewsDB.push({
    id: `rep-${Date.now()}`,
    reviewId,
    reason: reason || 'Inappropriate content',
    timestamp: new Date().toISOString(),
  });
  return res.json({ success: true, message: 'Review reported for moderation.' });
});

// API: AI Tourism Chatbot Endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  const { message, language = 'English', travelType = 'Solo', currentDestination } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // System instruction specialized strictly for Tamil Nadu tourism
  const systemInstruction = `You are TravelMate AI, an expert, enthusiastic, and highly knowledgeable tourism assistant specialized EXCLUSIVELY in Tamil Nadu, India.
Your mission is to assist tourists with Tamil Nadu destinations (Ooty, Kodaikanal, Madurai, Mahabalipuram, Rameshwaram, Kanyakumari, Thanjavur, Coimbatore, Valparai, Kolli Hills, Pichavaram, Megamalai, Chettinad, Dhanushkodi, etc.).
Important instructions:
1. Always respond in the requested language: "${language}". If the language is Tamil (தமிழ்), reply in fluent, natural Tamil script. If Hindi, in Devanagari Hindi. If Malayalam, in Malayalam script. If Telugu, in Telugu script. If English, in natural English.
2. Tailor suggestions to the traveler's current mode: "${travelType}" (Solo safety/budget, Family kid-friendly/comfort, or Group social/adventure).
3. If they ask about destinations outside Tamil Nadu, politely guide them back to exciting Tamil Nadu alternatives.
4. Give concrete, practical recommendations: famous Tamil Nadu cuisine (Jigarthanda, Chettinad kuzhambu, Dindigul biryani, filter coffee), timing, cultural respect at temples, hidden scenic viewpoints, and emergency tips.
5. Format with neat markdown bullet points, bold highlights, and helpful advice. Keep responses friendly, concise, and easy to read on mobile.`;

  if (ai && apiKey) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Traveler asks: "${message}". Context: Preferred travel type is "${travelType}". Currently exploring "${currentDestination || 'Tamil Nadu'}". Respond helpfully in language "${language}".`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      if (text) {
        return res.json({ reply: text, source: 'gemini' });
      }
    } catch (error) {
      console.warn('Gemini chat API error, falling back to local engine:', error);
    }
  }

  // Fallback engine if Gemini API key is missing or offline
  const fallbackReply = generateFallbackChatReply(message, language, travelType, currentDestination);
  return res.json({ reply: fallbackReply, source: 'local_engine' });
});

// API: AI Trip Planner Endpoint
app.post('/api/gemini/plan-trip', async (req: Request, res: Response) => {
  const { destination, startingLocation, dates, days, travelers, budget, travelType, interests, startTime, endTime, language = 'English' } = req.body;

  const prompt = `Generate a realistic, optimized day-by-day travel itinerary for a trip in Tamil Nadu.
Details:
- Destination: ${destination}
- Starting From: ${startingLocation}
- Duration: ${days} days
- Travelers: ${travelers} (${travelType} trip)
- Estimated Budget: ₹${budget}
- Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Daily timings: ${startTime || '8:00 AM'} to ${endTime || '8:00 PM'}
- Language: ${language}

Return a valid JSON array of days. Each day object must have:
- dayNumber: number
- title: string
- activities: array of objects with {
    time: string (e.g. "8:30 AM"),
    place: string,
    description: string,
    duration: string (e.g. "1.5 hours"),
    travelTime: string (e.g. "15 mins drive"),
    estimatedCost: string (e.g. "₹150"),
    category: "sightseeing" | "food" | "adventure" | "relaxation",
    tips: string
  }
Do not wrap in markdown quotes if possible, output pure JSON.`;

  if (ai && apiKey) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a master Tamil Nadu travel planner. Always return strictly valid JSON matching the requested itinerary schema.',
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text?.trim() || '';
      if (text) {
        try {
          const parsed = JSON.parse(text);
          return res.json({ itinerary: parsed, source: 'gemini' });
        } catch {
          // fallback if JSON parse fails
        }
      }
    } catch (err) {
      console.warn('Gemini Trip Planner error, falling back:', err);
    }
  }

  // Fallback itinerary generator
  const itinerary = generateFallbackItinerary(destination, days, budget, travelType, interests);
  return res.json({ itinerary, source: 'local_engine' });
});

// Fallback chat reply generator
function generateFallbackChatReply(msg: string, lang: string, travelType: string, destination?: string): string {
  const lower = msg.toLowerCase();

  if (lang === 'தமிழ் (Tamil)' || lang === 'ta') {
    if (lower.includes('ooty') || lower.includes('ஊட்டி')) {
      return `🌿 **ஊட்டி (Ooty) சுற்றுலா சிறப்பம்சங்கள்:**
1. **தாவரவியல் பூங்கா (Botanical Garden):** 55 ஏக்கர் பரப்பளவில் அரிய மரங்கள் மற்றும் பூக்கள் (காலை 8:30 - மாலை 6:30).
2. **ரோஜா தோட்டம் (Rose Garden):** 20,000 வகையான ரோஜாக்கள்.
3. **ஊட்டி ஏரி (Ooty Lake):** அமைதியான படகு சவாரி.
4. **டொட்டபெட்டா சிகரம் (Doddabetta):** நீலகிரியின் மிக உயரமான காட்சி முனை.
💡 **உள்ளூர் உணவு:** சூடான வர்க்கி (Varkey), வீட்டிலேயே தயாரிக்கப்பட்ட சாக்லேட்கள் மற்றும் நீலகிரி தேநீர் ருசிக்க தவறாதீர்கள்!`;
    }
    if (lower.includes('madurai') || lower.includes('மதுரை') || lower.includes('food') || lower.includes('சாப்பாடு')) {
      return `🍲 **மதுரை பாரம்பரிய சுவைகள்:**
- **புகழ்பெற்ற ஜிகர்தண்டா (Jigarthanda):** புகழ்பெற்ற விளக்குத்தூண் ஜிகர்தண்டா கடை.
- **பன் பரோட்டா & கரி தோசை:** முனியாண்டி விலாஸ் & கோனா தோசைக் கடை.
- **மீனாட்சி அம்மன் ஆலயம்:** 14 கோபுரங்கள் கொண்ட உலகப் பிரசித்தி பெற்ற திராவிடக் கலைக்கோயில்!`;
    }
    return `வணக்கம்! TravelMate AI மூலம் தமிழ்நாட்டின் அற்புதமான சுற்றுலாத் தலங்களை கண்டறியலாம். ஊட்டி, மதுரை, கொடைக்கானல், இராமேஸ்வரம், கன்னியாகுமரி மற்றும் மறைக்கப்பட்ட இடங்களான கொல்லிமலை, வால்பாறை பற்றி வழிகாட்ட தயாராக உள்ளேன். உங்கள் பட்ஜெட் அல்லது விருப்பத்தை கூறுங்கள்!`;
  }

  if (lang === 'हिंदी (Hindi)' || lang === 'hi') {
    if (lower.includes('ooty') || lower.includes('ऊटी')) {
      return `🌿 **ऊटी के मुख्य आकर्षण:**
1. **बॉटनिकल गार्डन:** दुर्लभ वनस्पतियों का विशाल संग्रह।
2. **ऊटी झील:** सुंदर नौका विहार का आनंद।
3. **डोड्डाबेट्टा पीक:** नीलगिरि की सबसे ऊंची चोटी से मनमोहक दृश्य।
4. **स्थानीय भोजन:** प्रसिद्ध हाथ से बनी चॉकलेट और नीलगिरि चाय!`;
    }
    return `नमस्ते! TravelMate AI में आपका स्वागत है। मैं तमिलनाडु के लोकप्रिय और छिपे हुए पर्यटन स्थलों (ऊटी, कोडाइकनाल, मदुरै, रामेश्वरम, कोल्ली हिल्स) की यात्रा योजना बनाने में आपकी सहायता कर सकता हूँ। आप क्या जानना चाहते हैं?`;
  }

  // English default
  if (lower.includes('ooty')) {
    return `🌿 **Top Highlights for Ooty (Nilgiris):**
- **Government Botanical Garden:** 55-acre sprawling garden with ancient fossil tree and exotic flora.
- **Ooty Lake & Boathouse:** Serene pedal and motor boating with eucalyptus groves.
- **Doddabetta Peak:** Highest vantage point in the Nilgiris (2,637m) with telescope house.
- **Local Delicacies:** Crisp Ooty Varkey, homemade artisanal chocolates, and freshly brewed Nilgiri orthodox tea.
- **Traveler Tip (${travelType}):** Carry light woolens even in summer. Book the Nilgiri Mountain Railway (Toy Train) in advance for iconic views!`;
  }

  if (lower.includes('madurai') || lower.includes('food')) {
    return `🍲 **Famous Culinary & Cultural Highlights in Madurai:**
- **Famous Jigarthanda:** Iconic chilled sweet beverage with almond gum, nannari syrup, and basundi ice cream (Famous Jigarthanda, East Marret St).
- **Bun Parotta & Kari Dosa:** Fluffy buttery layered parottas and spicy minced meat dosa.
- **Meenakshi Sundareswarar Temple:** Architectural marvel with 14 gopurams and the Thousand Pillar Hall.
- **Best time to visit:** Early morning or 5 PM to 8 PM for pleasant darshan and evening food walks.`;
  }

  if (lower.includes('budget') || lower.includes('5000') || lower.includes('cost')) {
    return `💰 **Budget Trip Guide (Under ₹5,000 per person):**
- **Recommended Destination:** Kolli Hills or Madurai & Rameshwaram weekend circuit.
- **Transportation:** TNSTC Super Deluxe / Ultra Deluxe buses or Tamil Nadu express trains (₹400 - ₹800 return).
- **Stay:** Verified budget tourist lodges or TTDC Tamil Nadu Hotel (₹1,200 - ₹1,800/night split).
- **Food:** Delicious South Indian unlimited banana-leaf meals (₹100 - ₹150/meal).
- **Sightseeing & Entry:** ₹200 - ₹400 for temple dharshans, viewpoint passes, and boating.`;
  }

  if (lower.includes('hidden') || lower.includes('secret') || lower.includes('lesser')) {
    return `💎 **Hidden Spots & Off-Beat Gems in Tamil Nadu:**
1. **Kolli Hills (Namakkal):** 70 hairpin bends, Agaya Gangai 300ft waterfalls, completely away from commercial crowds.
2. **Valparai (Coimbatore):** Misty emerald tea plateau, Sholayar reservoir, lion-tailed macaque sightings.
3. **Pichavaram (Cuddalore):** Second largest mangrove forest in the world with labyrinth canal boating.
4. **Megamalai (Theni):** Cloud mountain with isolated organic tea estates and pristine mountain wildlife.
5. **Dhanushkodi (Rameshwaram):** Ghost town on the edge of the Indian Ocean and Bay of Bengal.`;
  }

  return `✨ **TravelMate AI Tamil Nadu Guide:**
I can help you explore all 38 districts of Tamil Nadu, from hill stations like Ooty & Kodaikanal to temple heritage in Madurai & Thanjavur, and pristine coastal secrets in Rameshwaram & Dhanushkodi.
- Ask for customized day-by-day itineraries
- Find authentic local food hotspots
- Connect with verified local caretakers
- Check emergency hospitals and police helplines!`;
}

// Fallback day-by-day itinerary generator
function generateFallbackItinerary(destination: string, daysCount: number, budget: number, travelType: string, interests: any) {
  const numDays = Math.min(Math.max(Number(daysCount) || 2, 1), 7);
  const dest = destination || 'Ooty';

  const sampleDays = [];
  for (let i = 1; i <= numDays; i++) {
    if (i === 1) {
      sampleDays.push({
        dayNumber: 1,
        title: `Day 1 – Arrival, Heritage & Scenic Orientation in ${dest}`,
        activities: [
          {
            time: '08:00 AM',
            place: 'Traditional Tamil Breakfast',
            description: 'Start with steaming idlis, crispy medu vada, and authentic degree filter coffee at a reputed local eatery.',
            duration: '45 mins',
            travelTime: '10 mins',
            estimatedCost: '₹120',
            category: 'food',
            tips: 'Fuel up early to avoid morning sightseeing rush.',
          },
          {
            time: '09:15 AM',
            place: `${dest} Main Landmark & Sightseeing`,
            description: `Visit the central architectural and natural attraction of ${dest}. Soak in the cultural history and lush landscapes.`,
            duration: '2.5 hours',
            travelTime: '20 mins',
            estimatedCost: '₹150',
            category: 'sightseeing',
            tips: 'Carry water bottle and comfortable walking shoes.',
          },
          {
            time: '01:00 PM',
            place: 'Authentic Local Cuisine Lunch',
            description: 'Savor traditional regional Tamil dishes served on fresh banana leaf with vegetarian and non-vegetarian options.',
            duration: '1 hour',
            travelTime: '15 mins',
            estimatedCost: '₹220',
            category: 'food',
            tips: 'Try the regional specialty dish.',
          },
          {
            time: '02:45 PM',
            place: 'Nature Trail or Heritage Walk',
            description: `Explore the botanical gardens, historic temples, or scenic waterfront promenades of ${dest}.`,
            duration: '2 hours',
            travelTime: '25 mins',
            estimatedCost: '₹100',
            category: 'relaxation',
            tips: 'Great spot for photography and relaxing stroll.',
          },
          {
            time: '05:30 PM',
            place: 'Sunset Viewpoint & Local Bazaar',
            description: 'Watch the vibrant twilight sky followed by exploring vibrant local markets for handicrafts, spices, and souvenirs.',
            duration: '1.5 hours',
            travelTime: '15 mins',
            estimatedCost: '₹250',
            category: 'sightseeing',
            tips: 'Carry cash for street vendors and small stalls.',
          },
          {
            time: '07:30 PM',
            place: 'Dinner & Cozy Hotel Return',
            description: 'Relaxed dinner at hotel or recommended courtyard restaurant, reviewing the day and planning tomorrow.',
            duration: '1.5 hours',
            travelTime: '10 mins',
            estimatedCost: '₹300',
            category: 'food',
            tips: 'Rest well for another adventurous day.',
          },
        ],
      });
    } else if (i === 2) {
      sampleDays.push({
        dayNumber: 2,
        title: `Day 2 – Hidden Gems, Viewpoints & Adventure in ${dest}`,
        activities: [
          {
            time: '08:30 AM',
            place: 'Morning Hill or Coastal Viewpoint',
            description: `Panoramic vantage point overlooking the mist-clad valleys or serene coastlines surrounding ${dest}.`,
            duration: '2 hours',
            travelTime: '30 mins',
            estimatedCost: '₹80',
            category: 'sightseeing',
            tips: 'Mornings offer the clearest panoramic views before fog rolls in.',
          },
          {
            time: '11:00 AM',
            place: 'Lesser-Known Hidden Spot & Nature Walk',
            description: 'Off-beat lake, hidden pine forest, or secluded cascading waterfall away from heavy tourist crowds.',
            duration: '2 hours',
            travelTime: '20 mins',
            estimatedCost: '₹50',
            category: 'adventure',
            tips: 'Respect nature, do not litter, and enjoy pristine calm.',
          },
          {
            time: '01:30 PM',
            place: 'Forest or Heritage Canteen Lunch',
            description: 'Freshly cooked home-style meal featuring hot sambar rice, poriyal, kootu, and appalam.',
            duration: '1 hour',
            travelTime: '15 mins',
            estimatedCost: '₹180',
            category: 'food',
            tips: 'Quick and hygienic service.',
          },
          {
            time: '03:00 PM',
            place: 'Artisanal Workshop or Tea/Spice Plantation',
            description: 'Interactive experience learning about local tea plucking, silk weaving, bronze sculpting, or spice processing.',
            duration: '2 hours',
            travelTime: '25 mins',
            estimatedCost: '₹200',
            category: 'sightseeing',
            tips: 'Buy authentic estate produce directly from makers.',
          },
          {
            time: '06:00 PM',
            place: 'Cultural Center or Evening Stroll',
            description: 'Experience local music, temple ceremonies, or a tranquil lakeside promenade under evening lights.',
            duration: '1.5 hours',
            travelTime: '15 mins',
            estimatedCost: '₹100',
            category: 'relaxation',
            tips: 'Keep cameras silent during sacred moments.',
          },
          {
            time: '08:00 PM',
            place: 'Farewell Dinner & Night Experience',
            description: 'Delectable dinner sampling dosas, parottas, and sweet payasam or halwa.',
            duration: '1 hour',
            travelTime: '10 mins',
            estimatedCost: '₹250',
            category: 'food',
            tips: 'Prepare bags if checking out tomorrow.',
          },
        ],
      });
    } else {
      sampleDays.push({
        dayNumber: i,
        title: `Day ${i} – Deep Immersion & Regional Excursion around ${dest}`,
        activities: [
          {
            time: '09:00 AM',
            place: `Excursion to Nearby Secret Hamlet from ${dest}`,
            description: 'Travel to an untouched rural sanctuary, ancient hill shrine, or coastal bird sanctuary.',
            duration: '3 hours',
            travelTime: '40 mins',
            estimatedCost: '₹150',
            category: 'adventure',
            tips: 'Carry sun protection and camera.',
          },
          {
            time: '01:00 PM',
            place: 'Traditional Village Thali Lunch',
            description: 'Farm-fresh meal prepared with traditional clay pots and local seasonal produce.',
            duration: '1 hour',
            travelTime: '10 mins',
            estimatedCost: '₹150',
            category: 'food',
            tips: 'Authentic flavors unique to the district.',
          },
          {
            time: '02:30 PM',
            place: 'Eco-Tourism Trek or Boating',
            description: 'Guided eco-walk with registered local caretaker, observing birds, plants, and tranquil nature.',
            duration: '2.5 hours',
            travelTime: '20 mins',
            estimatedCost: '₹300',
            category: 'adventure',
            tips: 'Follow guide instructions for safety.',
          },
          {
            time: '06:00 PM',
            place: 'Leisurely Tea & Souvenir Shopping',
            description: 'Pick up local specialties like eucalyptus oil, handmade pottery, spices, and temple silks.',
            duration: '1.5 hours',
            travelTime: '15 mins',
            estimatedCost: '₹350',
            category: 'relaxation',
            tips: 'Great for gifts for family and friends.',
          },
        ],
      });
    }
  }

  return sampleDays;
}

// In development, hook up Vite dev server middleware
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // In production, serve dist folder
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`TravelMate AI server listening on port ${PORT}`);
});
