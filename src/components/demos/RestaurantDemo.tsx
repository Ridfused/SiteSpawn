import { useState, FormEvent } from 'react';
import { Calendar, Clock, Users, Utensils, Sparkles, CheckCircle, Heart } from 'lucide-react';

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  tags: string[];
}

const MENU_DATA: Record<string, MenuItem[]> = {
  starters: [
    { name: "French Onion Soup", price: "₹450", desc: "Classic caramelized onions, rich vegetable herb broth, gruyère crouton", tags: ["Warm", "Vegetarian", "Chef Special"] },
    { name: "Truffle Arancini", price: "₹550", desc: "Crispy risotto balls, wild mushrooms, white truffle, parmesan aioli", tags: ["Vegetarian", "Popular"] },
    { name: "Burrata & Heirloom Platter", price: "₹850", desc: "Creamy buffalo burrata, heirloom tomatoes, fresh basil pesto, toasted sourdough baguette", tags: ["Vegetarian", "To Share"] }
  ],
  mains: [
    { name: "Pan-Seared Duck Breast", price: "₹1,450", desc: "Spiced cherry reduction, parsnip purée, roasted baby carrots", tags: ["Signature"] },
    { name: "Truffle Butternut Risotto", price: "₹950", desc: "Creamy arborio rice, roasted butternut squash, crispy sage, shaved parmesan, black truffle oil", tags: ["Vegetarian", "Gluten-Free"] },
    { name: "Spinach & Ricotta Ravioli", price: "₹850", desc: "Housemade pasta, fresh spinach and ricotta filling, toasted pine nuts, brown butter sage sauce", tags: ["Vegetarian", "Popular"] },
    { name: "Wild Mushroom Gnocchi", price: "₹850", desc: "Hand-rolled potato gnocchi, sage brown butter, toasted pine nuts", tags: ["Vegetarian"] }
  ],
  desserts: [
    { name: "Crème Brûlée", price: "₹350", desc: "Tahitian vanilla bean custard, caramelized sugar crust, fresh berries", tags: ["Classic"] },
    { name: "Warm Chocolate Fondant", price: "₹450", desc: "Molten dark chocolate center, salted caramel, pistachio gelato", tags: ["Decadent"] }
  ],
  drinks: [
    { name: "Old Fashioned Bourbon", price: "₹650", desc: "Smoked oak, orange zest, cherry bark bitters, large ice block", tags: ["Smoked"] },
    { name: "Elderflower Spritz", price: "₹550", desc: "Prosecco, wild elderflower liqueur, mint, soda water", tags: ["Refreshing"] }
  ]
};

