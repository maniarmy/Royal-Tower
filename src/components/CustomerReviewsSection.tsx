import { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface CustomerReview {
  id: string;
  reviewerName: string;
  initials: string;
  stayCategory: string;
  rating: number;
  comment: string;
  accentColor: string;
  featured?: boolean;
}

const STORAGE_KEY = 'royal_tower_mohali_custom_reviews_v2';

const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-jarnail',
    reviewerName: 'Jarnail Khangura',
    initials: 'JK',
    stayCategory: 'Family Room for Rent',
    rating: 5,
    comment:
      'Very neat and clean rooms with a peaceful atmosphere for families. Convenient location on Landran Road in Sector 78, Sohana.',
    accentColor: 'bg-[#1E4D9E]',
  },
  {
    id: 'rev-mani',
    reviewerName: 'Mani',
    initials: 'M',
    stayCategory: 'Private Room for Rent',
    rating: 5,
    comment:
      'Affordable rental rooms with proper cleanliness and cooperative management. Feels safe, comfortable, and well-maintained every day.',
    accentColor: 'bg-[#C89B3C]',
    featured: true,
  },
  {
    id: 'rev-jasveer',
    reviewerName: 'Jasveer Singh',
    initials: 'JS',
    stayCategory: 'Long-Term Resident',
    rating: 5,
    comment:
      'Great rooms for rent in Mohali with clean washrooms, good ventilation, and easy connectivity to nearby offices and markets.',
    accentColor: 'bg-[#0F295C]',
  },
  {
    id: 'rev-yuvi',
    reviewerName: 'Yuvi',
    initials: 'Y',
    stayCategory: 'Short-Term Stay',
    rating: 5,
    comment:
      'Clean bedding, quiet surroundings, and friendly support from check-in onwards. Best budget-friendly stay option around Sohana.',
    accentColor: 'bg-[#173B82]',
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function CustomerReviewsSection() {
  const [extraReviews, setExtraReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CustomerReview[]) : [];
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [stayCategory, setStayCategory] = useState('Family Room for Rent');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(extraReviews));
    } catch {
      // Ignore storage quota issues
    }
  }, [extraReviews]);

  const allReviews = [...DEFAULT_REVIEWS, ...extraReviews];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = reviewerName.trim();
    const trimmedComment = comment.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your name to submit your review.');
      return;
    }
    if (trimmedComment.length < 12) {
      setFormError('Please share a brief note about your stay experience.');
      return;
    }

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      reviewerName: trimmedName,
      initials: getInitials(trimmedName),
      stayCategory,
      rating,
      comment: trimmedComment,
      accentColor: 'bg-[#1E4D9E]',
    };

    setExtraReviews((prev) => [...prev, newReview]);
    setReviewerName('');
    setComment('');
    setRating(5);
    setFormError('');
    setShowForm(false);
    setJustSubmitted(true);
  };

  return (
    <section
      id="reviews"
      className="py-14 sm:py-16 md:py-24 bg-[#F8FAFC] border-t border-slate-200/80 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Centered Header Matching Reference Style */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1B3A] tracking-tight">
            Customer Reviews
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#0F295C] via-[#C89B3C] to-[#1E4D9E]" />
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            Hear what residents and families say about staying at Royal Tower Mohali in Sector 78, Sohana, Landran Road.
          </p>
        </div>

        {/* 4-Card Tilted Layer & Overlapping Avatar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-12 sm:gap-y-14 pt-6 pb-4">
          {allReviews.map((review, index) => (
            <div key={review.id} className="relative pt-8 pb-4">
              {/* Tilted Colored Backing Layer */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-2 sm:inset-x-1 top-6 bottom-2 rounded-2xl ${review.accentColor} ${
                  index % 2 === 0 ? '-rotate-2 sm:-rotate-3' : 'rotate-2 sm:rotate-3'
                } opacity-90 transition-transform duration-300`}
              />

              {/* Crisp White Foreground Card */}
              <article className="relative h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm px-5 sm:px-6 pt-14 pb-8 text-center flex flex-col justify-between">
                {/* Overlapping Circular Avatar Badge */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                  <div
                    className={`w-[72px] h-[72px] rounded-full ${review.accentColor} text-white border-4 border-white shadow-md flex items-center justify-center font-serif text-xl font-bold tracking-tight`}
                  >
                    {review.initials}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0B1B3A]">
                    {review.reviewerName}
                  </h3>
                  <p className="mt-0.5 text-xs italic text-slate-500">
                    {review.stayCategory}
                  </p>

                  <div
                    className="mt-3 flex items-center justify-center gap-1"
                    aria-label={`Rated ${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < review.rating
                            ? 'fill-[#C89B3C] text-[#C89B3C]'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                {/* Overlapping Bottom Gold Star Badge on Featured Card */}
                {review.featured && (
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center"
                  >
                    <Star className="w-5 h-5 fill-[#C89B3C] text-[#C89B3C]" />
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>

        {/* Review Action Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setShowForm((prev) => !prev);
              setJustSubmitted(false);
            }}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F295C] text-white text-sm font-semibold rounded-lg hover:bg-[#173B82] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            {showForm ? 'Close Review Form' : 'Write a Review'}
          </button>

          <a
            href={SITE_CONFIG.googleMapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-[#0B1B3A] text-sm font-medium rounded-lg hover:border-[#0F295C] transition-colors whitespace-nowrap shrink-0"
          >
            View on Google Reviews
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {justSubmitted && (
          <div className="mt-6 max-w-xl mx-auto p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 text-sm text-[#0B1B3A]">
            <CheckCircle2 className="w-5 h-5 text-[#0F295C] shrink-0" />
            <span>Thank you for submitting your review for Royal Tower Mohali.</span>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 mx-auto p-6 md:p-8 bg-white border border-slate-200 rounded-2xl max-w-2xl shadow-sm"
          >
            <h3 className="font-serif text-xl font-semibold text-[#0B1B3A]">
              Share Your Experience
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Add your review for future guests looking for rooms for rent in Mohali.
            </p>

            {formError && (
              <p className="mt-4 text-sm text-red-700 font-medium" role="alert">
                {formError}
              </p>
            )}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="customer-review-name"
                  className="block text-sm font-medium text-[#0B1B3A] mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="customer-review-name"
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-[#0B1B3A] focus:outline-none focus:ring-2 focus:ring-[#0F295C]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="customer-review-category"
                  className="block text-sm font-medium text-[#0B1B3A] mb-1.5"
                >
                  Stay Type
                </label>
                <select
                  id="customer-review-category"
                  value={stayCategory}
                  onChange={(e) => setStayCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-[#0B1B3A] focus:outline-none focus:ring-2 focus:ring-[#0F295C]"
                >
                  <option value="Family Room for Rent">Family Room for Rent</option>
                  <option value="Couple Room for Rent">Couple Room for Rent</option>
                  <option value="Girls Room for Rent">Girls Room for Rent</option>
                  <option value="Private Room for Rent">Private Room for Rent</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-sm font-medium text-[#0B1B3A] mb-1.5">
                Rating
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    aria-label={`Rate ${starValue} out of 5 stars`}
                    className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        starValue <= rating
                          ? 'fill-[#C89B3C] text-[#C89B3C]'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-600 tabular-nums ml-2">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="customer-review-comment"
                className="block text-sm font-medium text-[#0B1B3A] mb-1.5"
              >
                Your Review
              </label>
              <textarea
                id="customer-review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write about the room cleanliness, location, and stay comfort..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-[#0B1B3A] focus:outline-none focus:ring-2 focus:ring-[#0F295C]"
                required
              />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 bg-[#0F295C] text-white text-sm font-semibold rounded-lg hover:bg-[#173B82] transition-colors cursor-pointer"
              >
                Publish Review
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="min-h-[44px] px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-[#0B1B3A] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
