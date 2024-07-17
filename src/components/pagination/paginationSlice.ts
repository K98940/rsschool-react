import { createSlice } from '@reduxjs/toolkit';
import { initialPagination } from '@/helpers/constants';
import { PaginationPayload, Selector } from '@/types/types';

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialPagination,
  reducers: {
    nextPage: (state) => {
      if (!state.lastPage) state.pageNumber += 1;
    },
    prevPage: (state) => {
      if (!state.firstPage) state.pageNumber -= 1;
    },
    update: (_, action: PaginationPayload) => action.payload,
  },
});

export const { nextPage, prevPage, update } = paginationSlice.actions;
export default paginationSlice.reducer;
export const selectLastPage: Selector<boolean> = (state) => state.pagination.lastPage;
export const selectTotalPage: Selector<number> = (state) => state.pagination.totalPages;
export const selectFirstPage: Selector<boolean> = (state) => state.pagination.firstPage;
export const selectPageNumber: Selector<number> = (state) => state.pagination.pageNumber;
