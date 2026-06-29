import { Utensils, Scissors, Dumbbell, Code2, Play, CheckCircle } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data';

interface PortfolioProps {
  onOpenLiveDemo: (id: string) => void;
  onOpenSourceCode: (id: string) => void;
}

export default function Portfolio({ onOpenLiveDemo, onOpenSourceCode }: PortfolioProps) {
  
  const getIcon = (id: string) => {
    if (id === 'restaurant') return <Utensils className="h-7 w-7 text-black" />;
    if (id === 'salon') return <Scissors className="h-7 w-7 text-black" />;
    return <Dumbbell className="h-7 w-7 text-black" />;
  };

  const getGradient = (id: string) => {
    if (id === 'restaurant') return 'from-[#E6DEC9] to-[#F0EAE1] border-black/5';
    if (id === 'salon') return 'from-[#F0EAE1] to-[#E6DEC9] border-black/5';
    return 'from-[#E0D9C7] to-[#FAF5EC] border-black/5';
  };

  return (
    <section id="portfolio" className="py-24 bg-[#F0EAE1] relative border-b border-black/5">
      {/* Editorial subtle watermark background text */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-black/[0.005] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block">Portfolio</span>
          <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
            Designs that look premium and work hard for your business.
          </h2>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {PORTFOLIO_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-black/5 hover:border-black/15 transition-all duration-300 group flex flex-col justify-between p-6 rounded-none shadow-none"
            >
              <div className="space-y-5">
                
                {/* Visual Thumbnail Simulator */}
                <div className={`relative h-48 bg-gradient-to-br ${getGradient(item.id)} border rounded-none overflow-hidden flex flex-col items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-black/0 transition-colors" />
                  
                  {/* Floating visual center */}
                  <div className="relative z-10 bg-[#FAF5EC] border border-black/10 p-4 shadow-sm flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 rounded-none">
                    {getIcon(item.id)}
                  </div>

                  {/* Tiny interface preview hints */}
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[9px] text-neutral-500 z-10 font-bold uppercase tracking-[0.1em]">
                    <span className="font-mono">{item.techStack.slice(0,2).join(' • ')}</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" /> Live</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-2">
                  <h3 className="text-[#2A2421] text-xl font-serif font-medium">{item.title}</h3>
                  <p className="text-neutral-600 text-xs leading-relaxed">{item.description}</p>
                </div>

                {/* Features specification bullet tags */}
                <div className="space-y-2 pt-3 border-t border-black/10">
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.15em] block">Features</span>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feat, index) => (
                      <span 
                        key={index} 
                        className="bg-[#F0EAE1] text-black border border-black/5 text-[9px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-none flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3 text-black shrink-0" /> {feat}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Actions trigger panel */}
              <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-black/10">
                <button
                  onClick={() => onOpenLiveDemo(item.id)}
                  className="bg-black hover:bg-transparent text-white hover:text-black text-[10px] uppercase tracking-[0.15em] font-bold py-2.5 px-4 rounded-none border border-black transition-all flex items-center justify-center gap-1.5 shadow-none cursor-pointer"
                >
                  <Play className="h-3 w-3 fill-current" /> Live Demo
                </button>
                <button
                  onClick={() => onOpenSourceCode(item.id)}
                  className="bg-transparent hover:bg-black text-neutral-800 hover:text-white text-[10px] uppercase tracking-[0.15em] font-bold py-2.5 px-4 rounded-none border border-black/15 hover:border-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="h-3.5 w-3.5" /> Source Code
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
