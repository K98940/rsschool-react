import './tailwind.css';
import Header from '@/components/header/header';
import { Flyout } from '@/components/flyout/flyout';
import { LoaderFunctionArgs } from '@remix-run/node';
import { ThemeProvider } from '@/context/themeContextProvider';
import { ErrorComponent } from '@/components/errorComponent/errorComponent';
import { Links, Meta, Outlet, redirect, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchParams, pathname } = new URL(request.url);
  const search = searchParams.get('search') ? `?search=${searchParams.get('search')}` : '';
  if (pathname === '/') return redirect('/page/1' + search);

  return { search, pathname, params };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="body">
        <ThemeProvider>
          <Header />
          {children}
          <Flyout />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return ErrorComponent(error);
}
