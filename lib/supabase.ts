import 'react-native-url-polyfill/auto'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://silczqnypaxpreaupwzx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbGN6cW55cGF4cHJlYXVwd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxODM3MzYsImV4cCI6MjA0MTc1OTczNn0.vtC94uOnx_xKbhpWVNGMMe5YCez9daNRBP7o4pcEKzg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
