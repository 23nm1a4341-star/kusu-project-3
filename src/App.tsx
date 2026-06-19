import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingCart,
  Trash2,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
  MessageCircle,
  Clock,
  Shirt,
  Star,
  Tag
} from 'lucide-react';
import { LanguageCode, CurrencyCode, Product, CartItem, Order } from './types';
import { PRODUCTS, LANGUAGES, CURRENCIES, COLLEGE_LIST } from './data';
import { TRANSLATIONS } from './translations';

import sportsCatFront from './assets/images/sports_cat_front_1781246981148.jpg';


// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import CollegeHub from './components/CollegeHub';
import DiscountSection from './components/DiscountSection';
import CartPage from './components/CartPage';
import CheckoutModal from './components/CheckoutModal';
import MyOrdersPage from './components/MyOrdersPage';
import ContactPage from './components/ContactPage';
import AISector from './components/AISector';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('INR');
  const [activeTab, setActiveTab] = useState<string>('home');

  // Search queries
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [showWishlistModal, setShowWishlistModal] = useState(false);

  // Active promo identifier
  const [appliedPromo, setAppliedPromo] = useState<string>('');

  // Checkout triggers
  const [showCheckout, setShowCheckout] = useState(false);

  // Mock initial placed order for presentation
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-reva-8849',
      date: 'June 10, 2026',
      items: [
        {
          product: PRODUCTS[1], // Silk Kurta
          selectedSize: 'L',
          selectedColor: 'Rich Maroon',
          customStitching: true,
          stitchingNotes: 'Chest 42, length 41',
          quantity: 1
        }
      ],
      totalAmount: 3999,
      status: 'Processing',
      shippingAddress: {
        fullName: 'Abhishek Roy',
        street: '45 Gandhi Marg, Phase 2',
        city: 'Hyderabad',
        country: 'India',
        phone: '+91 9988776655'
      },
      currency: 'INR',
      paymentMethod: 'UPI / QR',
      trackingNumber: 'TRK-DHL-994116'
    }
  ]);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(15000);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  // Currency multiplier helper
  const currencyRecord = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];
  const rate = currencyRecord.rate;
  const symbol = currencyRecord.symbol;

  // Sync scroll to top on tab transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // CARTS FUNCTION
  const handleAddToCart = (p: Product, size: string, color: string, stitching?: boolean, notes?: string) => {
    setCart(prev => {
      const matchIdx = prev.findIndex(item => 
        item.product.id === p.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (matchIdx > -1) {
        const cloned = [...prev];
        cloned[matchIdx].quantity += 1;
        return cloned;
      } else {
        return [...prev, {
          product: p,
          selectedSize: size,
          selectedColor: color,
          customStitching: !!stitching,
          stitchingNotes: notes || '',
          quantity: 1
        }];
      }
    });
  };

  const handleAddToCartDirect = (p: Product) => {
    handleAddToCart(p, p.sizes[0] || 'M', p.colors[0] || 'Default', false);
  };

  const handleUpdateQty = (pId: string, size: string, color: string, change: number) => {
    setCart(prev => {
      const idx = prev.findIndex(item => 
        item.product.id === pId && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (idx > -1) {
        const cloned = [...prev];
        const newQty = cloned[idx].quantity + change;
        if (newQty <= 0) {
          cloned.splice(idx, 1);
        } else {
          cloned[idx].quantity = newQty;
        }
        return cloned;
      }
      return prev;
    });
  };

  const handleRemoveItem = (pId: string, size: string, color: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === pId && item.selectedSize === size && item.selectedColor === color)
    ));
  };

  // WISHLIST FUNCTION
  const handleToggleWishlist = (p: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === p.id);
      if (exists) {
        return prev.filter(item => item.id !== p.id);
      } else {
        return [...prev, p];
      }
    });
  };

  // REORDER FUNCTION
  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      handleAddToCart(item.product, item.selectedSize, item.selectedColor, item.customStitching, item.stitchingNotes);
    });
    setActiveTab('cart');
    alert('🎯 Reorder elements have been added back to your Shopping Cart basket!');
  };

  // INITIATE REFUND REQUEST LOGIC
  const handleInitiateReturn = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'Return Requested' as any };
      }
      return o;
    }));
  };

  // CHECKOUT CONFIRM CALLBACK
  const handleCheckoutSuccess = (address: any, paymentMethod: string) => {
    // Generate order object
    const totalRaw = cart.reduce((sum, item) => {
      const disc = item.product.price * (1 - item.product.discount/100);
      const stitch = item.customStitching ? 499 : 0;
      return sum + ((disc + stitch) * item.quantity);
    }, 0);

    const matchRandomId = 'ORD-reva-' + Math.floor(1000 + Math.random() * 9000);
    const dateToday = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const newOrder: Order = {
      id: matchRandomId,
      date: dateToday,
      items: [...cart],
      totalAmount: totalRaw,
      currency: currentCurrency,
      status: 'Order Placed',
      shippingAddress: address,
      paymentMethod,
      trackingNumber: 'TRK-DHL-' + Math.floor(100000 + Math.random() * 900000)
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setShowCheckout(false);
    setActiveTab('myOrders');
    alert('🎉 Success! Your global clothing delivery order has been Placed. Real-time tracking code is issued.');
  };

  // Clear filters criteria
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setSelectedSize('');
    setSelectedMaterial('');
    setSelectedCountry('');
    setSelectedCollege('');
    setPriceRange(15000);
  };

  // FILTERED PRODUCTS ACCORDING TO USER STATE
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = searchQuery 
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory 
      ? p.category === selectedCategory 
      : true;

    const matchesGender = selectedGender 
      ? p.gender === selectedGender || p.gender === 'Unisex'
      : true;

    const matchesSize = selectedSize 
      ? p.sizes.includes(selectedSize) 
      : true;

    const matchesMaterial = selectedMaterial 
      ? p.materials.some(m => m.toLowerCase().includes(selectedMaterial.toLowerCase()))
      : true;

    const matchesCountry = selectedCountry 
      ? p.country.toLowerCase() === selectedCountry.toLowerCase() 
      : true;

    const matchesCollege = selectedCollege 
      ? p.collegeName === selectedCollege 
      : true;

    const matchesPrice = (p.price * (1 - p.discount/100)) <= priceRange;

    return matchesSearch && matchesCategory && matchesGender && matchesSize && matchesMaterial && matchesCountry && matchesCollege && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#121212] font-sans antialiased text-white">
      
      {/* Sticky beautiful header navbar */}
      <Navbar
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        currentCurrency={currentCurrency}
        onChangeCurrency={setCurrentCurrency}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        cart={cart}
        wishlist={wishlist}
        onOpenWishlist={() => setShowWishlistModal(true)}
        onSearchProduct={(q) => { setSearchQuery(q); setActiveTab('categories'); }}
      />

      {/* Hero Banner display (Only home tab) */}
      {activeTab === 'home' && (
        <Hero 
          currentLang={currentLang}
          onExplore={() => { setSelectedCategory(''); setActiveTab('categories'); }}
          onShopNow={() => { setSelectedCategory(''); setActiveTab('categories'); }}
        />
      )}

      {/* Main Container contents */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        {/* HOMEPAGE VIEW DESIGN */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* Elegant visual category quick navigations */}
            <div className="space-y-6 font-sans">
              <div className="text-left border-l-2 border-yellow-500 pl-4 space-y-1">
                <h2 className="text-2xl sm:text-3xl font-display font-light uppercase tracking-wider text-white">{t.exploreCategories}</h2>
                <p className="text-xs text-white/40 tracking-wide">Shop targeted clothing sections fabricated by global craftsmen.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Traditional Wear', icon: '🥻', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Western Wear', icon: '👕', img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Formal Wear', icon: '👔', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Night Wear', icon: '🛌', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Sports Wear', icon: '🏃', img: sportsCatFront },
                  { name: 'Kids Wear', icon: '🧦', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=400&q=80' }
                ].map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => { setSelectedCategory(cat.name); setActiveTab('categories'); }}
                    className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer glass-panel glass-panel-hover"
                  >
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transform scale-102 group-hover:scale-110 transition-transform duration-500 opacity-80" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent flex flex-col justify-end p-4 text-left">
                      <span className="text-md mb-1">{cat.icon}</span>
                      <h3 className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart AI integration section */}
            <AISector 
              currentLang={currentLang}
              onAddToCartDirect={handleAddToCartDirect}
            />

            {/* Traditional and Uniform Hub promo split banners */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* College uniform highlight panel banner with gold blur glass style */}
              <div className="glass-blue-panel glass-blue-panel-hover rounded-2xl p-8 text-left flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 font-mono text-[9px] font-bold tracking-widest uppercase border border-yellow-500/20">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>College Uniform Hub</span>
                  </div>
                  <h3 className="text-2xl font-display font-light text-white">Tailored Collegiate <span className="italic text-yellow-200">Blazers & Suits</span></h3>
                  <p className="text-xs text-white/70 leading-relaxed pr-6">
                    Redeem volume savings and secure direct shipping. Custom stitching guarantees absolute fit on high-schools, GVP or Raghu Engineering apparel patterns.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => { setSelectedCategory('College Uniforms'); setActiveTab('categories'); }}
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-[10px] font-sans tracking-widest uppercase font-bold rounded transition-all cursor-pointer"
                  >
                    <span>Browse Official Uniforms</span>
                    <span>➔</span>
                  </button>
                </div>
              </div>

              {/* Discount Timed Promo banner with classic white border glass style */}
              <div className="glass-panel glass-panel-hover p-8 rounded-2xl text-left flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-400/10 text-red-300 font-mono text-[9px] font-bold tracking-widest uppercase border border-red-400/20">
                    <Tag className="w-3.5 h-3.5" />
                    <span>VOTED BEST COLLECTION</span>
                  </div>
                  <h3 className="text-2xl font-display font-light text-white">Flat 20% Off All <span className="italic text-yellow-200">Traditional Silk Wear</span></h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Choose from absolute handcrafted Sarees, Velvet Sherwanis and Kurta combinations tailored with genuine Kanchipuram threads of pure gold.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setActiveTab('discounts')}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] tracking-widest uppercase font-bold rounded border border-white/10 hover:border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Claim Promo Code</span>
                    <span>➔</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Trending Clothing Product Lists grid */}
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/5 pb-3">
                <div className="text-left space-y-1">
                  <h2 className="text-2xl font-display font-light text-white tracking-wide uppercase">Trending Collections</h2>
                  <p className="text-xs text-white/40">Top customer favorites this season worldwide.</p>
                </div>
                <button
                  onClick={() => { setSelectedCategory(''); setActiveTab('categories'); }}
                  className="text-xs text-yellow-500 hover:underline font-mono tracking-wider"
                >
                  See all catalog ➔
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    currentLang={currentLang}
                    currentCurrency={currentCurrency}
                    onAddToCart={handleAddToCart}
                    onBuyNow={(prod) => { handleAddToCartDirect(prod); setActiveTab('cart'); }}
                    isWishlisted={wishlist.some(item => item.id === p.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* CATEGORIES / PRODUCTS VIEW DESIGN */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Filter sidebar column */}
            <div className="lg:col-span-3">
              <Filters
                currentLang={currentLang}
                selectedCategory={selectedCategory}
                onChangeCategory={setSelectedCategory}
                selectedGender={selectedGender}
                onChangeGender={setSelectedGender}
                selectedSize={selectedSize}
                onChangeSize={setSelectedSize}
                selectedMaterial={selectedMaterial}
                onChangeMaterial={setSelectedMaterial}
                selectedCountry={selectedCountry}
                onChangeCountry={setSelectedCountry}
                selectedCollege={selectedCollege}
                onChangeCollege={setSelectedCollege}
                priceRange={priceRange}
                onChangePriceRange={setPriceRange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Products grid column */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* College Uniform banner if specifically viewing that category */}
              {selectedCategory === 'College Uniforms' && (
                <CollegeHub 
                  currentLang={currentLang}
                  collegeUniforms={PRODUCTS.filter(p => p.category === 'College Uniforms')}
                  onSelectProduct={(p) => {
                    alert(`Selected ${p.name}. We pre-applied search context.`);
                    setSearchQuery(p.name);
                  }}
                  onAddToCart={handleAddToCart}
                  currentCurrency={currentCurrency}
                />
              )}

              {/* Header result stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-850 pb-3 text-left">
                <div>
                  <h2 className="text-md sm:text-lg font-black tracking-tight uppercase">
                    {selectedCategory ? `${selectedCategory} Collection` : 'All Apparel Selection'}
                  </h2>
                  <p className="text-xs text-gray-400">Displaying {filteredProducts.length} premium styled outfits</p>
                </div>
                
                {searchQuery && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono">
                    <span>Search Context: <strong>"{searchQuery}"</strong></span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-400">×</button>
                  </div>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-[#121212] border border-gray-850 rounded-xl space-y-3">
                  <p className="text-sm text-gray-400 font-mono">No matching apparel products meet your active filter criteria.</p>
                  <button 
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-[#1E88E5] text-white text-xs font-bold rounded"
                  >
                    Clear Filter Constraints
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      currentLang={currentLang}
                      currentCurrency={currentCurrency}
                      onAddToCart={handleAddToCart}
                      onBuyNow={(prod) => { handleAddToCartDirect(prod); setActiveTab('cart'); }}
                      isWishlisted={wishlist.some(item => item.id === p.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

        {/* OFFERS VIEW DESIGN */}
        {activeTab === 'discounts' && (
          <DiscountSection
            currentLang={currentLang}
            onApplyPromo={(c) => { setAppliedPromo(c); alert(`Voucher "${c}" configured. Check totals in Shopping bag!`); }}
            selectedPromoCode={appliedPromo}
          />
        )}

        {/* SHOPPING BAG CART VIEW */}
        {activeTab === 'cart' && (
          <CartPage
            currentLang={currentLang}
            currentCurrency={currentCurrency}
            cart={cart}
            appliedPromo={appliedPromo}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onApplyPromo={setAppliedPromo}
            onProceedToCheckout={() => setShowCheckout(true)}
          />
        )}

        {/* ORDERS TRACKER VIEW DESIGN */}
        {activeTab === 'myOrders' && (
          <MyOrdersPage
            currentLang={currentLang}
            currentCurrency={currentCurrency}
            orders={orders}
            onReorder={handleReorder}
            onInitiateReturn={handleInitiateReturn}
          />
        )}

        {/* FAQ & CONTACTS VIEW */}
        {activeTab === 'contact' && (
          <ContactPage currentLang={currentLang} />
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-black text-white border-t border-gray-850 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs">
          
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-1">
              <span className="font-luxury text-xl tracking-[0.2em] text-white font-bold">REVA</span>
              <span className="text-[8px] font-sans text-white/40 tracking-[0.25em] uppercase font-medium">Clothing Brand</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs">{t.heroSub}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-yellow-500 font-bold">Apparel Delivery Centers</h4>
            <ul className="space-y-1.5 text-gray-300">
              <li>• Visakhapatnam Hub</li>
              <li>• Hyderabad Fulfillment</li>
              <li>• Singapore South air transit</li>
              <li>• London Royal courier desk</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-yellow-500 font-bold">Policy & Careers</h4>
            <ul className="space-y-1.5 text-gray-300">
              <li>• Privacy & Terms agreement</li>
              <li>• Shipping & customs clearances</li>
              <li>• 15-Day Return guarantees</li>
              <li>• Custom stitching regulations</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-[10px] tracking-widest text-[#1E88E5] uppercase font-bold text-yellow-500">Global Customer Help</h4>
            <p className="text-gray-400 leading-relaxed">
              Email: <strong>support@revaclothing.com</strong><br />
              Institutional: <strong>uniforms@revaclothing.com</strong>
            </p>
            <p className="text-[10px] text-gray-500">© 2026 ReVa Ltd. All rights reserved globally.</p>
          </div>

        </div>
      </footer>

      {/* CHECKOUT POPUP DIALOG */}
      {showCheckout && (
        <CheckoutModal
          currentLang={currentLang}
          currentCurrency={currentCurrency}
          cart={cart}
          appliedPromo={appliedPromo}
          onClose={() => setShowCheckout(false)}
          onOrderSuccess={handleCheckoutSuccess}
        />
      )}

      {/* WISHLIST LEFT DRAWER POPUP */}
      {showWishlistModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-[#121212] border-l border-gray-800 p-6 flex flex-col justify-between text-left text-white h-full overflow-y-auto">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                  <span>ReVa Wishlist ({wishlist.length})</span>
                </h3>
                <button onClick={() => setShowWishlistModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <p className="text-xs text-gray-400 py-8 text-center font-mono">No clothing added in wishlist list yet.</p>
              ) : (
                <div className="divide-y divide-gray-850">
                  {wishlist.map((prod) => (
                    <div key={prod.id} className="py-3 flex items-center gap-3 justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded" referrerPolicy="no-referrer" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold truncate text-white">{prod.name}</p>
                          <p className="text-[9px] text-[#1E88E5] font-mono">{symbol}{(prod.price * rate * (1 - prod.discount/100)).toFixed(currentCurrency==='JPY'?0:1)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { handleAddToCartDirect(prod); alert('Added safely!'); }}
                          className="p-1 px-2 bg-yellow-400 text-black text-[10px] rounded font-bold"
                        >
                          + Cart
                        </button>
                        <button
                          onClick={() => handleToggleWishlist(prod)}
                          className="p-1 text-xs text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowWishlistModal(false)}
              className="w-full py-2.5 bg-white/5 border border-white/20 text-white rounded text-xs font-bold hover:bg-white/10"
            >
              Continue shopping
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
