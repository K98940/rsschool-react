import { render, screen } from '@testing-library/react';
import ErrorPage1lvl from '../../app/error';
import ErrorPage2lvl from '../../app/page/error';
import ErrorPage3lvl from '../../app/page/[page]/episode/[episode]/error';

const reset = () => {};
const error = new Error('test error');

describe('ErrorPage component', () => {
  test('should render the 1_lvl error page', async () => {
    render(<ErrorPage1lvl error={error} reset={reset} />);

    const title = await screen.findByText(/test error/i);
    const button = await screen.findByText(/Try again/i);

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('should render the 2_lvl error page', async () => {
    render(<ErrorPage2lvl error={error} reset={reset} />);

    const title = await screen.findByText(/test error/i);
    const button = await screen.findByText(/Try again/i);

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('should render the 2_lvl error page', async () => {
    render(<ErrorPage3lvl error={error} reset={reset} />);

    const title = await screen.findByText(/test error/i);
    const button = await screen.findByText(/Try again/i);

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
