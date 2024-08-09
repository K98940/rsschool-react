import { Index } from './index';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/mocks/utils/utils';

describe('Flyout component', () => {
  test('should render flyout component with header "0 items are selected" and 2 buttons: "Unselect all" and "Download"', async () => {
    renderWithProviders(<Index />);

    const header = await screen.findByTestId('index-title');

    expect(header).toHaveTextContent(/Select episode/i);
  });
});
