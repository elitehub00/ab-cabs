import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Create Supabase client using service role key
const supabase = createClient(
  Deno.env.get("BASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
    try {
      const { userId } = await req.json();
      console.log("Received delete request for userId:", userId);
  
      if (!userId) {
        console.error("Missing userId in request");
        return new Response(JSON.stringify({ error: "Missing userId" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const { error } = await supabase.auth.admin.deleteUser(userId);
  
      if (error) {
        console.error("Supabase deleteUser error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      console.log("User deleted successfully");
      return new Response(JSON.stringify({ message: "User deleted successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (err) {
      console.error("Unexpected error:", err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  });
  
