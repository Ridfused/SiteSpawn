import { useState } from 'react';
import { ArrowRight, Sparkles, Flame, CheckCircle, Monitor, Smartphone, RotateCw } from 'lucide-react';
import RestaurantDemo from './demos/RestaurantDemo';
import SalonDemo from './demos/SalonDemo';
import GymDemo from './demos/GymDemo';

export default function Hero() {
  const [activePreview, setActivePreview] = useState<'restaurant' | 'salon' | 'gym'>('restaurant');

  const stats = [
    { label: '24/7', desc: 'Online business presence' },
    { label: 'Fast', desc: 'Performance optimized' },
    { label: 'Mobile', desc: 'Responsive across devices' },
  ];

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#FAF5EC] overflow-hidden border-b border-black/5"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#E6DEC9]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F0EAE1]/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#E6DEC9] border border-black/5 px-3 py-1.5 text-[#2A2421] text-[9px] uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="h-3 w-3" /> Freelance Web Development
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#2A2421] tracking-tight leading-[1.08]">
              Professional Websites That Help Your Business Grow.
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base max-w-xl leading-relaxed">
              I create modern, fast, and mobile-friendly websites for local businesses that attract more customers and build trust online.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#contact" 
                className="bg-black hover:bg-transparent text-white hover:text-black font-bold py-3 px-6 border border-black transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em]"
              >
                Get a Free Quote <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a 
                href="#portfolio" 
                className="bg-transparent hover:bg-black text-[#2A2421] hover:text-white font-bold py-3 px-6 border border-black/20 hover:border-black text-center transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em]"
              >
                View My Work
              </a>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/10 max-w-md">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-[#2A2421] text-xl sm:text-2xl font-serif italic font-medium">{stat.label}</div>
                  <div className="text-neutral-500 text-[9px] leading-tight font-bold uppercase tracking-[0.2em]">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Interactive Live Preview Simulator Widget */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full max-w-lg bg-[#F0EAE1] border border-black/10 shadow-sm overflow-hidden flex flex-col h-[480px]">
              
              {/* Header simulator */}
              <div className="bg-[#E6DEC9] px-4 py-3 flex items-center justify-between border-b border-black/10 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.15em] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> Live Preview
                  </span>
                  <span className="text-[10px] text-neutral-600 font-mono hidden sm:inline">sitespawn.demo/sandbox</span>
                </div>

                {/* Simulated Address Controls */}
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-black/10" />
                    <span className="w-2 h-2 rounded-full bg-black/20" />
                    <span className="w-2 h-2 rounded-full bg-black/30" />
                  </div>
                </div>
              </div>

              {/* Real Content Preview with Local Selectors */}
              <div className="flex-1 overflow-hidden relative">
                {activePreview === 'restaurant' && <RestaurantDemo />}
                {activePreview === 'salon' && <SalonDemo />}
                {activePreview === 'gym' && <GymDemo />}
              </div>

              {/* Selector Footer tabs */}
              <div className="bg-[#E6DEC9] border-t border-black/10 p-3 flex justify-between items-center shrink-0">
                <div className="flex gap-2">
                  {(['restaurant', 'salon', 'gym'] as const).map((prev) => (
                    <button
                      key={prev}
                      onClick={() => setActivePreview(prev)}
                      className={`text-[9px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 transition-all capitalize border ${
                        activePreview === prev 
                          ? 'bg-black text-white border-black font-bold' 
                          : 'text-neutral-600 hover:text-black hover:bg-black/5 border-transparent'
                      }`}
                    >
                      {prev}
                    </button>
                  ))}
                </div>
                <span className="text-[9px] uppercase tracking-[0.1em] text-neutral-500 flex items-center gap-1 font-semibold">
                  Click inside to interact
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
