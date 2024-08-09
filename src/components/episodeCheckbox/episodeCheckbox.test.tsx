import { screen } from '@testing-library/react';
import { EpisodeCheckbox } from './episodeCheckbox';
import { userEvent } from '@testing-library/user-event';
import { EpisodeBaseResponse } from '@/types/types';
import data from '../../mocks/data/episodeBaseResponse0';
import { renderWithProviders } from '@/mocks/utils/utils';

const episodeBaseResponse = data as unknown as EpisodeBaseResponse;
const episodeBase = episodeBaseResponse.episodes[0];

describe('EpisodeCheckbox component', () => {
  test('should render EpisodeCheckbox component', async () => {
    renderWithProviders(<EpisodeCheckbox episode={episodeBase} />);

    const checkbox = await screen.findByTestId('episode-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('should click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EpisodeCheckbox episode={episodeBase} />);

    const checkbox = await screen.findByTestId('episode-checkbox');
    await user.click(checkbox);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
