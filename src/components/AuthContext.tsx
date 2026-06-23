import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  email: string;
  name?: string;
  rememberMe?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  login: (email: string, password: string, remember: boolean) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user session on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('reva_auth_user');
    const rememberMe = localStorage.getItem('reva_remember_me') === 'true';
    
    if (storedUser && rememberMe) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('reva_auth_user');
      }
    } else if (storedUser && !rememberMe) {
      // If rememberMe wasn't ticked, we can support session persistence during active page session.
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('reva_auth_user');
      }
    }
    
    // Initialize demo users in localStorage if they don't exist
    const existingUsers = localStorage.getItem('reva_registered_users');
    if (!existingUsers) {
      localStorage.setItem('reva_registered_users', JSON.stringify([
        {
          email: 'demo@revaclothing.com',
          password: 'Password123',
          name: 'Classic Explorer'
        },
        {
          email: '23nm1a4341@gmail.com', // Pre-seed user email for convenience
          password: 'Password123',
          name: 'Elite Member'
        }
      ]));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    setLoading(true);
    setError(null);
    
    // Simulate network delay for premium realistic loading feedback
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    try {
      const usersRaw = localStorage.getItem('reva_registered_users') || '[]';
      const users = JSON.parse(usersRaw);
      
      const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        setError('No account matches this email address.');
        setLoading(false);
        return false;
      }
      
      if (foundUser.password !== password) {
        setError('The password you entered is incorrect.');
        setLoading(false);
        return false;
      }
      
      const loggedInUser: User = {
        email: foundUser.email,
        name: foundUser.name,
        rememberMe: remember
      };
      
      setUser(loggedInUser);
      localStorage.setItem('reva_auth_user', JSON.stringify(loggedInUser));
      localStorage.setItem('reva_remember_me', remember ? 'true' : 'false');
      setLoading(false);
      return true;
    } catch (err) {
      setError('An error occurred during authentication.');
      setLoading(false);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    try {
      const usersRaw = localStorage.getItem('reva_registered_users') || '[]';
      const users = JSON.parse(usersRaw);
      
      const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        setError('An account with this email address already exists.');
        setLoading(false);
        return false;
      }
      
      const newUserRecord = { email, password, name };
      users.push(newUserRecord);
      localStorage.setItem('reva_registered_users', JSON.stringify(users));
      
      const loggedInUser: User = { email, name, rememberMe: true };
      setUser(loggedInUser);
      localStorage.setItem('reva_auth_user', JSON.stringify(loggedInUser));
      localStorage.setItem('reva_remember_me', 'true');
      setLoading(false);
      return true;
    } catch (err) {
      setError('An error occurred during registration.');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reva_auth_user');
    localStorage.removeItem('reva_remember_me');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        error,
        setError,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
