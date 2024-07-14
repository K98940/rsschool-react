import Header from './header';
import { Status } from '@/types/types';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const onChange = vi.fn(() => 'onChange');
const onReset = vi.fn(() => 'onReset');
const onSearch = vi.fn(() => 'onSearch');
const TEST_QUERY = 'test';

describe('Header component', () => {
  const renderComponent = (query: string, status: Status = 'idle') => {
    return {
      snapshot: render(
        <Header
          query={query}
          handleQueryChange={onChange}
          handleQueryReset={onReset}
          handleSearch={onSearch}
          status={status}
        />,
      ),
      searchInput: screen.getByTestId('search-input'),
      resetButton: screen.queryByTestId('reset-btn'),
      searchButton: screen.getByTestId('search-btn'),
    };
  };

  it('Header snapshot with provided search query', () => {
    const { snapshot } = renderComponent(TEST_QUERY);
    expect(snapshot).toMatchSnapshot();
  });

  it('Header snapshot with empty search query', () => {
    const { snapshot } = renderComponent('');
    expect(snapshot).toMatchSnapshot();
  });

  it('Header snapshot with status === "submitting"', () => {
    const { snapshot } = renderComponent('');
    expect(snapshot).toMatchSnapshot();
  });

  it('click Search button should call onSearch callback in the first time', async () => {
    const { searchButton } = renderComponent(TEST_QUERY);
    const user = userEvent.setup();

    await user.click(searchButton);
    expect(onSearch).toBeCalledTimes(1);
  });

  it('press keyboard Enter button should call onSearch callbackin the second time', async () => {
    renderComponent(TEST_QUERY);
    const user = userEvent.setup();

    await user.keyboard('[Enter]');
    expect(onSearch).toBeCalledTimes(2);
  });

  it('click Reset button should call onReset callback', async () => {
    const { resetButton } = renderComponent(TEST_QUERY);
    const user = userEvent.setup();

    expect(resetButton).toBeInTheDocument();
    if (!resetButton) throw new Error();
    await user.click(resetButton);
    expect(onReset).toHaveBeenCalled();
  });

  it('typing in the search input should call onChange callback', async () => {
    const { searchInput } = renderComponent(TEST_QUERY);
    const user = userEvent.setup();

    await user.type(searchInput, 'aaa');
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
