import { useState } from 'react';
import { X, FileCode, Check, Copy, Terminal, Cpu } from 'lucide-react';

interface SourceCodeModalProps {
  itemId: string | null;
  onClose: () => void;
}

const CODES_DATA: Record<string, Record<string, string>> = {
  restaurant: {
    "RestaurantDemo.tsx": `import { useState } from 'react';
import { Calendar, Clock, Users, Utensils } from 'lucide-react';

export default function RestaurantDemo() {
  const [category, setCategory] = useState<'mains' | 'desserts'>('mains');
  const [booking, setBooking] = useState({ date: '', time: '', guests: '2' });
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    // Submit API payload to express endpoint
  };

  return (
    <div className="bg-[#FDFCFB] text-[#1A1A1A]">
      <header className="flex justify-between items-center px-6 py-4">
        <span className="font-bold font-serif italic text-black">Bistro Rustique</span>
      </header>
      {/* Interactive Reservation Form */}
      <form onSubmit={handleBook}>
        <select value={booking.guests} onChange={e => setBooking({...booking, guests: e.target.value})}>
          <option value="2">2 People</option>
          <option value="4">4 People</option>
        </select>
        <button type="submit" className="bg-black text-white">
          Book Table
        </button>
      </form>
    </div>
  );
}`,
    "types.ts": `export interface MenuItem {
  name: string;
  price: string;
  description: string;
  tags: string[];
}

export interface BookingPayload {
  guests: number;
  date: string;
  time: string;
  notes?: string;
}`,
    "api.ts": `export async function createReservation(payload: BookingPayload) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Booking failed');
  return res.json();
}`
  },
  salon: {
    "SalonDemo.tsx": `import { useState } from 'react';
import { Scissors, Sparkles, Calendar } from 'lucide-react';

export default function SalonDemo() {
  const [selectedService, setSelectedService] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="bg-[#FDFCFB] text-[#1A1A1A]">
      <div className="flex items-center gap-2 text-black">
        <Scissors className="h-4 w-4" />
        <span className="font-bold font-serif italic">Glow & Co. Salon</span>
      </div>
      <form onSubmit={handleBooking}>
        <input type="date" onChange={e => setBookingDate(e.target.value)} />
        <button className="bg-black text-white">Book Appointment</button>
      </form>
    </div>
  );
}`,
    "schema.ts": `import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  serviceName: text("service_name").notNull(),
  stylistName: text("stylist_name").notNull(),
  appointmentTime: timestamp("appointment_time").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});`
  },
  gym: {
    "GymDemo.tsx": `import { useState } from 'react';
import { Dumbbell, Flame } from 'lucide-react';

export default function GymDemo() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    setBmi(parseFloat((w / (h * h)).toFixed(1)));
  };

  return (
    <div className="bg-[#FDFCFB] text-[#1A1A1A] p-6">
      <h3 className="text-black flex items-center gap-1 font-serif font-semibold">
        <img src="/dumbbell.png" className="h-4 w-4" /> BMI Calculator
      </h3>
      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
      <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
      <button onClick={calculateBmi} className="bg-black text-white">Calculate</button>
      {bmi && <p className="text-lg">BMI: {bmi}</p>}
    </div>
  );
}`,
    "calculator.test.ts": `import { calculateBMI } from './utils';

describe('BMI math unit test', () => {
  test('accurately calculates standard BMI', () => {
    const result = calculateBMI(70, 175);
    expect(result).toBe(22.9);
  });
});`
  }
};

export default function SourceCodeModal({ itemId, onClose }: SourceCodeModalProps) {
  const [activeFile, setActiveFile] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!itemId) return null;

  const codes = CODES_DATA[itemId] || {};
  const files = Object.keys(codes);
  
  // Set default active file on load
  if (!activeFile && files.length > 0) {
    setActiveFile(files[0]);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codes[activeFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="source-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex justify-center items-center p-4 md:p-6 select-none animate-fade-in text-[#2A2421]">
      <div className="bg-[#FAF5EC] border border-black/10 rounded-none w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#F0EAE1] border-b border-black/10 px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 border border-black/10 rounded-none">
              <Cpu className="h-4.5 w-4.5 text-black" />
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 font-bold tracking-[0.2em] uppercase">Production Ready Blueprint</span>
              <h3 className="text-black font-serif font-medium text-sm capitalize">{itemId} Code Architecture</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close Code Viewer"
            className="p-1.5 bg-white hover:bg-neutral-100 border border-black/10 rounded-none text-neutral-600 hover:text-black transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Selector & Copy Options */}
        <div className="bg-white border-b border-black/10 px-6 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          {/* File tabs */}
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {files.map(f => (
              <button
                key={f}
                onClick={() => setActiveFile(f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[11px] font-mono transition-all cursor-pointer border ${
                  activeFile === f 
                    ? 'bg-[#F0EAE1] text-black border-black/20 font-bold' 
                    : 'text-neutral-500 hover:text-black border-transparent hover:bg-neutral-50'
                }`}
              >
                <FileCode className="h-3.5 w-3.5" /> {f}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-transparent hover:bg-black text-neutral-800 hover:text-white border border-black/15 hover:border-black px-4 py-2 text-[9px] uppercase tracking-[0.15em] font-bold transition-all shrink-0 cursor-pointer rounded-none"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy Code
              </>
            )}
          </button>
        </div>

        {/* Editor Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F0EAE1] font-mono text-xs text-neutral-700 leading-relaxed text-left border-b border-black/10">
          <div className="flex items-start gap-4">
            {/* Line numbers mock */}
            <div className="text-neutral-400 select-none text-right shrink-0 pr-3 border-r border-black/10 font-medium font-mono text-[11px]">
              {(codes[activeFile] || '').split('\n').map((_, i) => (
                <div key={i} className="h-5">{i + 1}</div>
              ))}
            </div>
            
            {/* Real Highlighted code representation */}
            <pre className="flex-1 whitespace-pre overflow-x-auto font-mono text-neutral-800 text-[11px] leading-5">
              <code>
                {codes[activeFile]}
              </code>
            </pre>
          </div>
        </div>

        {/* Editor Terminal footer status info */}
        <div className="bg-[#E6DEC9] px-6 py-3.5 flex justify-between items-center text-[9px] text-neutral-500 font-bold uppercase tracking-[0.1em] shrink-0 select-none">
          <span className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-neutral-600 animate-pulse" /> Status: Compilation green, typescript fully optimized.
          </span>
          <span>UTF-8 | LF</span>
        </div>

      </div>
    </div>
  );
}
