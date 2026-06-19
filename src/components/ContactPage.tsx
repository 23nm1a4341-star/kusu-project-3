import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, ChevronDown } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';

interface ContactPageProps {
  currentLang: LanguageCode;
}

export default function ContactPage({ currentLang }: ContactPageProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: '🚚 Which countries does ReVa deliver apparel to?',
      a: 'We support express international cargo delivery to over 150+ countries. Shipping is fast, secure, and moisture-sealed.'
    },
    {
      q: '✂️ How does custom tailoring stitching work on college uniforms?',
      a: 'Simply select "Enable Bespoke Tailoring Stitching" inside any product Quick View specification modal or category layout. Submit your shoulder, chest, and preferred pants sizes. Our expert tailors stitch it perfectly to size.'
    },
    {
      q: '💵 Can I instantly choose my country currency and checkout?',
      a: 'Yes, our platform supports 9 primary global currencies (INR, USD, EUR, GBP, JPY, AED, SGD, AUD, CAD) showing real-time converted rates without any refresh.'
    },
    {
      q: '🔄 What is ReVa return and refund policy?',
      a: 'Within 15 days of receiving the package, you can request a return package. We pick up return packs right from your home, verify conditions, and issue dynamic refunds instantly.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMsg('');
    }, 4000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 text-white space-y-8 shadow-2xl text-left border border-white/10">
      
      {/* Title */}
      <div className="border-b border-white/5 pb-4 font-sans">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
          <span>{t.contactUs || 'Contact ReVa Support Desk'}</span>
        </h2>
        <p className="text-xs text-white/55">Our customer team and AI support chatbots are active 24/7 globally.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Support contacts - emails / whatsapp */}
        <div className="lg:col-span-5 space-y-5 text-xs text-white/50">
          
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-sm text-[#1E88E5] border-b border-white/5 pb-2 font-sans uppercase tracking-wider">Global Customer Center</h3>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-white/40 text-[9px] uppercase font-mono font-bold">Email Support</p>
                <p className="font-bold font-mono text-white/90">support@revaclothing.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-white/40 text-[9px] uppercase font-mono font-bold">Global Fulfillment Center</p>
                <p className="font-bold text-white/90">Cyber Towers, Visakhapatnam, AP, India</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-white/40 text-[9px] uppercase font-mono font-bold">Institutional bulk helpline</p>
                <p className="font-bold font-mono text-white/90">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Social / WhatsApp quick connect */}
          <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl space-y-3">
            <h4 className="font-black text-green-400 flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans">
              <MessageCircle className="w-4.5 h-4.5" />
              <span>{t.whatsAppSupport || 'WhatsApp Support'}</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-white/70">
              Launch instant queries regarding delivery track delays, customized stitching options and bulk pricing quotes over instant messenger.
            </p>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 font-extrabold text-[10px] tracking-widest text-white uppercase px-4 py-2 rounded-xl font-mono shadow cursor-pointer"
            >
              🚀 Launch WhatsApp Chat
            </a>
          </div>

        </div>

        {/* Contact Form & FAQs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* FAQ Accordion dropdowns */}
          <div className="space-y-3.5">
            <h3 className="text-md font-bold tracking-tight text-white font-sans uppercase">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`border rounded-2xl overflow-hidden bg-white/5 transition-colors ${isOpen ? 'border-[#1E88E5]/30' : 'border-white/5'}`}>
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 flex items-center justify-between text-xs font-semibold focus:outline-none cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-white/45 flex-shrink-0 transform transition-transform ${isOpen ? 'rotate-180 text-yellow-400' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-white/5 text-xs text-white/70 leading-relaxed bg-[#121212]/30">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive contact feedback submission */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-1 font-sans uppercase tracking-wide">
              <span>✉️ Submit Technical support Enquiry</span>
            </h3>

            {submitted ? (
              <div className="p-6 text-center space-y-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-xs font-bold text-green-300">🎉 Message Transmitted Safely!</p>
                <p className="text-[10px] text-white/55 leading-relaxed">Our support coordinators will send solutions directly to your mail within 1 hour.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1E88E5]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="anand@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1E88E5]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold">Enquiry Notes</label>
                  <textarea
                    required
                    placeholder="Enter support details, stitch custom measurements request or logistics feedback..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1E88E5]"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1E88E5] hover:bg-white hover:text-[#0a2472] font-black uppercase rounded-xl font-mono text-[10px] tracking-widest flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5 animate-pulse" />
                  <span>Send Message</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
