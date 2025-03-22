
import { Json } from '@/integrations/supabase/types';

export interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  pickupDateTime: string;
  items: OrderItem[];
  totalAmount: string;
  paymentStatus: string;
  specialInstructions?: string;
}
