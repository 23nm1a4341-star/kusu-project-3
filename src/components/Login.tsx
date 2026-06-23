import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
  onSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onClose, onSwitchToSignup, onSuccess }) => {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Forgot password flow
  const [forgotFlow, setForgotFlow] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const validateEmail = (emailStr: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError('');
    setPasswordError('');

    let isValid = true;
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email format (e.g. user@example.com).');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    const success = await login(email, password, rememberMe);
    setIsLoading(false);

    if (success) {
      onSuccess();
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess(false);

    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address first.');
      return;
    } else if (!validateEmail(forgotEmail)) {
      setForgotError('Please check your email address format.');
      return;
    }

    setIsLoading(true);
    // Simulate API request to deliver password recovery
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);
    setForgotSuccess(true);
  };

  if (forgotFlow) {
    return (
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl glass-panel border border-white/10 text-left relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h3 className="text-2xl font-display font-light text-white tracking-widest uppercase">
              Retrieve <span className="italic text-yellow-200 text-3xl">Access</span>
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              Enter your premium registered email below. We'll instantly dispatch customized recovery credentials.
            </p>
          </div>

          {forgotSuccess ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 space-y-3 text-center transition-all animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
              <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider">RECOVERY DESPATCHED!</h4>
              <p className="text-[10px] text-white/70 leading-relaxed">
                Check inbox for <strong>{forgotEmail}</strong>. Secure recovery handshake details are sent. You should return to sign in after verification.
              </p>
              <button
                onClick={() => { setForgotFlow(false); setForgotSuccess(false); setForgotEmail(''); }}
                className="mt-2 text-xs font-mono text-yellow-500 hover:underline"
              >
                ← Back to Login Space
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-5 text-xs">
              <div className="space-y-1.5 text-left">
                <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="e.g. luxury.client@revaclothing.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/50 transition-all font-mono"
                    disabled={isLoading}
                  />
                </div>
                {forgotError && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 font-sans mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{forgotError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/40 text-black font-sans font-bold uppercase text-[10px] tracking-widest rounded transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="w-4.5 h-4.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Dispatch Credentials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setForgotFlow(false); setForgotError(''); }}
                  className="text-white/40 hover:text-white transition-colors text-[10px] uppercase font-sans tracking-wider"
                  disabled={isLoading}
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}

          <div className="border-t border-white/5 pt-4 text-center">
            <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">
              🔒 ReVa High-Audit Security Desk
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 sm:p-10 rounded-2xl glass-panel border border-white/10 text-left relative overflow-hidden">
      {/* Upper diagonal overlay gradient */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-6">
        {/* Card Header area */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-luxury text-2xl tracking-[0.2em] text-white">REVA</span>
            <span className="text-[8px] font-sans text-white/40 tracking-[0.25em] uppercase font-medium">Clothing Brand</span>
          </div>
          <h2 className="text-lg font-sans font-bold tracking-wider uppercase text-white mt-4">Welcome Back</h2>
          <p className="text-xs text-white/50 leading-relaxed font-sans">
            Please enter your authenticated credentials to synchronize your wardrobes, saved fit models, and custom measurements.
          </p>
        </div>

        {/* Global form level errors */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="leading-normal font-sans pr-1">{error}</p>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          {/* Email input block */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="luxury.client@revaclothing.com"
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

          {/* Password input block */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 block">Password Key</label>
              <button
                type="button"
                onClick={() => setForgotFlow(true)}
                className="text-[10px] font-sans text-yellow-500/70 hover:text-yellow-400 hover:underline transition-colors block"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
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

          {/* Remember me option */}
          <div className="flex items-center justify-between py-1 font-sans">
            <label className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-yellow-500 bg-white/5 border-white/10"
                disabled={isLoading}
              />
              <span className="text-[10px] uppercase tracking-wider">Remember Me</span>
            </label>
            
            <div className="xs:hidden flex items-center gap-1 text-[9px] text-white/35 font-mono uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-500/80" />
              <span>TLS Secured</span>
            </div>
          </div>

          {/* Submit active button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/40 text-black font-sans font-bold uppercase text-[11px] tracking-widest rounded-md transition-all duration-300 transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In Securely</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch to Signup alternative */}
        <div className="text-center pt-3 border-t border-white/5 space-y-4">
          <p className="text-[11px] font-sans text-white/40">
            Don't have an elite styling profile yet?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-yellow-500 font-bold hover:underline cursor-pointer"
              disabled={isLoading}
            >
              Sign Up For ReVa
            </button>
          </p>
          <div className="flex items-center justify-center gap-1 text-[9px] text-white/30 uppercase font-mono tracking-widest">
            <p>Demo accounts available: <strong>demo@revaclothing.com</strong> with <strong>Password123</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
