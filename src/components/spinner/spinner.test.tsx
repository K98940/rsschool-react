import Spinner from './spinner';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '@/mocks/utils/utils';

describe('Spinner component', () => {
  test('should render the Spinner', async () => {
    renderWithProviders(<Spinner />);

    const img = await screen.findByTestId(/spinner-img/i);

    expect(img).toBeInTheDocument();
  });
});
