import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './protected.route';
import { ProjectsPage } from '../pages/projects/projects.page';
import { AuthSignInPage, AuthSignUpPage } from '../pages/auth/auth.page';
import { ROUTES } from './routes';
import { AuthenticatedLayout } from '../components/layout/authenticated.layout';

export const AppRouter = () => (
  <Routes>
    <Route
      path={ROUTES.AUTH.ROOT}
      element={
        <Navigate
          to={ROUTES.AUTH.SIGN_IN}
          replace
        />
      }
    />
    <Route
      path={ROUTES.AUTH.SIGN_IN}
      element={<AuthSignInPage />}
    />
    <Route
      path={ROUTES.AUTH.SIGN_UP}
      element={<AuthSignUpPage />}
    />

    <Route element={<ProtectedRoute />}>
      <Route element={<AuthenticatedLayout />}>
        <Route
          path={ROUTES.ROOT}
          element={<ProjectsPage />}
        />
      </Route>
    </Route>

    <Route
      path="*"
      element={
        <Navigate
          to={ROUTES.ROOT}
          replace
        />
      }></Route>
  </Routes>
);
