import { initialPagination, test_episode } from '@/helpers/constants';
import { EpisodeBase, EpisodesPayload, PaginationPayload } from '@/types/types';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialEpisodes: EpisodeBase[] = [test_episode];

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialPagination,
  reducers: {
    nextPage: (state) => {
      if (!state.lastPage) state.pageNumber += 1;
    },
    prevPage: (state) => {
      if (!state.firstPage) state.pageNumber -= 1;
    },
    updatePagination: (_, action: PaginationPayload) => action.payload,
  },
});

const episodesSlice = createSlice({
  name: 'episodes',
  initialState: initialEpisodes,
  reducers: {
    updateEpisodes: (_, action: EpisodesPayload) => action.payload,
  },
});

const episodesReducer = episodesSlice.reducer;
const paginationReducer = paginationSlice.reducer;

export default configureStore({
  reducer: {
    episodes: episodesReducer,
    pagination: paginationReducer,
  },
});
