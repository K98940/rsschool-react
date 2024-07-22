import api from '@/api/api';
import { RootState } from '@/store/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Details, EpisodeFull, EpisodeFullResponse, Status } from '@/types/types';

const initialState: Details = {
  data: {
    season: {
      title: '',
    },
    series: {
      title: '',
    },
    title: '',
    uid: '',
    usAirDate: '',
  },
  status: 'idle',
  error: null,
};

export const fetchDetails = createAsyncThunk('details/fetchDetails', async (id: string) => {
  const response = (await api.getEpisode(id)) as EpisodeFullResponse;
  return response.episode;
});

const detailSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<EpisodeFull>) => {
      state.data = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.status = 'submitting';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default detailSlice.reducer;
export const { updateDetails, setStatus } = detailSlice.actions;
export const selectDetails = (state: RootState) => state.details.data;
export const selectStatus = (state: RootState) => state.details.status;
