import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Flame, Filter, X, Map } from 'lucide-react';
import MenuSubcategory from '@/components/MenuSubcategory';
import SocialLinks from '@/components/SocialLinks';
import { categories, menuItems } from '@/data/menuData';

const Menu = () => {
  const { mode } = useOrderMode();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  
  const zomatoLink = "https://link.zomato.com/xqzv/rshare?id=75078797305635b1";
  const googleMapsLink = "https://maps.app.goo.gl/8LbpcKic2gpU9s1p9";
  
  // Filter menu items based on selected filters
  const filteredItems = menuItems.filter(item => {
    // Category filter
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }
    
    // Veg-only filter - all items are veg so this is redundant but kept for future options
    if (showVegOnly && !item.veg) {
      return false;
    }
    
    // Popular-only filter
    if (showPopularOnly && !item.popular) {
      return false;
    }
    
    return true;
  });
  
  // Group items by subcategory if they have one
  const groupedItems = filteredItems.reduce((acc, item) => {
    const key = item.subcategory || 'default';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);
  
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
              Explore our authentic dishes from Purwanchal, prepared with traditional recipes.
              {mode === 'takeaway' && " Enjoy 10% off on all takeaway orders!"}
            </p>
            <p className="text-sm mt-2 text-primary font-medium">
              Located in Kanpur, Uttar-Pradesh, India
            </p>
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
                    id="popular-only"
                    checked={showPopularOnly}
                    onChange={() => setShowPopularOnly(!showPopularOnly)}
                    className="rounded border-muted-foreground h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label htmlFor="popular-only" className="text-sm">Popular Items</label>
                </div>
                
                {(selectedCategory !== "All" || showPopularOnly) && (
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
            
            {/* Render subcategories if present */}
            {Object.keys(groupedItems).length > 0 ? (
              Object.keys(groupedItems).sort().map((subcategory) => (
                <MenuSubcategory 
                  key={subcategory} 
                  title={subcategory !== 'default' ? subcategory : ''} 
                  items={groupedItems[subcategory]}
                  zomatoLink={zomatoLink}
                />
              ))
            ) : (
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
          
          <div className="mt-16 glass-morphism p-6 rounded-xl smooth-appear" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 font-brand">Find Us</h2>
                <p className="text-muted-foreground mb-4">
                  Visit our restaurant in Kanpur, Uttar-Pradesh, India or place your order online.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
                  >
                    <Map size={16} />
                    View on Google Maps
                  </a>
                  <a 
                    href={zomatoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:brightness-105"
                  >
                    Order on Zomato
                  </a>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <h3 className="text-lg font-medium mb-2">Connect With Us</h3>
                <SocialLinks className="justify-center md:justify-end" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
