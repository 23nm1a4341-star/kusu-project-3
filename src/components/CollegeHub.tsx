import React, { useState } from 'react';
import { Search, GraduationCap, Users, Shirt, Minimize2, Send } from 'lucide-react';
import { Product, LanguageCode, CurrencyCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { COLLEGE_LIST, CURRENCIES } from '../data';

interface CollegeHubProps {
  currentLang: LanguageCode;
  collegeUniforms: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart?: (p: Product, size: string, color: string, stitching?: boolean, notes?: string) => void;
  currentCurrency: CurrencyCode;
}

export default function CollegeHub({
  currentLang,
  collegeUniforms,
  onSelectProduct,
  onAddToCart,
  currentCurrency
}: CollegeHubProps) {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkCollege, setBulkCollege] = useState('');
  const [bulkQuantity, setBulkQuantity] = useState(100);
  const [bulkName, setBulkName] = useState('');
  const [bulkEmail, setBulkEmail] = useState('');
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  // Find IIT models
  const iitUniforms = collegeUniforms.filter(p => p.collegeName === 'IITs');
  const [selectedIitIdx, setSelectedIitIdx] = useState(0);
  const activeIitProd = iitUniforms[selectedIitIdx];

  const [iitSize, setIitSize] = useState('M');
  const [iitStitching, setIitStitching] = useState(false);
  const [iitStitchNotes, setIitStitchNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleIitAddToCart = () => {
    if (activeIitProd && onAddToCart) {
      onAddToCart(activeIitProd, iitSize, activeIitProd.colors[0] || 'Default', iitStitching, iitStitchNotes);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    }
  };

  const currencyRecord = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];
  const rate = currencyRecord.rate;
  const symbol = currencyRecord.symbol;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  // Filter list of colleges based on queries
  const filteredColleges = COLLEGE_LIST.filter(coll => {
    const matchesQuery = coll.name.toLowerCase().includes(query.toLowerCase()) || 
                         coll.city.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || coll.country === selectedCountry;
    return matchesQuery && matchesCountry;
  });

  const countries = ['All', 'India', 'USA', 'UK', 'Australia', 'Canada', 'Europe'];

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBulkSubmitted(true);
    setTimeout(() => {
      setBulkSubmitted(false);
      setShowBulkModal(false);
      setBulkName('');
      setBulkEmail('');
      setBulkCollege('');
    }, 3000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 text-white space-y-8 shadow-2xl border border-white/10">
      
      {/* Upper header section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/5 pb-5 font-sans">
        <div className="text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5.5 h-5.5 text-[#1E88E5]" />
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{t.collegeHubTitle}</h2>
          </div>
          <p className="text-xs text-white/50">
            Official uniform supplier matching world-class schools with flawless logistics & tailor stitching.
          </p>
        </div>

        {/* Bulk order option CTA */}
        <button
          onClick={() => setShowBulkModal(true)}
          className="px-5 py-2.5 bg-yellow-400 font-extrabold text-xs text-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Users className="w-4 h-4" />
          <span>{t.bulkOrder}</span>
        </button>
      </div>

      {/* College search filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white/5 p-4 border border-white/5 rounded-2xl">
        <div className="sm:col-span-8 relative">
          <input
            type="text"
            placeholder={t.searchCollegePlace}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-black/40 text-sm border border-white/5 focus:border-[#1E88E5] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#1E88E5]/20 text-white placeholder-white/40"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
        </div>
        <div className="sm:col-span-4 flex gap-2">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-black/40 border border-white/5 text-xs text-white/80 rounded-xl p-2.5 outline-none focus:border-[#1E88E5]"
          >
            {countries.map(country => (
              <option key={country} value={country} className="bg-[#0d0d10] text-white">
                {country === 'All' ? 'Worldwide Colleges' : country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Spotlight: IIT-Inspired Academic Uniform Gallery */}
      {iitUniforms.length > 0 && (
        <div className="bg-gradient-to-br from-[#0A2472]/40 via-[#121212] to-black border border-[#1E88E5]/20 rounded-2xl p-5 sm:p-6 space-y-6 text-left shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E88E5]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 uppercase tracking-widest">
                ✨ Featured Academic Showcase
              </span>
              <h3 className="text-md sm:text-lg font-black uppercase tracking-tight text-white font-sans">
                IIT-inspired Academic Uniforms (Sample Designs)
              </h3>
              <p className="text-[11px] text-white/55 leading-relaxed max-w-3xl">
                Explore custom-tailored apparel concepts inspired by Indian Institute of Technology (IIT) campus attire. <strong>Note:</strong> Most IIT campuses do not mandate a daily uniform; these represent bespoke modern academic dressing style samples for student activities, conferences, and formal programs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left selector column (5 columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold block">
                  Select Uniform Variant ({iitUniforms.length} Models Available)
                </p>
                <div className="space-y-2">
                  {iitUniforms.map((prod, idx) => {
                    const isActive = selectedIitIdx === idx;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => { setSelectedIitIdx(idx); setIitStitching(false); setIitStitchNotes(''); }}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                          isActive 
                            ? 'bg-white/10 border-[#1E88E5] shadow shadow-[#1E88E5]/25 scale-[1.01]' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                        }`}
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-10 h-10 object-cover rounded-lg border border-white/10" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1 leading-snug">
                          <p className={`text-xs font-bold truncate ${isActive ? 'text-yellow-400' : 'text-white'}`}>
                            {prod.name.replace('IIT-inspired Academic Uniform ', '').replace('IIT-inspired Academic Uniform (', '').replace(')', '')}
                          </p>
                          <p className="text-[9px] text-white/40 truncate font-mono mt-0.5">
                            {prod.subcategory} • Rating: ★ {prod.rating}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Configure panel of the active IIT variant */}
              {activeIitProd && (
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3.5 text-xs text-left">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-white/40 font-bold uppercase">Fabric & Details</p>
                    <p className="text-[11px] text-white/85">✂️ {activeIitProd.materials[0]}</p>
                    <p className="text-[11px] text-white/85">🎨 Colors: {activeIitProd.colors[0]}</p>
                  </div>

                  {/* Size buttons */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono text-white/40 font-bold uppercase">Select Size Tag</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {activeIitProd.sizes.map(sz => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setIitSize(sz)}
                          className={`w-9 h-8 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer flex items-center justify-center ${
                            iitSize === sz 
                              ? 'bg-yellow-400 text-black border-transparent shadow shadow-yellow-400/20' 
                              : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/80'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom tailor */}
                  <div className="space-y-1.5 border-t border-white/5 pt-3">
                    <label className="flex items-center gap-1.5 text-yellow-300 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={iitStitching}
                        onChange={(e) => setIitStitching(e.target.checked)}
                        className="accent-yellow-400 w-3.5 h-3.5 rounded"
                      />
                      <span>Bespoke Tailoring Stitching (+ {symbol}${(499 * rate).toFixed(currentCurrency === 'JPY' ? 0 : 1)})</span>
                    </label>
                    {iitStitching && (
                      <textarea
                        required
                        placeholder="Provide customized shoulders, chest and sleeve size constraints..."
                        value={iitStitchNotes}
                        onChange={(e) => setIitStitchNotes(e.target.value)}
                        className="w-full bg-black/45 border border-white/10 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 rounded-xl p-2 font-sans text-xs text-white placeholder-white/30"
                        rows={2}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div>
                      <p className="text-[9px] text-white/40 font-mono uppercase">Pre-order Total Price:</p>
                      <p className="text-sm sm:text-base font-mono font-black text-yellow-400">
                        {symbol}{((activeIitProd.price * rate * (1 - activeIitProd.discount/100)) + (iitStitching ? 499 * rate : 0)).toFixed(currentCurrency === 'JPY' ? 0 : 1)}
                      </p>
                    </div>

                    <button
                      onClick={handleIitAddToCart}
                      disabled={addedSuccess}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        addedSuccess
                          ? 'bg-green-600 text-white border-transparent'
                          : 'bg-[#1E88E5] hover:bg-blue-600 text-white shadow shadow-[#1E88E5]/30'
                      }`}
                    >
                      <span>{addedSuccess ? '✓ Added To Bag!' : 'Reserve & Pre-order'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right preview column (7 columns) */}
            <div className="lg:col-span-7 bg-[#0d0d10]/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden min-h-[350px]">
              {activeIitProd ? (
                <div className="h-full flex flex-col justify-between space-y-3">
                  <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-black">
                    <img
                      src={activeIitProd.image}
                      alt={activeIitProd.name}
                      className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#1E88E5] text-white text-[9px] font-mono tracking-widest font-black uppercase px-2 py-0.5 rounded-full z-10">
                      -{activeIitProd.discount}% Sample Discount
                    </div>
                  </div>
                  <div className="space-y-1.5 text-left pt-2">
                    <h4 className="text-xs sm:text-sm font-black text-white">{activeIitProd.name}</h4>
                    <p className="text-[11px] text-white/55 leading-relaxed">
                      Captured beautifully in high-definition catalogue representation. Features high-quality textures, professional contrast borders, academic crest alignment option, with highly refined sweat-wicking materials ideal for campuses world-wide.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/40 text-xs text-center py-12">
                  Select a variant to view premium catalog asset
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* College lists & maps grid */}
      <div className="space-y-4 text-left">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/45 font-bold">Institutions Supported ({filteredColleges.length})</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredColleges.map((coll, idx) => {
            const matchesUniform = collegeUniforms.filter(p => p.collegeName === coll.name || (p.collegeName === 'IITs' && coll.name === 'IITs') || (p.collegeName === 'NITs' && coll.name === 'NITs'));
            return (
              <div 
                key={idx}
                className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-[#1E88E5]/40 hover:scale-[1.01] transition-all duration-300 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-[#1E88E5] font-mono tracking-widest uppercase">{coll.country}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{coll.name}</h4>
                  <p className="text-[10px] text-white/50">📍 {coll.city}</p>
                </div>

                <div className="border-t border-white/5 pt-2.5 flex items-center justify-between">
                  <span className="text-[9px] text-white/40 font-mono">{matchesUniform.length} Styles available</span>
                  {matchesUniform.length > 0 ? (
                    <button 
                      onClick={() => onSelectProduct(matchesUniform[0])}
                      className="text-[10px] text-yellow-400 font-mono font-bold hover:underline cursor-pointer"
                    >
                      View Dress
                    </button>
                  ) : (
                    <span className="text-[9px] text-white/30 font-mono">Tailor custom</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Size guide specs table */}
      <div className="border border-white/10 rounded-2xl overflow-hidden p-5 bg-black/40 text-left space-y-4">
        <div className="flex items-center gap-2">
          <Shirt className="w-4.5 h-4.5 text-yellow-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">{t.sizeGuide} — Standard Fit specs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/70">
            <thead>
              <tr className="border-b border-white/10 text-[9px] text-white/40 font-mono uppercase">
                <th className="py-2.5">Tag Size</th>
                <th className="py-2.5">Collar (Inches)</th>
                <th className="py-2.5">Shoulder (Inches)</th>
                <th className="py-2.5">Chest (Inches)</th>
                <th className="py-2.5">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="py-2.5 font-bold text-white">S</td>
                <td>14.5"</td>
                <td>17.0"</td>
                <td>38"</td>
                <td>24.5"</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">M</td>
                <td>15.5"</td>
                <td>17.5"</td>
                <td>40"</td>
                <td>25.0"</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">L</td>
                <td>16.5"</td>
                <td>18.0"</td>
                <td>42"</td>
                <td>25.5"</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">XL</td>
                <td>17.5"</td>
                <td>19.0"</td>
                <td>44"</td>
                <td>26.0"</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">XXL</td>
                <td>18.5"</td>
                <td>20.0"</td>
                <td>46"</td>
                <td>26.5"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Order Submission Modal Form drawer */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm glass-panel-deep border border-yellow-400/30 rounded-2xl p-6 text-left shadow-2xl space-y-4 text-white font-sans">
            
            <button
              onClick={() => setShowBulkModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>

            <div className="space-y-1 header pr-6">
              <h3 className="text-md sm:text-base font-bold text-white uppercase tracking-tight">📋 Institution Bulk Order Quote</h3>
              <p className="text-xs text-white/50">Order customized blazer or shirts batches for colleges with volume discounts up to 35%.</p>
            </div>

            {bulkSubmitted ? (
              <div className="p-8 text-center space-y-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <span className="text-2xl">🎉</span>
                <p className="text-xs font-bold text-green-400">Inquiry Received Successfully!</p>
                <p className="text-[10px] text-white/65 leading-relaxed">The KUSU institutional uniform logistics desk will contact you with PDF estimates within 6 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-4 text-xs">
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase font-bold">Institution Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Raghu Engineering College"
                    value={bulkCollege}
                    onChange={(e) => setBulkCollege(e.target.value)}
                    className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/50 uppercase font-bold">Target Batches (Qty)</label>
                    <input
                      type="number"
                      min="50"
                      value={bulkQuantity}
                      onChange={(e) => setBulkQuantity(Number(e.target.value))}
                      className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/50 uppercase font-bold">Coordinator Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={bulkName}
                      onChange={(e) => setBulkName(e.target.value)}
                      className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase font-bold">Official Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="uniforms@college.edu"
                    value={bulkEmail}
                    onChange={(e) => setBulkEmail(e.target.value)}
                    className="w-full bg-[#0d0d10] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-yellow-400 hover:bg-white text-black font-extrabold uppercase rounded-xl tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Catalog Inquiry</span>
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
