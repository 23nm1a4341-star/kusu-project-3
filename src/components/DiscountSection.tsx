import React, { useState, useEffect } from 'react';
import { Tag, Clock } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';

interface DiscountSectionProps {
  currentLang: LanguageCode;
  onApplyPromo: (code: string) => void;
  selectedPromoCode: string;
}

export default function DiscountSection({
  currentLang,
  onApplyPromo,
  selectedPromoCode
}: DiscountSectionProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  // Timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 54 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 }; 
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
    {
      title: 'Traditional Wear Fiesta',
      desc: 'Get an extra 20% flat discount on Sarees, Lehengas and Sherwanis.',
      code: 'TRAD20',
      badge: '20% OFF',
      timerActive: true
    },
    {
      title: 'College Uniform Launch Coupon',
      desc: 'Buy matching official uniforms in combinations and claim flat saving.',
      code: 'COLLEGE15',
      badge: '15% OFF',
      timerActive: false
    },
    {
      title: 'Festival Sparkle Bonanza',
      desc: 'Celebrate stylishly with absolute free stitching on bulk ethnic wear.',
      code: 'FREEFIT',
      badge: 'Free Stitching',
      timerActive: true
    },
    {
      title: 'Newly Styled User promo',
      desc: 'Sign up or shop for the first time on KUSU to redeem an instant gift.',
      code: 'FIRSTSTYL',
      badge: '₹500 Gift',
      timerActive: false
    }
  ];

  const [copiedCode, setCopiedCode] = useState<string>('');

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    onApplyPromo(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 text-white space-y-8 shadow-2xl text-left border border-white/10">
      
      {/* Header section with mega banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="space-y-1.5 font-sans">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-yellow-400 rotate-90" />
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{t.discountSec}</h2>
          </div>
          <p className="text-xs text-white/50">
            Apply automated voucher codes to secure direct savings on worldwide apparel deliveries.
          </p>
        </div>

        {/* Global countdown block */}
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-md">
          <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white/70">Flash Sales End: </span>
          <div className="flex gap-1 font-mono text-sm font-black text-yellow-400">
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
            <span>:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
            <span>:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer, index) => {
          const isSelected = selectedPromoCode === offer.code;
          return (
            <div 
              key={index}
              className={`p-5 rounded-2xl border relative flex flex-col justify-between transition-all ${
                isSelected 
                  ? 'bg-gradient-to-r from-[#1E88E5]/20 to-[#0A2472]/20 border-yellow-400/50 shadow-lg scale-101' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
              }`}
            >
              {/* Promo badge */}
              <div className="absolute top-4 right-4 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-widest">
                {offer.badge}
              </div>

              <div className="space-y-2 pr-20">
                <span className="text-[9px] font-bold text-[#1E88E5] font-mono uppercase tracking-widest leading-none">PROMOTIONAL OFFER</span>
                <h3 className="text-sm font-black text-white uppercase pt-0.5">{offer.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed pr-6">{offer.desc}</p>
              </div>

              {/* Apply block */}
              <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/70">
                  <Tag className="w-3.5 h-3.5 text-white/40" />
                  <span>Voucher:</span>
                  <span className="font-bold text-white uppercase tracking-wider bg-black/40 border border-white/5 px-2 py-0.5 rounded-lg">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected || copiedCode === offer.code
                      ? 'bg-green-600 text-white'
                      : 'bg-[#1E88E5] text-white hover:bg-blue-600'
                  }`}
                >
                  {copiedCode === offer.code ? 'Copied & Active' : isSelected ? 'Coupon Active' : 'Apply Code'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Free Global Shipping Info Section */}
      <div className="glass-blue-panel rounded-2xl p-5 flex items-start gap-4 border border-white/10">
        <span className="text-2xl">🌍</span>
        <div className="space-y-2 text-left font-sans">
          <h4 className="text-xs font-mono font-black text-[#1E88E5] tracking-widest uppercase">FREE WORLDWIDE DISPATCH ON ORDERS OVER ₹4999</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            All countries included. We package ethnic silk and customized suits with moisture-proof secure casings. 
            Real-time tracking links will be issued to your WhatsApp and Email instantly upon payment approval.
          </p>
        </div>
      </div>

    </div>
  );
}
