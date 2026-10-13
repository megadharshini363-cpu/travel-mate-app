import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../i18n/translations';
import { Eye, EyeOff, Lock, User, Mail, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthScreenProps {
  currentLanguage: Language;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  currentLanguage,
  onLoginSuccess,
}) => {
  const t = translations[currentLanguage];
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isForgotPassword) {
      if (!usernameOrEmail.trim()) {
        setStatusMessage({ text: 'Please enter your registered email address.', isError: true });
        return;
      }
      setStatusMessage({ text: t.passwordResetSent, isError: false });
      setTimeout(() => {
        setIsForgotPassword(false);
        setStatusMessage(null);
      }, 2500);
      return;
    }

    if (!usernameOrEmail.trim() || !password.trim()) {
      setStatusMessage({ text: 'Please enter your credentials.', isError: true });
      return;
    }

    // Authentic user session object
    const userProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      name: fullName.trim() || usernameOrEmail.split('@')[0] || 'Traveler',
      email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@travelmate.ai`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      language: currentLanguage,
      travelType: 'solo',
      savedDestinationIds: ['ooty', 'madurai', 'kolli-hills'],
      favoritePlaceIds: ['ooty-att-1', 'mad-att-1'],
      bookedPackages: [],
      caretakerRequests: [],
      savedItineraries: [],
    };

    // Store in localStorage for persistent session
    localStorage.setItem('travelmate_user', JSON.stringify(userProfile));
    setStatusMessage({ text: t.authSuccess, isError: false });

    setTimeout(() => {
      onLoginSuccess(userProfile);
    }, 600);
  };

  const handleGuestLogin = () => {
    const guestUser: UserProfile = {
      id: 'guest-user',
      name: 'Guest Traveler',
      email: 'guest@travelmate.ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      language: currentLanguage,
      travelType: 'solo',
      savedDestinationIds: ['ooty'],
      favoritePlaceIds: [],
      bookedPackages: [],
      caretakerRequests: [],
      savedItineraries: [],
    };
    localStorage.setItem('travelmate_user', JSON.stringify(guestUser));
    onLoginSuccess(guestUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white flex flex-col justify-center p-6 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 -right-20 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Logo */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-teal-500/20 mb-3">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Compass className="w-8 h-8 text-teal-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {isForgotPassword
            ? t.forgotPassword
            : isRegisterMode
            ? t.createAccount
            : t.login}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {t.appName} • Tamil Nadu Tourism
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        {statusMessage && (
          <div
            className={`p-3.5 mb-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              statusMessage.isError
                ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {isRegisterMode && !isForgotPassword && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.fullName}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Anbarasan"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                  required={isRegisterMode}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.usernameOrEmail}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="traveler@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                required
              />
            </div>
          </div>

          {!isForgotPassword && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  {t.password}
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs text-teal-400 hover:text-teal-300 font-medium"
                >
                  {t.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 text-xs font-medium"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-teal-500/25 mt-2 flex items-center justify-center gap-2"
          >
            <span>
              {isForgotPassword
                ? 'Send Reset Link'
                : isRegisterMode
                ? t.createAccount
                : t.login}
            </span>
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
          {isForgotPassword ? (
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="text-xs text-teal-400 hover:underline font-semibold"
            >
              Back to Login
            </button>
          ) : (
            <p className="text-xs text-slate-400">
              {isRegisterMode ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setStatusMessage(null);
                }}
                className="text-teal-400 hover:text-teal-300 font-bold ml-1 hover:underline"
              >
                {isRegisterMode ? t.login : t.createAccount}
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Guest Login button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleGuestLogin}
          className="text-xs text-slate-400 hover:text-slate-200 font-medium py-2 px-4 rounded-xl hover:bg-slate-900 transition-colors"
        >
          {t.loginAsGuest} →
        </button>
      </div>
    </div>
  );
};
