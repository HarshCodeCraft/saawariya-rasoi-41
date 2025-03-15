
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedMenu from '@/components/FeaturedMenu';
import Testimonials from '@/components/Testimonials';
import DeliveryContent from '@/components/DeliveryContent';
import TakeawayContent from '@/components/TakeawayContent';
import { useOrderMode } from '@/contexts/OrderModeContext';
import LocationSelector from '@/components/LocationSelector';

const Index = () => {
  const { mode } = useOrderMode();
  
  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center mb-8">
          <LocationSelector />
        </div>
        {mode === 'delivery' ? <DeliveryContent /> : <TakeawayContent />}
      </div>
      <FeaturedMenu />
      <Testimonials />
    </Layout>
  );
};

export default Index;
