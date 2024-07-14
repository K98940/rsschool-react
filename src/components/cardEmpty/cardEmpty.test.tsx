import CardEmpty from './cardEmpty';
import { render, screen } from '@testing-library/react';

describe('CardEmpty component', () => {
  it('shoud render header with text "Found nothing"', () => {
    render(<CardEmpty />);
    expect(screen.getByTestId('cardempty-header'));
  });
});
