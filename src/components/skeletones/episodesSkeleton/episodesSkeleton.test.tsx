import { render, screen } from '@testing-library/react';
import EpisodesSkeleton from './episodesSkeleton';

describe('EpisodesSkeleton component', () => {
  test('must render', () => {
    render(<EpisodesSkeleton />);

    expect(screen.getByTestId('skeleton-episodes')).toBeInTheDocument();
    expect(screen.getByText(/Select an episode/i)).toBeInTheDocument();
  });
});
