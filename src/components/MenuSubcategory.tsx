
import React from 'react';
import { MenuItem } from '@/data/menuData';
import { Flame } from 'lucide-react';
import { useOrderMode } from '@/contexts/OrderModeContext';

interface MenuSubcategoryProps {
  title: string;
  items: MenuItem[];
  zomatoLink: string;
}

const MenuSubcategory = ({ title, items, zomatoLink }: MenuSubcategoryProps) => {
  const { mode } = useOrderMode();
  
  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-xl font-medium mb-4 text-primary">{title}</h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="glass-morphism rounded-xl overflow-hidden hover-lift"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-medium">
                    {item.name}
                    {item.quantity && <span className="text-sm text-muted-foreground ml-2">({item.quantity})</span>}
                  </h4>
                  {item.popular && (
                    <div className="flex items-center gap-1 text-primary text-xs">
                      <Flame size={12} />
                      <span>Popular</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {mode === 'delivery' ? item.price : item.takeawayPrice || item.price}
                  </p>
                  {mode === 'takeaway' && item.takeawayPrice && (
                    <p className="text-xs text-muted-foreground line-through">
                      {item.price}
                    </p>
                  )}
                </div>
              </div>
              
              {item.description && (
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              )}
              
              <div className="flex justify-end">
                {mode === 'delivery' ? (
                  <a 
                    href={zomatoLink} 
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
    </div>
  );
};

export default MenuSubcategory;
