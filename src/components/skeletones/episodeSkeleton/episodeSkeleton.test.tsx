import EpisodeSkeleton from './episodeSkeleton';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('EpisodesSkeleton component', () => {
  test('must render', () => {
    render(<EpisodeSkeleton />);

    expect(screen.getByTestId('skeleton-episode')).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
