
import React from 'react';
import { ArrowRight, Phone, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TakeawayContent = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
          Takeaway Mode
        </span>
        <h2 className="text-3xl md:text-4xl font-medium leading-tight">
          Skip the wait and pick up your favorites
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Place your order ahead of time and pick it up fresh and hot at your convenience.
        </p>
      </section>

      {/* Takeaway Options */}
      <section className="glass-morphism rounded-2xl p-6 md:p-10 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-restaurant-50 text-restaurant-700 rounded-full text-xs font-medium">
              <Clock size={14} />
              Ready in 20 minutes
            </span>
            <h3 className="text-2xl md:text-3xl font-medium">Call ahead for faster service</h3>
            <p className="text-muted-foreground">
              Skip the wait by calling us directly. We'll have your order ready for pickup at your preferred time.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+911234567890" 
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-105 hover-lift"
              >
                <Phone size={16} />
                Call to Order
              </a>
              <Link 
                to="/menu" 
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80"
              >
                View Menu
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden neo-shadow">
              <img 
                src="https://images.unsplash.com/photo-1625398407796-82650a8c9dd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Saawariya Rasoi takeaway" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-xl p-3">
              <div>
                <p className="text-xs text-muted-foreground">Preparation Time</p>
                <p className="font-medium">15-20 mins</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <p className="text-xs text-muted-foreground">Pickup Hours</p>
                <p className="font-medium">11AM - 10PM</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <p className="text-xs text-muted-foreground">Discount</p>
                <p className="font-medium">10% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Orders - Updated to highlight online ordering */}
      <section className="space-y-6">
        <h3 className="text-xl font-medium">Bulk Order Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-morphism rounded-xl overflow-hidden hover-lift flex flex-col">
            <div className="aspect-[3/2] relative">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Corporate catering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-xs text-foreground rounded-full text-xs font-medium">
                  Corporate
                </span>
              </div>
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-medium text-lg mb-2">Office & Corporate Catering</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Perfect for meetings, conferences, and office celebrations. We offer customized menu options for groups of 10 or more.
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  24-hour advance booking recommended
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Customizable menu options
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Serving equipment available on request
                </li>
              </ul>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <Link 
                to="/menu" 
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 text-sm"
              >
                <Users size={14} />
                Place Bulk Order Online
              </Link>
            </div>
          </div>
          
          <div className="glass-morphism rounded-xl overflow-hidden hover-lift flex flex-col">
            <div className="aspect-[3/2] relative">
              <img 
                src="https://images.unsplash.com/photo-1529543544282-cdab85927b0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Party catering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-xs text-foreground rounded-full text-xs font-medium">
                  Celebrations
                </span>
              </div>
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-medium text-lg mb-2">Parties & Special Events</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Make your special occasions memorable with our party platters and family-style servings, perfect for gatherings of all sizes.
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  48-hour advance booking preferred
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Special dietary accommodations available
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Party platters and combo meals
                </li>
              </ul>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <Link 
                  to="/menu" 
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 text-sm"
                >
                  Order Online
                </Link>
                <a 
                  href="tel:+911234567890" 
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80 text-sm"
                >
                  <Phone size={14} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaway Specials */}
      <section className="space-y-6">
        <h3 className="text-xl font-medium">Takeaway Specials</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "10% OFF on all takeaway orders",
              description: "Save when you pick up your order directly from us",
              image: "https://images.unsplash.com/photo-1541533848871-02096c258e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            },
            {
              title: "Loyalty Program",
              description: "Earn points on every takeaway order for future discounts",
              image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            },
            {
              title: "Family Combo Meals",
              description: "Special pricing on family-sized portions",
              image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            }
          ].map((offer, index) => (
            <div 
              key={index} 
              className="rounded-xl overflow-hidden hover-lift neo-shadow"
            >
              <div className="aspect-video relative">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 bg-white">
                <h4 className="font-medium mb-2">{offer.title}</h4>
                <p className="text-sm text-muted-foreground">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TakeawayContent;
