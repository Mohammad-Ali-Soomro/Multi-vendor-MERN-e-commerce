import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineArrowRight } from "react-icons/ai";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const rotatingText = "MULTI-VENDOR MARKETPLACE • SHOP FROM THE BEST SELLERS • ";

  return (
    <section className="relative min-h-[90vh] bg-cream overflow-hidden flex items-center">
      
      {/* Background decoration blobs */}
      <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] bg-lavender-light rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-80px] w-[400px] h-[400px] bg-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-11/12 max-w-[1200px] mx-auto py-20">
        <div className="grid grid-cols-1 800px:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text content */}
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-sans text-sm font-medium text-text-muted">
                100+ Verified Sellers
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-editorial text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-tight font-bold text-dark mb-6">
              Don't just{' '}
              <span className="italic text-text-muted">browse,</span>
              <br />
              <span className="editorial-underline">discover</span>
            </h1>

            <p className="font-sans text-[17px] text-text-muted leading-relaxed mb-10 max-w-[420px]">
              The multi-vendor marketplace where thousands of unique sellers bring their best products to you. Shop smarter, live better.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/products">
                <button className="btn-lavender text-base px-7 py-4">
                  <AiOutlineShoppingCart size={18} />
                  Shop Now
                </button>
              </Link>
              <Link to="/shop-create">
                <button className="btn-outline-dark text-base px-7 py-4">
                  Start Selling
                  <AiOutlineArrowRight size={16} />
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-dark/10">
              {[
                { number: "50K+", label: "Happy Buyers" },
                { number: "2K+", label: "Active Sellers" },
                { number: "100K+", label: "Products Listed" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-editorial text-2xl font-bold text-dark">{stat.number}</p>
                  <p className="font-sans text-xs text-text-muted font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual element with rotating text circle */}
          <div className={`relative hidden 800px:flex items-center justify-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Central dark rounded card */}
            <div className="w-[340px] h-[380px] bg-dark rounded-[40px] relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-new">FEATURED</span>
                </div>
                <p className="font-editorial text-2xl font-bold text-cream leading-tight mb-2">
                  Discover unique products from verified sellers
                </p>
                <p className="font-sans text-sm text-cream/60">
                  Thousands of items added daily
                </p>
                
                {/* Gradient overlay at top */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-forest/40 to-transparent" />
                
                {/* Decorative grid of product thumbnails at top */}
                <div className="absolute top-6 left-6 right-6 grid grid-cols-3 gap-2">
                  {[
                    "https://via.placeholder.com/80/C9B1F0/333?text=P",
                    "https://via.placeholder.com/80/1B4332/fff?text=P",
                    "https://via.placeholder.com/80/F7F3E8/333?text=P"
                  ].map((src, i) => (
                    <div key={i} className="aspect-square bg-dark-mid rounded-2xl overflow-hidden opacity-60" />
                  ))}
                </div>
              </div>
            </div>

            {/* Rotating circle text */}
            <div className="absolute -left-16 -bottom-8 w-[140px] h-[140px]">
              <svg viewBox="0 0 140 140" className="rotating-text w-full h-full">
                <path id="circle" d="M70,70 m-55,0 a55,55 0 1,1 110,0 a55,55 0 1,1 -110,0" fill="none" />
                <text fontSize="10" fill="#6B6B5E" fontFamily="DM Mono, monospace" letterSpacing="3">
                  <textPath href="#circle">{rotatingText}</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                  <AiOutlineArrowRight size={16} className="text-dark" />
                </div>
              </div>
            </div>

            {/* Floating glass cards */}
            <div className="glass-card absolute -right-8 top-12 p-4 w-[160px] shadow-xl">
              <p className="font-sans text-xs text-text-muted mb-1">Today's Sales</p>
              <p className="font-editorial text-xl font-bold text-dark">$48,293</p>
              <p className="font-sans text-xs text-emerald-500 font-medium mt-1">↑ 12% vs yesterday</p>
            </div>

            <div className="glass-card absolute -left-12 top-24 p-4 w-[150px] shadow-xl">
              <p className="font-sans text-xs text-text-muted mb-1">New Orders</p>
              <p className="font-editorial text-xl font-bold text-dark">1,284</p>
              <div className="flex gap-1 mt-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-lavender rounded-sm" style={{height: `${h * 0.25}px`}} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
