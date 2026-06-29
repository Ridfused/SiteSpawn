import { useState, FormEvent } from 'react';
import { Calendar, Flame, Trophy, CheckCircle, Dumbbell, ShieldCheck, Calculator, X } from 'lucide-react';

interface GymClass {
  name: string;
  time: string;
  coach: string;
  spots: number;
  level: string;
  day: string;
}

const CLASSES_DATA: GymClass[] = [
  { name: "HIIT Explosion", time: "07:00 - 08:00 AM", coach: "Coach Sarah", spots: 8, level: "All Levels", day: "Mon" },
  { name: "Power Olympic Lifting", time: "09:00 - 10:30 AM", coach: "Coach Marcus", spots: 4, level: "Advanced", day: "Mon" },
  { name: "Vinyasa Flow Yoga", time: "05:30 - 06:30 PM", coach: "Coach Elena", spots: 12, level: "Beginner", day: "Tue" },
  { name: "CrossFit WOD", time: "06:00 - 07:00 AM", coach: "Coach Marcus", spots: 5, level: "Intermediate", day: "Wed" },
  { name: "MetCon Conditioning", time: "06:30 - 07:30 PM", coach: "Coach Sarah", spots: 9, level: "All Levels", day: "Thu" },
  { name: "Pilates Core Sculpture", time: "10:00 - 11:00 AM", coach: "Coach Elena", spots: 15, level: "Beginner", day: "Fri" }
];

const PACKAGES = [
  { name: "Basic Membership", price: "₹1,499", period: "month", perks: ["Access to gym floor", "Locker room access", "1 free coaching intro session"] },
  { name: "Performance Pass", price: "₹2,499", period: "month", perks: ["All Basic perks", "Unlimited fitness classes", "Access to sauna & pool", "2 monthly guest passes"] },
  { name: "Elite Athlete Tier", price: "₹4,999", period: "month", perks: ["All Performance perks", "1-on-1 private coach (weekly)", "Personalized nutrition tracker", "Unlimited body scan sessions"] }
];

