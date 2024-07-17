import { initialPagination } from '@/helpers/constants';
import { createSlice, Selector } from '@reduxjs/toolkit';
import { PaginationPayload, PaginationState } from '@/types/types';

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
    updatePagination: (_, action: PaginationPayload) => action.payload,
  },
});

export default paginationSlice.reducer;
export const { nextPage, prevPage, updatePagination } = paginationSlice.actions;
export const selectLastPage: Selector<PaginationState, boolean> = (state) => state.pagination.lastPage;
export const selectTotalPage: Selector<PaginationState, number> = (state) => state.pagination.totalPages;
export const selectFirstPage: Selector<PaginationState, boolean> = (state) => state.pagination.firstPage;
export const selectPageNumber: Selector<PaginationState, number> = (state) => state.pagination.pageNumber;
