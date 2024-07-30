import Layout from '@/pages/layout';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '@/mocks/utils/utils';

describe('Layout component', () => {
  test('should render Layout component', async () => {
    renderWithProviders(
      <>
        <Layout />
      </>,
    );

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
