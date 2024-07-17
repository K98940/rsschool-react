import { configureStore } from '@reduxjs/toolkit';
import episodesReducer from '@components/episodes/episodesSlice';
import paginationReducer from '@components/pagination/paginationSlice';

export default configureStore({
  reducer: {
    episodes: episodesReducer,
    pagination: paginationReducer,
  },
});
