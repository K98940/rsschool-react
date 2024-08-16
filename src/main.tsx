import './index.css';
import Root from './routes/root';
import { StrictMode } from 'react';
import ErrorPage from './error-page';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BASE_PATH } from './utils/constants';
import { createRoot } from 'react-dom/client';
import MainPage from './components/mainPage/mainPage';
import ControlForm from './components/forms/controlForm/controlForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UncontrolForm from './components/forms/uncontrolForm/uncontrolForm';

const router = createBrowserRouter([
  {
    path: BASE_PATH,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: BASE_PATH,
        index: true,
        element: <MainPage />,
      },
      {
        path: 'form',
        element: <UncontrolForm />,
      },
      {
        path: 'control-form',
        element: <ControlForm />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
