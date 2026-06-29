import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { UserSession } from '../types';

export default function Navbar({ user, onLogout }: { user?: UserSession | null; onLogout?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why a Website', href: '#why' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#FAF5EC]/95 backdrop-blur-md border-b border-black/5 py-4 shadow-sm' 
          : 'bg-[#FAF5EC]/70 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <a 
          href="#home" 
          className="font-serif italic font-medium text-2xl tracking-tight text-[#2A2421] hover:opacity-75 transition-opacity"
        >
          SiteSpawn
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Desktop navigation" className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-600 hover:text-black transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#contact" 
            className="bg-black hover:bg-transparent text-white hover:text-black text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-3 border border-black transition-all flex items-center gap-2"
          >
            Get a Free Quote <ArrowRight className="h-3 w-3" />
          </a>

          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-neutral-600">{user.name}</span>
              <button onClick={() => onLogout && onLogout()} className="text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-2 border border-black/10 hover:bg-neutral-100">Logout</button>
            </div>
          ) : (
            <a href="#/login" className="text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-2 border border-black/10 hover:bg-neutral-100">Login</a>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle Menu"
          className="md:hidden p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 border border-black/10 transition-all"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FAF5EC] border-b border-black/10 p-6 shadow-lg flex flex-col gap-4 animate-slide-down">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[11px] uppercase tracking-[0.15em] font-bold text-neutral-700 hover:text-black hover:bg-neutral-100 p-2.5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="w-full bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-4 text-center border border-black hover:bg-transparent hover:text-black transition-colors block"
          >
            Get a Free Quote
          </a>

          <div className="flex flex-col gap-2 mt-3">
            {user ? (
              <>
                <div className="text-sm font-semibold">{user.name}</div>
                <button onClick={() => { setIsOpen(false); onLogout && onLogout(); }} className="w-full text-left px-3 py-2 border border-black/10">Logout</button>
              </>
            ) : (
              <a onClick={() => setIsOpen(false)} href="#/login" className="w-full text-left px-3 py-2 border border-black/10">Login</a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
