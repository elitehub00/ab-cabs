import { supabase } from "@/lib/supabase";
import {
  useContext,
  createContext,
  useState,
  type PropsWithChildren,
  useEffect,
} from "react";

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
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}>({
  login: () => null,
  logout: () => null,
  getUser: () => null,
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
            .select(`*`)
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
      .select(`*`)
      .eq("id", user?.id)
      .single();
    if (!error) {
      setUser(data);
    }
  };

  const setupUser = (data: any) => {
    setUser(data);
  };

  const login = async (idToken: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) {
      console.log(error);
    } else {
      const userData = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", data.user.id)
        .single();
      setUser(userData.data);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    setUser(null);
    const { error } = await supabase.auth.signOut(); // Clear user data on sign out
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,

        setupUser,
        getUser,
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
