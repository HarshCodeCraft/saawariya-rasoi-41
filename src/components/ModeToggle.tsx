
import React from 'react';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { cn } from '@/lib/utils';
import { Truck, UtensilsCrossed } from 'lucide-react';

const ModeToggle = () => {
  const { mode, setMode } = useOrderMode();

  return (
    <div className="flex items-center p-1 bg-secondary/20 rounded-full border border-secondary">
      <button
        onClick={() => setMode('delivery')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
          mode === 'delivery'
            ? 'bg-saawariya-red text-white shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <Truck size={14} />
        <span>Delivery</span>
      </button>
      <button
        onClick={() => setMode('takeaway')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
          mode === 'takeaway'
            ? 'bg-saawariya-red text-white shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <UtensilsCrossed size={14} />
        <span>Takeaway</span>
      </button>
    </div>
  );
};

export default ModeToggle;
