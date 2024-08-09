import CardEmpty from './cardEmpty';
import { render, screen, waitFor } from '@testing-library/react';

describe('Card component', async () => {
  test('should render Card component with data', async () => {
    render(<CardEmpty />);

    await waitFor(() => screen.findByText(/Found nothing/i));
    await waitFor(() => screen.findByTestId('cardempty-header'));
  });
});
