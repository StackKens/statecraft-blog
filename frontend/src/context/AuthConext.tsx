import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";
// type user

type User = {
  id: number;
  name: string;
  email: string;
};

// shape of the auth context

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

//create context

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//create a provider function component

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  //check incase the user has already logged in.

  async function checkStoredAuth() {
    try {
      const storedToken = null;
      if (storedToken) {
        console.log(storedToken);
        //later  verify with the server
      }
    } catch (error) {
      if (error instanceof Error) console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkStoredAuth();
  }, []);

  async function login(email: string, password: string) {
    setIsLoading(true);

    try {
      const data = await loginUser(email, password);

      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);

    // later clear the local storage/async storage
  }

  //what goes into the box
  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//create a custome hook

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("Context must be used inside the auth provider");
  }

  return context;
}
