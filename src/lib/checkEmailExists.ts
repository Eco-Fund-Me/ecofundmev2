import { checkEmailExists as checker} from "@/app/actions/user";
// import { supabase as supabaseAdmin } from "./supabaseClient";
export async function checkEmailExists(email: string): Promise<boolean> {
    // const { data, error } = await supabaseAdmin
    //   .from('auth.users')      // the built-in auth schema
    //   .select('id', { count: 'exact', head: true })
    //   .eq('email', email.toLowerCase());
   const check = await checker(email)

   return check
  }

  