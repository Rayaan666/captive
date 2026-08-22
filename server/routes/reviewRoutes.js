import { Router } from 'express';
import { env } from '../config/env.js';

const router = Router();

// In-memory cache variables
let cachedReviews = null;
let lastFetchTime = null;
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

router.get('/', async (req, res) => {
  // If the API key or Place ID is not configured, return a 404/501 error gracefully
  if (!env.GOOGLE_PLACES_API_KEY || !env.GOOGLE_PLACE_ID) {
    return res.status(501).json({ 
      success: false, 
      message: 'Google Places API is not configured. Falling back to local testimonials.' 
    });
  }

  // Check cache
  const now = Date.now();
  if (cachedReviews && lastFetchTime && (now - lastFetchTime < CACHE_DURATION_MS)) {
    return res.json({
      success: true,
      data: cachedReviews,
      cached: true
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${env.GOOGLE_PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${env.GOOGLE_PLACES_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Places API returned ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google API Error: ${data.status}`);
    }

    // Format the response securely (only extract what is needed)
    const formattedData = {
      businessName: data.result.name,
      overallRating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews: data.result.reviews
        ? data.result.reviews.filter(r => r.rating >= 4).map(review => ({
            id: review.time,
            name: review.author_name,
            image: review.profile_photo_url || null,
            rating: review.rating,
            review: review.text,
            time: review.time,
            source: 'Google Review'
          }))
        : []
    };

    // Update Cache
    cachedReviews = formattedData;
    lastFetchTime = now;

    return res.json({
      success: true,
      data: formattedData,
      cached: false
    });
  } catch (error) {
    console.error('Failed to fetch Google Reviews:', error.message);
    // Return a graceful error so the frontend knows to fallback
    return res.status(502).json({
      success: false,
      message: 'Failed to retrieve reviews from Google Places API'
    });
  }
});

export default router;
