import { useState, FormEvent } from 'react';
import { Calendar, Clock, Sparkles, CheckCircle, Heart, Star, Scissors, User } from 'lucide-react';

interface SalonService {
  name: string;
  duration: string;
  price: string;
  category: string;
  desc: string;
}

const SERVICES_DATA: SalonService[] = [
  { name: "Premium Haircut & Blowdry", duration: "60 mins", price: "₹1,200", category: "hair", desc: "Consultation, tailored scissor/clipper cut, shampoo and professional blowout style" },
  { name: "Balayage Hand-Painted Highlights", duration: "180 mins", price: "₹4,500", category: "hair", desc: "Customized free-hand lightener painting for seamless, sun-kissed blonde gradients" },
  { name: "Signature Gel Manicure", duration: "45 mins", price: "₹800", category: "nails", desc: "Nail shaping, cuticle grooming, hand massage, and long-lasting LED-cured gel polish" },
  { name: "Luxury Pedicure & Hydration", duration: "60 mins", price: "₹1,100", category: "nails", desc: "Soothing warm soak, sugar scrub exfoliation, hot stone massage, and lacquer finish" },
  { name: "Customized Hydrafacial Glow", duration: "75 mins", price: "₹2,500", category: "skin", desc: "Deep extraction, exfoliation, antioxidant infusion and custom modeling jelly mask" },
  { name: "Lash Lift & Keratin Tint", duration: "60 mins", price: "₹1,500", category: "skin", desc: "Semi-permanent lifting and deep tinting of natural eyelashes for effortless volume" }
];

const STYLISTS = [
  { name: "Sophia (Master Haircut)", rating: "4.9 (140+ reviews)", role: "Hair Specialist" },
  { name: "Liam (Nail Artist)", rating: "5.0 (98 reviews)", role: "Nails & Esthetics" },
  { name: "Ava (Skin Therapist)", rating: "4.8 (115 reviews)", role: "Skincare Specialist" }
];

