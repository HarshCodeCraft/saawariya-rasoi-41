import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
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

/**
 * Save Order to Supabase
 */
export async function saveOrderToSupabase(orderDetails: OrderDetails): Promise<{ success: boolean; error?: any }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return { success: false, error: "User not authenticated" };
    }

    const user = authData.user;

    const orderData = {
      user_id: user.id,
      order_id: orderDetails.orderId || uuidv4(),
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      customer_phone: orderDetails.customerPhone,
      pickup_location: orderDetails.pickupLocation,
      pickup_datetime: orderDetails.pickupDateTime,
      items: JSON.stringify(orderDetails.items),
      total_amount: orderDetails.totalAmount,
      payment_status: orderDetails.paymentStatus,
      special_instructions: orderDetails.specialInstructions || null,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('orders').insert([orderData]);

    if (error) {
      console.error("Error saving order to Supabase:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Exception when saving order:", error);
    return { success: false, error: error.message };
  }
}

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
 * Send Order Notification via Supabase Edge Function
 */
export async function sendOrderNotification(orderDetails: OrderDetails): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabase.functions.invoke('send-order-notification', { body: orderDetails });

    if (error) {
      console.error("Error sending notification:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Exception when sending notification:", error);
    return { success: false, error: error.message };
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

/**
 * Update Order Status (Admin Only)
 */
export async function updateOrderStatus(orderId: string, status: string): Promise<{ success: boolean; error?: any }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) return { success: false, error: "User not authenticated" };

    const { data: profileData, error: profileError } = await supabase.from('profiles').select('role').eq('id', authData.user.id).single();
    if (profileError || profileData?.role !== 'admin') return { success: false, error: "Only admins can update order status" };

    const { error } = await supabase.from('orders').update({ status }).eq('order_id', orderId);
    if (error) {
      console.error("Error updating order status:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Exception when updating order status:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch Orders for Logged-in User
 */
export async function fetchUserOrders(): Promise<{ success: boolean; data?: any[]; error?: any }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) return { success: false, error: "User not authenticated" };

    const { data, error } = await supabase.from('orders').select('*').eq('user_id', authData.user.id).order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };

    return { success: true, data };
  } catch (error) {
    console.error("Exception when fetching user orders:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch All Orders (Admin Only)
 */
export async function fetchAllOrders(): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return { success: false, error: "User not authenticated" };
    }

    const profileQuery = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .maybeSingle();
      
    if (profileQuery.error) {
      console.error("Error fetching profile:", profileQuery.error);
      return { success: false, error: "Could not verify user role" };
    }
    
    const profileData = profileQuery.data;
    
    if (!profileData) {
      return { success: false, error: "User profile not found" };
    }

    if (profileData.role !== 'admin') {
      return { success: false, error: "Only admins can view all orders" };
    }

    const ordersQuery = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersQuery.error) {
      console.error("Error fetching all orders:", ordersQuery.error);
      return { success: false, error: ordersQuery.error.message };
    }

    return { 
      success: true, 
      data: ordersQuery.data 
    };
  } catch (error) {
    console.error("Exception when fetching all orders:", error);
    return { success: false, error: "Unexpected error occurred" };
  }
}
