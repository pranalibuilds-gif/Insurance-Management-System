import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, MockUser } from '../mocks/auth';

interface AuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (userData: MockUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);

  const login = (userData: MockUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
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
