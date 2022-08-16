import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../apiSlice'

import type { Upcoming, MovieType, Genre } from './types'

import config from '@/app/config'

type ArgType = {
  filter: string
}

const genreAdapter = createEntityAdapter({})

const initialState = genreAdapter.getInitialState()

function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [
        { id: 'LIST', type: tagType },
        ...resultsWithIds.map(({ id }) => ({ id, type: tagType })),
      ]
    : [{ id: 'LIST', type: tagType }]
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovie: builder.query<MovieType, string | number | undefined>({
      providesTags: (result) => [{ id: result?.id, type: 'Movie' }],
      query: (id) =>
        `movie/${id}/videos?api_key=${config.API_KEY}&language=en-US`,
    }),
    getMovieGenre: builder.query<any, void>({
      providesTags: (result) => {
        return [
          { id: 'LIST', type: 'Genre' },
          ...result.ids.map((id: any) => ({ id, type: 'Genre' })),
        ]
      },
      query: () => `/genre/movie/list?api_key=${config.API_KEY}&language=en-US`,
      transformResponse: (responseData: Genre) => {
        return genreAdapter.setAll(initialState, responseData.genres)
      },
    }),
    getMovies: builder.query<any, ArgType>({
      providesTags: (result) => providesList(result, 'Movie'),
      query: ({ filter }) =>
        `movie/${filter}?api_key=${config.API_KEY}&language=en-US&page=1`,
      transformResponse: (responseData: Upcoming) => {
        return responseData.results
      },
    }),
    getPopularMovies: builder.query<any, ArgType>({
      providesTags: (result) => providesList(result, 'Discover'),
      query: ({ filter }) =>
        `discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=${filter}&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`,
      transformResponse: (responseData: Upcoming) => {
        const payload = responseData.results.slice(0, 2)
        return payload
      },
    }),
    getSearchMovies: builder.query<any, ArgType>({
      providesTags: (result) => providesList(result, 'Movie'),
      query: ({ filter }) =>
        `search/movie?api_key=${config.API_KEY}&language=en-US&query=${filter}&page=1&include_adult=false`,
      transformResponse: (response: Upcoming) => {
        return response.results
      },
    }),
  }),
})

export const {
  useGetMovieQuery,
  useGetPopularMoviesQuery,
  useGetMoviesQuery,
  useGetMovieGenreQuery,
  useGetSearchMoviesQuery,
} = extendedApiSlice

// CREATE SELECTOR //

export const selectGenreResult =
  extendedApiSlice.endpoints.getMovieGenre.select()
// export const selectMoviesResult = extendedApiSlice.endpoints.getMovies.select()
// export const selectPopularMoviesResult =
//   extendedApiSlice.endpoints.getPopularMovies.select({
//     filter: 'revenue.desc',
//     page: 1,
//   })

const selectGenreData = createSelector(
  selectGenreResult,
  (genreResult) => genreResult.data
)

// const selectMoviesData = createSelector(
//   selectMoviesResult,
//   (moviesResult) => moviesResult.data
// )

// const selectPopularData = createSelector(
//   selectPopularMoviesResult,
//   (popularResult) => popularResult.data
// )

export const { selectAll: selectAllGenre, selectById: selectGenreById } =
  genreAdapter.getSelectors(
    (state: any) => selectGenreData(state) ?? initialState
  )

// export const {
//   selectAll: selectAllMovies,
//   selectById: selectMovieById,
//   selectIds: selectMovieIds,
// } = movieAdapter.getSelectors(
//   (state: any) => selectMoviesData(state) ?? initialState
// )

// export const { selectAll: selectPopularMovies } = movieAdapter.getSelectors(
//   (state: any) => selectPopularData(state) ?? initialState
// )
