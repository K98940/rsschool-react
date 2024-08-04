import NavElement from '../navElement/navElement';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/themeContextProvider';

const episode = {
  uid: 'EPMA0000001002',
  title: "'Til Death Do Us Part",
  titleGerman: 'Bis daß der Tod uns scheide',
  titleItalian: '',
  titleJapanese: '',
  series: {
    uid: 'SEMA0000073238',
    title: 'Star Trek: Deep Space Nine',
  },
  season: {
    uid: 'SAMA0000001741',
    title: 'DS9 Season 7',
  },
  seasonNumber: 7,
  episodeNumber: 18,
  productionSerialNumber: 40510,
  featureLength: 0,
  stardateFrom: 0,
  stardateTo: 0,
  yearFrom: 2375,
  yearTo: 2375,
  usAirDate: '1999-04-14',
  finalScriptDate: '',
};
const searchParams: { [key: string]: string | string[] | undefined } = { search: '' };
const params: {
  page: string;
  episode: string;
} = { page: '1', episode: '' };

describe('episodeCheckbox test', async () => {
  test('render component', async () => {
    render(
      <ThemeProvider>
        <NavElement episode={episode} params={params} searchParams={searchParams} />
      </ThemeProvider>,
    );

    const checkbox = screen.getByTestId('episode-checkbox');
    expect(checkbox).toBeInTheDocument();
  });
});
