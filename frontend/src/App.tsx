import React from 'react';
import { AppProvider } from './providers/AppProvider';
import { AppRoutes } from './routes';
import ErrorBoundary from './components/organisms/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
