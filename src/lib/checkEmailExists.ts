// Add this function to check if email exists before sign-up
import { supabase as supabaseAdmin } from "./supabaseClient";
export async function checkEmailExists(email: string): Promise<boolean> {
    const { data, error } = await supabaseAdmin
      .from('auth.users')      // the built-in auth schema
      .select('id', { count: 'exact', head: true })
      .eq('email', email.toLowerCase());
  
    if (error) {
      console.error('Error checking auth.users for email:', error);
      // If you prefer to block sign-up on error, return true here
      return false;
    }
  
    // count > 0 means a user with that email already exists
    return (data?.length ?? 0) > 0;
  }