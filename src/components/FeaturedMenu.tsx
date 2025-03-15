
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { useOrderMode } from '@/contexts/OrderModeContext';

const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with butter and mild spices.",
    price: "₹320",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: true,
    category: "Main Course"
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese chunks, grilled to perfection with bell peppers and onions.",
    price: "₹280",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: true,
    category: "Appetizers"
  },
  {
    id: 3,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    price: "₹250",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Rice"
  },
  {
    id: 4,
    name: "Garlic Naan",
    description: "Soft, leavened bread topped with garlic and butter, baked in tandoor.",
    price: "₹60",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Breads"
  }
];

const FeaturedMenu = () => {
  const { mode } = useOrderMode();
  
  return (
    <section className="py-16 bg-secondary/30 px-6 smooth-appear" style={{ animationDelay: '0.4s' }}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div className="space-y-2 mb-6 md:mb-0">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              Our Specialties
            </span>
            <h2 className="text-3xl font-semibold">Featured Menu</h2>
            <p className="text-muted-foreground max-w-lg">
              A selection of our most loved dishes, prepared with authentic recipes and premium ingredients.
            </p>
          </div>
          <Link 
            to="/menu" 
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View Full Menu
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row gap-4 glass-morphism rounded-xl overflow-hidden hover-lift"
            >
              <div className="sm:w-1/3 aspect-[4/3] relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.popular && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                    <Flame size={12} />
                    Popular
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-3 px-4 sm:hidden">
                  <p className="text-white font-medium">{item.name}</p>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="hidden sm:block">
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                    <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold">{item.price}</p>
                    {mode === 'takeaway' && (
                      <p className="text-xs text-primary font-medium">-10% on takeaway</p>
                    )}
                  </div>
                  
                  {mode === 'delivery' ? (
                    <a 
                      href="https://www.zomato.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
                    >
                      Order
                    </a>
                  ) : (
                    <a 
                      href="tel:+911234567890"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
                    >
                      Order
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
