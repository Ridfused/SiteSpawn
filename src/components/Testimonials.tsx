import { useState, useEffect, FormEvent } from 'react';
import { Star, MessageSquareCode, Plus, X, Check } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data';
import { Review } from '../types';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', role: '', quote: '', rating: 5 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sitespawn_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_TESTIMONIALS);
      }
    } else {
      setReviews(INITIAL_TESTIMONIALS);
      localStorage.setItem('sitespawn_reviews', JSON.stringify(INITIAL_TESTIMONIALS));
    }
  }, []);

  const handleWriteReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.role.trim() || !newReview.quote.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    const added: Review = {
      id: `review_${Date.now()}`,
      author: newReview.author.trim(),
      role: newReview.role.trim(),
      quote: newReview.quote.trim(),
      rating: newReview.rating,
      timestamp: new Date().toISOString()
    };

    const updated = [...reviews, added];
    setReviews(updated);
    localStorage.setItem('sitespawn_reviews', JSON.stringify(updated));
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setIsModalOpen(false);
      setNewReview({ author: '', role: '', quote: '', rating: 5 });
    }, 2500);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#FAF5EC] relative border-b border-black/5">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black/[0.005] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 text-left">
          <div className="space-y-3">
            <span className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-bold block">Testimonials</span>
            <h2 className="text-[#2A2421] text-3xl sm:text-4xl font-serif font-medium tracking-tight">
              Sample Layout – Replace with Real Client Reviews
            </h2>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black hover:bg-transparent text-white hover:text-black text-[10px] uppercase tracking-[0.15em] font-bold py-3 px-5 rounded-none border border-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Write a Review
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-[#F0EAE1] border border-black/5 hover:border-black/15 rounded-none p-8 transition-all duration-300 flex flex-col justify-between group relative shadow-none"
            >
              {/* Giant quote icon */}
              <MessageSquareCode className="absolute top-6 right-8 h-8 w-8 text-black/5 group-hover:text-black/10 transition-all" />

              <div className="space-y-4">
                {/* Visual rating stars */}
                <div className="flex gap-1 text-black">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-current shrink-0" />
                  ))}
                </div>

                <p className="text-neutral-700 text-xs italic leading-relaxed font-sans">
                  “{rev.quote}”
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/10 flex items-center gap-3">
                <div className="bg-black/5 w-9 h-9 rounded-none border border-black/10 flex items-center justify-center font-serif font-bold text-black text-xs select-none">
                  {rev.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <strong className="text-[#2A2421] text-sm font-semibold block">{rev.author}</strong>
                  <span className="text-neutral-500 text-[9px] uppercase tracking-[0.15em] font-bold block">{rev.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex justify-center items-center p-4 animate-fade-in">
          <div className="bg-[#FAF5EC] border border-black/10 rounded-none w-full max-w-md overflow-hidden shadow-2xl text-[#2A2421]">
            
            {/* Header */}
            <div className="bg-[#F0EAE1] border-b border-black/10 px-6 py-4 flex justify-between items-center">
              <h3 className="text-black font-serif font-medium text-base tracking-wide">Write Client Review</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-white hover:bg-neutral-100 border border-black/10 rounded-none text-neutral-600 hover:text-black transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body form */}
            <div className="p-6">
              {success ? (
                <div className="py-8 text-center space-y-3 flex flex-col items-center justify-center animate-fade-in">
                  <div className="bg-black/5 border border-black/10 w-12 h-12 rounded-none flex items-center justify-center">
                    <Check className="h-6 w-6 text-black" />
                  </div>
                  <h4 className="text-black font-serif font-medium text-base">Review Added!</h4>
                  <p className="text-xs text-neutral-500">Thank you for your valuable feedback. It's now live on the site.</p>
                </div>
              ) : (
                <form onSubmit={handleWriteReview} className="space-y-4">
                  {error && (
                    <div className="text-rose-600 text-xs bg-rose-50 border border-rose-100 p-3 rounded-none text-left">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={newReview.author}
                      onChange={e => setNewReview({ ...newReview, author: e.target.value })}
                      className="w-full bg-white border border-black/15 rounded-none p-2.5 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Business Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Coffee Shop Manager"
                      value={newReview.role}
                      onChange={e => setNewReview({ ...newReview, role: e.target.value })}
                      className="w-full bg-white border border-black/15 rounded-none p-2.5 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Star Rating</label>
                    <div className="flex gap-1.5 text-neutral-300">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star className={`h-6 w-6 fill-current ${
                            newReview.rating >= star ? 'text-black' : 'text-neutral-200'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500">Your Review *</label>
                    <textarea
                      placeholder="Share your experience working with SiteSpawn..."
                      value={newReview.quote}
                      onChange={e => setNewReview({ ...newReview, quote: e.target.value })}
                      className="w-full bg-white border border-black/15 rounded-none p-2.5 text-xs text-neutral-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
                      rows={4}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-transparent text-white hover:text-black border border-black font-bold py-2.5 text-[10px] uppercase tracking-[0.15em] transition-colors mt-2 cursor-pointer rounded-none"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
