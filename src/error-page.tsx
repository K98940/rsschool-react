import { useRouteError } from 'react-router-dom';

type RouteError = {
  statusText?: string;
  message?: string;
  status?: string;
  error?: {
    message?: string;
  };
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.log('error = ', error, typeof error);
  let errorTitle = '';
  let errorMessage = '';

  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorTitle = error?.statusText ? ` (${error?.statusText})` : '';
    errorMessage =
      (error?.status || '') + error?.error?.message
        ? ` ${error?.error?.message}`
        : '';
  }

  return (
    <article>
      <h1>{`Error ${errorTitle}`}</h1>
      <p>{errorMessage}</p>
    </article>
  );
}
