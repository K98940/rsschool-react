import { Index } from '.';
import { render, screen } from '@testing-library/react';

describe('Index component', () => {
  it('shoud render header', () => {
    render(<Index />);
    expect(screen.getByTestId('index-title'));
  });
});
