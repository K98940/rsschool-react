import { RootState } from '@/store/store';
import { Pagination } from '@/types/types';
import { initialPagination } from '@/helpers/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  pagination: Pagination;
  query: string;
};

const initialState: InitialState = {
  pagination: initialPagination,
  query: '',
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.pageNumber = action.payload;
    },
  },
});

export default episodesSlice.reducer;
export const selectQuery = (state: RootState) => state.episodes.query;
export const selectPageNumber = (state: RootState) => state.episodes.pagination?.pageNumber;
export const { setQuery, setPage } = episodesSlice.actions;
