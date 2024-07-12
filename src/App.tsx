import './App.css';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@components/errorBoundary/errorBoundary';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}
