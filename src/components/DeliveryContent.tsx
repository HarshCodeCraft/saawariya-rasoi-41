
import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliveryContent = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
          Delivery Mode
        </span>
        <h2 className="text-3xl md:text-4xl font-medium leading-tight">
          Enjoy our cuisine from the comfort of your home
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          We've partnered with Zomato to bring our authentic flavors directly to your doorstep.
        </p>
      </section>

      {/* Zomato Integration Section */}
      <section className="glass-morphism rounded-2xl p-6 md:p-10 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-restaurant-50 text-restaurant-700 rounded-full text-xs font-medium">
              <img src="https://b.zmtcdn.com/images/logo/zomato_logo_2017.png" alt="Zomato" className="h-4" />
              Exclusive Partner
            </span>
            <h3 className="text-2xl md:text-3xl font-medium">Order via Zomato for exclusive deals</h3>
            <p className="text-muted-foreground">
              Enjoy special discounts, faster delivery, and a seamless ordering experience through our official Zomato page.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.zomato.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-105 hover-lift"
              >
                Order Now
                <ExternalLink size={16} />
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
                src="https://images.unsplash.com/photo-1633945274405-b8c428768051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Saawariya Rasoi food delivery" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-xl p-3">
              <div>
                <p className="text-xs text-muted-foreground">Delivery Time</p>
                <p className="font-medium">30-45 mins</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <p className="text-xs text-muted-foreground">Delivery Fee</p>
                <p className="font-medium">From ₹20</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <p className="text-xs text-muted-foreground">Min Order</p>
                <p className="font-medium">₹150</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="space-y-6">
        <h3 className="text-xl font-medium">Zomato Exclusive Offers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "20% OFF on first order",
              description: "Use code FIRST20 when ordering through Zomato",
              image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            },
            {
              title: "Free delivery on orders above ₹499",
              description: "No code needed, just order through Zomato",
              image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            },
            {
              title: "Buy 1 Get 1 on weekday lunches",
              description: "Valid Monday to Friday, 12PM to 3PM",
              image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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

      {/* Delivery Areas */}
      <section className="glass-morphism rounded-2xl p-6 md:p-10 space-y-6">
        <h3 className="text-xl font-medium">Delivery Areas</h3>
        <p className="text-muted-foreground">
          We currently deliver to the following areas through Zomato:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Andheri East", "Andheri West", "Bandra East", "Bandra West",
            "Juhu", "Santacruz", "Vile Parle", "Powai"
          ].map((area, index) => (
            <div 
              key={index}
              className="px-4 py-3 bg-white rounded-lg text-center text-sm neo-shadow"
            >
              {area}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          For areas not listed, please contact us for special delivery arrangements.
        </p>
      </section>
    </div>
  );
};

export default DeliveryContent;
