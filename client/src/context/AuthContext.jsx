import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage on init
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sync axios interceptor to automatically attach token
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    if (data.success) {
      setUser(data.data);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
    }
    return data;
  };

  const signup = async (firstName, lastName, email, password) => {
    const { data } = await api.post('/api/auth/signup', { firstName, lastName, email, password });
    return data;
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
