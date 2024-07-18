import { createSlice, Selector } from '@reduxjs/toolkit';
import { EpisodeBase, EpisodesList, EpisodesPayload, EpisodesState, EpisodesTogglePayload } from '@/types/types';

const initialState: EpisodesList = {
  currentList: [],
  checkedList: [],
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState: initialState,
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

export default episodesSlice.reducer;
export const { updateEpisodes, checkedEpisode, uncheckedEpisode } = episodesSlice.actions;
export const selectEpisodes: Selector<EpisodesState, EpisodeBase[]> = (state) => state.episodes.currentList;
export const isCheckedEpisode =
  (id: string): Selector<EpisodesState, boolean> =>
  (state) =>
    Boolean(state.episodes.checkedList?.find((episode) => episode.uid === id));
