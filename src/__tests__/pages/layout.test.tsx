import RootLayout from '@/app/layout';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import CardEmpty from '@/components/cardEmpty/cardEmpty';

vitest.mock(import('next/navigation'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: vitest.fn(),
  };
});

describe('Layout component', () => {
  test('should render Layout component', async () => {
    render(<RootLayout children={<CardEmpty />} />);

    const header = await screen.findByTestId('app-header');
    const form = await screen.findByTestId('form-search');
    const searchInput = await screen.findByTestId('search-input');
    const buttonSearch = await screen.findByTestId('search-btn');
    const buttonThemeToggle = await screen.findByTestId('button-theme-toggle');
    const flyoutElement = await screen.findByTestId('flyout-article');

    expect(header).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    expect(buttonThemeToggle).toBeInTheDocument();
    expect(flyoutElement).toBeInTheDocument();
  });
});
