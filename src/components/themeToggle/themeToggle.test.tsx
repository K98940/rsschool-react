import { ThemeToggle } from './themeToggle';
import { render, screen, waitFor } from '@testing-library/react';

describe('ThemeToggle component', () => {
  test('Should render button for theme selection', async () => {
    render(<ThemeToggle />);

    await waitFor(() => screen.findByTestId('button-theme-toggle'));
  });
});
