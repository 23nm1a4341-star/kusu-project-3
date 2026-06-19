import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Compass, Check, ArrowRight } from 'lucide-react';
import { LanguageCode, Product } from '../types';
import { TRANSLATIONS } from '../translations';
import { PRODUCTS } from '../data';

interface AISectorProps {
  currentLang: LanguageCode;
  onAddToCartDirect: (p: Product) => void;
}

export default function AISector({ currentLang, onAddToCartDirect }: AISectorProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const [aiActiveTab, setAiActiveTab] = useState<'stylist' | 'matcher'>('stylist');
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState({ configAvailable: false });
  const [comboAddedSuccess, setComboAddedSuccess] = useState(false);

  // Stylist selections state
  const [occasion, setOccasion] = useState('Wedding Ceremony');
  const [stylePreference, setStylePreference] = useState('Traditional Royale & Gold');
  const [weather, setWeather] = useState('Hot Summer');
  const [gender, setGender] = useState('Women');
  const [stylistResult, setStylistResult] = useState<any[] | null>(null);

  // Matcher Selections state (default top and bottom)
  const [topProduct, setTopProduct] = useState<Product>(PRODUCTS[0]); 
  const [bottomProduct, setBottomProduct] = useState<Product>(PRODUCTS[11]); 
  const [matcherResult, setMatcherResult] = useState<any | null>(null);

  // Check backend server AI capability on load
  useEffect(() => {
    fetch('/api/ai-status')
      .then(res => res.json())
      .then(data => setAiStatus(data))
      .catch(() => setAiStatus({ configAvailable: false }));
  }, []);

  // Filter lists of products for top vs bottoms manually to aid selection
  const tops = PRODUCTS.filter(p => 
    p.subcategory === 'Sarees' || 
    p.subcategory === 'Kurtas' || 
    p.subcategory === 'Blazers' || 
    p.subcategory === 'T-Shirts' || 
    p.subcategory === 'Sherwanis' ||
    p.subcategory === 'Suits'
  );
  const bottoms = PRODUCTS.filter(p => 
    p.subcategory === 'Lehengas' || 
    p.subcategory === 'Jeans' || 
    p.subcategory === 'Pajamas' || 
    p.subcategory === 'Track Pants' ||
    p.subcategory === 'Skirts'
  );

  useEffect(() => {
    if (tops.length > 0 && !topProduct) setTopProduct(tops[0]);
    if (bottoms.length > 0 && !bottomProduct) setBottomProduct(bottoms[0]);
  }, [tops, bottoms, topProduct, bottomProduct]);

  // AI RECOMMENDATIONS FLOW
  const handleQueryStylist = async () => {
    setLoading(true);
    setStylistResult(null);

    if (!aiStatus.configAvailable) {
      setTimeout(() => {
        setStylistResult([
          {
            title: `🌟 Royal Kanchipuram Gold Fusion (${gender})`,
            description: `A stunning combination featuring pure silk borders. Ideal for ${occasion} under ${weather} climate conditions.`,
            tip: `Drape this pairing with a golden waistband or temple jewelry pieces to amplify the traditional visual contrast.`,
            matchingColors: ['Gold', 'Deep Royal Blue', 'Ivory White']
          },
          {
            title: `⚡ Modern Silhouette Fusion Set`,
            description: `Excellently matches a light breathable top paired with luxurious linen trousers that stay dry and comfortable.`,
            tip: `Keep makeup minimal and wear matching classic leather flats.`,
            matchingColors: ['Midnight Black', 'Turquoise', 'Silver Accent']
          },
          {
            title: `🌸 Classic Celebration Ethnic Set`,
            description: `Bespoke tailored organic cotton suit sets optimized specifically for ${stylePreference} styles.`,
            tip: `We recommend matching stitching for customized sleeve length.`,
            matchingColors: ['Rose Pink', 'Pure Emerald', 'Golden Cream']
          }
        ]);
        setLoading(false);
      }, 1500);
      return;
    }

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion, stylePreference, weather, gender })
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setStylistResult(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setStylistResult([
        {
          title: `🌟 Premium Curated Styling Set`,
          description: `Custom curated styling suggestions built for ${gender} selecting ${stylePreference} visual layouts.`,
          tip: `Pair this combination with matching flats or oxford shoes.`,
          matchingColors: ['Gold Accent', 'Deep Sea Navy', 'Crimson Red']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // AI OUTFIT SYNERGY CHECK
  const handleOutfitMatch = async () => {
    setLoading(true);
    setMatcherResult(null);
    setComboAddedSuccess(false);

    if (!aiStatus.configAvailable) {
      setTimeout(() => {
        let computedScore = 80;
        let verdict = 'Timeless Classic';
        let review = 'Excellent traditional synergy matching material flows and colors.';
        let accessories = ['Gold Plated Kundan necklace', 'Handcrafted Juttis'];

        if (topProduct.category !== bottomProduct.category) {
          computedScore = 88;
          verdict = 'Absolute Fire';
          review = 'High contrast combinations that highlight unique structural details beautifully.';
          accessories = ['Leather boots', 'Minimalist metallic watch'];
        }

        if (topProduct.category === 'College Uniforms') {
          computedScore = 94;
          verdict = 'Official Elite Status';
          review = 'Perfect visual uniform styling conforming accurately to collegiate rules.';
          accessories = ['Polished formal belt', 'Collegiate lapel pin'];
        }

        setMatcherResult({
          score: computedScore,
          verdict,
          review,
          accessories
        });
        setLoading(false);
      }, 1500);
      return;
    }

    try {
      const res = await fetch('/api/outfit-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ top: topProduct, bottom: bottomProduct })
      });
      const data = await res.json();
      setMatcherResult(data);
    } catch {
      setMatcherResult({
        score: 85,
        verdict: 'Charming Balance',
        review: 'Styling reviews point to a high comfort factor pairing cotton weaves with classic silhouettes.',
        accessories: ['Gold bracelet', 'Beige leather loafers']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCartCombo = () => {
    onAddToCartDirect(topProduct);
    onAddToCartDirect(bottomProduct);
    setComboAddedSuccess(true);
    setTimeout(() => {
      setComboAddedSuccess(false);
    }, 4000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 text-white space-y-8 shadow-2xl text-left border border-white/10">
      
      {/* Tab select headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5 font-sans">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1E88E5] animate-pulse" />
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight">ReVa Interactive AI Fashion Suite</h2>
          </div>
          <p className="text-xs text-white/55">
            {aiStatus.configAvailable 
              ? '⚡ Running Live Server Gemini Models to parse clothing catalogs' 
              : '🌟 Local offline styling heuristics initialized (API unconfigured)'}
          </p>
        </div>

        {/* Tab triggers buttons */}
        <div className="flex bg-white/5 p-1 border border-white/5 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => { setAiActiveTab('stylist'); setStylistResult(null); setMatcherResult(null); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              aiActiveTab === 'stylist' ? 'bg-[#1E88E5] text-white shadow font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            Personalized Stylist
          </button>
          <button
            onClick={() => { setAiActiveTab('matcher'); setStylistResult(null); setMatcherResult(null); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              aiActiveTab === 'matcher' ? 'bg-[#1E88E5] text-white shadow font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            Smart Outfit Matcher
          </button>
        </div>
      </div>

      {/* VIEW 1: PERSONALIZED STYLIST RECOMMENDATIONS */}
      {aiActiveTab === 'stylist' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 font-bold">Target Fitting</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-[#1E88E5] outline-none text-white/85"
              >
                {['Men', 'Women', 'Kids', 'Unisex'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 font-bold">Target Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-[#1E88E5] outline-none text-white/85"
              >
                {['Wedding Ceremony', 'College Lecture', 'Sports Gym Meet', 'Corporate Evening', 'Casual Lunch Date'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 font-bold">Design preference</label>
              <select
                value={stylePreference}
                onChange={(e) => setStylePreference(e.target.value)}
                className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-[#1E88E5] outline-none text-white/85"
              >
                {['Traditional Royale & Gold', 'Sleek Corporate Modernist', 'Cozy Hooded Streetwear', 'Minimal Elegant Pastels'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 font-bold">Expected weather</label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-[#1E88E5] outline-none text-white/85"
              >
                {['Hot Summer', 'Winter Cold', 'Moisture Monsoon', 'Cool Automn'].map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

          </div>

          <button
            onClick={handleQueryStylist}
            disabled={loading}
            className="w-full py-4.5 bg-[#1E88E5] hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer relative"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                <span>AI is compiling style combinations...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Retrieve AI personalized recommendations</span>
              </>
            )}
          </button>

          {/* Result styling block */}
          {stylistResult && (
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-[#1E88E5] font-bold">PROPOSED STYLES</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stylistResult.map((item, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 relative flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-yellow-400 font-bold uppercase tracking-widest bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">STYLE {idx+1}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase pt-1">{item.title}</h4>
                      <p className="text-[11px] text-white/70 leading-relaxed text-slate-330">{item.description}</p>
                    </div>

                    <div className="space-y-2 border-t border-white/5 pt-3.5">
                      <p className="text-[10px] italic text-yellow-250 leading-normal">💡 Tip: {item.tip}</p>
                      
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.matchingColors.map((color: string, colIdx: number) => (
                          <span key={colIdx} className="text-[9px] font-mono bg-white/5 border border-white/5 text-white/60 px-2 py-0.5 rounded-full">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* VIEW 2: SMART OUTFIT MATCH CAROUSEL */}
      {aiActiveTab === 'matcher' && (
        <div className="space-y-6 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Top wear picker */}
            <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/10 text-left">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block pb-1.5 border-b border-white/5 font-bold">1. PICK TOP CLOTHING OUTFIT</label>
              <div className="flex gap-4 items-center pt-1">
                <img src={topProduct.image} alt={topProduct.name} className="w-16 h-16 object-cover rounded-xl border border-white/10" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{topProduct.name}</h4>
                  <p className="text-[9px] text-white/50 uppercase tracking-wider font-mono pt-0.5">{topProduct.subcategory} ({topProduct.brand})</p>
                  
                  <select
                    value={topProduct.id}
                    onChange={(e) => {
                      const found = PRODUCTS.find(p => p.id === e.target.value);
                      if (found) setTopProduct(found);
                    }}
                    className="mt-2 w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2 text-[11px] text-white/80 outline-none"
                  >
                    {tops.map(p => (
                      <option key={p.id} value={p.id} className="bg-[#0d0d10] text-[#fff]">{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom wear picker */}
            <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/10 text-left">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block pb-1.5 border-b border-white/5 font-bold">2. PICK BOTTOM CLOTHING OUTFIT</label>
              <div className="flex gap-4 items-center pt-1">
                <img src={bottomProduct.image} alt={bottomProduct.name} className="w-16 h-16 object-cover rounded-xl border border-white/10" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{bottomProduct.name}</h4>
                  <p className="text-[9px] text-white/50 uppercase tracking-widest font-mono pt-0.5">{bottomProduct.subcategory} ({bottomProduct.brand})</p>
                  
                  <select
                    value={bottomProduct.id}
                    onChange={(e) => {
                      const found = PRODUCTS.find(p => p.id === e.target.value);
                      if (found) setBottomProduct(found);
                    }}
                    className="mt-2 w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2 text-[11px] text-white/80 outline-none"
                  >
                    {bottoms.map(p => (
                      <option key={p.id} value={p.id} className="bg-[#0d0d10] text-[#fff]">{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>

          <button
            onClick={handleOutfitMatch}
            disabled={loading}
            className="w-full py-4.5 bg-[#1E88E5] hover:bg-blue-600 text-white font-black uppercase rounded-xl tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer relative"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                <span>Running color contrast and material weave analytics...</span>
              </>
            ) : (
              <>
                <Compass className="w-4.5 h-4.5 animate-pulse" />
                <span>Evaluate Outfit matchmaking Synergy Score</span>
              </>
            )}
          </button>

          {/* Matcher result block */}
          {matcherResult && (
            <div className="glass-blue-panel p-6 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-3">
                <div className="text-left">
                  <span className="text-[10px] font-mono uppercase text-white/60 font-semibold">Aesthetic matching score</span>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-mono font-black text-yellow-400">{matcherResult.score}%</span>
                    <span className="text-[10px] bg-yellow-400/20 text-yellow-300 border border-yellow-400/20 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-widest">
                      {matcherResult.verdict}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={handleCartCombo}
                    className="px-4 py-2 bg-yellow-400 text-black font-extrabold text-[11px] uppercase tracking-wider rounded-xl hover:bg-white transition-colors cursor-pointer"
                  >
                    🛒 Add Combos To Cart
                  </button>
                  {comboAddedSuccess && (
                    <span className="text-xs font-semibold text-green-300 animate-pulse text-center">
                      ✓ Bundle Added!
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-left">
                <p className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider">Stylist Reviewer critique:</p>
                <p className="text-xs text-white/80 leading-relaxed">{matcherResult.review}</p>
              </div>

              {/* Recommended accessories */}
              <div className="space-y-2 border-t border-white/5 pt-3">
                <p className="text-[10px] font-mono uppercase text-white/50 font-bold">Perfect Accessories suggested:</p>
                <div className="flex flex-wrap gap-2">
                  {matcherResult.accessories?.map((acc: string, id: number) => (
                    <span key={id} className="text-xs bg-white/5 border border-white/10 text-yellow-300 px-3 py-1 rounded-full font-medium">
                      ✨ {acc}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
