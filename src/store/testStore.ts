import { configureStore, createSlice } from '@reduxjs/toolkit';
import { initialPagination, test_episode } from '@/helpers/constants';
import { EpisodesList, EpisodesPayload, EpisodesTogglePayload, PaginationPayload } from '@/types/types';

const initialEpisodes: EpisodesList = {
  currentList: [test_episode],
  checkedList: [test_episode],
};

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
    updateEpisodes: (state, action: EpisodesPayload) => {
      state.currentList = action.payload;
    },
    checkedEpisode: (state, action: EpisodesTogglePayload) => {
      const episode = state.currentList.find((episode) => episode.uid === action.payload);
      episode && state.checkedList.push(episode);
    },
    uncheckedEpisode: (state, action: EpisodesTogglePayload) => {
      const filtered = state.checkedList.filter((episode) => episode.uid !== action.payload);
      state.checkedList = filtered;
    },
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
