import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api, tokenStorage, ApiError } from '../lib/api';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, company: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => Promise<void>;
  verifyEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  confirmResetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!tokenStorage.getAccessToken()) {
        setIsLoading(false);
        return;
      }
      try {
        const user = await api.auth.me();
        setCurrentUser(user);
      } catch {
        tokenStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const tokens = await api.auth.login(email, password);
    tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
    const user = await api.auth.me();
    setCurrentUser(user);
    return true;
  };

  const signup = async (fullName: string, email: string, company: string, password: string): Promise<boolean> => {
    const tokens = await api.auth.signup(fullName, email, company, password);
    tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
    const user = await api.auth.me();
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    tokenStorage.clear();
    setCurrentUser(null);
  };

  const updateUser = async (updatedFields: Partial<User>) => {
    const user = await api.users.updateMe(updatedFields);
    setCurrentUser(user);
  };

  const verifyEmail = async () => {
    if (!currentUser) return;
    const user = await api.auth.verifyEmail();
    setCurrentUser(user);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    await api.auth.forgotPassword(email);
    return true;
  };

  const confirmResetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      await api.auth.resetPassword(token, newPassword);
      return true;
    } catch (err) {
      if (err instanceof ApiError) return false;
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
        verifyEmail,
        resetPassword,
        confirmResetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
