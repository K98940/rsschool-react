import { screen } from '@testing-library/react';
import { ErrorComponent } from './errorComponent';
import { renderWithProviders } from '@/mocks/utils/utils';

describe('ErrorComponent component', () => {
  test('should render Unknown Error', async () => {
    renderWithProviders(<ErrorComponent />);

    expect(await screen.findByTestId('error-header')).toBeInTheDocument();
  });

  test('should render Error', async () => {
    const error = new Error('here error');
    const jsx = ErrorComponent(error);
    renderWithProviders(jsx);

    expect(await screen.findByTestId('error-container')).toBeInTheDocument();
    expect(await screen.findByTestId('error-header')).toBeInTheDocument();
    expect(await screen.findByTestId('error-content')).toBeInTheDocument();
    expect(await screen.findByTestId('error-stack')).toBeInTheDocument();
  });
});
