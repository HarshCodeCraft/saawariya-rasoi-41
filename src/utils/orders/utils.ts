
import { v4 as uuidv4 } from 'uuid';
import { Json } from '@/integrations/supabase/types';
import { OrderItem } from './types';

/**
 * Convert JSON to OrderItem[]
 */
export function convertJsonToOrderItems(items: Json): OrderItem[] {
  try {
    if (!items) return [];
    
    if (Array.isArray(items)) {
      return items.map(item => {
        const itemObj = item as Record<string, any>;
        return {
          name: typeof itemObj.name === 'string' ? itemObj.name : '',
          quantity: typeof itemObj.quantity === 'number' ? itemObj.quantity : 0,
          price: typeof itemObj.price === 'string' ? itemObj.price : '₹0'
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Error converting JSON to OrderItems:", error);
    return [];
  }
}

/**
 * Generate a Unique Order ID
 */
export function generateOrderId(): string {
  const timestamp = new Date().getTime().toString().slice(-6);
  const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SR-${timestamp}-${randomString}`;
}
