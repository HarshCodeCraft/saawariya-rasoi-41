
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Star, MessageSquare, ThumbsUp, Filter, Search } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Arjun Sharma",
    date: "October 10, 2023",
    rating: 5,
    comment: "The butter chicken is simply divine - rich, creamy, and packed with flavor. Their delivery through Zomato is always on time and the food arrives hot!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    helpful: 24,
    source: "Zomato"
  },
  {
    id: 2,
    name: "Priya Patel",
    date: "September 28, 2023",
    rating: 4,
    comment: "I love their vegetarian options. The paneer tikka masala has the perfect balance of spices. Will definitely order again!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    helpful: 18,
    source: "Google"
  },
  {
    id: 3,
    name: "Rahul Verma",
    date: "September 15, 2023",
    rating: 5,
    comment: "Best biryani in town! The aroma alone is worth ordering for. The takeaway packaging keeps the food fresh for hours.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    helpful: 31,
    source: "Website"
  },
  {
    id: 4,
    name: "Meera Iyer",
    date: "September 8, 2023",
    rating: 5,
    comment: "Their naan bread is soft and perfectly cooked. I've been ordering from Saawariya Rasoi for family gatherings for years now!",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    helpful: 15,
    source: "Zomato"
  },
  {
    id: 5,
    name: "Vikram Singh",
    date: "August 30, 2023",
    rating: 4,
    comment: "The chicken tikka is exceptional. Perfectly grilled and flavorful. The only reason I'm not giving 5 stars is because the delivery took a bit longer than expected.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    helpful: 9,
    source: "Google"
  },
  {
    id: 6,
    name: "Ananya Das",
    date: "August 22, 2023",
    rating: 5,
    comment: "Outstanding service and food quality! The dal makhani is creamy and rich, just the way it should be. Highly recommend for anyone craving authentic North Indian food.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    helpful: 27,
    source: "Website"
  },
  {
    id: 7,
    name: "Karthik Reddy",
    date: "August 15, 2023",
    rating: 3,
    comment: "The food is good but portion sizes could be better for the price. Flavors are authentic though.",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    helpful: 5,
    source: "Zomato"
  },
  {
    id: 8,
    name: "Shreya Gupta",
    date: "August 7, 2023",
    rating: 5,
    comment: "Their gulab jamun is to die for! Perfectly sweet and soft. I always order extra to enjoy the next day.",
    image: "https://randomuser.me/api/portraits/women/57.jpg",
    helpful: 12,
    source: "Google"
  }
];

const Reviews = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Count ratings
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };
  
  // Rating distribution percentages
  const totalReviews = reviews.length;
  const ratingPercentages = {
    5: (ratingCounts[5] / totalReviews) * 100,
    4: (ratingCounts[4] / totalReviews) * 100,
    3: (ratingCounts[3] / totalReviews) * 100,
    2: (ratingCounts[2] / totalReviews) * 100,
    1: (ratingCounts[1] / totalReviews) * 100,
  };
  
  // Get unique sources
  const sources = Array.from(new Set(reviews.map(review => review.source)));
  
  // Filter reviews based on selections
  const filteredReviews = reviews.filter(review => {
    // Rating filter
    if (selectedRating !== null && review.rating !== selectedRating) {
      return false;
    }
    
    // Source filter
    if (selectedSource !== null && review.source !== selectedSource) {
      return false;
    }
    
    // Search query
    if (searchQuery && !review.comment.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const resetFilters = () => {
    setSelectedRating(null);
    setSelectedSource(null);
    setSearchQuery("");
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 smooth-appear">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              Customer Feedback
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-brand">
              Customer <span className="brand-text-gradient">Reviews</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about their dining experiences with us, both through delivery and takeaway.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Summary */}
            <div className="lg:col-span-1 smooth-appear" style={{ animationDelay: '0.2s' }}>
              <div className="glass-morphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Review Summary</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        className={`flex items-center gap-1 ${selectedRating === rating ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                      >
                        <span>{rating}</span>
                        <Star size={14} className={selectedRating === rating ? 'fill-primary text-primary' : ''} />
                      </button>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${ratingPercentages[rating as keyof typeof ratingPercentages]}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {ratingCounts[rating as keyof typeof ratingCounts]}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Filter by source</h3>
                  <div className="flex flex-wrap gap-2">
                    {sources.map(source => (
                      <button
                        key={source}
                        onClick={() => setSelectedSource(selectedSource === source ? null : source)}
                        className={`px-3 py-1 rounded-full text-xs ${
                          selectedSource === source
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                {(selectedRating !== null || selectedSource !== null || searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
            
            {/* Reviews */}
            <div className="lg:col-span-2 smooth-appear" style={{ animationDelay: '0.3s' }}>
              <div className="space-y-6">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map(review => (
                    <div key={review.id} className="glass-morphism rounded-xl p-6">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src={review.image} 
                              alt={review.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{review.name}</h3>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">via {review.source}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{review.comment}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp size={14} />
                          <span>{review.helpful} found this helpful</span>
                        </div>
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <MessageSquare size={14} />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass-morphism rounded-xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-muted">
                      <Search size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any reviews matching your current filters.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
