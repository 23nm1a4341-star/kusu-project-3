import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, Sparkles, Scale, Check, X } from 'lucide-react';
import { Product, LanguageCode, CurrencyCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { CURRENCIES } from '../data';

interface ProductCardProps {
  key?: any;
  product: Product;
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  onAddToCart: (p: Product, size: string, color: string, stitching?: boolean, notes?: string) => void;
  onBuyNow: (p: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onCompareSelect?: (p: Product) => void;
}

export default function ProductCard({
  product,
  currentLang,
  currentCurrency,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onCompareSelect
}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');
  const [customStitching, setCustomStitching] = useState(false);
  const [stitchingNotes, setStitchingNotes] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  // Currency utility helper
  const currencyRecord = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];
  const rate = currencyRecord.rate;
  const symbol = currencyRecord.symbol;

  const originalPrice = (product.price * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);
  const finalPrice = (product.price * rate * (1 - product.discount / 100)).toFixed(currentCurrency === 'JPY' ? 0 : 1);

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, selectedColor, customStitching, stitchingNotes);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  return (
    <>
      {/* Product Card Container */}
      <div 
        className="group relative glass-panel glass-panel-hover rounded-2xl overflow-hidden text-left flex flex-col justify-between hover:border-white/20 shadow-md"
        id={`product-card-${product.id}`}
      >
        
        {/* Discount Tag */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-mono font-black px-2 py-0.5 rounded-full z-10 shadow-md uppercase tracking-wider">
            -{product.discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-white hover:text-red-500 transition-colors z-10 rounded-full text-white backdrop-blur-md border border-white/10 cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Product Image Frame */}
        <div className="relative aspect-square overflow-hidden bg-[#0d0d10] cursor-pointer border-b border-white/5" onClick={() => setShowQuickView(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Quick specs overlays */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
            <span className="text-[9px] text-white/50 font-mono tracking-widest uppercase">{product.brand}</span>
            <div className="flex gap-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }}
                className="p-1.5 bg-[#1E88E5] text-white rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                title="Quick View specification"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              {onCompareSelect && (
                <button
                  onClick={(e) => { e.stopPropagation(); onCompareSelect(product); }}
                  className="p-1.5 bg-yellow-400 text-black rounded-full hover:bg-white transition-colors cursor-pointer"
                  title="Compare product details"
                >
                  <Scale className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          
          <div className="space-y-1.5">
            {/* College indicator for uniform category */}
            {product.collegeName ? (
              <span className="inline-block text-[8px] font-mono text-yellow-300 font-bold tracking-wider bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                🎓 {product.collegeName}
              </span>
            ) : (
              <span className="text-[9px] uppercase tracking-widest text-[#1E88E5] font-mono font-bold block">
                {product.subcategory}
              </span>
            )}

            <h3 className="line-clamp-2 text-xs sm:text-sm font-bold text-white group-hover:text-blue-200 transition-colors leading-snug">
              {product.name}
            </h3>
          </div>

          {/* Rating block */}
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-white">{product.rating}</span>
            <span className="text-[9px] text-white/45 font-mono">({product.reviewsCount} {t.reviews})</span>
          </div>

          {/* Price display with currency calculations */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-mono font-extrabold text-white">
              {symbol}{finalPrice}
            </span>
            {product.discount > 0 && (
              <span className="text-xs font-mono text-white/40 line-through">
                {symbol}{originalPrice}
              </span>
            )}
          </div>

          {/* Action trigger buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1 font-sans">
            <button
              onClick={handleAddToCartClick}
              disabled={justAdded}
              className={`w-full py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                justAdded 
                  ? 'bg-green-600 text-white border-transparent'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-[#0A2472]'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{justAdded ? 'Added' : 'Add to Cart'}</span>
            </button>
            
            <button
              onClick={() => onBuyNow(product)}
              className="w-full py-2 px-1 bg-[#1E88E5] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* Quick View specification modal drawer */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl glass-panel-deep border border-white/15 rounded-2xl overflow-hidden text-white flex flex-col md:flex-row shadow-2xl">
            
            {/* Close */}
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 z-10 p-1.5 bg-black/40 text-white rounded-full hover:bg-white hover:text-black transition-colors border border-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal product image */}
            <div className="w-full md:w-1/2 aspect-square relative bg-[#0d0d10]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 left-4 bg-[#1E88E5]/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono border border-white/10 font-bold uppercase tracking-wider">
                Model size: M
              </div>
            </div>

            {/* Modal product description and config options */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4 text-left font-sans">
              
              <div className="space-y-1.5">
                {product.collegeName && (
                  <span className="inline-block text-[10px] bg-yellow-400/20 text-yellow-300 font-mono px-2 py-0.5 rounded-full border border-yellow-400/20">
                    🎓 {product.collegeName} (Official Uniform)
                  </span>
                )}
                <h2 className="text-md sm:text-lg font-bold text-white pr-6 leading-snug">{product.name}</h2>
                <p className="text-[10px] tracking-widest text-[#1E88E5] font-mono uppercase font-bold">{product.brand}</p>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <span className="text-xs font-bold bg-white/5 border border-white/5 px-2 py-0.5 text-yellow-400 rounded-lg">
                    ★ {product.rating}
                  </span>
                  <span className="text-[10px] text-white/50">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Specs parameters lists */}
              <div className="text-xs space-y-1.5 text-white/70 border-t border-b border-white/5 py-3 font-medium">
                <p>👗 <span className="text-white/40">Material:</span> {product.materials.join(', ')}</p>
                <p>📍 <span className="text-white/40">Tailoring country:</span> {product.country}</p>
                <p>🚚 <span className="text-white/40">Apparel Delivery:</span> Dynamic Worldwide tracking active</p>
              </div>

              {/* Select size */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono text-white/40 font-bold">SIZE GUIDE (SELECT SIZE)</p>
                <div className="flex gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs rounded-xl border font-mono cursor-pointer transition-all ${
                        selectedSize === sz ? 'bg-yellow-400 text-black border-transparent font-bold' : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Color */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono text-white/40 font-bold">CHOOSE COLOR</p>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 text-xs rounded-xl border cursor-pointer transition-all ${
                        selectedColor === color ? 'bg-white text-black border-transparent font-bold' : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Stitching checkbox */}
              <div className="space-y-2 border-t border-white/5 pt-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-yellow-300">
                  <input
                    type="checkbox"
                    checked={customStitching}
                    onChange={(e) => setCustomStitching(e.target.checked)}
                    className="accent-yellow-400 w-4 h-4 rounded"
                  />
                  <span>✂️ Enable Bespoke Tailoring Stitching (+ ₹499 INR)</span>
                </label>
                {customStitching && (
                  <textarea
                    placeholder="Enter torso size constraints (chest, shoulder, torso length, waist)..."
                    value={stitchingNotes}
                    onChange={(e) => setStitchingNotes(e.target.value)}
                    className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                    rows={2}
                  />
                )}
              </div>

              {/* Interactive add to cart */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div>
                  <span className="text-[10px] text-white/40 font-mono">TotalPrice:</span>
                  <p className="text-md sm:text-lg font-mono font-extrabold text-yellow-400">
                    {symbol}{(parseFloat(finalPrice) + (customStitching ? 499 * rate : 0)).toFixed(currentCurrency === 'JPY' ? 0 : 1)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleAddToCartClick();
                    setShowQuickView(false);
                  }}
                  className="px-5 py-2.5 bg-[#1E88E5] hover:bg-blue-600 font-extrabold text-xs text-white tracking-widest uppercase rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Confirm & Cart
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
