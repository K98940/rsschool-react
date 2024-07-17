import store from '../../store/store';
import { Provider } from 'react-redux';
import { Pagination } from './pagination';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Pagination component', () => {
  const renderComponent = () => {
    return {
      snapshot: render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['http://localhost:5173/?search=one&page=1']}>
            <Pagination />
          </MemoryRouter>
        </Provider>,
      ),
      btnPrev: screen.getByTestId('pagination-btn-prev'),
      btnNext: screen.getByTestId('pagination-btn-next'),
    };
  };

  it('should render button Prev', async () => {
    const { btnPrev } = renderComponent();

    expect(btnPrev).toBeInTheDocument();
  });

  it('should render button Next', async () => {
    const { btnNext } = renderComponent();

    expect(btnNext).toBeInTheDocument();
  });
});
