import { useState } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle } from 'lucide-react';
import { SERVICES, INDUSTRIES } from '../data';

const SERVICE_DETAILS: Record<string, string[]> = {
  "Business Websites": ["Multi-page brand profiles", "Custom lead-generation forms", "Staff directories & bios", "Interactive Google Maps integration"],
  "Restaurant Websites": ["Fully responsive digital menus", "Table reservation widgets", "Local SEO Optimization", "Review aggregator highlight panels"],
  "Café Websites": ["Daily specials content slider", "Instagram integration feed", "Loyalty club signup forms", "Click-to-call direct links"],
  "Gym Websites": ["Interactive class schedules", "BMI/Fitness calculation tools", "Membership tier tables", "Trainer portfolio lists"],
  "Salon Websites": ["Stylist schedule planners", "Service treatment menus", "Photo portfolios & galleries", "Gift card purchasing modules"],
  "Clinic Websites": ["Doctor/Practitioner bios", "Appointment request forms", "Service information tabs", "Secure contact handlers"],
  "Portfolio Websites": ["Masonry image & visual galleries", "Detailed case study writeups", "Interactive skill wheels", "Downloadable resume files"],
  "Landing Pages": ["A/B tested copywriting layouts", "Conversion-focused single forms", "High-contrast hero callouts", "Social proof testimonial ribbons"],
  "Website Redesign": ["Codebase speed optimizations", "Complete responsive redesigns", "SEO link redirects", "Accessibly compliance upgrades"],
  "Website Maintenance": ["Daily automatic cloud backups", "Weekly library dependencies update", "Guaranteed 4-hour SLA responses", "Continuous security checks"]
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("Business Websites");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("Restaurants");

  return (
    <section id="services" className="py-24 bg-[#FAF5EC] relative border-b border-black/5">
      {/* Absolute layout accents - minimal and silent */}
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-black/[0.01] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-black/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SERVICES SUBSECTION */}
        <div className="space-y-12">
          <div className="text-left max-w-2xl">
            <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">Services I Offer</span>
            <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
              Premium website solutions tailored to your business.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: List of clickable badges (7 cols) */}
            <div className="lg:col-span-7 flex flex-wrap gap-3">
              {SERVICES.map((srv) => (
                <button
                  key={srv}
                  onClick={() => setSelectedService(srv)}
                  className={`text-[9px] uppercase tracking-[0.2em] font-bold px-5 py-3.5 border transition-all flex items-center gap-1.5 cursor-pointer rounded-none ${
                    selectedService === srv 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white hover:bg-neutral-50 border-black/10 hover:border-black/30 text-neutral-600 hover:text-black'
                  }`}
                >
                  {srv}
                </button>
              ))}
            </div>

            {/* Right Column: Display of selected Service details (5 cols) */}
            <div className="lg:col-span-5 bg-[#F0EAE1] border border-black/5 p-8 rounded-none space-y-4">
              <span className="text-[9px] text-neutral-500 font-bold tracking-[0.2em] uppercase">Blueprint & Features</span>
              <h3 className="text-[#2A2421] text-lg font-serif font-medium flex items-center gap-1.5">
                {selectedService} <ArrowUpRight className="h-4 w-4 text-black shrink-0" />
              </h3>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Every {selectedService.toLowerCase().replace('websites', 'website').replace('pages', 'page')} is custom-coded using lightweight architecture to guarantee rapid load times and Google core vitals green.
              </p>

              <div className="space-y-3 pt-3 border-t border-black/10">
                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.15em] block">Included Specifications</span>
                {(SERVICE_DETAILS[selectedService] || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                    <CheckCircle className="h-3.5 w-3.5 text-black shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INDUSTRIES SUBSECTION */}
        <div id="industries" className="space-y-12 pt-24 border-t border-black/10 mt-24">
          <div className="text-left max-w-2xl">
            <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">Industries I Work With</span>
            <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
              Helping local businesses stand out with websites that convert.
            </h2>
          </div>

          {/* Grid list of industries */}
          <div className="flex flex-wrap gap-3">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`text-[9px] uppercase tracking-[0.2em] font-bold px-5 py-4 border transition-all cursor-pointer rounded-none ${
                  selectedIndustry === ind 
                    ? 'bg-black text-white border-black font-bold' 
                    : 'bg-white hover:bg-neutral-50 border-black/10 hover:border-black/30 text-neutral-600 hover:text-black'
                }`}
              >
                {ind}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
