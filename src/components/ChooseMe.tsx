import { DollarSign, Smartphone, Zap, Palette, Search, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_ME } from '../data';

export default function ChooseMe() {
  
  const getIcon = (title: string) => {
    if (title.includes('Pricing')) return <DollarSign className="h-4.5 w-4.5 text-black" />;
    if (title.includes('Responsive')) return <Smartphone className="h-4.5 w-4.5 text-black" />;
    if (title.includes('Delivery')) return <Zap className="h-4.5 w-4.5 text-black" />;
    if (title.includes('Design')) return <Palette className="h-4.5 w-4.5 text-black" />;
    if (title.includes('SEO')) return <Search className="h-4.5 w-4.5 text-black" />;
    return <ShieldCheck className="h-4.5 w-4.5 text-black" />;
  };

  return (
    <section id="choose" className="py-24 bg-[#F0EAE1] relative border-b border-black/5">
      {/* Subtle watermark background element */}
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-black/[0.005] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block">Why Choose Me</span>
          <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
            Smart website choices for business owners who want growth.
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {WHY_CHOOSE_ME.map((feat) => (
            <div 
              key={feat.title} 
              className="bg-white border border-black/5 hover:border-black/15 p-6 transition-all duration-300 group flex items-start gap-4 rounded-none shadow-none"
            >
              <div className="w-10 h-10 border border-black/5 bg-[#F0EAE1] flex items-center justify-center shrink-0 rounded-none">
                {getIcon(feat.title)}
              </div>
              <div className="space-y-1">
                <h3 className="text-[#2A2421] text-base font-serif font-medium">{feat.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
