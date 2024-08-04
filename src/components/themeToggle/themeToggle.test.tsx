import { ThemeToggle } from './themeToggle';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ThemeToggle component', () => {
  test('Should render button for theme selection', async () => {
    render(<ThemeToggle />);

    const buttonThemeToggle = await screen.findByTestId('button-theme-toggle');

    expect(buttonThemeToggle).toBeInTheDocument();
    expect(buttonThemeToggle).toHaveClass(/buttonThemeToggle/i);
    expect(buttonThemeToggle).not.toHaveClass(/buttonDarkMode/i);
  });
});
