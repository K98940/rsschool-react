import { Flyout } from './flyout';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/mocks/utils/utils';

describe('Flyout component', () => {
  test('should render flyout component with header "0 items are selected" and 2 buttons: "Unselect all" and "Download"', async () => {
    renderWithProviders(<Flyout />);

    const header = await screen.findByTestId('flyout-header');
    const buttonUnsellectAll = await screen.findByTestId('flyout-btn-unselectall');
    const buttonDownload = await screen.findByTestId('flyout-btn-download');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/0 items are selected/i);
    expect(buttonUnsellectAll).toBeInTheDocument();
    expect(buttonDownload).toBeInTheDocument();
  });
});
