import { ThemeToggle } from './themeToggle';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/themeContextProvider';

describe('ThemeToggle component', () => {
  const renderComponent = () => {
    return {
      snapshot: render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>,
      ),
      toggleButton: screen.getByTestId('button-theme-toggle'),
    };
  };

  it('should render the button without dark mode class', async () => {
    const { toggleButton } = renderComponent();

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).not.toHaveClass(/dark/i);
    expect(toggleButton).toHaveClass(/toggle/i);
  });

  it('after click should render the button with dark mode class', async () => {
    const { toggleButton } = renderComponent();
    const user = userEvent.setup();

    await user.click(toggleButton);

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass(/toggle/i);
    expect(toggleButton).toHaveClass(/dark/i);
  });
});
