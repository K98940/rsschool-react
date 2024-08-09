import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/context/themeContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const renderWithProviders = (ui: ReactElement) => {
  const Wrapper = () => {
    return (
      <ThemeProvider>
        <MemoryRouter initialEntries={[`/page/1`]}>
          <Routes>
            <Route path="page" element={ui}>
              <Route path=":id" element={ui} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
};
