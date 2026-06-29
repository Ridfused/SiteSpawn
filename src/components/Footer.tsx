export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2A2421] text-white border-t border-black/5 py-12 relative z-10 text-left select-none">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Logo Brand column */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="font-serif italic font-medium text-2xl tracking-tight text-white">SiteSpawn</h3>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Premium freelance web development portfolio showcasing high-converting, blazing fast websites for small businesses and local shops.
            </p>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">Quick Navigation</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a href="#why" className="text-neutral-400 hover:text-white transition-colors">Why Every Business Needs a Website</a>
              <a href="#services" className="text-neutral-400 hover:text-white transition-colors">Our Services</a>
              <a href="#portfolio" className="text-neutral-400 hover:text-white transition-colors">Portfolio</a>
              <a href="#process" className="text-neutral-400 hover:text-white transition-colors">Our Process</a>
            </div>
          </div>

          {/* Legal / Secondary info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">Direct Connect</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">Get a Free Quote</a>
              <a href="mailto:sitespawn@gmail.com" className="text-neutral-400 hover:text-white transition-colors">sitespawn@gmail.com</a>
              <span className="text-neutral-500">Mon - Fri: 9:00 AM - 6:00 PM UTC</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright ribbon */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.1em] text-neutral-500 font-bold">
          <p>© {currentYear} SiteSpawn. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-[0.1em]">We Accept:</span>
            <span className="bg-white/5 text-neutral-300 text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 border border-white/10">GPay</span>
            <span className="bg-white/5 text-neutral-300 text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 border border-white/10">Paytm</span>
            <span className="bg-white/5 text-neutral-300 text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 border border-white/10">UPI</span>
            <span className="bg-white/5 text-neutral-300 text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 border border-white/10">Cards</span>
          </div>
          <p className="flex items-center gap-1">
            Built with extreme precision and craft.
          </p>
        </div>

      </div>
    </footer>
  );
}
