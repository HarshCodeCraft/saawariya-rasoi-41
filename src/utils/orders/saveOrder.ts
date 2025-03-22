
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetails } from './types';

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
