
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type OrderRecord = Database['public']['Tables']['orders']['Row'];

/**
 * Fetch Orders for Logged-in User
 */
export async function fetchUserOrders(): Promise<{ success: boolean; data?: OrderRecord[]; error?: string }> {
  try {
    const authResult = await supabase.auth.getUser();
    if (authResult.error || !authResult.data?.user) {
      return { success: false, error: "User not authenticated" };
    }

    const userId = authResult.data.user.id;
    const ordersResult = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (ordersResult.error) {
      return { success: false, error: ordersResult.error.message };
    }

    return { success: true, data: ordersResult.data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unexpected error occurred";
    console.error("Exception when fetching user orders:", error);
    return { success: false, error: errorMessage };
  }
}

/**
 * Fetch All Orders (Admin Only)
 */
export async function fetchAllOrders(): Promise<{ success: boolean; data?: OrderRecord[]; error?: string }> {
  try {
    // Check authentication
    const authResult = await supabase.auth.getUser();
    
    if (authResult.error || !authResult.data?.user) {
      return { success: false, error: "User not authenticated" };
    }
    
    const userId = authResult.data.user.id;
    
    // Check if user is admin
    const profileResult = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (profileResult.error) {
      console.error("Error fetching profile:", profileResult.error);
      return { success: false, error: "Could not verify user role" };
    }
    
    if (!profileResult.data || profileResult.data.role !== 'admin') {
      return { success: false, error: "Only admins can view all orders" };
    }

    // Fetch all orders
    const ordersResult = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersResult.error) {
      console.error("Error fetching all orders:", ordersResult.error);
      return { success: false, error: ordersResult.error.message };
    }

    return { success: true, data: ordersResult.data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unexpected error occurred";
    console.error("Exception when fetching all orders:", error);
    return { success: false, error: errorMessage };
  }
}
