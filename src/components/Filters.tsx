import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { COLLEGE_LIST } from '../data';

interface FiltersProps {
  currentLang: LanguageCode;
  selectedCategory: string;
  onChangeCategory: (cat: string) => void;
  selectedGender: string;
  onChangeGender: (gender: string) => void;
  selectedSize: string;
  onChangeSize: (size: string) => void;
  selectedMaterial: string;
  onChangeMaterial: (mat: string) => void;
  selectedCountry: string;
  onChangeCountry: (country: string) => void;
  selectedCollege: string;
  onChangeCollege: (college: string) => void;
  priceRange: number;
  onChangePriceRange: (val: number) => void;
  onClearFilters: () => void;
}

export default function Filters({
  currentLang,
  selectedCategory,
  onChangeCategory,
  selectedGender,
  onChangeGender,
  selectedSize,
  onChangeSize,
  selectedMaterial,
  onChangeMaterial,
  selectedCountry,
  onChangeCountry,
  selectedCollege,
  onChangeCollege,
  priceRange,
  onChangePriceRange,
  onClearFilters
}: FiltersProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const categoryOptions = [
    'All',
    'Traditional Wear',
    'Western Wear',
    'Formal Wear',
    'Night Wear',
    'Sports Wear',
    'Kids Wear',
    'College Uniforms'
  ];

  const genderOptions = ['All', 'Men', 'Women', 'Kids', 'Unisex'];
  
  const sizeOptions = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'Free Size'];
  
  const materialOptions = [
    'All',
    'Kanchipuram Pure Silk',
    'Velvet',
    '100% Organic Handblock Cotton',
    'Rayon Georgette',
    '100% Egyptian Giza Cotton',
    'Merino Wool Blend',
    'Japanese Selvedge Denim',
    'Linen and Tweed',
    'Mulberry Satin Silk',
    'Cashmere wool Blend'
  ];

  const countryOptions = ['All', 'India', 'USA', 'UK', 'Australia', 'Canada', 'Europe', 'Japan', 'Spain', 'France', 'Italy'];

  return (
    <div className="glass-panel rounded-2xl p-6 text-white shadow-2xl space-y-6">
      
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4.5 h-4.5 text-[#1E88E5]" />
          <span className="font-sans font-black text-sm tracking-widest uppercase text-white/95">
            {t.applyFilters}
          </span>
        </div>
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition-colors font-mono cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.clearFilters}</span>
        </button>
      </div>

      {/* Target Category Selector */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block text-left font-bold">
          {t.categories}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => onChangeCategory(cat)}
              className={`px-3 py-2 text-[11px] font-medium rounded-xl text-left truncate border transition-all cursor-pointer ${
                (selectedCategory === cat || (cat === 'All' && selectedCategory === ''))
                  ? 'bg-[#1E88E5] text-white border-transparent font-bold shadow-md shadow-[#1E88E5]/20'
                  : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'View All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gender select */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block text-left font-bold">
          {t.gender}
        </label>
        <div className="flex flex-wrap gap-2">
          {genderOptions.map((gen) => (
            <button
              key={gen}
              onClick={() => onChangeGender(gen === 'All' ? '' : gen)}
              className={`px-4 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
                (selectedGender === gen || (gen === 'All' && selectedGender === ''))
                  ? 'bg-white text-black border-transparent font-bold shadow'
                  : 'bg-white/5 text-white/75 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {gen}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-2.5 text-left">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block font-bold">
            Max {t.price}
          </label>
          <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
            ₹{priceRange} INR
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="15000"
          step="500"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#1E88E5]"
        />
      </div>

      {/* Sizes Section */}
      <div className="space-y-2.5 text-left">
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block font-bold">
          Fitting Sizes
        </label>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((sz) => (
            <button
              key={sz}
              onClick={() => onChangeSize(sz === 'All' ? '' : sz)}
              className={`w-10 h-8 flex items-center justify-center text-xs font-mono border rounded-xl transition-all cursor-pointer ${
                (selectedSize === sz || (sz === 'All' && selectedSize === ''))
                  ? 'bg-yellow-400 text-black border-transparent font-bold shadow'
                  : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Material selection */}
      <div className="space-y-2 text-left">
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block font-bold">
          Fabric / {t.material}
        </label>
        <select
          value={selectedMaterial}
          onChange={(e) => onChangeMaterial(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-2.5 text-white/85 focus:outline-none focus:border-[#1E88E5]"
        >
          {materialOptions.map((mat) => (
            <option key={mat} value={mat === 'All' ? '' : mat} className="bg-[#0d0d10] text-white">
              {mat === 'All' ? 'Choose Fabric...' : mat}
            </option>
          ))}
        </select>
      </div>

      {/* Country selection */}
      <div className="space-y-2 text-left">
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block font-bold">
          Tailored in ({t.country})
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => onChangeCountry(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-2.5 text-white/85 focus:outline-none focus:border-[#1E88E5]"
        >
          {countryOptions.map((c) => (
            <option key={c} value={c === 'All' ? '' : c} className="bg-[#0d0d10] text-white">
              {c === 'All' ? 'Choose Origin Country...' : c}
            </option>
          ))}
        </select>
      </div>

      {/* University Picker */}
      <div className="space-y-2 text-left">
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block font-bold">
          {t.collegeLabel}
        </label>
        <select
          value={selectedCollege}
          onChange={(e) => {
            onChangeCollege(e.target.value);
            if (e.target.value) {
              onChangeCategory('College Uniforms');
            }
          }}
          className="w-full bg-white/5 border border-white/10 rounded-xl text-xs p-2.5 text-white/85 focus:outline-none focus:border-[#1E88E5]"
        >
          <option value="" className="bg-[#0d0d10] text-white">-- Apply College Uniform Filter --</option>
          {COLLEGE_LIST.map((coll) => (
            <option key={coll.name} value={coll.name} className="bg-[#0d0d10] text-white">
              {coll.name} ({coll.country})
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}
