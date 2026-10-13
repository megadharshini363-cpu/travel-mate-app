import React, { useState, useRef, useEffect } from 'react';
import { Language, TravelType } from '../types';
import { translations } from '../i18n/translations';
import {
  Sparkles,
  X,
  Send,
  Compass,
  RefreshCw,
  HelpCircle,
  MapPin,
  Bot,
  User as UserIcon,
} from 'lucide-react';

interface AiChatbotDrawerProps {
  currentLanguage: Language;
  travelType: TravelType;
  isOpen: boolean;
  onClose: () => void;
  onOpenTripPlanner: () => void;
  onOpenCaretakers: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiChatbotDrawer: React.FC<AiChatbotDrawerProps> = ({
  currentLanguage,
  travelType,
  isOpen,
  onClose,
  onOpenTripPlanner,
  onOpenCaretakers,
}) => {
  const t = translations[currentLanguage];

  const suggestedQuestions = [
    'What are the best places to visit in Ooty?',
    'Plan a two-day trip under ₹5,000.',
    'Which hotels are affordable?',
    'What food is famous in Madurai?',
    'What tourist attractions are near me?',
    'How can I contact a local caretaker?',
    'What should I visit next?',
    'How much will a family trip cost?',
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text:
        currentLanguage === 'ta'
          ? 'வணக்கம்! நான் TravelMate AI. தமிழ்நாட்டின் புகழ்பெற்ற மற்றும் மறைக்கப்பட்ட சுற்றுலா தலங்கள், சிறந்த பாரம்பரிய உணவுகள் மற்றும் பயண திட்டங்கள் பற்றி நீங்கள் என்ன வேண்டுமானாலும் கேட்கலாம்!'
          : currentLanguage === 'hi'
          ? 'नमस्ते! मैं TravelMate AI हूँ। आप मुझसे तमिलनाडु के पर्यटन स्थलों, प्रसिद्ध भोजन और यात्रा योजना के बारे में कुछ भी पूछ सकते हैं!'
          : currentLanguage === 'ml'
          ? 'നമസ്കാരം! ഞാൻ TravelMate AI ആണ്. തമിഴ്നാട്ടിലെ പ്രധാന ആകർഷണങ്ങൾ, രുചികരമായ ഭക്ഷണങ്ങൾ, യാത്രാ വിവരങ്ങൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കൂ!'
          : currentLanguage === 'te'
          ? 'నమస్కారం! నేను TravelMate AI. తమిళనాడు పర్యాటక ప్రదేశాలు, ప్రసిద్ధ వంటకాలు, ప్రయాణ వివరాల గురించి ఏమైనా అడగండి!'
          : "Hello! I'm TravelMate AI, your dedicated assistant for exploring Tamil Nadu. Ask me about hill stations, sacred heritage temples, off-beat hidden spots, local food, or budget planning!",
      time: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language:
            currentLanguage === 'ta'
              ? 'Tamil'
              : currentLanguage === 'hi'
              ? 'Hindi'
              : currentLanguage === 'ml'
              ? 'Malayalam'
              : currentLanguage === 'te'
              ? 'Telugu'
              : 'English',
          travelType,
        }),
      });

      const data = await response.json();
      const aiReply =
        data.reply ||
        'I am ready to help you explore Tamil Nadu destinations. Could you please specify a city or district?';

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text:
            'Tamil Nadu is full of wonders! Top highlights include Ooty and Kodaikanal for hill stations, Madurai and Thanjavur for temple architecture, and Kolli Hills and Valparai for quiet nature.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-end sm:items-center">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[92vh] sm:h-[88vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-cyan-400 p-0.5 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                {t.aiAssistantTitle}
              </h2>
              <span className="text-[10px] text-teal-400 font-semibold">
                Multilingual AI Guide • {travelType.toUpperCase()} MODE
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

        {/* Suggested Quick Prompt Chips */}
        <div className="p-2.5 bg-slate-950/70 border-b border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0 px-1">
            Try:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-850 hover:bg-slate-800 border border-slate-700/80 text-[11px] text-slate-300 font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-teal-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 rounded-br-none font-medium shadow-md shadow-teal-500/10'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
                <span
                  className={`text-[9px] block text-right mt-1.5 ${
                    msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                  }`}
                >
                  {msg.time}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <UserIcon className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
              <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-teal-400 animate-spin" />
              </div>
              <span className="text-[11px] text-teal-400 font-semibold animate-pulse">
                Thinking and planning advice...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.askAnything}
              className="flex-1 p-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="w-11 h-11 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold flex items-center justify-center hover:opacity-95 active:scale-95 disabled:opacity-40 transition-all shrink-0 shadow-md shadow-teal-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
