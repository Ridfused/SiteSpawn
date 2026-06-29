import { X, Smartphone, Monitor, RotateCw, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import RestaurantDemo from './demos/RestaurantDemo';
import SalonDemo from './demos/SalonDemo';
import GymDemo from './demos/GymDemo';

interface LivePreviewModalProps {
  itemId: string | null;
  onClose: () => void;
}

export default function LivePreviewModal({ itemId, onClose }: LivePreviewModalProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [reloadKey, setReloadKey] = useState(0);

  if (!itemId) return null;

  const getTitle = () => {
    if (itemId === 'restaurant') return "Restaurant Website Demo";
    if (itemId === 'salon') return "Salon Website Demo";
    return "Gym Website Demo";
  };

  const getUrl = () => {
    if (itemId === 'restaurant') return "https://bistrorustique.sitespawn.studio";
    if (itemId === 'salon') return "https://glownailsalon.sitespawn.studio";
    return "https://apexgym.sitespawn.studio";
  };

  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };

  return (
    <div id="preview-modal" className="fixed inset-0 bg-[#FAF5EC]/95 backdrop-blur-md z-[2000] flex flex-col justify-between items-center p-4 md:p-6 select-none animate-fade-in text-[#2A2421]">
      
      {/* Top Bar Controls */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 border-b border-black/10 pb-4 mb-2 text-left">
        <div>
          <span className="text-neutral-500 text-[9px] uppercase tracking-[0.25em] font-bold block">Interactive Live Preview</span>
          <h2 className="text-[#2A2421] text-lg font-serif font-medium flex items-center gap-2">
            {getTitle()}
            <span className="bg-[#E6DEC9] text-[#2A2421] text-[9px] px-2 py-0.5 rounded-none border border-black/5 font-bold uppercase tracking-[0.15em]">Fully Interactive</span>
          </h2>
        </div>

        {/* Device Switcher and Controls */}
        <div className="flex items-center gap-4">
          <div className="flex bg-[#F0EAE1] border border-black/10 p-1 rounded-none text-xs font-bold">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-none transition-all cursor-pointer ${
                device === 'desktop' ? 'bg-black text-white font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" /> Desktop
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-none transition-all cursor-pointer ${
                device === 'mobile' ? 'bg-black text-white font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" /> Mobile
            </button>
          </div>

          <button
            onClick={handleReload}
            title="Reload Demo"
            className="p-2 bg-white hover:bg-neutral-100 border border-black/10 rounded-none text-neutral-600 hover:text-black transition-all cursor-pointer"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          <button
            onClick={onClose}
            aria-label="Close Preview"
            className="bg-black hover:bg-transparent text-white hover:text-black text-[9px] uppercase tracking-[0.15em] font-bold py-2.5 px-4 border border-black transition-colors flex items-center gap-1.5 cursor-pointer rounded-none"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </div>
      </div>

      {/* Simulator Body */}
      <div className="w-full flex-1 flex justify-center items-center py-2 overflow-hidden">
        <div 
          className={`h-full flex flex-col bg-white rounded-none border-2 border-black/15 shadow-lg overflow-hidden transition-all duration-300 relative ${
            device === 'mobile' 
              ? 'w-full max-w-[375px] max-h-[750px] aspect-[9/19] border-[12px] border-black/90' 
              : 'w-full max-w-6xl aspect-[16/10]'
          }`}
        >
          {/* Simulated Browser Address Bar */}
          <div className="bg-[#E6DEC9] border-b border-black/10 p-3 flex items-center gap-3">
            {/* Window Dots (Desktop only) */}
            {device === 'desktop' && (
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 bg-black/10 rounded-full inline-block" />
                <span className="w-2.5 h-2.5 bg-black/20 rounded-full inline-block" />
                <span className="w-2.5 h-2.5 bg-black/30 rounded-full inline-block" />
              </div>
            )}

            {/* Back/Forward buttons */}
            <div className="flex gap-1.5 text-neutral-400 shrink-0">
              <ArrowLeft className="h-4 w-4 hover:text-black cursor-not-allowed" />
              <ArrowRight className="h-4 w-4 hover:text-black cursor-not-allowed" />
            </div>

            {/* URL input */}
            <div className="flex-1 bg-white border border-black/10 px-3 py-1 rounded-none text-xs font-mono text-neutral-500 flex items-center justify-between">
              <span className="truncate">{getUrl()}</span>
              <ExternalLink className="h-3.5 w-3.5 text-neutral-400 hover:text-black cursor-pointer shrink-0" />
            </div>
          </div>

          {/* Device Home Indicator Notch (Mobile only) */}
          {device === 'mobile' && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/95 rounded-full z-20 flex items-center justify-center">
              <div className="w-12 h-1 bg-neutral-800 rounded-full" />
            </div>
          )}

          {/* Actual Active Webpage View */}
          <div key={reloadKey} className="flex-1 overflow-hidden relative">
            {itemId === 'restaurant' && <RestaurantDemo />}
            {itemId === 'salon' && <SalonDemo />}
            {itemId === 'gym' && <GymDemo />}
          </div>
          
          {/* Mobile Bottom Bar Indicator */}
          {device === 'mobile' && (
            <div className="bg-black h-6 border-t border-black/10 flex items-center justify-center shrink-0">
              <div className="w-24 h-1 bg-neutral-800 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Helper Footer tips */}
      <div className="w-full max-w-7xl flex justify-between items-center text-[10px] uppercase tracking-[0.1em] text-neutral-500 pt-3 border-t border-black/10 mt-2 font-bold">
        <p>Interactive playground: Click around the simulated preview to experience reservation flows, booking, and tools!</p>
        <p>Press <kbd className="bg-neutral-100 px-1 py-0.5 border border-black/10 text-neutral-600 font-mono text-[9px]">ESC</kbd> to exit</p>
      </div>

    </div>
  );
}
