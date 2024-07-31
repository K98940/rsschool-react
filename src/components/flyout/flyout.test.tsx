import { Flyout } from './flyout';
import { Main } from '../main/main';
import Header from '../header/header';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { EpisodeBaseResponse } from '@/types/types';
import userEvent from '@testing-library/user-event';
import data from '../../mocks/data/episodeBaseResponse0';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import { afterAll, afterEach, beforeAll, describe, expect, test, vitest } from 'vitest';

const episodes = data as unknown as EpisodeBaseResponse;
const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => {
  vitest.mock('next/router', () => require('next-router-mock'));
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Flyout component', () => {
  test('should render flyout component with header and 2 buttons', async () => {
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const header = await screen.findByTestId('flyout-header');
    const buttonUnsellectAll = await screen.findByTestId('flyout-btn-unselectall');
    const buttonDownload = await screen.findByTestId('flyout-btn-download');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/0 items are selected/i);
    expect(buttonUnsellectAll).toBeInTheDocument();
    expect(buttonDownload).toBeInTheDocument();
  });
  test('The flyout element should contain number of selected elements', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);
    const header = await screen.findByTestId('flyout-header');
    expect(header).toHaveTextContent(/3 items are selected/i);
  });
  test('Select 3 episode`s checkbox, then uncheck 2. It should change text header', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);

    const header = await screen.findByTestId('flyout-header');
    expect(header).toHaveTextContent(/1 items are selected/i);
  });
  test('When at least 1 item has been selected, the flyout element should appear at the bottom', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const flyout = await screen.findByTestId('flyout-article');
    expect(flyout).toHaveClass(/__outOfView/i);

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    await user.click(checkboxes[0]);
    expect(flyout).not.toHaveClass(/__outOfView/i);
  });
  test('select 3 episode`s checkbox. Then unselect all checkboxes. It should add class `.__outOfView`', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const flyout = await screen.findByTestId('flyout-article');
    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);
    expect(flyout).toHaveClass(/__outOfView/i);
  });
  test('When "Unselect all" button is clicked, all the selected items should be unselected and the flyout should be removed from the page', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const flyout = await screen.findByTestId('flyout-article');
    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    const btnUnselectAll = await screen.findByTestId('flyout-btn-unselectall');

    await Promise.all(checkboxes.map(async (checkbox) => await user.click(checkbox)));
    await user.click(btnUnselectAll);
    expect(flyout).toHaveClass(/__outOfView/i);
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });
  test('When user navigates to the next page, and then goes back, previously selected items should be shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    const buttonPrevPage = await screen.findByTestId('pagination-btn-prev');
    const buttonNextPage = await screen.findByTestId('pagination-btn-next');

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);
    await user.click(buttonNextPage);
    await user.click(buttonPrevPage);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[3]).toBeChecked();
  });
});
