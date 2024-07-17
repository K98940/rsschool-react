import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '@components/pagination/paginationSlice';

export default configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});
