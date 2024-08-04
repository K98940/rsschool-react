import './global.css';
import Header from '@/components/header/header';
import { Flyout } from '@/components/flyout/flyout';
import { ThemeProvider } from '@/context/themeContextProvider';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Flyout />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
