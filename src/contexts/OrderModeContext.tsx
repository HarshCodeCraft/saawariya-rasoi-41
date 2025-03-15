
import React, { createContext, useContext, useState, useEffect } from 'react';

type OrderMode = 'delivery' | 'takeaway';

interface OrderModeContextType {
  mode: OrderMode;
  setMode: (mode: OrderMode) => void;
}

const OrderModeContext = createContext<OrderModeContextType | undefined>(undefined);

export const OrderModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<OrderMode>('delivery');
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // Check if there's a stored preference in localStorage on first render
  useEffect(() => {
    const storedMode = localStorage.getItem('orderMode') as OrderMode;
    if (storedMode && (storedMode === 'delivery' || storedMode === 'takeaway')) {
      setMode(storedMode);
    }
    setIsInitialRender(false);
  }, []);
  
  // Update localStorage when mode changes (but not on initial render)
  useEffect(() => {
    if (!isInitialRender) {
      localStorage.setItem('orderMode', mode);
    }
  }, [mode, isInitialRender]);

  return (
    <OrderModeContext.Provider value={{ mode, setMode }}>
      {children}
    </OrderModeContext.Provider>
  );
};

export const useOrderMode = (): OrderModeContextType => {
  const context = useContext(OrderModeContext);
  if (context === undefined) {
    throw new Error('useOrderMode must be used within an OrderModeProvider');
  }
  return context;
};
