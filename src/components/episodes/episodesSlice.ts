import api from '@/api/api';
import { RootState } from '@/store/store';
import { initialPagination } from '@/helpers/constants';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EpisodeBase, EpisodeBaseResponse, Pagination, Status } from '@/types/types';

type FetchEpisodesProps = {
  query: string;
  page?: number;
};

type InitialState = {
  data: EpisodeBase[];
  pagination: Pagination;
  query: string;
  status: Status;
  error: string;
};

const initialState: InitialState = {
  data: [],
  pagination: initialPagination,
  query: '',
  status: 'idle',
  error: '',
};

export const fetchEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes',
  async ({ query, page = 0 }: FetchEpisodesProps) => {
    const response = (await api.searchEpisodes(query, page)) as EpisodeBaseResponse;
    return response;
  },
);

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    updateEpisodes: (state, action: PayloadAction<EpisodeBase[]>) => {
      state.data = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    nextPage: (state) => {
      if (!state.pagination.lastPage && state.status !== 'submitting') state.pagination.pageNumber += 1;
    },
    prevPage: (state) => {
      if (!state.pagination.firstPage && state.status !== 'submitting') state.pagination.pageNumber -= 1;
    },
    updatePagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
  },
  extraReducers(biulder) {
    biulder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = 'submitting';
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.episodes;
        state.pagination = action.payload.page;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export default episodesSlice.reducer;
export const selectEpisodes = (state: RootState) => state.episodes;
export const selectQuery = (state: RootState) => state.episodes.query;
export const selectStatus = (state: RootState) => state.episodes.status;
export const selectLastPage = (state: RootState) => state.episodes.pagination?.lastPage;
export const selectFirstPage = (state: RootState) => state.episodes.pagination?.firstPage;
export const selectTotalPage = (state: RootState) => state.episodes.pagination?.totalPages;
export const selectPageNumber = (state: RootState) => state.episodes.pagination?.pageNumber;
export const { updateEpisodes, setQuery, setStatus, nextPage, prevPage, updatePagination } = episodesSlice.actions;