export default function SalonDemo() {
  const [activeCat, setActiveCat] = useState<'all' | 'hair' | 'nails' | 'skin'>('all');
  const [selectedService, setSelectedService] = useState<string>(SERVICES_DATA[0].name);
  const [selectedStylist, setSelectedStylist] = useState<string>(STYLISTS[0].name);
  const [bookingDate, setBookingDate] = useState('2026-06-26');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [isBooked, setIsBooked] = useState(false);

  const filteredServices = activeCat === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeCat);

  const handleBook = (e: FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 8000);
  };

  return (
    <div className="bg-[#FDFCFB] text-[#1A1A1A] h-full overflow-y-auto rounded-none text-sm select-none border border-black/5">
      {/* Navbar */}
      <div className="bg-white border-b border-black/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-black" />
          <span className="font-serif italic font-semibold text-lg text-black">Glow & Co.</span>
        </div>
        <div className="flex gap-4 text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">
          <span className="hover:text-black cursor-pointer">Services</span>
          <span className="hover:text-black cursor-pointer">Stylists</span>
          <span className="hover:text-black cursor-pointer">Book</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-40 bg-gradient-to-r from-[#F7F6F3] via-white to-[#F7F6F3] flex flex-col justify-center px-6 border-b border-black/10">
        <div className="max-w-md space-y-1 text-left">
          <span className="text-neutral-500 text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Radiate Elegance
          </span>
          <h2 className="font-serif text-2xl font-medium tracking-tight text-[#1A1A1A]">Self-Care Made Beautiful</h2>
          <p className="text-xs text-neutral-600">Award-winning beauty salon dedicated to premium hairdressing, luxury nails, and biological skincare.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Services Menu (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex justify-between items-center border-b border-black/10 pb-2">
            <h3 className="font-serif font-medium text-black">Our Services</h3>
            
            {/* Category selection */}
            <div className="flex gap-1 bg-[#F7F6F3] p-1 rounded-none border border-black/5 text-[10px] uppercase font-bold tracking-wider">
              {['all', 'hair', 'nails', 'skin'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat as any)}
                  className={`px-2 py-0.5 rounded-none capitalize transition-all cursor-pointer ${
                    activeCat === cat 
                      ? 'bg-black text-white font-bold' 
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredServices.map((service, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedService(service.name)}
                className={`p-3 rounded-none border transition-all cursor-pointer text-left ${
                  selectedService === service.name 
                    ? 'bg-[#F7F6F3] border-black text-black' 
                    : 'bg-white border-black/5 hover:bg-neutral-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1 pr-2">
                    <span className="font-semibold text-black flex items-center gap-2">
                      {service.name}
                      {selectedService === service.name && <span className="bg-black text-[8px] text-white px-1 py-0.2 rounded-none font-mono uppercase">Selected</span>}
                    </span>
                    <p className="text-xs text-neutral-600 leading-normal">{service.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-black block font-mono">{service.price}</span>
                    <span className="text-[10px] text-neutral-500 block">{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking & Stylists (5 cols) */}
        <div className="md:col-span-5 space-y-6 text-left">
          <div className="bg-[#F7F6F3] border border-black/10 p-4 rounded-none space-y-4">
            <h3 className="font-serif font-medium text-black flex items-center gap-2 border-b border-black/10 pb-2">
              <Calendar className="h-4 w-4 text-black" /> Schedule Visit
            </h3>

            {isBooked ? (
              <div className="py-8 text-center space-y-3 flex flex-col items-center justify-center animate-fade-in">
                <CheckCircle className="h-10 w-10 text-black" />
                <h4 className="font-serif font-medium text-[#1A1A1A] text-base">Appointment Booked!</h4>
                <div className="text-xs text-neutral-700 bg-white p-3 rounded-none border border-black/10 w-full text-left space-y-1">
                  <p><strong>Service:</strong> {selectedService}</p>
                  <p><strong>Stylist:</strong> {selectedStylist.split(' (')[0]}</p>
                  <p><strong>Date:</strong> {bookingDate}</p>
                  <p><strong>Time:</strong> {bookingTime}</p>
                  <p className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wider font-bold">A confirmation email has been sent.</p>
                </div>
                <button 
                  onClick={() => setIsBooked(false)} 
                  className="mt-2 text-xs text-black underline hover:opacity-75 cursor-pointer"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">
                    Treatment
                  </label>
                  <select 
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                  >
                    {SERVICES_DATA.map((s, idx) => (
                      <option key={idx} value={s.name}>{s.name} ({s.price})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 flex items-center gap-1">
                    <User className="h-3 w-3" /> Stylist
                  </label>
                  <select 
                    value={selectedStylist}
                    onChange={e => setSelectedStylist(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                  >
                    {STYLISTS.map((s, idx) => (
                      <option key={idx} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">
                      Date
                    </label>
                    <input 
                      type="date" 
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      className="w-full bg-white border border-black/10 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">
                      Time
                    </label>
                    <select 
                      value={bookingTime}
                      onChange={e => setBookingTime(e.target.value)}
                      className="w-full bg-white border border-black/10 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                    >
                      <option value="09:00">9:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-black hover:opacity-90 text-white font-bold py-2 rounded-none text-xs tracking-wider uppercase mt-2 cursor-pointer"
                >
                  Book Appointment
                </button>
              </form>
            )}
          </div>

          {/* Client review highlights */}
          <div className="bg-white p-4 rounded-none border border-black/10 text-xs space-y-3">
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block">Client Spotlight</span>
            <div className="space-y-2">
              <div className="border-b border-black/5 pb-2">
                <div className="flex gap-1 text-black mb-1">
                  <Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" />
                </div>
                <p className="italic text-neutral-700 leading-normal">"Sophia does my haircuts and I'm always super happy! Booking is extremely seamless."</p>
                <span className="text-[9px] text-neutral-400 block mt-1 uppercase font-bold">— Clara M., Verified Customer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
