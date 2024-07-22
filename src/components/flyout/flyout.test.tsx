import { Flyout } from './flyout';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Flyout component', () => {
  test('should render flyout component with header "0 items are selected"', async () => {
    renderWithProviders(<Flyout />);

    const header = await screen.findByTestId('flyout-header');
    expect(header).toHaveTextContent(/0 items are selected/i);
  });
  test('select 3 episode`s checkbox should change text header to "3 items are selected"', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Flyout />);

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);
    const header = await screen.findByTestId('flyout-header');
    expect(header).toHaveTextContent(/3 items are selected/i);
  });
  test('select 3 episode`s checkbox, then uncheck 2. It should change text header to "1 items are selected"', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Flyout />);

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);

    const header = await screen.findByTestId('flyout-header');
    expect(header).toHaveTextContent(/1 items are selected/i);
  });
  test('select 3 episode`s checkbox. It should remove class `.__outOfView`', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Flyout />);

    const flyout = await screen.findByTestId('flyout-article');
    expect(flyout).toHaveClass(/__outOfView/i);

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);
    expect(flyout).not.toHaveClass(/__outOfView/i);
  });
  test('select 3 episode`s checkbox. Then unselect all checkboxes. It should add class `.__outOfView`', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Flyout />);

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
  test('select 3 episode`s checkbox. Then click button `Unselect all`. It should add class `.__outOfView`', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Flyout />);

    const flyout = await screen.findByTestId('flyout-article');
    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    const btnUnselectAll = await screen.findByTestId('flyout-btn-unselectall');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[3]);

    await user.click(btnUnselectAll);
    expect(flyout).toHaveClass(/__outOfView/i);
  });
});
