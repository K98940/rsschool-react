import Spinner from './spinner';
import { render, screen } from '@testing-library/react';

describe('Spinner component', () => {
  it('shoud render img element', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner-img'));
  });
});
