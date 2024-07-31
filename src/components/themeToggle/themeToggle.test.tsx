import Pages from '@/pages';
import { Main } from '../main/main';
import Header from '../header/header';
import { setupServer } from 'msw/node';
import { Flyout } from '../flyout/flyout';
import mockRouter from 'next-router-mock';
import { Themes } from '@/context/themeContext';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EpisodeBaseResponse } from '@/types/types';
import data from '../../mocks/data/episodeBaseResponse0';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import { afterAll, afterEach, beforeAll, describe, expect, test, vitest } from 'vitest';

const episodes = data as unknown as EpisodeBaseResponse;
const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);
const light: Themes = 'light';
const dark: Themes = 'dark';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
vitest.mock('next/router', () => require('next-router-mock'));

describe('ThemeToggle component', () => {
  test('Should render button for theme selection', async () => {
    mockRouter.push('/');
    renderWithProviders(
      <>
        <Header />
        <Main episodes={episodes.episodes} />
        <Flyout />
      </>,
    );

    const buttonThemeToggle = await screen.findByTestId('button-theme-toggle');
    const AppHeader = await screen.findByTestId('app-header');

    expect(buttonThemeToggle).toBeInTheDocument();
    expect(buttonThemeToggle).toHaveClass(/buttonThemeToggle/i);
    expect(buttonThemeToggle).not.toHaveClass(/buttonDarkMode/i);
    expect(AppHeader).toHaveAttribute('data-theme', light);
  });
  test('Click on the button should select `dark` theme and next click switch to `light`', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Pages />
        <Flyout />
      </>,
    );

    const buttonThemeToggle = await screen.findByTestId('button-theme-toggle');
    const AppHeader = await screen.findByTestId('app-header');

    await user.click(buttonThemeToggle);
    expect(buttonThemeToggle).toHaveClass(/buttonDarkMode/i);
    expect(AppHeader).toHaveAttribute('data-theme', dark);

    await user.click(buttonThemeToggle);
    expect(buttonThemeToggle).not.toHaveClass(/buttonDarkMode/i);
    expect(AppHeader).toHaveAttribute('data-theme', light);
  });
});
