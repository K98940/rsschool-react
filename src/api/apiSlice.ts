import { BASE_URL, PAGE_SIZE, paths } from '@/helpers/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetEpisodesQueryProps = { query: string; pageNumber: number };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: (episodeId: string) => `${paths.episode}${episodeId}`,
    }),
    getEpisodes: builder.query({
      query: ({ query, pageNumber }: GetEpisodesQueryProps) => ({
        url: `${paths.episodeSearch}?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: `title=${query}`,
      }),
    }),
  }),
});

export const { useGetDetailsQuery, useGetEpisodesQuery } = apiSlice;
