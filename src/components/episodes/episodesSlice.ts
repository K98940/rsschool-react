import { createSlice, Selector } from '@reduxjs/toolkit';
import { EpisodeBase, EpisodesPayload, EpisodesState } from '@/types/types';

const initialState: EpisodeBase[] = [];

const episodesSlice = createSlice({
  name: 'episodes',
  initialState: initialState,
  reducers: {
    updateEpisodes: (_, action: EpisodesPayload) => action.payload,
  },
});

export default episodesSlice.reducer;
export const { updateEpisodes } = episodesSlice.actions;
export const selectEpisodes: Selector<EpisodesState, EpisodeBase[]> = (state) => state.episodes;
