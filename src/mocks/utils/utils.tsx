import App from '@/App';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/context/themeContextProvider';
import { AppStore, RootState, setupStore } from '@/store/store';
import { render, RenderOptions } from '@testing-library/react';
import ErrorBoundary from '@/components/errorBoundary/errorBoundary';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;

  const Wrapper = () => {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
