import { createContext, PropsWithChildren, useContext } from 'react';
import { useAccessToken } from '../common/storage/token.storage';
import { queryClient } from '../common/query/query';

interface IAuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { token, setToken, removeToken } = useAccessToken();

  const login = (newToken: string) => setToken(newToken);
  const logout = () => {
    removeToken();
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
