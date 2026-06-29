import { PROCESS_STEPS } from '../data';
import { HelpCircle, FileSignature, Layers, Rocket } from 'lucide-react';

export default function Process() {
  
  const getIcon = (num: string) => {
    if (num === '01') return <HelpCircle className="h-4.5 w-4.5 text-black" />;
    if (num === '02') return <FileSignature className="h-4.5 w-4.5 text-black" />;
    if (num === '03') return <Layers className="h-4.5 w-4.5 text-black" />;
    return <Rocket className="h-4.5 w-4.5 text-black" />;
  };

  return (
    <section id="process" className="py-24 bg-[#FAF5EC] relative border-b border-black/5">
      {/* Background glow - silent and minimal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black/[0.005] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block">My Process</span>
          <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
            Clear steps from first call to launch and support.
          </h2>
        </div>

        {/* Timeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative">
          
          {/* Connecting line (Desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-[1px] bg-black/10 pointer-events-none z-0" />

          {PROCESS_STEPS.map((step) => (
            <div 
              key={step.number} 
              className="bg-white border border-black/5 hover:border-black/15 p-6 rounded-none transition-all duration-300 relative z-10 flex flex-col justify-between group shadow-none"
            >
              <div className="space-y-5">
                {/* Header row with icon & numbering */}
                <div className="flex justify-between items-center">
                  <div className="bg-[#F0EAE1] border border-black/5 w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 rounded-none">
                    {getIcon(step.number)}
                  </div>
                  <span className="text-5xl font-serif italic font-light text-black/10 group-hover:text-black/25 transition-all select-none">
                    {step.number}
                  </span>
                </div>

                {/* Text info */}
                <div className="space-y-1.5">
                  <h3 className="text-[#2A2421] text-base font-serif font-medium group-hover:text-black transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
