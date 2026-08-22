import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fallbackTestimonials } from '../data/testimonialsData';

const ReviewCard = ({ review, isGoogle }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Trim long text
  const MAX_LENGTH = 150;
  const isLong = review.review && review.review.length > MAX_LENGTH;
  const displayText = expanded || !isLong 
    ? review.review 
    : `${review.review.substring(0, MAX_LENGTH)}...`;

  return (
    <div className="glass p-8 rounded-3xl border border-white/10 w-full shrink-0 snap-center flex flex-col justify-between hover:border-brand-orange/30 hover:bg-white/[0.03] transition-all duration-500 shadow-xl group h-full">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < review.rating ? 'text-brand-orange fill-brand-orange' : 'text-gray-600'}`} 
              />
            ))}
          </div>
          <Quote className="w-8 h-8 text-white/5 group-hover:text-brand-orange/10 transition-colors duration-500" />
        </div>
        
        <p className="text-gray-300 font-medium leading-relaxed mb-4 text-sm md:text-base relative z-10 transition-all">
          "{displayText}"
          {isLong && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="ml-2 text-brand-orange font-bold text-xs uppercase tracking-wider hover:text-white transition-colors"
            >
              {expanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>
      </div>
      
      <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
        {review.image ? (
          <img src={review.image} alt={`${review.name} profile`} loading="lazy" className="w-12 h-12 rounded-full object-cover border border-brand-orange/20" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 text-brand-orange font-bold text-lg">
            {review.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm tracking-wide truncate">{review.name}</h4>
          {review.role && review.company && (
            <p className="text-gray-400 text-xs truncate">{review.role}, <span className="text-brand-orange/80 font-medium">{review.company}</span></p>
          )}
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-0.5">{review.source || 'Client Testimonial'}</p>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="glass p-8 rounded-3xl border border-white/5 w-full shrink-0 snap-center flex flex-col justify-between h-full animate-pulse">
    <div>
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-white/5"></div>)}
      </div>
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
        <div className="h-4 bg-white/10 rounded w-4/6"></div>
      </div>
    </div>
    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
      <div className="w-12 h-12 rounded-full bg-white/5"></div>
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
        <div className="h-2 bg-white/5 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

const TestimonialsReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const result = await response.json();
        
        if (result.success && result.data?.reviews?.length > 0) {
          setData({
            isGoogle: true,
            businessName: result.data.businessName,
            overallRating: result.data.overallRating,
            totalReviews: result.data.totalReviews,
            reviews: result.data.reviews
          });
        } else {
          // Fallback to manual testimonials
          setData({
            isGoogle: false,
            overallRating: 5.0,
            totalReviews: fallbackTestimonials.length,
            reviews: fallbackTestimonials
          });
        }
      } catch (error) {
        console.error('Failed to load reviews:', error);
        // Silent fallback
        setData({
          isGoogle: false,
          overallRating: 5.0,
          totalReviews: fallbackTestimonials.length,
          reviews: fallbackTestimonials
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth > 768 ? carouselRef.current.clientWidth / 2 : carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const reviewsToDisplay = loading ? [1, 2, 3] : (data?.reviews || []);

  return (
    <section className="py-24 relative z-10 overflow-hidden border-t border-white/5 bg-brand-dark/50">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[30vw] h-[30vw] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Summary & Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange mb-3 inline-block">
              Client Experiences
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-6">
              Trusted By <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Those Who</span> <br />
              Experience <br />
              The Difference
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed mb-8 max-w-sm">
              Discover what clients say about working with Captive Events across corporate events, exhibitions, brand activations, and bespoke event experiences.
            </p>

            {/* Rating Summary (Google or Manual) */}
            {!loading && data && (
              <div className="flex items-center gap-6 p-6 rounded-2xl glass border border-white/5 shadow-lg mb-8">
                <div className="text-5xl font-display font-black text-white">{data.overallRating}</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-orange fill-brand-orange" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Based on {data.totalReviews} {data.isGoogle ? 'Google Reviews' : 'Verified Reviews'}
                  </div>
                </div>
              </div>
            )}

            {/* Carousel Controls */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scroll('left')}
                aria-label="Previous reviews"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-colors group focus-visible:ring-2 focus-visible:ring-brand-orange outline-none"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => scroll('right')}
                aria-label="Next reviews"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-colors group focus-visible:ring-2 focus-visible:ring-brand-orange outline-none"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            
            {!loading && data?.isGoogle && (
              <a 
                href={`https://search.google.com/local/reviews?placeid=${process.env.GOOGLE_PLACE_ID || ''}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 text-xs text-brand-orange font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
              >
                View All Reviews
              </a>
            )}
          </motion.div>

          {/* Right Side: Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 w-full overflow-hidden"
          >
            {/* Mask gradient for smooth edges */}
            <div className="relative w-full mask-gradient-horizontal -mx-4 px-4 sm:mx-0 sm:px-0">
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-8 pt-4 items-stretch"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {loading ? (
                  reviewsToDisplay.map((_, i) => (
                    <div key={i} className="w-[85vw] sm:w-[45%] lg:w-[45%] xl:w-[45%] shrink-0 snap-center">
                      <SkeletonCard />
                    </div>
                  ))
                ) : (
                  reviewsToDisplay.map((review, i) => (
                    <div key={i} className="w-[85vw] sm:w-[45%] lg:w-[45%] xl:w-[45%] shrink-0 snap-center">
                      <ReviewCard review={review} isGoogle={data.isGoogle} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsReviews;