export default function RestaurantDemo() {
  const [category, setCategory] = useState<'starters' | 'mains' | 'desserts' | 'drinks'>('mains');
  const [booking, setBooking] = useState({ date: '2026-06-26', time: '19:00', guests: '2' });
  const [isBooked, setIsBooked] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleBook = (e: FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 8000);
  };

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  return (
    <div className="bg-[#FDFCFB] text-[#1A1A1A] h-full overflow-y-auto rounded-none text-sm select-none border border-black/5">
      {/* Banner / Navigation */}
      <div className="bg-white border-b border-black/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-black" />
          <span className="font-serif italic font-semibold text-lg text-black">Bistro Rustique</span>
        </div>
        <div className="flex gap-4 text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">
          <span className="hover:text-black cursor-pointer">Menu</span>
          <span className="hover:text-black cursor-pointer">About</span>
          <span className="hover:text-black cursor-pointer">Reserve</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-44 bg-gradient-to-r from-[#F7F6F3] via-white to-[#F7F6F3] flex flex-col justify-center items-center px-4 text-center border-b border-black/10">
        <Sparkles className="h-4 w-4 text-black mb-2" />
        <h2 className="font-serif text-2xl font-medium tracking-tight text-black">Modern French Cuisine</h2>
        <p className="text-xs text-neutral-600 mt-1 max-w-md leading-relaxed">Fine seasonal dining in a warm, intimate atmosphere. Handcrafted by Chef Jean-Luc.</p>
      </div>

      {/* Grid Layout */}
      <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Interactive Menu (8 cols) */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex justify-between items-center border-b border-black/10 pb-2">
            <h3 className="font-serif font-medium text-black text-base">Seasonal Menu</h3>
            
            {/* Category Selectors */}
            <div className="flex gap-1 bg-[#F7F6F3] p-1 rounded-none border border-black/5 text-[10px] uppercase font-bold tracking-wider">
              {(Object.keys(MENU_DATA) as Array<keyof typeof MENU_DATA>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-2 py-0.5 rounded-none capitalize transition-all cursor-pointer ${
                    category === cat 
                      ? 'bg-black text-white font-bold' 
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items List */}
          <div className="space-y-4">
            {MENU_DATA[category].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white p-3 rounded-none border border-black/5 hover:border-black/15 transition-all flex justify-between items-start"
              >
                <div className="space-y-1 pr-4 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-black">{item.name}</span>
                    {item.tags.map((t, i) => (
                      <span key={i} className="bg-[#F7F6F3] text-neutral-700 border border-black/5 text-[8px] px-1.5 py-0.2 rounded-none font-bold uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex flex-col items-end justify-between h-full space-y-3">
                  <span className="font-bold text-black font-mono text-sm">{item.price}</span>
                  <button 
                    onClick={() => toggleFavorite(item.name)} 
                    className="text-neutral-400 hover:text-black transition-colors cursor-pointer"
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(item.name) ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Table Reservation (5 cols) */}
        <div className="md:col-span-5 text-left">
          <div className="bg-[#F7F6F3] border border-black/10 p-4 rounded-none space-y-4">
            <h3 className="font-serif font-medium text-black flex items-center gap-2 border-b border-black/10 pb-2">
              <Calendar className="h-4 w-4 text-black" /> Book a Table
            </h3>

            {isBooked ? (
              <div className="py-8 text-center space-y-3 flex flex-col items-center justify-center animate-fade-in">
                <CheckCircle className="h-10 w-10 text-black animate-bounce" />
                <h4 className="font-serif font-medium text-black text-base">Reservation Confirmed!</h4>
                <div className="text-xs text-neutral-700 bg-white p-3 rounded-none border border-black/10 w-full text-left space-y-1">
                  <p><strong>Guests:</strong> {booking.guests} People</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wider font-bold">A confirmation email has been sent.</p>
                </div>
                <button 
                  onClick={() => setIsBooked(false)} 
                  className="mt-2 text-xs text-black underline hover:opacity-70 cursor-pointer"
                >
                  Book another table
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 flex items-center gap-1">
                    <Users className="h-3 w-3 text-neutral-400" /> Party Size
                  </label>
                  <select 
                    value={booking.guests} 
                    onChange={e => setBooking({...booking, guests: e.target.value})}
                    className="w-full bg-white border border-black/10 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="6">6 People</option>
                    <option value="8">8+ People</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-neutral-400" /> Date
                  </label>
                  <input 
                    type="date" 
                    value={booking.date}
                    onChange={e => setBooking({...booking, date: e.target.value})}
                    className="w-full bg-white border border-black/10 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-neutral-400" /> Time
                  </label>
                  <select 
                    value={booking.time}
                    onChange={e => setBooking({...booking, time: e.target.value})}
                    className="w-full bg-white border border-black/10 rounded-none p-1.5 text-xs text-neutral-800 outline-none focus:border-black"
                  >
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-black hover:opacity-90 text-white font-bold py-2 rounded-none text-xs tracking-wider uppercase mt-2 cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </form>
            )}

            <div className="text-[10px] text-neutral-400 text-center pt-2.5 border-t border-black/10 uppercase tracking-widest font-bold">
              Or call: (555) 123-4567
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
