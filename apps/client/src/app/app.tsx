import { AppRouter } from './router/app.router';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/common/error-fallback.component';

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppRouter />
    </ErrorBoundary>
  );
}
