import React, { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';
import { types } from '../types/types';
import { AuthState, User } from '../../types';
import { loginApi, signupApi } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface AuthContext extends AuthState {
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => void;
}

const defaultAuthState: AuthContext = {
  logged: false,
  login: () => {},
  logout: () => {},
  signup: () => {},
};

export const AuthContext = createContext<AuthContext>(defaultAuthState);

const initialState: AuthState = {
  logged: false,
};

const init = (): AuthState => {
  const user = JSON.parse(localStorage.getItem('notes_user') || 'null');
  const token = localStorage.getItem('notes_accessToken');

  if (user && token) {
    const isTokenValid = decodeToken(token);
    if (isTokenValid) return { logged: true, user };
  }

  return { logged: false };
};

const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp && decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await loginApi(email, password);
      const { user, token } = response.data;
      localStorage.setItem('notes_user', JSON.stringify(user));
      localStorage.setItem('notes_accessToken', token.access);

      const action = {
        type: types.login,
        payload: { ...user, token: token.access },
      };

      dispatch(action);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const logout = (): void => {
    localStorage.removeItem('notes_user');
    localStorage.removeItem('notes_accessToken');
    const action = {
      type: types.logout,
    };

    dispatch(action);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      const response = await signupApi(email, password); // Use signup API call
      const { user } = response.data;

      const action = {
        type: types.login,
        payload: { user, token: null }, // Token can be null at signup
      };

      dispatch(action);
      if (response.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
