
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { OrderModeProvider } from '@/contexts/OrderModeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <OrderModeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </OrderModeProvider>
  );
};

export default Layout;
