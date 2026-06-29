import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import ChooseMe from './components/ChooseMe';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LivePreviewModal from './components/LivePreviewModal';
import SourceCodeModal from './components/SourceCodeModal';

export default function App() {
  const [activeLiveDemo, setActiveLiveDemo] = useState<string | null>(null);
  const [activeSourceCode, setActiveSourceCode] = useState<string | null>(null);

  const handleOpenLiveDemo = (id: string) => {
    setActiveLiveDemo(id);
  };

  const handleOpenSourceCode = (id: string) => {
    setActiveSourceCode(id);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#2A2421] selection:bg-[#2A2421] selection:text-[#FAF5EC] font-sans antialiased overflow-x-hidden">
      {/* Primary Landing Page Components */}
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <WhyUs />
        <Services />
        <Portfolio 
          onOpenLiveDemo={handleOpenLiveDemo} 
          onOpenSourceCode={handleOpenSourceCode} 
        />
        <Process />
        <ChooseMe />
        <Testimonials />
        <Faq />
        <ContactForm />
      </main>

      <Footer />

      {/* Interactive Overlays */}
      {activeLiveDemo && (
        <LivePreviewModal 
          itemId={activeLiveDemo} 
          onClose={() => setActiveLiveDemo(null)} 
        />
      )}

      {activeSourceCode && (
        <SourceCodeModal 
          itemId={activeSourceCode} 
          onClose={() => setActiveSourceCode(null)} 
        />
      )}
    </div>
  );
}
