
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrderMode } from '@/contexts/OrderModeContext';

const Hero = () => {
  const { mode } = useOrderMode();
  
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-72 h-72 bg-restaurant-100 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 space-y-6 smooth-appear">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              {mode === 'delivery' ? 'Delivered via Zomato' : 'Fresh Takeaway in Kanpur'}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Authentic Indian Cuisine at{' '}
              <span className="text-primary">Saawariya Rasoi</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Experience the rich flavors and aromatic spices of traditional Indian cuisine from Kanpur, 
              {mode === 'delivery' 
                ? ' delivered fresh to your doorstep through Zomato.' 
                : ' available for convenient takeaway.'}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              {mode === 'delivery' ? (
                <a 
                  href="https://link.zomato.com/xqzv/rshare?id=75078797305635b1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-105 hover-lift"
                >
                  Order via Zomato
                  <ArrowRight size={18} />
                </a>
              ) : (
                <a 
                  href="tel:+911234567890"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-105 hover-lift"
                >
                  Call to Order
                  <ArrowRight size={18} />
                </a>
              )}
              
              <Link 
                to="/menu" 
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80"
              >
                Explore Menu
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">4.8</span> from over 1,200 reviews
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative smooth-appear" style={{ animationDelay: '0.2s' }}>
            <div className="aspect-square md:aspect-[4/5] relative z-10">
              <div className="absolute inset-0 rounded-2xl overflow-hidden neo-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Saawariya Rasoi signature dish" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
