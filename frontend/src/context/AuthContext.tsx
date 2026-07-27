import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRead, UserLogin } from '../types/auth';
import { serviceFactory } from '../services/serviceFactory';
import { STORAGE_KEYS } from '../config/constants';

interface AuthContextType {
  user: UserRead | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: UserLogin) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authService = serviceFactory.getAuthService();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserRead | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: UserLogin) => {
    await authService.login(data);
    const userData = await authService.getCurrentUser();
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
