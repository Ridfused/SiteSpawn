import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#F0EAE1] relative border-b border-black/5">
      {/* Background watermark */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-black/[0.005] rounded-full pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block">FAQ</span>
          <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
            Common questions from business owners.
          </h2>
        </div>

        {/* FAQ Accordions list */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`bg-white border transition-all duration-300 rounded-none overflow-hidden ${
                  isOpen 
                    ? 'border-black/15 bg-white/70 shadow-sm' 
                    : 'border-black/5 hover:border-black/15'
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex justify-between items-center gap-4 text-left font-serif font-medium text-sm text-[#2A2421] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className={`h-4.5 w-4.5 shrink-0 transition-all ${isOpen ? 'text-black' : 'text-neutral-400'}`} />
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-neutral-400">
                    {isOpen ? <ChevronUp className="h-4.5 w-4.5 text-black" /> : <ChevronDown className="h-4.5 w-4.5" />}
                  </span>
                </button>

                {/* Collapsible Answer */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 opacity-100 border-t border-black/5' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-6 text-xs text-neutral-600 leading-relaxed font-sans font-medium">
                    {faq.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
