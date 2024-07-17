import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

describe('App component', () => {
  it('render the App elements', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-btn')).toBeInTheDocument();
  });
});
