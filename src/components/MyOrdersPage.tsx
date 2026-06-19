import React, { useState } from 'react';
import { Package, Receipt, Truck, ArrowLeft, RotateCcw, X, Check } from 'lucide-react';
import { Order, LanguageCode, CurrencyCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { CURRENCIES } from '../data';

interface MyOrdersPageProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  orders: Order[];
  onReorder: (order: Order) => void;
  onInitiateReturn: (orderId: string) => void;
}

export default function MyOrdersPage({
  currentLang,
  currentCurrency,
  orders,
  onReorder,
  onInitiateReturn
}: MyOrdersPageProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showInvoice, setShowInvoice] = useState<Order | null>(null);
  const [returnRequestedId, setReturnRequestedId] = useState<string | null>(null);

  const currRecord = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];
  const rate = currRecord.rate;
  const symbol = currRecord.symbol;

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Order Placed': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 1;
    }
  };

  const handleReturnRequest = (orderId: string) => {
    onInitiateReturn(orderId);
    setReturnRequestedId(orderId);
    setTimeout(() => {
      setReturnRequestedId(null);
    }, 6000);
  };

  if (orders.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center text-white space-y-4 max-w-xl mx-auto my-10 border border-white/10">
        <Package className="w-16 h-16 text-white/30 mx-auto animate-pulse" />
        <h3 className="text-lg font-black uppercase tracking-wide">You have no orders yet</h3>
        <p className="text-xs text-white/50 leading-relaxed">
          Ready to Wear Your Style? Check our traditional collections or high-school college catalogs to initiate deliveries.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white text-left font-sans">
      
      {/* Title block */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Package className="w-5 h-5 text-[#1E88E5]" />
        <h2 className="text-md sm:text-lg font-black uppercase tracking-tight text-white">{t.orderHistory}</h2>
      </div>

      {!selectedOrder ? (
        /* Orders list grid */
        <div className="space-y-4">
          {orders.map((order) => {
            const formattedTotal = (order.totalAmount * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1);
            return (
              <div 
                key={order.id} 
                className="glass-panel border border-white/5 hover:border-white/15 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300"
              >
                
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] bg-yellow-400 text-black font-mono font-bold px-2.5 py-0.5 rounded-full">
                      ID: {order.id}
                    </span>
                    <span className="text-[10px] font-mono text-white/50">Date: {order.date}</span>
                    <span className="text-[10px] border border-white/10 bg-white/5 text-yellow-300 font-mono px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wide">
                      🚚 {order.status}
                    </span>
                  </div>

                  {/* Summary of items */}
                  <div className="text-xs space-y-1">
                    {order.items.map((item, id) => (
                      <p key={id} className="text-xs text-white/80">
                        • {item.product.name} ({item.selectedSize}, {item.selectedColor}) <span className="font-mono text-white/40 font-bold">x{item.quantity}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-white/40 font-mono block uppercase font-bold">Order value:</span>
                    <span className="text-sm font-mono font-black text-yellow-400">{symbol}{formattedTotal}</span>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-bold font-sans cursor-pointer transition-colors"
                    >
                      Track Shipment
                    </button>
                    <button
                      onClick={() => setShowInvoice(order)}
                      className="p-2.5 bg-[#1E88E5]/20 border border-white/10 hover:bg-[#1E88E5] rounded-xl text-white transition-all cursor-pointer"
                      title="Generate invoice"
                    >
                      <Receipt className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Shipment Tracker View */
        <div className="glass-panel border border-white/10 rounded-2xl p-6 space-y-8 shadow-2xl">
          
          {/* Header tracker detail */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white font-mono cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to History</span>
            </button>
            <span className="text-xs font-semibold text-yellow-400 font-mono uppercase tracking-wider">Secured Dispatch Timeline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Delivery address & info detail card */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-[#1E88E5] flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wide">
                <span>📦 Shipping Logistics Summary</span>
              </h3>
              <p className="text-white/80"><span className="text-white/40">Recipient Name:</span> {selectedOrder.shippingAddress.fullName}</p>
              <p className="text-white/80"><span className="text-white/40">Street Address:</span> {selectedOrder.shippingAddress.street}</p>
              <p className="text-white/80"><span className="text-white/40">Destination:</span> {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}</p>
              <p className="text-white/80"><span className="text-white/40">WhatsApp Alert Number:</span> {selectedOrder.shippingAddress.phone}</p>
              <p className="text-white/80"><span className="text-white/40">Logistic Merchant:</span> DHL Regional air express cargo</p>
              <p className="text-white/80"><span className="text-white/40">Secure Tracking Code:</span> <span className="font-mono text-yellow-400 font-bold">{selectedOrder.trackingNumber}</span></p>
            </div>

            {/* Price line totals detail card */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3.5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-yellow-400 flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-wide">
                  <span>💰 Financial Summary</span>
                </h3>
                <div className="space-y-1.5 pt-1.5">
                  <p className="text-white/85"><span className="text-white/40">Billing Category:</span> Secured Electronic {selectedOrder.paymentMethod}</p>
                  <p className="text-white/85"><span className="text-white/40">Order Token:</span> <span className="font-mono text-white/60">{selectedOrder.id}</span></p>
                  <p className="text-white/85"><span className="text-white/40">Total Charged:</span> <span className="font-mono font-bold text-white">{symbol}{(selectedOrder.totalAmount * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1)}</span></p>
                </div>
              </div>

              {/* Action buttons inside tracker */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onReorder(selectedOrder)}
                    className="py-2.5 bg-yellow-400 hover:bg-white text-black font-mono font-extrabold uppercase rounded-xl text-[10px] tracking-wider cursor-pointer transition-colors"
                  >
                    Reorder Outfit
                  </button>
                  <button
                    onClick={() => handleReturnRequest(selectedOrder.id)}
                    className="py-2.5 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/15 text-red-400 rounded-xl text-[10px] uppercase font-bold cursor-pointer transition-all"
                  >
                    Request Return
                  </button>
                </div>
                {returnRequestedId === selectedOrder.id && (
                  <p className="text-[10px] text-green-300 font-semibold bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2 text-center leading-normal animate-pulse">
                     ✓ Return process initialized! ReVa local courier will coordinate pick-up arrangements at your door within 48 hours.
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Visual Tracking Timeline */}
          <div className="space-y-4 pt-4 border-t border-white/5 text-center">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/45 text-left font-bold">Real-Time Dispatch Pipeline</h4>
            
            <div className="relative flex flex-col justify-between sm:flex-row items-center gap-4 sm:gap-2">
              {[
                { label: 'Placed', desc: 'Securely Auth' },
                { label: 'Processing', desc: 'Custom Tailored' },
                { label: 'Shipped', desc: 'In Transit cargo' },
                { label: 'Carrier Out', desc: 'Near destination' },
                { label: 'Delivered', desc: 'Home drop check' }
              ].map((step, idx) => {
                const stepNum = idx + 1;
                const activeStep = getStatusStep(selectedOrder.status);
                const isPassed = stepNum <= activeStep;
                return (
                  <div key={idx} className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2 text-center flex-1 w-full text-left sm:text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                      isPassed ? 'bg-[#1E88E5] text-white border border-white/30 shadow' : 'bg-white/5 text-white/30 border border-white/5'
                    }`}>
                      {stepNum}
                    </div>
                    <div>
                      <p className={`text-xs font-bold leading-none ${isPassed ? 'text-white' : 'text-white/30'}`}>{step.label}</p>
                      <p className="text-[9px] text-white/40 font-mono mt-1 leading-none">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Styled Printable Invoice Screen Modal */}
      {showInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel-deep text-white p-6 rounded-2xl space-y-6 shadow-2xl border border-white/10 relative">
            
            <button
              onClick={() => setShowInvoice(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white z-10 p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print Header */}
            <div className="border-b border-white/10 pb-4 text-center">
              <h2 className="text-xl font-black tracking-widest text-yellow-500 font-sans">REVA CLOTHING INVOICE</h2>
              <p className="text-[10px] text-white/50 font-mono uppercase tracking-wider">Wear Your Style, Delivered Worldwide</p>
              <p className="text-[10px] text-yellow-500 font-mono mt-1 bg-yellow-400/10 px-3 py-0.5 rounded-full inline-block border border-yellow-400/20">Invoice Token ID: {showInvoice.id}</p>
            </div>

            {/* Metadata information */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-left">
                <p className="font-bold text-[9px] text-white/40 uppercase font-mono">Billed Recipient:</p>
                <p className="font-extrabold text-white">{showInvoice.shippingAddress.fullName}</p>
                <p className="text-white/70">{showInvoice.shippingAddress.street}</p>
                <p className="text-white/70">{showInvoice.shippingAddress.city}, {showInvoice.shippingAddress.country}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[9px] text-white/40 uppercase font-mono">Logistics info:</p>
                <p className="text-white/80">Date: <span className="font-mono font-semibold">{showInvoice.date}</span></p>
                <p className="text-white/80">Payment: <span className="font-semibold">{showInvoice.paymentMethod}</span></p>
                <p className="text-white/80">Tracking: <span className="font-mono font-semibold text-yellow-400">{showInvoice.trackingNumber}</span></p>
              </div>
            </div>

            {/* Itemized tables */}
            <div className="border-t border-b border-white/5 py-3 space-y-2">
              <div className="grid grid-cols-12 text-[9px] font-mono text-white/40 uppercase font-bold">
                <span className="col-span-6">Item description</span>
                <span className="col-span-2 text-center">Size</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              {showInvoice.items.map((item, id) => {
                const multipliedItemPrice = (item.product.price * rate * (1 - item.product.discount/100) * item.quantity).toFixed(currentCurrency === 'JPY' ? 0 : 1);
                return (
                  <div key={id} className="grid grid-cols-12 text-xs py-1 text-left">
                    <span className="col-span-6 truncate font-sans text-white/90">{item.product.name}</span>
                    <span className="col-span-2 text-center font-mono text-white/75">{item.selectedSize}</span>
                    <span className="col-span-2 text-center font-mono text-white/75">x{item.quantity}</span>
                    <span className="col-span-2 text-right font-mono text-white/90">{symbol}{multipliedItemPrice}</span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic total checkout pricing lines */}
            <div className="text-right text-xs space-y-1 font-sans">
              <p className="text-white/50">VAT & Global Taxes: <span className="font-mono text-white">{symbol}{((showInvoice.totalAmount * 0.08) * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1)}</span></p>
              <p className="text-white/50">Apparel Dispatch Charge: <span className="font-mono text-green-300 font-bold">FREE Worldwide</span></p>
              <div className="border-t border-white/5 pt-2 mt-1">
                <span className="text-[10px] font-bold text-white/40 block uppercase tracking-wider">Grand Total billing</span>
                <span className="text-lg font-mono font-black text-yellow-400">{symbol}{(showInvoice.totalAmount * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1)}</span>
              </div>
            </div>

            {/* Footer stamp */}
            <div className="text-center font-mono text-[9px] text-white/40 border-t border-white/5 pt-3 leading-relaxed">
              🎉 Thank you for apparel shopping on ReVa. Secure custom logistics authorized.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
