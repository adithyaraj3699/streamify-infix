
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuthExtended } from "@/hooks/use-auth-extended";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isUser: boolean;
  points: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserPoints: (pointsToAdd: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { userPoints, updateUserPoints, initializePoints } = useAuthExtended();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    initializePoints();
    setLoading(false);
  }, [initializePoints]);

  // Update user object when points change
  useEffect(() => {
    if (user) {
      const updatedUser = { ...user, points: userPoints };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [userPoints, user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for admin credentials
    const isAdmin = email.toLowerCase() === "admin@gmail.com" && password === "336699@admin";
    const isUser = true; // All logged in accounts are users
    
    // Validate credentials
    if (email && password) {
      // Mock user data - in a real app, this would come from your API
      const mockUser = {
        id: "1",
        name: email.split("@")[0],
        email,
        isAdmin,
        isUser,
        points: userPoints
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setLoading(false);
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        updateUserPoints
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
