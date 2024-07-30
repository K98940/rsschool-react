import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/mocks/utils/utils';
import { describe, expect, test } from 'vitest';
import CardEmpty from './cardEmpty';

describe('CardEmpty component', () => {
  test('should render the empty card', async () => {
    renderWithProviders(<CardEmpty />);

    const title = await screen.findByText(/Select an episode.../i);

    expect(title).toBeInTheDocument();
  });
});
