
import { supabase } from '@/integrations/supabase/client';

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
