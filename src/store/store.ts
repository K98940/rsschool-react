import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailsReducer from '@components/card/detailSlice';
import flyoutReducer from '@components/flyout/flyoutSlice';
import episodesReducer from '@components/episodes/episodesSlice';

const rootReducer = combineReducers({
  flyout: flyoutReducer,
  details: detailsReducer,
  episodes: episodesReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
