import React, { useState, FormEvent, useEffect } from 'react';
import { Mail, MessageSquare, CreditCard, Calculator, Check, ArrowRight, ArrowLeft, Loader2, Sparkles, X, Trash2 } from 'lucide-react';
import { QuoteSubmission } from '../types';

export default function ContactForm({ isAdmin = false }: { isAdmin?: boolean }) {
  // Main form states
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    blueprint: 'Business Website Blueprint',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Stored submissions (used to render comments below the form)
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);

  // Calculator modal states
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcStep, setCalcStep] = useState(1);
  const [calcData, setCalcData] = useState({
    type: 'Business Website',
    features: [] as string[],
    pages: '2-5 Pages',
  });

  const websiteTypes = [
    { name: 'Business Website', base: 4000 },
    { name: 'Restaurant Website', base: 4500 },
    { name: 'Salon Website', base: 4200 },
    { name: 'Gym Website', base: 4800 },
    { name: 'Landing Page', base: 3000 },
    { name: 'eCommerce Shop', base: 6000 },
  ];

  const featureOptions = [
    { name: 'Online Reservation / Booking', cost: 1000 },
    { name: 'Interactive Pricing / BMI Calculator', cost: 800 },
    { name: 'Customer Review Showcase', cost: 400 },
    { name: 'SEO setup (Advanced Local)', cost: 1200 },
    { name: 'Custom Blog / News Feed', cost: 600 },
  ];

  const pageOptions = [
    { name: '1 Page', multiplier: 0.8 },
    { name: '2-5 Pages', multiplier: 1.0 },
    { name: '5-10 Pages', multiplier: 1.2 },
    { name: '10+ Pages', multiplier: 1.5 },
  ];

  const blueprintOptions = [
    {
      name: 'Business Website Blueprint',
      items: [
        'Homepage, About, Services, Contact pages',
        'Lead capture form and clear call-to-action',
        'Mobile-first responsive layout',
        'Local SEO optimization and fast loading'
      ]
    },
    {
      name: 'Restaurant Website Blueprint',
      items: [
        'Menu showcase and booking callout',
        'Photo gallery and opening hours',
        'Google Maps contact section',
        'Mobile-friendly reservation flow'
      ]
    },
    {
      name: 'Salon Website Blueprint',
      items: [
        'Service menu and price lists',
        'Appointment booking prompt',
        'Team and testimonials section',
        'Gallery of work and brand styling'
      ]
    },
    {
      name: 'Gym Website Blueprint',
      items: [
        'Class schedule and membership plans',
        'Trainer profiles and fitness highlights',
        'Workout program call-to-action',
        'Conversion-focused landing sections'
      ]
    },
    {
      name: 'Landing Page Blueprint',
      items: [
        'Hero section with strong offer',
        'Single conversion-focused CTA',
        'Social proof or testimonials',
        'Fast-scrolling mobile experience'
      ]
    },
    {
      name: 'eCommerce Shop Blueprint',
      items: [
        'Product catalog and category pages',
        'Secure checkout flow design',
        'Featured products and promotions',
        'Contact/support and shipping info'
      ]
    }
  ];

  const selectedBlueprint = blueprintOptions.find((option) => option.name === formData.blueprint);

  const handleFeatureToggle = (feat: string) => {
    setCalcData(prev => ({
      ...prev,
      features: prev.features.includes(feat) 
        ? prev.features.filter(f => f !== feat) 
        : [...prev.features, feat]
    }));
  };

  const calculateEstimate = () => {
    const selectedType = websiteTypes.find(t => t.name === calcData.type);
    const baseCost = selectedType ? selectedType.base : 4000;
    
    const featuresCost = calcData.features.reduce((acc, feat) => {
      const option = featureOptions.find(f => f.name === feat);
      return acc + (option ? option.cost : 0);
    }, 0);

    const selectedPage = pageOptions.find(p => p.name === calcData.pages);
    const multiplier = selectedPage ? selectedPage.multiplier : 1.0;

    const total = Math.round((baseCost + featuresCost) * multiplier);
    return {
      priceRange: `₹${Math.round(total * 0.95).toLocaleString('en-IN')} - ₹${Math.round(total * 1.05).toLocaleString('en-IN')}`,
      timeEstimate: total < 4500 ? 'Within 3 days' : total < 6000 ? 'Within 5 days' : 'Within 7 days',
    };
  };

  const applyCalculatorEstimate = () => {
    const est = calculateEstimate();
    const details = `Estimated Project: ${calcData.type} (${calcData.pages})
Selected Features: ${calcData.features.join(', ') || 'Standard Features'}
Estimated Budget Scope: ${est.priceRange} (${est.timeEstimate})

Hey! I calculated my estimate using your estimator widget. Let's build this together!`;
    
    const withEmail = formData.email.trim() ? `${details}\n\nContact Email: ${formData.email.trim()}` : details;
    setFormData(prev => ({ ...prev, message: withEmail }));
    setIsCalcOpen(false);
    // Reset calculator
    setCalcStep(1);
    setCalcData({ type: 'Business Website', features: [], pages: '2-5 Pages' });
  };

  const handleMainSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.blueprint.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', msg: 'Please fill in all required fields and select a blueprint.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Simulate fetch quote posting
      await new Promise(resolve => setTimeout(resolve, 1800));

      const submissions = JSON.parse(localStorage.getItem('sitespawn_submissions') || '[]');
      const newSub: QuoteSubmission = {
        id: `quote_${Date.now()}`,
        name: formData.name.trim(),
        businessName: formData.businessName.trim(),
        email: formData.email.trim(),
        blueprint: formData.blueprint.trim(),
        message: `${formData.message.trim()}${formData.email.trim() ? `\n\nContact Email: ${formData.email.trim()}` : ''}`,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('sitespawn_submissions', JSON.stringify([...submissions, newSub]));
      setSubmissions(prev => [...prev, newSub]);
      setStatus({ type: 'success', msg: 'Thank you! Your quote request has been sent successfully.' });
      setFormData({ name: '', businessName: '', email: '', blueprint: 'Business Website Blueprint', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Oops! Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmission = (deleteId: string) => {
    const updated = submissions.filter((item) => item.id !== deleteId);
    setSubmissions(updated);
    localStorage.setItem('sitespawn_submissions', JSON.stringify(updated));
  };

  // Load existing submissions from localStorage on mount
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('sitespawn_submissions') || '[]') as QuoteSubmission[];
    setSubmissions(existing || []);
  }, []);

  return (
    <section id="contact" className="py-24 bg-[#F0EAE1] relative border-b border-black/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black/[0.005] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main contact grid panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white border border-black/10 rounded-none p-8 md:p-12 shadow-sm text-left">
          
          {/* Left Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block">Let's Connect</span>
            <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
              Ready to create a website that brings customers through your door?
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Contact me to start with a free quote, and let's design a website that fits your brand, industry, and goals.
            </p>

            {/* Direct Channels */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              <div className="flex items-start gap-3">
                <div className="bg-[#F0EAE1] border border-black/5 w-9 h-9 rounded-none flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-black" />
                </div>
                <div>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.1em] block">Email</span>
                  <a href="mailto:sitespawn@gmail.com" className="text-[#2A2421] hover:opacity-70 text-xs font-semibold transition-opacity">
                    sitespawn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="bg-[#F0EAE1] border border-black/5 w-9 h-9 rounded-none flex items-center justify-center shrink-0">
                  <CreditCard className="h-4 w-4 text-black" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.1em] block">Accepted Payments</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-[#2A2421] text-[#FAF5EC] text-[8px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-none border border-black/5">
                      GPay
                    </span>
                    <span className="bg-[#2A2421] text-[#FAF5EC] text-[8px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-none border border-black/5">
                      Paytm
                    </span>
                    <span className="bg-[#2A2421] text-[#FAF5EC] text-[8px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-none border border-black/5">
                      UPI
                    </span>
                    <span className="bg-[#2A2421] text-[#FAF5EC] text-[8px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-none border border-black/5">
                      Cards
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Custom Scope Estimator banner */}
            <div className="bg-[#F0EAE1] border border-black/5 rounded-none p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-start gap-3">
                <Calculator className="h-5 w-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-black text-xs font-bold flex items-center gap-1">
                    Quote Price Calculator <Sparkles className="h-3 w-3 text-neutral-700 animate-pulse" />
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">Calculate exact project cost & timing ranges before submitting.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setIsCalcOpen(true); setCalcStep(1); }}
                className="bg-black hover:bg-transparent text-white hover:text-black text-[9px] uppercase tracking-[0.15em] font-bold py-2 px-4 rounded-none border border-black transition-colors shrink-0 cursor-pointer"
              >
                Launch Estimator
              </button>
            </div>

            {/* Real Form submitting code */}
            <form onSubmit={handleMainSubmit} className="space-y-4">
              {status && (
                <div className={`p-4 rounded-none text-xs font-semibold border ${
                  status.type === 'success' 
                    ? 'bg-neutral-50 border-black/10 text-black' 
                    : 'bg-rose-50 border-rose-150 text-rose-600'
                }`}>
                  {status.msg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Sarah Connor"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-black/15 rounded-none p-3 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="business" className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Business Name</label>
                  <input
                    id="business"
                    type="text"
                    placeholder="e.g. Cyberdine Café"
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-white border border-black/15 rounded-none p-3 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-black/15 rounded-none p-3 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Blueprint *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {blueprintOptions.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, blueprint: option.name }))}
                      className={`text-[10px] text-left px-4 py-3 border rounded-none transition-all text-neutral-700 hover:border-black/30 hover:bg-neutral-50 ${
                        formData.blueprint === option.name
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-black/10'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>

                {selectedBlueprint && (
                  <div className="bg-[#F8F5EF] border border-black/10 rounded-none p-4 text-[10px] text-neutral-700">
                    <div className="text-neutral-500 uppercase tracking-[0.2em] font-bold mb-2">Specialization</div>
                    <ul className="space-y-2 list-disc list-inside">
                      {selectedBlueprint.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Project Details *</label>
                <textarea
                  id="message"
                  placeholder="Tell me about your business, required features, and goals..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-black/15 rounded-none p-3 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
                  rows={5}
                  required
                />
              </div>

              {/* Email will automatically be included in project details/contact */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-transparent text-white hover:text-black border border-black font-bold py-3 text-[10px] uppercase tracking-[0.2em] transition-colors mt-2 cursor-pointer rounded-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" /> Sending Request...
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Comments / Submissions preview */}
            <div className="pt-6 border-t border-black/10">
              <h4 className="text-neutral-500 text-[10px] uppercase tracking-[0.1em] font-bold mb-3">Recent Submissions</h4>
              {submissions.length === 0 ? (
                <p className="text-xs text-neutral-500">No submissions yet — yours will appear here after sending.</p>
              ) : (
                <div className="space-y-3">
                  {[...submissions].reverse().map(s => (
                    <div key={s.id} className="bg-white border border-black/5 p-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                        <div className="font-bold text-sm">{s.name}{s.businessName ? ` — ${s.businessName}` : ''}</div>
                        {s.email && (
                          <div className="text-[12px] text-neutral-700"><a href={`mailto:${s.email}`} className="hover:underline">{s.email}</a></div>
                        )}
                      {s.blueprint && (
                        <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mt-1">
                          {s.blueprint}
                        </div>
                      )}
                        <div className="flex items-center gap-3">
                          <div className="text-neutral-400 text-[11px]">{new Date(s.timestamp).toLocaleString()}</div>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDeleteSubmission(s.id)}
                              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-800 text-[10px] uppercase tracking-[0.15em] font-bold"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-neutral-700 whitespace-pre-line">{s.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Estimator Multistep Modal Dialog */}
      {isCalcOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex justify-center items-center p-4 animate-fade-in">
          <div className="bg-[#FAF5EC] border border-black/10 rounded-none w-full max-w-lg overflow-hidden shadow-2xl text-[#2A2421]">
            
            {/* Header */}
            <div className="bg-[#F0EAE1] border-b border-black/10 px-6 py-4 flex justify-between items-center font-medium">
              <div className="flex items-center gap-2">
                <Calculator className="h-4.5 w-4.5 text-black" />
                <h3 className="text-black font-serif font-medium text-sm">Interactive Quote Scope Estimator</h3>
              </div>
              <button 
                onClick={() => setIsCalcOpen(false)}
                className="p-1.5 bg-white hover:bg-neutral-100 border border-black/10 rounded-none text-neutral-600 hover:text-black transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stepper visual progress */}
            <div className="bg-white border-b border-black/10 px-6 py-3 flex justify-between text-[9px] text-neutral-400 font-bold uppercase select-none tracking-widest">
              <span className={calcStep === 1 ? 'text-black border-b border-black pb-1' : ''}>1. Website Type</span>
              <span className={calcStep === 2 ? 'text-black border-b border-black pb-1' : ''}>2. Dynamic Features</span>
              <span className={calcStep === 3 ? 'text-black border-b border-black pb-1' : ''}>3. Budget Results</span>
            </div>

            {/* Form steps content */}
            <div className="p-6">
              
              {/* STEP 1: Website type */}
              {calcStep === 1 && (
                <div className="space-y-4 text-left animate-fade-in">
                  <h4 className="text-neutral-500 text-[10px] uppercase tracking-[0.1em] font-bold">What kind of website do you need?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {websiteTypes.map((t) => (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setCalcData({ ...calcData, type: t.name })}
                        className={`p-3 rounded-none border text-left text-xs transition-all cursor-pointer ${
                          calcData.type === t.name 
                            ? 'bg-black text-white border-black font-semibold' 
                            : 'bg-white border-black/10 hover:border-black/30 text-neutral-600'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setCalcStep(2)}
                      className="bg-black hover:bg-transparent text-white hover:text-black border border-black text-[9px] uppercase tracking-[0.15em] font-bold py-2.5 px-4 rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Next Step <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Feature selection */}
              {calcStep === 2 && (
                <div className="space-y-4 text-left animate-fade-in">
                  <h4 className="text-neutral-500 text-[10px] uppercase tracking-[0.1em] font-bold">Select key features (optional)</h4>
                  <div className="space-y-2">
                    {featureOptions.map((f) => {
                      const isSelected = calcData.features.includes(f.name);
                      return (
                        <div
                          key={f.name}
                          onClick={() => handleFeatureToggle(f.name)}
                          className={`p-3 rounded-none border text-left text-xs flex justify-between items-center cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-black text-white border-black font-semibold' 
                              : 'bg-white border-black/10 hover:border-black/25 text-neutral-600 hover:text-black'
                          }`}
                        >
                          <span>{f.name}</span>
                          <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded-none ${
                            isSelected ? 'bg-white/20 border-white/20 text-white' : 'bg-[#F0EAE1] border-black/5 text-neutral-500'
                          }`}>
                            +₹{f.cost}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setCalcStep(1)}
                      className="bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-black text-[9px] uppercase tracking-[0.15em] font-bold py-2.5 px-4 border border-black/10 rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <button
                      onClick={() => setCalcStep(3)}
                      className="bg-black hover:bg-transparent text-white hover:text-black border border-black text-[9px] uppercase tracking-[0.15em] font-bold py-2.5 px-4 rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Next Step <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Results display */}
              {calcStep === 3 && (
                <div className="space-y-6 text-left animate-fade-in">
                  <h4 className="text-neutral-500 text-[10px] uppercase tracking-[0.15em] font-bold text-center">Your Custom Scope Estimate</h4>
                  
                  {/* Scope details table */}
                  <div className="bg-[#F0EAE1] border border-black/5 p-5 rounded-none space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-500">Website Type:</span>
                      <span className="text-black font-bold">{calcData.type}</span>
                    </div>

                    <div className="flex justify-between items-start text-xs border-t border-black/10 pt-3">
                      <span className="text-neutral-500 shrink-0">Selected Features:</span>
                      <span className="text-black font-medium text-right max-w-[200px]">
                        {calcData.features.join(', ') || 'Standard Features Only'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs border-t border-black/10 pt-3">
                      <span className="text-neutral-500">Timeline Scope:</span>
                      <span className="text-[#9E8C6C] font-bold">{calculateEstimate().timeEstimate}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs border-t border-black/10 pt-3">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider text-[10px]">Estimated Budget:</span>
                      <span className="text-black font-serif font-bold text-lg">{calculateEstimate().priceRange}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={applyCalculatorEstimate}
                      className="w-full bg-black hover:bg-transparent text-white hover:text-black border border-black font-bold py-3 text-[10px] uppercase tracking-[0.15em] transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer rounded-none"
                    >
                      <Check className="h-4 w-4" /> Apply Estimate to Contact Form
                    </button>
                    <button
                      onClick={() => setCalcStep(2)}
                      className="w-full bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-black text-[9px] uppercase tracking-[0.15em] font-bold py-2.5 px-4 border border-black/10 rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Adjust features
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
