import React, { useState } from 'react';
import { X, MapPin, CreditCard, ShieldCheck, Check } from 'lucide-react';
import { CartItem, LanguageCode, CurrencyCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { CURRENCIES } from '../data';

interface CheckoutModalProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  cart: CartItem[];
  appliedPromo: string;
  onClose: () => void;
  onOrderSuccess: (address: { fullName: string; street: string; city: string; country: string; phone: string; }, paymentMethod: string) => void;
}

export default function CheckoutModal({
  currentLang,
  currentCurrency,
  cart,
  appliedPromo,
  onClose,
  onOrderSuccess
}: CheckoutModalProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  // Currency factors
  const currRecord = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];
  const rate = currRecord.rate;
  const symbol = currRecord.symbol;

  // Address State
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('India');
  const [phone, setPhone] = useState('');

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [upiId, setUpiId] = useState('');
  
  const [checkoutStep, setCheckoutStep] = useState(1); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Totals calculations
  const itemsSubtotal = cart.reduce((sum, item) => {
    const discountedBase = item.product.price * (1 - item.product.discount / 100);
    return sum + (discountedBase * item.quantity);
  }, 0);

  const stitchingFeeBase = cart.reduce((sum, item) => {
    return sum + (item.customStitching ? 499 * item.quantity : 0);
  }, 0);

  const subtotalRaw = itemsSubtotal + stitchingFeeBase;

  let discountPercentage = 0;
  if (appliedPromo === 'TRAD20') discountPercentage = 20;
  else if (appliedPromo === 'COLLEGE15') discountPercentage = 15;
  else if (appliedPromo === 'FREEFIT') discountPercentage = 10;
  else if (appliedPromo === 'FIRSTSTYL') discountPercentage = 12;

  const promoDeductionRaw = subtotalRaw * (discountPercentage / 100);
  const taxRaw = (subtotalRaw - promoDeductionRaw) * 0.08;
  const shippingRaw = (subtotalRaw - promoDeductionRaw) > 4999 ? 0 : 350;

  const finalTotalRaw = subtotalRaw - promoDeductionRaw + taxRaw + shippingRaw;
  const finalTotalC = (finalTotalRaw * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && street.trim() && city.trim() && phone.trim()) {
      setCheckoutStep(2);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess({ fullName, street, city, country, phone }, paymentMethod);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl glass-panel-deep border border-white/15 rounded-2xl overflow-hidden text-white flex flex-col shadow-2xl">
        
        {/* Modal Close Action */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header timeline */}
        <div className="bg-[#1E88E5]/15 p-5 border-b border-white/5 text-left font-sans">
          <h2 className="text-md sm:text-lg font-black uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span>ReVa Secured Checkout Gateways</span>
          </h2>
          {/* Progress track */}
          <div className="flex items-center gap-4 mt-4 text-[10px] uppercase font-mono tracking-widest font-black">
            <span className={checkoutStep >= 1 ? 'text-yellow-400 font-extrabold pb-0.5 border-b border-yellow-400' : 'text-white/40'}>
              1. Delivery Address
            </span>
            <span className="text-white/20">➔</span>
            <span className={checkoutStep >= 2 ? 'text-yellow-400 font-extrabold pb-0.5 border-b border-yellow-400' : 'text-white/40'}>
              2. Secured Payment
            </span>
          </div>
        </div>

        {/* Steps container */}
        <div className="p-6 text-left">
          
          {checkoutStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4 text-xs">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <MapPin className="w-4 h-4 text-[#1E88E5]" />
                <h3 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wide">Where should we deliver your apparel?</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">Recipient's Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deepika Reddy"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black/45 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Apartment/Suite, Road/Street Name"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-black/45 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">Town / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Visakhapatnam"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-black/45 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5]/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">Destination Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5]/20"
                  >
                    {['India', 'USA', 'UK', 'Australia', 'Canada', 'Europe', 'UAE', 'Singapore', 'Japan', 'Other'].map(c => (
                      <option key={c} value={c} className="bg-[#0d0d10] text-[#fff]">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/45 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E88E5] hover:bg-blue-600 text-white font-black uppercase rounded-xl shadow-lg transition-all text-center tracking-widest mt-3.5 cursor-pointer"
              >
                Proceed to Payment Summary
              </button>
            </form>
          )}

          {checkoutStep === 2 && (
            <form onSubmit={handleSubmitOrder} className="space-y-5 text-xs">
              
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <CreditCard className="w-4 h-4 text-[#1E88E5]" />
                <h3 className="font-bold text-white uppercase tracking-wide">Select Payment Channel</h3>
              </div>

              {/* Toggle Methods checkboxes */}
              <div className="grid grid-cols-3 gap-2">
                {['Credit Card', 'UPI / QR', 'PayPal'].map(method => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-1 text-center font-bold border rounded-xl transition-all cursor-pointer ${
                      paymentMethod === method 
                        ? 'bg-yellow-400 text-black border-transparent shadow shadow-yellow-400/10' 
                        : 'border-white/5 text-white/70 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {/* Credit Card inputs */}
              {paymentMethod === 'Credit Card' && (
                <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-white/40 font-bold">16-Digit Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-white/40 font-bold">Expiry MM/YY</label>
                      <input
                        type="text"
                        required
                        placeholder="11/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-yellow-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-white/40 font-bold">CVV Code</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="***"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI ID block and QR code display */}
              {paymentMethod === 'UPI / QR' && (
                <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono uppercase text-white/40 block font-bold">Virtual Payment UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-yellow-400"
                    />
                  </div>
                  
                  <div className="py-2 inline-block bg-white p-2.5 rounded-2xl border border-white/10 shadow-md">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=reva@pay&pn=REVA+Apparel+Delivery&am=${finalTotalRaw}&cu=INR`}
                      alt="Checkout QR Pay"
                      className="w-32 h-32 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-[10px] text-white/40">Or scan with your phone UPI application to process secure merchant transfer</p>
                </div>
              )}

              {/* PayPal */}
              {paymentMethod === 'PayPal' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center py-6 space-y-2">
                  <p className="text-sm font-black text-[#1E88E5] uppercase font-sans">PayPal Securing check</p>
                  <p className="text-[10px] text-white/50 leading-relaxed">Secured browser checkout gateway will load instantly upon confirming bulk order.</p>
                </div>
              )}

              {/* Price detail block */}
              <div className="glass-blue-panel border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/45 uppercase font-mono font-bold">Total billing charge:</span>
                  <p className="text-md sm:text-lg font-bold text-yellow-400 font-mono leading-none pt-0.5">{symbol}{finalTotalC}</p>
                </div>
                <div className="text-right text-[10px] text-white/50 space-y-0.5">
                  <p>🚚 Ship to: <strong>{city}, {country}</strong></p>
                  <p>📦 Worldwide tracking supported</p>
                </div>
              </div>

              {/* Back CTA / Confirm CTA */}
              <div className="grid grid-cols-12 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep(1)}
                  className="col-span-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs hover:bg-white/10 text-center cursor-pointer text-white/80"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="col-span-8 py-3.5 bg-yellow-400 text-black rounded-xl font-extrabold uppercase text-xs tracking-widest hover:bg-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? 'Verifying payment...' : 'Confirm Order Check'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
