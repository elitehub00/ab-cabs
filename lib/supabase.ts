import 'react-native-url-polyfill/auto'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://agnpftfhpbqcgzfsecvo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbnBmdGZocGJxY2d6ZnNlY3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMjM1NzUsImV4cCI6MjA1MDc5OTU3NX0.c9ZbpY2ePSTI5v296HlhIUt5iBDq2f4dx3pNXi9Zlec";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