export default function GymDemo() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'plans' | 'bmi'>('schedule');
  const [selectedDay, setSelectedDay] = useState<string>('Mon');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isJoined, setIsJoined] = useState(false);
  const [checkoutPkg, setCheckoutPkg] = useState<string | null>(null);
  
  // BMI calculator state
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [bmiResult, setBmiResult] = useState<{ score: number; text: string; color: string } | null>(null);

  const calculateBmi = (e: FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // in meters
    if (w > 0 && h > 0) {
      const score = parseFloat((w / (h * h)).toFixed(1));
      let text = '';
      let color = '';
      if (score < 18.5) {
        text = 'Underweight - Healthy caloric surplus recommended!';
        color = 'text-[#9E8C6C]';
      } else if (score < 25) {
        text = 'Normal weight - Perfect athletic baseline!';
        color = 'text-black';
      } else if (score < 30) {
        text = 'Overweight - High density power training is ideal!';
        color = 'text-[#9E8C6C]';
      } else {
        text = 'Obese - We can help you scale your strength journey!';
        color = 'text-neutral-500';
      }
      setBmiResult({ score, text, color });
    }
  };

  const handleJoinClass = (className: string) => {
    setSelectedClass(className);
    setIsJoined(true);
    setTimeout(() => setIsJoined(false), 8000);
  };

  return (
    <div className="bg-[#FDFCFB] text-[#1A1A1A] h-full overflow-y-auto rounded-none text-sm select-none border border-black/5 relative">
      {/* Navbar */}
      <div className="bg-white border-b border-black/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-black" />
          <span className="font-serif italic font-semibold text-lg text-black">Apex Athletics</span>
        </div>
        <div className="flex gap-4 text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">
          <span className="hover:text-black cursor-pointer">Schedules</span>
          <span className="hover:text-black cursor-pointer">Memberships</span>
          <span className="hover:text-black cursor-pointer">Calculators</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-40 bg-gradient-to-r from-[#F7F6F3] via-white to-[#F7F6F3] flex flex-col justify-center px-6 border-b border-black/10">
        <div className="max-w-md space-y-1 text-left">
          <span className="text-neutral-500 text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> Push Your Limits
          </span>
          <h2 className="font-serif text-2xl font-medium tracking-tight text-black">UNLEASH YOUR POWER</h2>
          <p className="text-xs text-neutral-600">State-of-the-art weights, pro-coaching, high-intensity classes and an unbeatable athletic community.</p>
        </div>
      </div>

      {/* Segment Control */}
      <div className="px-6 pt-4 flex gap-2 border-b border-black/10">
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`pb-2 px-3 text-[10px] uppercase tracking-[0.15em] font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === 'schedule' ? 'text-black border-black' : 'text-neutral-400 border-transparent hover:text-black'
          }`}
        >
          Class Schedules
        </button>
        <button 
          onClick={() => setActiveTab('plans')}
          className={`pb-2 px-3 text-[10px] uppercase tracking-[0.15em] font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === 'plans' ? 'text-black border-black' : 'text-neutral-400 border-transparent hover:text-black'
          }`}
        >
          Membership Plans
        </button>
        <button 
          onClick={() => setActiveTab('bmi')}
          className={`pb-2 px-3 text-[10px] uppercase tracking-[0.15em] font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === 'bmi' ? 'text-black border-black' : 'text-neutral-400 border-transparent hover:text-black'
          }`}
        >
          Fitness Calculator
        </button>
      </div>

      {/* Content Areas */}
      <div className="px-6 py-6">
        
        {/* TAB 1: Schedules */}
        {activeTab === 'schedule' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-medium text-black flex items-center gap-1.5 text-xs">
                <Calendar className="h-4 w-4 text-black" /> Book Daily Class
              </h3>
              
              {/* Day filters */}
              <div className="flex gap-1 bg-[#F7F6F3] p-1 rounded-none border border-black/5 text-[10px] uppercase tracking-wider font-bold">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-2 py-0.5 rounded-none uppercase font-semibold transition-all cursor-pointer ${
                      selectedDay === day 
                        ? 'bg-black text-white font-bold' 
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {isJoined && (
              <div className="bg-[#F7F6F3] border border-black/10 text-black p-3 rounded-none text-xs flex items-center gap-3 animate-fade-in text-left">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <div>
                  <strong className="block font-bold uppercase tracking-wider text-[10px]">Joined Class Successfully!</strong>
                  Your spot for <strong className="font-bold">{selectedClass}</strong> has been locked in.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CLASSES_DATA.filter(c => c.day === selectedDay).map((cls, idx) => (
                <div key={idx} className="bg-white border border-black/10 p-3 rounded-none flex justify-between items-center hover:border-black transition-all text-left">
                  <div className="space-y-1">
                    <span className="font-bold text-black block text-sm">{cls.name}</span>
                    <span className="text-[11px] text-neutral-500 block">{cls.time} | {cls.coach}</span>
                    <span className="bg-[#F7F6F3] text-black border border-black/5 text-[8px] px-1.5 py-0.2 rounded-none font-bold uppercase tracking-wider inline-block">
                      {cls.level}
                    </span>
                  </div>
                  <div className="text-right space-y-2 shrink-0">
                    <span className="text-[10px] text-neutral-400 block font-semibold">{cls.spots} spots left</span>
                    <button 
                      onClick={() => handleJoinClass(cls.name)}
                      className="bg-black hover:opacity-85 text-white text-[10px] font-bold px-3 py-1.5 rounded-none transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
              {CLASSES_DATA.filter(c => c.day === selectedDay).length === 0 && (
                <p className="text-xs text-neutral-500 italic py-4 col-span-2 text-center">No group classes scheduled for {selectedDay}. Open gym floors available!</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Plans */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in text-left">
            {PACKAGES.map((pkg, idx) => (
              <div key={idx} className="bg-[#F7F6F3] border border-black/10 p-4 rounded-none flex flex-col justify-between hover:border-black/30 transition-all">
                <div className="space-y-3">
                  <h4 className="font-serif font-medium text-sm text-black uppercase tracking-wider">{pkg.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-black font-mono">{pkg.price}</span>
                    <span className="text-xs text-neutral-500">/ {pkg.period}</span>
                  </div>
                  <ul className="space-y-1.5 pt-2 border-t border-black/10 text-xs text-neutral-600">
                    {pkg.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <Trophy className="h-3 w-3 text-black mt-0.5 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => setCheckoutPkg(pkg.name)}
                  className="w-full mt-4 bg-black hover:bg-transparent text-white hover:text-black font-bold py-2 rounded-none border border-black text-xs transition-all uppercase tracking-wider cursor-pointer text-center"
                >
                  Join Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Fitness Calculators */}
        {activeTab === 'bmi' && (
          <div className="max-w-md mx-auto bg-[#F7F6F3] border border-black/10 p-5 rounded-none space-y-4 animate-fade-in">
            <h3 className="font-serif font-medium text-black flex items-center gap-1.5 text-xs border-b border-black/10 pb-2 text-left">
              <Calculator className="h-4 w-4" /> Interactive BMI Calculator
            </h3>

            <form onSubmit={calculateBmi} className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className="w-full bg-white border border-black/15 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Height (cm)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    className="w-full bg-white border border-black/15 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white font-bold py-2 rounded-none text-xs tracking-wider uppercase cursor-pointer"
              >
                Calculate Now
              </button>
            </form>

            {bmiResult && (
              <div className="bg-white p-4 rounded-none border border-black/10 space-y-1.5 animate-fade-in text-center">
                <span className="text-[10px] text-neutral-400 block uppercase font-bold tracking-widest">Your Body Mass Index</span>
                <span className={`text-3xl font-bold font-mono ${bmiResult.color}`}>{bmiResult.score}</span>
                <p className="text-xs text-neutral-700 font-medium">{bmiResult.text}</p>
                
                {/* Visual meter */}
                <div className="w-full bg-neutral-100 h-1.5 rounded-none overflow-hidden mt-2 relative border border-black/5">
                  <div 
                    className="h-full bg-black transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(10, (bmiResult.score / 40) * 100))}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[8px] text-neutral-400 font-bold uppercase mt-1">
                  <span>Under</span>
                  <span>Normal</span>
                  <span>Over</span>
                  <span>Obese</span>
                </div>
              </div>
            )}

            <div className="text-[10px] text-neutral-400 flex items-center justify-center gap-1 font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-black" /> Secure, private calculator
            </div>
          </div>
        )}
      </div>

      {/* Checkout overlay dialog */}
      {checkoutPkg && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex justify-center items-center p-4">
          <div className="bg-[#F7F6F3] border border-black/10 p-6 rounded-none w-full max-w-xs text-center space-y-4 shadow-xl">
            <CheckCircle className="h-10 w-10 text-black mx-auto" />
            <h4 className="font-serif font-medium text-black text-base capitalize">{checkoutPkg} Selected</h4>
            <p className="text-xs text-neutral-600 leading-normal">Thank you for selecting our tier! In the live production workspace, this action securely loads Stripe checkout.</p>
            <button 
              onClick={() => setCheckoutPkg(null)}
              className="bg-black hover:opacity-90 text-white font-bold py-2 px-6 rounded-none text-xs uppercase tracking-wider cursor-pointer"
            >
              Continue exploring
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
