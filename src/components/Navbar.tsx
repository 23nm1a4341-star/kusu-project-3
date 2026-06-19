import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Bell,
  Globe,
  ChevronDown,
  User,
  Sparkles,
  X
} from 'lucide-react';
import { LanguageCode, CurrencyCode, Product, CartItem } from '../types';
import { LANGUAGES, CURRENCIES, PRODUCTS } from '../data';
import { TRANSLATIONS } from '../translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onChangeLang: (code: LanguageCode) => void;
  currentCurrency: CurrencyCode;
  onChangeCurrency: (code: CurrencyCode) => void;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  onOpenWishlist: () => void;
  onSearchProduct: (query: string) => void;
}

export default function Navbar({
  currentLang,
  onChangeLang,
  currentCurrency,
  onChangeCurrency,
  activeTab,
  onChangeTab,
  cart,
  wishlist,
  onOpenWishlist,
  onSearchProduct
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([
    '🔥 20% Off All Traditional Wear this week!',
    '🌟 High school & College uniforms on sale now.',
    '📦 Premium worldwide delivery active instantly.'
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.collegeName && p.collegeName.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (p: Product) => {
    setSearchQuery(p.name);
    onSearchProduct(p.name);
    setSuggestions([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchProduct(searchQuery);
    setSuggestions([]);
  };

  const activeCurrencySymbol = CURRENCIES.find(c => c.code === currentCurrency)?.symbol || '₹';
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo with Premium Luxury Fashion Aesthetics */}
          <div 
            onClick={() => onChangeTab('home')} 
            className="flex flex-col items-start cursor-pointer group flex-shrink-0"
            id="brand-logo"
          >
            <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-yellow-400 transition-all duration-300 leading-none tracking-[0.2em] font-luxury">
              REVA
            </span>
            <span className="text-[8px] font-sans text-white/40 group-hover:text-white/60 transition-colors font-medium tracking-[0.25em] uppercase mt-1">
              CLOTHING BRAND
            </span>
          </div>

          {/* Search bar with auto-suggestions */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-md relative"
            id="global-search-form"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-full pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 ring-[#1E88E5]/50 transition-all placeholder-white/40"
              />
              <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-white/50" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); onSearchProduct(''); }}
                  className="absolute right-3 top-3 text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Target Auto suggestions popup */}
            {suggestions.length > 0 && (
              <div className="absolute top-12 left-0 w-full glass-panel-deep rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-white/5">
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSuggestionClick(p)}
                    className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-md border border-white/10" referrerPolicy="no-referrer" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">{p.category}</p>
                    </div>
                    <p className="text-xs font-mono font-bold text-yellow-400">
                      {activeCurrencySymbol}{(p.price * (CURRENCIES.find(c => c.code === currentCurrency)?.rate || 1.0) * (1 - p.discount/100)).toFixed(1)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* Quick Nav Actions (Main tabs, select language, currency) */}
          <nav className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-4 text-xs font-medium tracking-wide">
              {['home', 'categories', 'discounts', 'myOrders', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => onChangeTab(tab)}
                  className={`capitalize transition-all pb-1 border-b-2 hover:text-[#1E88E5] ${
                    activeTab === tab ? 'border-white text-white font-bold' : 'border-transparent text-white/60'
                  }`}
                >
                  {t[tab] || tab}
                </button>
              ))}
            </div>

            {/* Language switch selector */}
            <div className="relative">
              <button
                onClick={() => { setShowLangMenu(!showLangMenu); setShowCurrMenu(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors text-xs text-white/80"
                title="Select language"
              >
                <Globe className="w-4 h-4 text-white/75" />
                <span className="uppercase font-mono font-bold">{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-white/55" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-panel-deep rounded-xl shadow-2xl py-1.5 z-50 max-h-72 overflow-y-auto">
                  <div className="px-4 py-2 text-[10px] font-mono tracking-widest text-white/40 border-b border-white/5 uppercase">
                    SELECT LANGUAGE
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onChangeLang(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-xs text-left hover:bg-white/10 transition-colors ${
                        currentLang === lang.code ? 'text-[#1E88E5] font-bold bg-white/5' : 'text-white/80'
                      }`}
                    >
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-[10px] text-white/40 font-mono">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency switcher */}
            <div className="relative">
              <button
                onClick={() => { setShowCurrMenu(!showCurrMenu); setShowLangMenu(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors text-xs text-white/80 font-mono font-bold"
                title="Select currency"
              >
                <span>{activeCurrencySymbol}</span>
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3 h-3 text-white/55" />
              </button>

              {showCurrMenu && (
                <div className="absolute right-0 mt-2 w-44 glass-panel-deep rounded-xl shadow-2xl py-1.5 z-50">
                  <div className="px-4 py-2 text-[10px] font-mono tracking-widest text-white/40 border-b border-white/5 uppercase">
                    CURRENCY
                  </div>
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onChangeCurrency(curr.code);
                        setShowCurrMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-xs text-left hover:bg-white/10 transition-colors ${
                        currentCurrency === curr.code ? 'text-[#1E88E5] font-bold bg-white/5' : 'text-white/80'
                      }`}
                    >
                      <span className="font-medium">{curr.code}</span>
                      <span className="font-mono text-[10px] text-white/40 font-semibold">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 hover:bg-white/10 rounded-full transition-colors relative text-white/80"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1E88E5] rounded-full border border-black" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 glass-panel-deep rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 text-[10px] font-mono tracking-widest text-[#1E88E5] border-b border-white/5 flex justify-between items-center font-bold">
                    <span>LAUNCH OFFERS</span>
                    <button onClick={() => setShowNotifications(false)} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="divide-y divide-white/5 px-2 max-h-64 overflow-y-auto">
                    {notifications.map((note, idx) => (
                      <p key={idx} className="p-3.5 text-[11px] text-white/70 leading-relaxed text-left">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors relative"
              title="View Wishlist"
            >
              <Heart className="w-4.5 h-4.5 text-red-400 fill-red-400" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-mono font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#121212]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => onChangeTab('cart')}
              className="p-2.5 bg-[#1E88E5] hover:bg-blue-600 rounded-full transition-all flex items-center justify-center gap-1.5 relative border border-white/10 shadow-lg"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#0a2472] font-mono font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

        </div>
      </div>

      {/* Mobile nav indicator bar for simpler taps */}
      <div className="md:hidden flex items-center justify-around h-12 bg-white/5 backdrop-blur-xl border-t border-white/10 text-xs text-white/80 font-medium">
        {['home', 'categories', 'discounts', 'myOrders'].map((tab) => (
          <button
            key={tab}
            onClick={() => onChangeTab(tab)}
            className={`capitalize ${activeTab === tab ? 'text-white font-bold underline decoration-[#1E88E5] underline-offset-4' : 'text-white/60'}`}
          >
            {t[tab] || tab}
          </button>
        ))}
        <button onClick={() => onChangeTab('contact')} className={activeTab === 'contact' ? 'text-white font-bold underline decoration-[#1E88E5] underline-offset-4' : 'text-white/60'}>{t.contact}</button>
      </div>
    </header>
  );
}
