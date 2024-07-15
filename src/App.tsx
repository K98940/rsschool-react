import './App.css';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@context/themeContextProvider';
import ErrorBoundary from '@components/errorBoundary/errorBoundary';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}
