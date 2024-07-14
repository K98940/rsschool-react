import App from './App';
import { render, screen } from '@testing-library/react';

describe('App component', () => {
  it('render the App elements', async () => {
    render(<App />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-btn')).toBeInTheDocument();
  });
});
