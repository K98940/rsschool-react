import { apiSlice } from '@/api/apiSlice';
import flyoutReducer from '@components/flyout/flyoutSlice';
import episodesReducer from '@components/episodes/episodesSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  flyout: flyoutReducer,
  episodes: episodesReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(apiSlice.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
