import { describe, test, expect } from 'vitest';
import EpisodesSkeleton from './episodesSkeleton';
import { render, screen } from '@testing-library/react';

describe('EpisodesSkeleton component', () => {
  test('must render', () => {
    render(<EpisodesSkeleton />);

    expect(screen.getByTestId('skeleton-episodes')).toBeInTheDocument();
    expect(screen.getByText(/Select an episode/i)).toBeInTheDocument();
  });
});
