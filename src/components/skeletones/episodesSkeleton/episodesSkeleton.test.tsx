import EpisodeSkeleton from './episodesSkeleton';
import { render, screen } from '@testing-library/react';

describe('EpisodeSkeleton component', () => {
  it('shoud render header', () => {
    render(<EpisodeSkeleton />);
    expect(screen.getByTestId('skeleton-title'));
  });
});
