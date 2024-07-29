import { AppDispatch, RootState } from '@/store/store';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector, useStore } from 'react-redux';

export const useAppStore = useStore.withTypes();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
