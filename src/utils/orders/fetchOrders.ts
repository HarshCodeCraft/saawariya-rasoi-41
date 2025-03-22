
import { supabase } from '@/integrations/supabase/client';

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
    // Check authentication
    const { data: userData, error: authError } = await supabase.auth.getUser();
    
    if (authError || !userData?.user) {
      return { success: false, error: "User not authenticated" };
    }
    
    const userId = userData.user.id;
    
    // Check if user is admin
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return { success: false, error: "Could not verify user role" };
    }
    
    if (!profileData || profileData.role !== 'admin') {
      return { success: false, error: "Only admins can view all orders" };
    }

    // Fetch all orders
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error("Error fetching all orders:", ordersError);
      return { success: false, error: ordersError.message };
    }

    return { success: true, data: ordersData };
  } catch (error: any) {
    console.error("Exception when fetching all orders:", error);
    return { success: false, error: "Unexpected error occurred" };
  }
}
