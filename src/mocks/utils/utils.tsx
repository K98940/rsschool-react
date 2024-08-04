import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/context/themeContextProvider';
import ErrorBoundary from '@/components/errorBoundary/errorBoundary';

export const renderWithProviders = (ui: ReactElement) => {
  const Wrapper = () => {
    return (
      <ErrorBoundary>
        <ThemeProvider>{ui}</ThemeProvider>
      </ErrorBoundary>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
};
