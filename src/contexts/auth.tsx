import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async () => {
    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const loadStoredData = async () => {
      console.log('load data');
      const storedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storedToken = await AsyncStorage.getItem('@RNAuth:token');

      api.defaults.headers.Authorization = `Bearer ${storedToken}`;

      // await new Promise(resolve => setTimeout(resolve, 2000));

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }

      // RDSplashScreen.hide()
      setLoading(false);
    };

    loadStoredData();
  }, []);

  return (
    <AuthContext.Provider
      value={{signed: !!user, user: user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
