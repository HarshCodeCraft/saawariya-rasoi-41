
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
  specialInstructions: string;
}

export async function saveOrderToSupabase(orderDetails: OrderDetails): Promise<{success: boolean, error?: any}> {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }
    
    // Convert order details to match our table schema
    const orderData = {
      user_id: user.id,
      order_id: orderDetails.orderId,
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      customer_phone: orderDetails.customerPhone,
      pickup_location: orderDetails.pickupLocation,
      pickup_datetime: orderDetails.pickupDateTime,
      items: orderDetails.items as unknown as Json,
      total_amount: orderDetails.totalAmount,
      payment_status: orderDetails.paymentStatus,
      special_instructions: orderDetails.specialInstructions || null,
      status: 'pending' // Default status
    };

    // Insert the order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select();

    if (error) {
      console.error("Error saving order to Supabase:", error);
      return { success: false, error };
    }

    console.log("Order saved to Supabase:", data);
    return { success: true };
  } catch (error) {
    console.error("Exception when saving order:", error);
    return { success: false, error };
  }
}

// Helper function to convert json from Supabase to OrderItem[]
export function convertJsonToOrderItems(items: Json): OrderItem[] {
  if (!items) return [];
  
  // Check if items is an array
  if (Array.isArray(items)) {
    return items.map(item => {
      // Handle each item safely by checking if properties exist and have the correct type
      if (typeof item === 'object' && item !== null) {
        // Safely access properties with type casting
        const itemObj = item as Record<string, Json>;
        const name = typeof itemObj.name === 'string' ? itemObj.name : '';
        const quantity = typeof itemObj.quantity === 'number' ? itemObj.quantity : 0;
        const price = typeof itemObj.price === 'string' ? itemObj.price : '₹0';
        
        return { name, quantity, price };
      }
      return { name: '', quantity: 0, price: '₹0' };
    });
  }
  
  return [];
}

export async function sendOrderNotification(orderDetails: OrderDetails): Promise<{success: boolean, error?: any}> {
  try {
    // Call our Supabase Edge Function to send notifications
    const response = await supabase.functions.invoke('send-order-notification', {
      body: orderDetails
    });

    if (response.error) {
      console.error("Error from notification function:", response.error);
      return { success: false, error: response.error };
    }

    console.log("Notification sent successfully:", response.data);
    return { success: true };
  } catch (error) {
    console.error("Exception when sending notification:", error);
    return { success: false, error };
  }
}

export async function generateOrderId(): Promise<string> {
  // Generate a unique order ID based on timestamp and random string
  const timestamp = new Date().getTime().toString().slice(-6);
  const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SR-${timestamp}-${randomString}`;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<{success: boolean, error?: any}> {
  try {
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }
    
    // Get the current user's role
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError || profileData?.role !== 'admin') {
      return { success: false, error: "Only admins can update order status" };
    }
    
    // Update the order status
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_id', orderId)
      .select();
      
    if (error) {
      console.error("Error updating order status:", error);
      return { success: false, error };
    }
    
    console.log("Order status updated:", data);
    return { success: true };
  } catch (error) {
    console.error("Exception when updating order status:", error);
    return { success: false, error };
  }
}

export async function fetchUserOrders(): Promise<{success: boolean, data?: any[], error?: any}> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching user orders:", error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Exception when fetching user orders:", error);
    return { success: false, error };
  }
}

export async function fetchAllOrders(): Promise<{success: boolean, data?: any[], error?: any}> {
  try {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }
    
    // Get user role from profiles table
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return { success: false, error: "Could not verify user role" };
    }
    
    // Check if user is admin (using string comparison, not complex types)
    if (!data || data.role !== 'admin') {
      return { success: false, error: "Only admins can view all orders" };
    }
    
    // Fetch all orders for admin
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching all orders:", error);
      return { success: false, error };
    }
    
    return { success: true, data: orders };
  } catch (error) {
    console.error("Exception when fetching all orders:", error);
    return { success: false, error };
  }
}
