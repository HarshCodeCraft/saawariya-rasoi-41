
import React from 'react';
import Layout from '@/components/Layout';
import { Clock, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "The Secret Behind Our Butter Chicken Recipe",
    excerpt: "Discover the traditional techniques and special ingredients that make our Butter Chicken stand out from the rest.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "October 15, 2023",
    author: "Chef Rahul Sharma",
    readTime: "5 min read",
    category: "Recipes"
  },
  {
    id: 2,
    title: "Understanding the Health Benefits of Indian Spices",
    excerpt: "From turmeric to cardamom, learn how the spices we use daily in our kitchen can boost your immunity and overall health.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "September 28, 2023",
    author: "Dr. Anita Patel",
    readTime: "7 min read",
    category: "Health"
  },
  {
    id: 3,
    title: "The Art of Making Perfect Biryani at Home",
    excerpt: "Follow our step-by-step guide to create restaurant-quality biryani in your own kitchen with simple techniques.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "September 10, 2023",
    author: "Chef Rahul Sharma",
    readTime: "8 min read",
    category: "Recipes"
  },
  {
    id: 4,
    title: "Purwanchal Cuisine: A Cultural Heritage",
    excerpt: "Explore the rich culinary heritage of Purwanchal region and how it influences our restaurant's authentic flavors.",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "August 22, 2023",
    author: "Meera Iyer",
    readTime: "6 min read",
    category: "Culture"
  },
  {
    id: 5,
    title: "Vegetarian Delights: Beyond Paneer",
    excerpt: "Discover the amazing variety of vegetarian dishes in Indian cuisine that go beyond the popular paneer options.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "August 5, 2023",
    author: "Priya Patel",
    readTime: "4 min read",
    category: "Food"
  },
  {
    id: 6,
    title: "Pairing Indian Food with Wines and Beverages",
    excerpt: "Learn about the best beverage pairings to complement the complex flavors of various Indian dishes.",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "July 29, 2023",
    author: "Arjun Kapoor",
    readTime: "5 min read",
    category: "Beverages"
  }
];

const Blog = () => {
  // Featured post is the first one
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);
  
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 smooth-appear">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              Food Facts & Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-brand">
              Our <span className="brand-text-gradient">Blog</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the fascinating world of Indian cuisine, cooking techniques, and the stories behind our favorite dishes.
            </p>
          </div>
          
          {/* Featured Post */}
          <div className="mb-16 smooth-appear" style={{ animationDelay: '0.2s' }}>
            <div className="glass-morphism rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-60 md:h-auto relative">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                    Featured
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{featuredPost.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 font-brand">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{featuredPost.author}</p>
                        <p className="text-xs text-muted-foreground">{featuredPost.date}</p>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/blog/${featuredPost.id}`} 
                      className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                    >
                      Read Full Article
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 smooth-appear" style={{ animationDelay: '0.3s' }}>
            {regularPosts.map((post) => (
              <div key={post.id} className="glass-morphism rounded-xl overflow-hidden hover-lift">
                <div className="h-48 relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User size={12} />
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="mt-4 flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                  >
                    Read More
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
