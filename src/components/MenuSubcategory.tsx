
import React from 'react';
import { MenuItem } from '@/data/menuData';
import { Flame, Info, Clock, Tag, ChevronRight } from 'lucide-react';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Card, CardContent } from './ui/card';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface MenuSubcategoryProps {
  title: string;
  items: MenuItem[];
  zomatoLink: string;
}

const MenuSubcategory = ({ title, items, zomatoLink }: MenuSubcategoryProps) => {
  const { mode } = useOrderMode();
  const navigate = useNavigate();
  
  const handleTakeawayOrder = (item: MenuItem) => {
    // When ordering via takeaway, we'll show a dialog to choose between normal or bulk order
    toast({
      title: "Order Placed",
      description: `Your order for ${item.name} has been received. We'll contact you shortly to confirm.`,
    });
  };
  
  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-xl font-medium mb-4 text-primary">{title}</h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none"
          >
            {/* Item Image (Placeholder for now) */}
            <div className="relative h-40 bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-start p-4">
                  {item.popular && (
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Flame size={12} />
                      Popular
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-500">Top Rated</div>
                    <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                  </div>
                </div>
              )}
              
              {mode === 'takeaway' && item.takeawayPrice && (
                <div className="absolute right-0 top-0 bg-red-500 text-white p-2 rounded-bl-lg font-bold">
                  10% OFF
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-medium">
                    {item.name}
                    {item.quantity && <span className="text-sm text-muted-foreground ml-2">({item.quantity})</span>}
                  </h4>
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
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                {mode === 'delivery' ? (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>30-45 mins</span>
                  </div>
                ) : (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>15-20 mins</span>
                  </div>
                )}
                
                <div className="flex justify-end">
                  {mode === 'delivery' ? (
                    <a 
                      href={zomatoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105 flex items-center"
                    >
                      Order
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105 flex items-center">
                          Order Now
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Takeaway Order</DialogTitle>
                          <DialogDescription>
                            Choose your order type for {item.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <RadioGroup defaultValue="normal" className="gap-4">
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                              <RadioGroupItem value="normal" id="normal" />
                              <Label htmlFor="normal" className="flex flex-col">
                                <span className="font-medium">Normal Takeaway</span>
                                <span className="text-xs text-muted-foreground">Ready in 15-20 mins</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                              <RadioGroupItem value="bulk" id="bulk" />
                              <Label htmlFor="bulk" className="flex flex-col">
                                <span className="font-medium">Bulk Order</span>
                                <span className="text-xs text-muted-foreground">For events, parties or office</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <DialogFooter>
                          <Button 
                            type="submit" 
                            onClick={() => handleTakeawayOrder(item)}
                          >
                            Proceed to Checkout
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuSubcategory;
