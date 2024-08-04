import { render } from '@testing-library/react';
import { ThemeToggle } from '@/components/themeToggle/themeToggle';

describe('themeContextProvider test', () => {
  test('create provider', () => {
    const toggle = render(<ThemeToggle />);

    const button = toggle.getByTestId('button-theme-toggle');
    expect(button).toBeInTheDocument();
  });
});
