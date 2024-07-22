import { RootState } from '@/store/store';
import { EpisodeBase } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: EpisodeBase[] = [];

const flyoutSlice = createSlice({
  name: 'flyout',
  initialState,
  reducers: {
    addEpisode: (state, action: PayloadAction<EpisodeBase>) => {
      state.push(action.payload);
    },
    removeEpisode: (state, action: PayloadAction<EpisodeBase>) =>
      state.filter((episode) => episode.uid !== action.payload.uid),
    clearList: () => [],
  },
});

export default flyoutSlice.reducer;
export const { addEpisode, removeEpisode, clearList } = flyoutSlice.actions;
export const selectCheckedCount = (state: RootState) => state.flyout.length;
export const selectCheckedEpisodes = (state: RootState) => state.flyout;
export const isCheckedEpisode = (id: string) => (state: RootState) =>
  Boolean(state.flyout?.find((episode) => episode.uid === id));
