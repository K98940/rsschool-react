import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/context/themeContextProvider';
import { AppStore, RootState, setupStore } from '@/store/store';
import { render, RenderOptions } from '@testing-library/react';
import ErrorBoundary from '@/components/errorBoundary/errorBoundary';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;

  const Wrapper = () => {
    return (
      <MemoryRouterProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <Provider store={store}>{ui}</Provider>
          </ThemeProvider>
        </ErrorBoundary>
      </MemoryRouterProvider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
