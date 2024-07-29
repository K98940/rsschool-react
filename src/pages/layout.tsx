import { FC, PropsWithChildren } from 'react';
import Header from '@/components/header/header';
import StoreProvider from '@/store/storeProvider';
import { Flyout } from '@/components/flyout/flyout';
import { ThemeProvider } from '@/context/themeContextProvider';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <StoreProvider>
          <Header />
          {children}
          <Flyout />
        </StoreProvider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
