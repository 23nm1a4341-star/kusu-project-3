import React from 'react';
import { useAuth } from './AuthContext';
import { Lock, Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onShowLogin: () => void;
  fallbackMessage?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  onShowLogin, 
  fallbackMessage = "Access to this space is reserved for premium members. Please sign in to view this content." 
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-white/40 tracking-widest font-mono">AUTHENTICATING SESSION...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="glass-panel max-w-xl mx-auto rounded-2xl p-12 text-center border border-white/10 space-y-6 my-10 relative overflow-hidden">
        {/* Subtle glowing ambient backup light */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-5">
          <div className="mx-auto w-14 h-14 bg-yellow-400/10 border border-yellow-400/20 rounded-full flex items-center justify-center text-yellow-500 shadow-lg">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-display font-light text-white tracking-widest uppercase">
              Exclusive <span className="italic text-yellow-200">Access Only</span>
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans max-w-sm mx-auto">
              {fallbackMessage}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={onShowLogin}
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 font-sans font-bold uppercase text-[10px] tracking-widest text-black rounded transition-all cursor-pointer w-full sm:w-auto"
            >
              Sign In
            </button>
            
            <div className="text-[10px] text-white/30 uppercase tracking-widest font-mono py-1">or</div>
            
            <button
              onClick={onShowLogin}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 font-sans font-semibold uppercase text-[10px] tracking-widest text-white rounded transition-all cursor-pointer w-full sm:w-auto"
            >
              Create Premium Account
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[9px] text-white/30 uppercase font-mono tracking-widest pt-2">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            <span>ReVa Secure Protocol Enabled</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
