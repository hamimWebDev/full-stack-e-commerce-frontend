import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize state from localStorage if available
    const storedUser = localStorage.getItem('user');
    try {
      return {
        isAuthenticated: !!storedUser,
        user: storedUser ? JSON.parse(storedUser) : null,
        loading: true // Start with loading true
      };
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return {
        isAuthenticated: false,
        user: null,
        loading: true
      };
    }
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/refresh-token');
        
        if (response.data.success) {
          const { user, accessToken } = response.data;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', accessToken);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false
          });
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Only clear auth state if there's no stored user
        const storedUser = localStorage.getItem('user');
        
        if (!storedUser) {
          handleLogout();
        } else {
          try {
            // Keep the stored user but mark as not loading
            const parsedUser = JSON.parse(storedUser);
            setAuthState(prev => ({
              ...prev,
              user: parsedUser,
              loading: false
            }));
          } catch (parseError) {
            console.error('Error parsing stored user:', parseError);
            handleLogout();
          }
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
    navigate('/login');
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { user, accessToken } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false
        });
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        const { user, accessToken } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false
        });
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleLogout();
    }
  };

  const updateUser = (userData: User) => {
    try {
      localStorage.setItem('user', 'accessToken' + JSON.stringify(userData));
      setAuthState(prev => ({
        ...prev,
        user: userData
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateUser }}>
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