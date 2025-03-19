
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedMenu from '@/components/FeaturedMenu';
import Testimonials from '@/components/Testimonials';
import DeliveryContent from '@/components/DeliveryContent';
import TakeawayContent from '@/components/TakeawayContent';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { User, LogIn } from 'lucide-react';

const Index = () => {
  const { mode } = useOrderMode();
  const navigate = useNavigate();
  // Mock authentication state (in a real app, this would come from an auth provider)
  const isLoggedIn = false;
  
  const handleLoginPrompt = () => {
    toast({
      title: "Authentication Required",
      description: "Please log in to place an order. This would integrate with Supabase Auth in a complete implementation.",
    });
    
    // In a real app with Supabase integration, this would redirect to a login page
    console.log("User prompted to log in");
  };
  
  return (
    <Layout>
      <Hero />
      
      {/* User authentication status */}
      {mode === 'takeaway' && !isLoggedIn && (
        <div className="container mx-auto px-6 py-4">
          <div className="bg-muted/50 border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Create an account for faster checkout</h3>
              <p className="text-sm text-muted-foreground">Save your details for faster ordering next time</p>
            </div>
            <Button onClick={handleLoginPrompt} className="gap-2">
              <LogIn size={16} />
              Log In
            </Button>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-6 py-8">
        {mode === 'delivery' ? <DeliveryContent /> : <TakeawayContent />}
      </div>
      <FeaturedMenu />
      <Testimonials />
    </Layout>
  );
};

export default Index;
