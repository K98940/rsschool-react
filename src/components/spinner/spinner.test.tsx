import Spinner from './spinner';
import { render, screen } from '@testing-library/react';

describe('Spinner component', () => {
  test('should render Spinner component', async () => {
    render(<Spinner />);

    const img = await screen.findByTestId('spinner-img');
    expect(img).toBeInTheDocument();
  });
});
