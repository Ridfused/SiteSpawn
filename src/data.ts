import { FaqItem, PortfolioItem, ProcessStep, Review } from './types';

export const SERVICES: string[] = [
  "Business Websites",
  "Restaurant Websites",
  "Café Websites",
  "Gym Websites",
  "Salon Websites",
  "Clinic Websites",
  "Portfolio Websites",
  "Landing Pages",
  "Website Redesign",
  "Website Maintenance"
];

export const INDUSTRIES: string[] = [
  "Restaurants",
  "Cafés",
  "Grocery Stores",
  "Clothing Shops",
  "Mobile Shops",
  "Gyms",
  "Salons",
  "Clinics",
  "Tuition Centres",
  "Real Estate",
  "Startups"
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "restaurant",
    title: "Restaurant Website",
    description: "Elegant menus, online reservations, and a welcoming brand story designed for diners.",
    features: ["Menu showcase", "Booking CTA", "Review highlights"],
    liveUrl: "https://bistrorustique.demo",
    githubUrl: "https://github.com/sitespawn/restaurant-demo",
    techStack: ["React", "Tailwind CSS", "Motion", "Lucide Icons"]
  },
  {
    id: "salon",
    title: "Salon Website",
    description: "Stylish, modern layouts that make appointments and service menus easy to browse.",
    features: ["Booking form", "Service gallery", "Contact section"],
    liveUrl: "https://glownailsalon.demo",
    githubUrl: "https://github.com/sitespawn/salon-demo",
    techStack: ["React", "Tailwind CSS", "Lucide Icons", "Framer Motion"]
  },
  {
    id: "gym",
    title: "Gym Website",
    description: "Strong branding, membership plans, trainer profiles, and class scheduling made clear.",
    features: ["Class schedule", "Membership CTA", "Testimonial section"],
    liveUrl: "https://apexgym.demo",
    githubUrl: "https://github.com/sitespawn/gym-demo",
    techStack: ["React", "Tailwind CSS", "Recharts", "Motion"]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Free Consultation",
    description: "We discuss your goals, audience, and the website features your business needs."
  },
  {
    number: "02",
    title: "Design & Planning",
    description: "I deliver polished wireframes and a plan that shows how the site will convert visitors."
  },
  {
    number: "03",
    title: "Development",
    description: "Fast, responsive, SEO-aware builds with clean code and a focus on excellent user experience."
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Your site goes live with ongoing support and optional maintenance packages available."
  }
];

export const WHY_CHOOSE_ME = [
  {
    title: "Affordable Pricing",
    description: "Transparent quotes for small businesses and startups with real value."
  },
  {
    title: "Mobile Responsive",
    description: "Every website is optimized for phones, tablets, and desktops from day one."
  },
  {
    title: "Fast Delivery",
    description: "I work efficiently so you can start connecting with customers sooner."
  },
  {
    title: "Modern Design",
    description: "Premium, user-friendly pages that reflect the quality of your business."
  },
  {
    title: "SEO Friendly",
    description: "Built with best practices that help your site rank for local searches."
  },
  {
    title: "Ongoing Support",
    description: "Maintenance, updates, and help after launch so your site stays current."
  }
];

export const INITIAL_TESTIMONIALS: Review[] = [
  {
    id: "t1",
    quote: "This website helped our café appear in searches and brought in more walk-in customers. Fantastic communication and fast delivery.",
    author: "Local Café Owner",
    role: "Café Owner",
    rating: 5,
    timestamp: "2026-05-10T12:00:00Z"
  },
  {
    id: "t2",
    quote: "The new site is clean, easy to update, and our customers love the booking feature. Highly recommended.",
    author: "Salon Manager",
    role: "Salon Manager",
    rating: 5,
    timestamp: "2026-06-01T12:00:00Z"
  },
  {
    id: "t3",
    quote: "Great experience from start to finish. The website looks premium and our gym now gets more leads every week.",
    author: "Gym Owner",
    role: "Gym Owner",
    rating: 5,
    timestamp: "2026-06-15T12:00:00Z"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "How much does a website cost?",
    answer: "Costs vary by scope, but I offer affordable packages that fit small budgets and deliver strong ROI. Standard packages range from ₹4,000 to ₹8,000 depending on features."
  },
  {
    question: "How long does it take?",
    answer: "Most websites are ready within 7 days depending on content ready, number of revisions required, and complexity of custom features."
  },
  {
    question: "Can you redesign my current website?",
    answer: "Yes. I can refresh your branding, improve usability, update old technology stacks, make your site faster, and fully mobile-responsive."
  },
  {
    question: "Will it work on mobile?",
    answer: "Absolutely. Every single site is built mobile-first, ensuring high resolution and fast response times across phones, tablets, laptops, and wide screens."
  },
  {
    question: "Do you provide support?",
    answer: "Yes. I provide 30 days of free launch support, maintenance subscriptions for security/backups, and quick turnarounds on future content updates."
  }
];
