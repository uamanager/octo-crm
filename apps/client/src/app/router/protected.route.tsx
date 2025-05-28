import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { ROUTES } from './routes';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={ROUTES.AUTH.SIGN_IN}
      replace
    />
  );
};
