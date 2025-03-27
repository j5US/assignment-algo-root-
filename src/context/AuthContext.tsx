import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, AuthAction, AuthContextType } from '../types';

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
        error: null,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        error: null,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', user });
      } catch (error) {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const login = (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: User) => u.email === email && u.password === password);
      
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        dispatch({ type: 'LOGIN_SUCCESS', user: foundUser });
      } else {
        dispatch({ type: 'LOGIN_ERROR', error: 'Invalid credentials' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: 'Login failed' });
    }
  };

  const signup = (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: User) => u.email === email);
      
      if (userExists) {
        dispatch({ type: 'LOGIN_ERROR', error: 'User already exists' });
        return;
      }

      const newUser = { id: crypto.randomUUID(), email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser));
      dispatch({ type: 'LOGIN_SUCCESS', user: newUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: 'Signup failed' });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const deleteAccount = () => {
    if (state.user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter((u: User) => u.id !== state.user?.id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout, deleteAccount }}>
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