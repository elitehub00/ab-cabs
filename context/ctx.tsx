import { supabase } from "@/lib/supabase";
import {
  useContext,
  createContext,
  useState,
  type PropsWithChildren,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

interface User {
  id: string;
  full_name: string;
  avatar_url: string;
  email: string;
  mobile: string;
}

const AuthContext = createContext<{
  login: (idToken: string) => void;
  logout: () => void;
  setupUser: (data: any) => void;
  getUser: () => void;
  deleteAccount: () => void;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}>({
  login: () => null,
  logout: () => null,
  getUser: () => null,
  deleteAccount: () => null,
  setupUser: () => null,
  user: null,
  isLoading: false,
  isAuthenticated: false,
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const userData = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          setUser(userData.data);
        } else {
          logout();
        }
      } catch (err) {
        console.error(err);
        logout();
      }

      setIsLoading(false);
    };
    init();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();
    if (!error) {
      setUser(data);
    }
  };

  const setupUser = (data: any) => {
    setUser(data);
  };

  const login = async (idToken: string, provider: "google" | "apple") => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider,
        token: idToken,
      });
      
  
      if (error) {
        console.error("Login error:", error);
        return;
      }
  
      const userData = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
  
      setUser(userData.data);
    } catch (err) {
      console.error("Login catch error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  const logout = async () => {
    try {
      setUser(null);
      
      // Attempt to revoke and sign out of Google
      try {
        await GoogleSignin.revokeAccess();
      } catch (err) {
        console.warn("Google revokeAccess failed:", err);
      }
  
      try {
        await GoogleSignin.signOut();
      } catch (err) {
        console.warn("Google signOut failed:", err);
      }
  
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase signOut error:", error.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  const deleteAccount = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Step 1: Delete profile row
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Step 2: Call Edge Function to delete user from Auth
      const { error: functionError } = await supabase.functions.invoke("delete-user", {
        body: { userId: user.id },
      });

      if (functionError) throw functionError;

      // Step 3: Logout locally
      await logout();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        setupUser,
        getUser,
        deleteAccount,
        user,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
