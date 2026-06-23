import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

interface SignupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onClose, onSwitchToLogin, onSuccess }) => {
  const { signup, error, setError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validateEmail = (emailStr: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmError('');

    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Please share your beautiful name.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please supply a valid email format.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please set a password.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password keys require at least 6 characters for safety.');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmError('Please confirm your password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError('Your passwords do not match.');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    const success = await signup(email, password, name);
    setIsLoading(false);

    if (success) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 sm:p-10 rounded-2xl glass-panel border border-white/10 text-left relative overflow-hidden">
      {/* Decorative side spotlight blur */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-6">
        {/* Header area */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-luxury text-2xl tracking-[0.2em] text-white">REVA</span>
            <span className="text-[8px] font-sans text-white/40 tracking-[0.25em] uppercase font-medium">Clothing Brand</span>
          </div>
          <h2 className="text-lg font-sans font-bold tracking-wider uppercase text-white mt-4">Join The Club</h2>
          <p className="text-xs text-white/50 leading-relaxed font-sans">
            Become a premium member to secure priority worldwide delivery slots, tailored boutique sizing, and custom designs.
          </p>
        </div>

        {/* Auth error messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="leading-normal font-sans pr-1">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs">
          {/* Full Name block */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">Your Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className={`w-full bg-white/5 border ${nameError ? 'border-red-500/40 focus:border-red-500' : 'border-white/10 focus:border-yellow-500/50'} rounded-lg py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none transition-all font-mono`}
                disabled={isLoading}
              />
            </div>
            {nameError && (
              <p className="text-[10px] text-red-400 flex items-center gap-1 font-sans mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{nameError}</span>
              </p>
            )}
          </div>

          {/* Email Address block */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. elena@brand.com"
                className={`w-full bg-white/5 border ${emailError ? 'border-red-500/40 focus:border-red-500' : 'border-white/10 focus:border-yellow-500/50'} rounded-lg py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none transition-all font-mono`}
                disabled={isLoading}
              />
            </div>
            {emailError && (
              <p className="text-[10px] text-red-400 flex items-center gap-1 font-sans mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* Password block */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">Password Key</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-white/5 border ${passwordError ? 'border-red-500/40 focus:border-red-500' : 'border-white/10 focus:border-yellow-500/50'} rounded-lg py-3 pl-11 pr-11 text-white placeholder-white/20 focus:outline-none transition-all font-mono`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 hover:text-white/60 transition-colors flex items-center justify-center cursor-pointer"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-[10px] text-red-400 flex items-center gap-1 font-sans mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{passwordError}</span>
              </p>
            )}
          </div>

          {/* Confirm Password block */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">Confirm Password Key</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-white/5 border ${confirmError ? 'border-red-500/40 focus:border-red-500' : 'border-white/10 focus:border-yellow-500/50'} rounded-lg py-3 pl-11 pr-11 text-white placeholder-white/20 focus:outline-none transition-all font-mono`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 hover:text-white/60 transition-colors flex items-center justify-center cursor-pointer"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmError && (
              <p className="text-[10px] text-red-400 flex items-center gap-1 font-sans mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{confirmError}</span>
              </p>
            )}
          </div>

          {/* Register Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/40 text-black font-sans font-bold uppercase text-[11px] tracking-widest rounded-md transition-all duration-300 transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Create Premium Wardrobe</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back option to Login */}
        <div className="text-center pt-3 border-t border-white/5 font-sans">
          <p className="text-[11px] text-white/40">
            Already have an active account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-yellow-500 font-bold hover:underline cursor-pointer"
              disabled={isLoading}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
