
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Flame, Search, UtensilsCrossed, Truck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Menu data
const menuCategories = [
  "All",
  "Appetizers",
  "Main Course",
  "Breads",
  "Rice",
  "Desserts",
  "Beverages"
];

const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with butter and mild spices.",
    price: 320,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isVegetarian: false,
    isSpicy: false
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese chunks, grilled to perfection with bell peppers and onions.",
    price: 280,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: 3,
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.",
    price: 320,
    category: "Rice",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isVegetarian: false,
    isSpicy: true
  },
  {
    id: 4,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    price: 250,
    category: "Rice",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: 5,
    name: "Garlic Naan",
    description: "Soft, leavened bread topped with garlic and butter, baked in tandoor.",
    price: 60,
    category: "Breads",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: 6,
    name: "Chicken Tikka",
    description: "Boneless chicken pieces marinated in yogurt and spices, grilled to perfection.",
    price: 300,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isVegetarian: false,
    isSpicy: true
  },
  {
    id: 7,
    name: "Dal Makhani",
    description: "Black lentils slow-cooked with kidney beans, butter, and cream.",
    price: 220,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1616687335458-a877a301dea2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: 8,
    name: "Gulab Jamun",
    description: "Soft, spongy milk-solid balls soaked in rose-flavored sugar syrup.",
    price: 120,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1605196560547-1f6bd3c76c12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: 9,
    name: "Mango Lassi",
    description: "A refreshing yogurt-based drink blended with sweet mango pulp and cardamom.",
    price: 120,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1626263468007-a15a319edd60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: 10,
    name: "Chicken Korma",
    description: "Tender chicken pieces in a rich, creamy sauce with cashews and aromatic spices.",
    price: 340,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isVegetarian: false,
    isSpicy: false
  }
];

const Menu = () => {
  const { mode } = useOrderMode();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredItems = menuItems.filter(item => {
    // Filter by category
    if (activeCategory !== "All" && item.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              {mode === 'delivery' ? 'Delivery Menu' : 'Takeaway Menu'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">Our Menu</h1>
            <p className="text-lg text-muted-foreground">
              {mode === 'delivery' 
                ? 'Explore our complete menu available for delivery through Zomato.'
                : 'Explore our complete menu available for takeaway orders.'}
            </p>
            <div className="flex items-center justify-center gap-2 pt-3">
              {mode === 'delivery' ? (
                <div className="flex items-center gap-2 text-sm">
                  <Truck size={16} className="text-primary" />
                  <span>Delivered by Zomato</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <UtensilsCrossed size={16} className="text-primary" />
                  <span>Available for pickup</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="glass-morphism rounded-xl p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-border/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="overflow-x-auto pb-2">
                <Tabs defaultValue="All" className="w-full">
                  <TabsList className="p-1 bg-secondary/80 rounded-lg">
                    {menuCategories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        onClick={() => setActiveCategory(category)}
                        className="px-4 py-2 text-sm whitespace-nowrap"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          {mode === 'delivery' && (
            <div className="bg-restaurant-50 rounded-xl p-4 mb-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img src="https://b.zmtcdn.com/images/logo/zomato_logo_2017.png" alt="Zomato" className="h-6" />
                <p className="text-sm">Order directly from our <span className="font-medium">Zomato page</span> for fastest delivery</p>
              </div>
              <a 
                href="https://www.zomato.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
              >
                Order via Zomato
                <ExternalLink size={14} />
              </a>
            </div>
          )}
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No menu items found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
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
                    <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                      {item.isPopular && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                          <Flame size={12} />
                          Popular
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="flex items-center px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                          Veg
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="flex items-center px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                          Spicy
                        </span>
                      )}
                    </div>
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
                        <p className="font-semibold">₹{item.price}</p>
                        {mode === 'takeaway' && (
                          <p className="text-xs text-primary font-medium">
                            ₹{Math.round(item.price * 0.9)} for takeaway
                          </p>
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
