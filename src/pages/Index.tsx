
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedMenu from '@/components/FeaturedMenu';
import Testimonials from '@/components/Testimonials';
import DeliveryContent from '@/components/DeliveryContent';
import TakeawayContent from '@/components/TakeawayContent';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { mode } = useOrderMode();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    
    checkAuthStatus();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleLoginPrompt = () => {
    navigate('/auth');
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
