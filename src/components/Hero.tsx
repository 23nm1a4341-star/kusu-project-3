import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeroProps {
  currentLang: LanguageCode;
  onExplore: () => void;
  onShopNow: () => void;
}

export default function Hero({ currentLang, onExplore, onShopNow }: HeroProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 border-b border-white/5">
      {/* Background Decorative Gradient Blobs from the Design HTML style */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0A2472] via-transparent to-transparent opacity-40" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#1E88E5]/20 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#0A2472]/30 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content side */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tagline pill with luxury letter spacing */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-500 font-sans font-bold">
                {t.tagline}
              </span>
            </div>

            {/* Headline is styled with a premium serif Display font */}
            <h1 className="text-4xl sm:text-7xl font-display tracking-tight leading-[1.1] text-white font-light">
              Modern <span className="italic text-yellow-200">Elegance</span>,<br />Timeless <span className="font-bold tracking-widest font-luxury text-yellow-500 text-3xl sm:text-6xl">STYLE.</span>
            </h1>

            {/* Subheadline styling in half-opacity elegant gray-shades */}
            <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
              {t.heroSub}
            </p>

            {/* Quick value props list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="p-1.5 bg-white/5 rounded-md border border-white/10">
                  <Globe className="w-4 h-4 text-yellow-500" />
                </div>
                <span className="font-sans font-medium tracking-wide">Worldwide Express Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="p-1.5 bg-white/5 rounded-md border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="font-sans font-medium tracking-wide">Custom Couture Stitching</span>
              </div>
            </div>

            {/* Action buttons exactly corresponding to luxury styling parameters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onShopNow}
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 font-bold tracking-wider font-sans rounded-md transition-all duration-300 shadow-xl text-black flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer uppercase text-xs"
              >
                <span>{t.shopNow}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              
              <button
                onClick={onExplore}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-sans font-semibold tracking-wider text-xs uppercase rounded-md transition-all duration-300 flex items-center justify-center transform active:scale-95 cursor-pointer"
              >
                {t.exploreCategories}
              </button>
            </div>

            {/* Elegant statistics bar matching premium fashion elements */}
            <div className="pt-6 flex gap-12 relative z-10">
              <div className="flex flex-col">
                <span className="text-3xl font-light font-display text-white">180+</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-sans font-bold mt-1">Countries</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-light font-display text-white">24/7</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-sans font-bold mt-1">Live Concierge</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-light font-display text-yellow-500">AI</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-sans font-bold mt-1">Personalized Style</span>
              </div>
            </div>

          </div>

          {/* Interactive display side */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="aspect-square relative flex items-center justify-center">
              
              {/* Spinning border overlay */}
              <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full animate-[spin_50s_linear_infinite]" />
              
              {/* Circular Model Frame - traditional models and global wear models */}
              <div className="w-11/12 h-11/12 rounded-full overflow-hidden border-4 border-white/10 relative shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80"
                  alt="ReVa Collection Portrait"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating tags with frosted crystal backgrounds */}
                <div className="absolute top-1/4 left-4 glass-panel-deep px-3 py-1.5 rounded-lg border border-white/15 text-[11px] font-mono font-bold text-white shadow-xl">
                  🥻 Traditional Wear
                </div>
                <div className="absolute bottom-1/4 right-4 glass-panel-deep px-3 py-1.5 rounded-lg border border-white/15 text-[11px] font-mono font-bold text-[#1E88E5] shadow-xl">
                  🎓 College Blazer
                </div>
              </div>

              {/* Little floating badges */}
              <div className="absolute -top-4 right-8 bg-[#1E88E5] text-white font-mono text-[10px] uppercase font-bold px-3 py-2 rounded-lg shadow-xl tracking-wider">
                NEW SEASON
              </div>

              <div className="absolute -bottom-4 left-8 bg-white/5 backdrop-blur-xl border border-white/15 text-white font-mono text-[10px] px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Worldwide Deliveries Active</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
