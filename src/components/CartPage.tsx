import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, Tag, Percent, Scissors, PackageOpen } from 'lucide-react';
import { CartItem, LanguageCode, CurrencyCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { CURRENCIES } from '../data';

interface CartPageProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  cart: CartItem[];
  appliedPromo: string;
  onUpdateQty: (pId: string, size: string, color: string, change: number) => void;
  onRemoveItem: (pId: string, size: string, color: string) => void;
  onApplyPromo: (code: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartPage({
  currentLang,
  currentCurrency,
  cart,
  appliedPromo,
  onUpdateQty,
  onRemoveItem,
  onApplyPromo,
  onProceedToCheckout
}: CartPageProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const [promoInput, setPromoInput] = useState(appliedPromo || '');
  const [promoError, setPromoError] = useState('');

  // Currency factors
  const currRecord = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];
  const rate = currRecord.rate;
  const symbol = currRecord.symbol;

  // Pricing calculations
  const itemsSubtotal = cart.reduce((sum, item) => {
    const discountedBase = item.product.price * (1 - item.product.discount / 100);
    return sum + (discountedBase * item.quantity);
  }, 0);

  const stitchingFeeBase = cart.reduce((sum, item) => {
    return sum + (item.customStitching ? 499 * item.quantity : 0);
  }, 0);

  const subtotalRaw = itemsSubtotal + stitchingFeeBase;

  // Promo discounts
  let discountPercentage = 0;
  if (appliedPromo === 'TRAD20') {
    discountPercentage = 20;
  } else if (appliedPromo === 'COLLEGE15') {
    discountPercentage = 15;
  } else if (appliedPromo === 'FREEFIT') {
    discountPercentage = 10; 
  } else if (appliedPromo === 'FIRSTSTYL') {
    discountPercentage = 12; 
  }

  const promoDeductionRaw = subtotalRaw * (discountPercentage / 100);
  const taxRaw = (subtotalRaw - promoDeductionRaw) * 0.08; 
  const shippingRaw = (subtotalRaw - promoDeductionRaw) > 4999 ? 0 : 350; 

  const finalTotalRaw = subtotalRaw - promoDeductionRaw + taxRaw + shippingRaw;

  // Converted outputs
  const itemsSubtotalC = (itemsSubtotal * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);
  const stitchingFeeC = (stitchingFeeBase * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);
  const discountC = (promoDeductionRaw * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);
  const taxC = (taxRaw * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);
  const shippingC = (shippingRaw * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);
  const finalTotalC = (finalTotalRaw * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);

  const handleApplyPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validCodes = ['TRAD20', 'COLLEGE15', 'FREEFIT', 'FIRSTSTYL'];
    const cleaned = promoInput.trim().toUpperCase();
    if (validCodes.includes(cleaned)) {
      onApplyPromo(cleaned);
      setPromoError('');
    } else {
      setPromoError('❌ Invalid promo voucher code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center text-white space-y-5 max-w-xl mx-auto my-10 border border-white/10">
        <PackageOpen className="w-16 h-16 text-white/30 mx-auto animate-bounce" />
        <h3 className="text-lg font-black uppercase tracking-wide">Your KUSU cart is empty</h3>
        <p className="text-xs text-white/50 leading-relaxed">
          Complete your style file. Check our premium categories or Custom College uniform setups to populate checkout items.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-white text-left">
      
      {/* Cart items list side */}
      <div className="lg:col-span-8 glass-panel rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 font-sans">
          <h2 className="text-md sm:text-lg font-black uppercase tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1E88E5]" />
            <span>Shopping Cart Bag ({cart.length} items)</span>
          </h2>
        </div>

        {/* Cart Item Row List */}
        <div className="divide-y divide-white/5">
          {cart.map((item, idx) => {
            const itemPriceC = (item.product.price * rate * (1 - item.product.discount/100)).toFixed(currentCurrency === 'JPY' ? 0 : 1);
            const itemStitchC = item.customStitching ? (499 * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1) : null;
            return (
              <div key={idx} className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Visual side */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1.5 text-left min-w-0 flex-1">
                    {item.product.collegeName && (
                      <span className="inline-block text-[8px] font-mono text-yellow-300 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                        🎓 {item.product.collegeName}
                      </span>
                    )}
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate">{item.product.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/50 font-mono">
                      <span>Size: <span className="text-yellow-400 font-bold">{item.selectedSize}</span></span>
                      <span>Color: <span className="text-white/85 font-medium">{item.selectedColor}</span></span>
                      {item.customStitching && (
                        <span className="text-green-300 font-semibold flex items-center gap-0.5">
                          <Scissors className="w-2.5 h-2.5" /> Customized
                        </span>
                      )}
                    </div>
                    {item.customStitching && item.stitchingNotes && (
                      <p className="text-[9px] text-white/50 font-mono italic truncate bg-white/5 py-1 px-1.5 rounded-lg border border-white/5 leading-normal">
                        Stitching Details: "{item.stitchingNotes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right side control panel */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  
                  {/* Quantity Control block */}
                  <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-xl p-1.5">
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.selectedColor, -1)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-mono font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.selectedColor, 1)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Converted pricing summation */}
                  <div className="text-right min-w-24">
                    <p className="text-xs sm:text-sm font-mono font-bold text-white">
                      {symbol}{(parseFloat(itemPriceC) * item.quantity).toFixed(currentCurrency === 'JPY' ? 0 : 1)}
                    </p>
                    {itemStitchC && (
                      <p className="text-[10px] text-yellow-400 font-mono">
                        + {symbol}{(parseFloat(itemStitchC) * item.quantity).toFixed(currentCurrency === 'JPY' ? 0 : 1)} tailoring
                      </p>
                    )}
                  </div>

                  {/* Trash remove button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-xl text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout overview pricing panel side */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Price summary stats */}
        <div className="glass-panel rounded-2xl p-5 sm:p-6 text-white space-y-5 shadow-2xl border border-[#1E88E5]/20">
          <h3 className="text-xs font-mono font-black tracking-widest uppercase border-b border-white/5 pb-2 text-[#1E88E5]">
            {t.priceSummary}
          </h3>
          
          <div className="space-y-3.5 text-xs font-sans">
            <div className="flex justify-between items-center text-white/50">
              <span>Subtotal items:</span>
              <span className="font-mono text-white/90">{symbol}{itemsSubtotalC}</span>
            </div>
            {stitchingFeeBase > 0 && (
              <div className="flex justify-between items-center text-white/50">
                <span>Stitching tailored charge:</span>
                <span className="font-mono text-yellow-300">+{symbol}{stitchingFeeC}</span>
              </div>
            )}
            {discountPercentage > 0 && (
              <div className="flex justify-between items-center text-white/50">
                <span className="flex items-center gap-1 text-green-300 font-semibold">
                  <Percent className="w-3.5 h-3.5" />
                  <span>Coupon Deduction ({discountPercentage}%):</span>
                </span>
                <span className="font-mono text-green-300">-{symbol}{discountC}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-white/50">
              <span>GST & Global Customs (8%):</span>
              <span className="font-mono text-white/95">{symbol}{taxC}</span>
            </div>
            <div className="flex justify-between items-center text-white/50">
              <span>Apparel Fast Delivery:</span>
              <span className={`font-mono ${shippingRaw === 0 ? 'text-green-300 font-bold' : 'text-white/95'}`}>
                {shippingRaw === 0 ? 'FREE Worldwide' : `${symbol}${shippingC}`}
              </span>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Estimated Total:</span>
              <span className="text-lg font-mono font-black text-yellow-400">{symbol}{finalTotalC}</span>
            </div>
          </div>

          {/* Secure validation tags */}
          <div className="text-[10px] text-white/40 leading-relaxed pt-2 border-t border-white/5">
            🔒 Prices converted dynamically. Secured checkout with auto-tracking support.
          </div>
          
          {/* Proceed button */}
          <button
            onClick={onProceedToCheckout}
            className="w-full py-4 bg-[#1E88E5] hover:bg-blue-600 text-white font-extrabold tracking-widest uppercase rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Promo code drawer */}
        <div className="glass-panel rounded-2xl p-5 text-white shadow-2xl space-y-3.5 border border-white/10">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block font-bold">
            {t.couponCode}
          </label>
          <form onSubmit={handleApplyPromoSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. TRAD20, COLLEGE15"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="flex-1 bg-black/45 border border-white/10 focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5]/30 rounded-xl p-2.5 text-xs uppercase text-white outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-yellow-400 font-extrabold text-xs text-black rounded-xl hover:bg-white transition-colors cursor-pointer"
            >
              Apply
            </button>
          </form>
          {promoError && <p className="text-[10px] text-red-400 font-mono">{promoError}</p>}
          {appliedPromo && (
            <p className="text-[10px] text-green-300 flex items-center gap-1 font-mono font-semibold">
              ✓ Promo code <strong>{appliedPromo}</strong> is active!
            </p>
          )}
        </div>

      </div>

    </div>
  );
}
