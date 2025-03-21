
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
    // Convert order details to match our table schema
    const orderData = {
      order_id: orderDetails.orderId,
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      customer_phone: orderDetails.customerPhone,
      pickup_location: orderDetails.pickupLocation,
      pickup_datetime: orderDetails.pickupDateTime,
      // Convert OrderItem[] to Json compatible format
      items: orderDetails.items as unknown as Json, // More specific type assertion
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
