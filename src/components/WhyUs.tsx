import { CheckCircle2, Search, ShoppingBag, MessageSquare, Clock } from 'lucide-react';

export default function WhyUs() {
  const cards = [
    {
      title: "Build customer trust",
      desc: "Showcase your brand with a polished online presence that makes customers feel confident and ready to book.",
      icon: <CheckCircle2 className="h-5 w-5 text-black" />,
    },
    {
      title: "Get found on Google",
      desc: "Local SEO-friendly websites help your shop, café, or clinic appear to customers searching for services nearby.",
      icon: <Search className="h-5 w-5 text-black" />,
    },
    {
      title: "Showcase products & services",
      desc: "Present menus, services, portfolios, pricing, and promotions in a clear layout that visitors can explore.",
      icon: <ShoppingBag className="h-5 w-5 text-black" />,
    },
    {
      title: "Increase inquiries & sales",
      desc: "Built-in contact flows, buttons, and forms help turn website visitors into leads and repeat customers.",
      icon: <MessageSquare className="h-5 w-5 text-black" />,
    },
    {
      title: "Available 24/7",
      desc: "Your website works while you sleep, providing essential business details, directions, and booking access anytime.",
      icon: <Clock className="h-5 w-5 text-black" />,
    }
  ];

  return (
    <section id="why" className="py-24 bg-[#F0EAE1] relative border-b border-black/5">
      {/* Editorial subtle center watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black/[0.01] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block">Why Every Business Needs a Website</span>
          <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
            Build trust, get found, and grow your local business online.
          </h2>
        </div>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {cards.map((card, index) => (
            <div 
              key={index}
              className={`bg-white border border-black/5 hover:border-black/15 transition-all duration-300 group flex flex-col justify-between p-8 rounded-none ${
                index === 3 ? 'md:col-span-2 lg:col-span-1' : index === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="space-y-5">
                <div className="bg-[#F0EAE1] border border-black/5 w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-all duration-300 rounded-none">
                  {card.icon}
                </div>
                <h3 className="text-[#2A2421] text-lg font-serif font-medium">{card.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed max-w-xl">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
