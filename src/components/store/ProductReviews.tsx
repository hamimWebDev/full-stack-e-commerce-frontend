import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Flag, User } from 'lucide-react';
import Button from '../ui/Button';

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'John D.',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 5,
    title: 'Excellent quality and fast shipping',
    comment: 'I am extremely satisfied with this purchase. The quality exceeds my expectations and the shipping was surprisingly fast. Would definitely recommend to others!',
    date: '2024-02-15',
    helpful: 12,
    verified: true
  },
  {
    id: '2',
    user: {
      name: 'Sarah M.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 4,
    title: 'Great product with minor issues',
    comment: 'Overall, I am happy with the product. The only small issue is that the color is slightly different from what\'s shown in the pictures. But the quality is good and it serves its purpose well.',
    date: '2024-02-10',
    helpful: 8,
    verified: true
  },
  {
    id: '3',
    user: {
      name: 'Mike R.',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 5,
    title: 'Perfect for my needs',
    comment: 'This product is exactly what I was looking for. The features are well thought out and the build quality is excellent. Very happy with my purchase!',
    date: '2024-02-05',
    helpful: 15,
    verified: true
  }
];

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [reviews] = useState<Review[]>(mockReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the review to a backend
    console.log('New review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, title: '', comment: '' });
  };
  
  const handleHelpful = (reviewId: string) => {
    // In a real app, this would update the helpful count in the backend
    console.log('Marked as helpful:', reviewId);
  };
  
  const handleReport = (reviewId: string) => {
    // In a real app, this would submit a report to the backend
    console.log('Reported review:', reviewId);
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Overall Rating */}
        <div className="md:col-span-1">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                {Array(5).fill(0).map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className={`${
                      index < Math.floor(averageRating) 
                        ? 'text-accent-500 fill-current' 
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-neutral-600">
                Based on {reviews.length} reviews
              </div>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingCounts[rating] || 0;
                const percentage = (count / reviews.length) * 100;
                
                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-24">
                      <span className="text-sm mr-2">{rating}</span>
                      <Star size={14} className="text-accent-500 fill-current" />
                    </div>
                    <div className="flex-grow">
                      <div className="h-2 bg-neutral-200 rounded-full">
                        <motion.div 
                          className="h-2 bg-accent-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-neutral-600">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6">
              <Button 
                fullWidth
                onClick={() => setShowReviewForm(true)}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="md:col-span-2">
          {showReviewForm ? (
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Rating
                  </label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                        className="p-1"
                      >
                        <Star
                          size={24}
                          className={`${
                            rating <= newReview.rating
                              ? 'text-accent-500 fill-current'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-neutral-700 mb-1">
                    Review
                  </label>
                  <textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit">
                    Submit Review
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div 
                  key={review.id}
                  className="bg-white p-6 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {review.user.avatar ? (
                        <img 
                          src={review.user.avatar} 
                          alt={review.user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                          <User size={20} className="text-neutral-500" />
                        </div>
                      )}
                      <div className="ml-3">
                        <div className="font-medium">{review.user.name}</div>
                        <div className="text-sm text-neutral-500">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {review.verified && (
                      <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex mb-2">
                      {Array(5).fill(0).map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className={`${
                            index < review.rating 
                              ? 'text-accent-500 fill-current' 
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">{review.title}</h4>
                  </div>
                  
                  <p className="text-neutral-600 mb-4">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center text-neutral-600 hover:text-neutral-900"
                      >
                        <ThumbsUp size={16} className="mr-1" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      
                      <button 
                        onClick={() => handleReport(review.id)}
                        className="flex items-center text-neutral-600 hover:text-neutral-900"
                      >
                        <Flag size={16} className="mr-1" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;