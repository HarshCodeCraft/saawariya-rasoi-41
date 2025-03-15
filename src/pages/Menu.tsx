
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Flame, Filter, X } from 'lucide-react';
import LocationSelector from '@/components/LocationSelector';

// Menu categories
const categories = [
  "All",
  "Starters",
  "Main Course",
  "Breads",
  "Rice & Biryani",
  "Sides",
  "Desserts",
  "Beverages"
];

// Menu items
const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with butter and mild spices.",
    price: "₹320",
    takeawayPrice: "₹290",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: true,
    category: "Main Course",
    veg: false
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese chunks, grilled to perfection with bell peppers and onions.",
    price: "₹280",
    takeawayPrice: "₹250",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: true,
    category: "Starters",
    veg: true
  },
  {
    id: 3,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    price: "₹250",
    takeawayPrice: "₹225",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Rice & Biryani",
    veg: true
  },
  {
    id: 4,
    name: "Garlic Naan",
    description: "Soft, leavened bread topped with garlic and butter, baked in tandoor.",
    price: "₹60",
    takeawayPrice: "₹55",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Breads",
    veg: true
  },
  {
    id: 5,
    name: "Chicken Tikka",
    description: "Boneless chicken pieces marinated in spices and yogurt, grilled in a tandoor.",
    price: "₹300",
    takeawayPrice: "₹270",
    image: "https://images.unsplash.com/photo-1535239306866-0b2898eec4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: true,
    category: "Starters",
    veg: false
  },
  {
    id: 6,
    name: "Dal Makhani",
    description: "Black lentils and kidney beans slow-cooked with cream, butter, and spices.",
    price: "₹220",
    takeawayPrice: "₹200",
    image: "https://images.unsplash.com/photo-1631292784640-738e0d16e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Main Course",
    veg: true
  },
  {
    id: 7,
    name: "Gulab Jamun",
    description: "Soft, spongy milk-solid balls soaked in rose-flavored sugar syrup.",
    price: "₹120",
    takeawayPrice: "₹110",
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Desserts",
    veg: true
  },
  {
    id: 8,
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink blended with fresh mango and a hint of cardamom.",
    price: "₹100",
    takeawayPrice: "₹90",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Beverages",
    veg: true
  },
  {
    id: 9,
    name: "Chicken Biryani",
    description: "Fragrant basmati rice layered with marinated chicken, fried onions, and aromatic spices.",
    price: "₹330",
    takeawayPrice: "₹300",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: true,
    category: "Rice & Biryani",
    veg: false
  },
  {
    id: 10,
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach gravy flavored with spices.",
    price: "₹260",
    takeawayPrice: "₹235",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    popular: false,
    category: "Main Course",
    veg: true
  }
];

const Menu = () => {
  const { mode } = useOrderMode();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  
  // Filter menu items based on selected filters
  const filteredItems = menuItems.filter(item => {
    // Category filter
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }
    
    // Veg-only filter
    if (showVegOnly && !item.veg) {
      return false;
    }
    
    // Popular-only filter
    if (showPopularOnly && !item.popular) {
      return false;
    }
    
    return true;
  });
  
  const resetFilters = () => {
    setSelectedCategory("All");
    setShowVegOnly(false);
    setShowPopularOnly(false);
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 smooth-appear">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              {mode === 'delivery' ? 'Available for Delivery' : 'Available for Takeaway'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-brand">
              Our <span className="brand-text-gradient">Menu</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of authentic Indian dishes prepared with love and traditional recipes.
              {mode === 'takeaway' && " Enjoy 10% off on all takeaway orders!"}
            </p>
          </div>
          
          <div className="flex justify-center mb-8 smooth-appear" style={{ animationDelay: '0.2s' }}>
            <LocationSelector />
          </div>
          
          <div className="mb-8 smooth-appear" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-muted hover:bg-muted/80 text-foreground/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="veg-only"
                    checked={showVegOnly}
                    onChange={() => setShowVegOnly(!showVegOnly)}
                    className="rounded border-muted-foreground h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label htmlFor="veg-only" className="text-sm">Veg Only</label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="popular-only"
                    checked={showPopularOnly}
                    onChange={() => setShowPopularOnly(!showPopularOnly)}
                    className="rounded border-muted-foreground h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label htmlFor="popular-only" className="text-sm">Popular Items</label>
                </div>
                
                {(selectedCategory !== "All" || showVegOnly || showPopularOnly) && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                    Reset
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="glass-morphism rounded-xl overflow-hidden hover-lift"
                >
                  <div className="h-48 relative">
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
                    <div className="absolute top-2 right-2 px-2 py-1 bg-background/70 backdrop-blur-sm rounded-full text-xs font-medium">
                      {item.veg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <div className="text-right">
                        <p className="font-semibold">
                          {mode === 'delivery' ? item.price : item.takeawayPrice}
                        </p>
                        {mode === 'takeaway' && (
                          <p className="text-xs text-muted-foreground line-through">
                            {item.price}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
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
                          Call to Order
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items match your filters. Please try different criteria.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
