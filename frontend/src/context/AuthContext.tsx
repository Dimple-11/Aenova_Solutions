import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { currentUserMock } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (fullName: string, email: string, company: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
  verifyEmail: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'aevona_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved auth user', e);
      }
    }
    // Default to mock logged in user for easy dashboard testing, or set default currentUserMock
    return currentUserMock;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = async (email: string): Promise<boolean> => {
    // Frontend mock login
    const user: User = {
      ...currentUserMock,
      email: email || currentUserMock.email,
      name: email ? email.split('@')[0].replace('.', ' ') : currentUserMock.name
    };
    setCurrentUser(user);
    return true;
  };

  const signup = async (fullName: string, email: string, company: string): Promise<boolean> => {
    const user: User = {
      ...currentUserMock,
      id: `user-${Date.now()}`,
      name: fullName,
      email,
      company,
      onboarded: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = (updatedFields: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
  };

  const verifyEmail = () => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser });
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        updateUser,
        verifyEmail,
        resetPassword
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
