import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from './apiConfig';

// Create API slice with RTK Query
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Profile', 'Movies', 'Trending'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Profile'],
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['Profile'],
      transformResponse: (response) => response.data,
    }),

    getCaptcha: builder.query({
      query: () => '/auth/captcha',
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),

    // Movies endpoints
    getTrendingMovies: builder.query({
      query: () => '/movies/trending',
      providesTags: ['Trending'],
      transformResponse: (response) => response.data,
    }),

    getMovies: builder.query({
      query: (params) => ({
        url: '/movies',
        params,
      }),
      providesTags: ['Movies'],
      transformResponse: (response) => response.data,
    }),

    getMovieById: builder.query({
      query: (id) => `/movies/${id}`,
      providesTags: (result, error, id) => [{ type: 'Movies', id }],
      transformResponse: (response) => response.data,
    }),
  }),
});

// Export hooks for use in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useGetCaptchaQuery,
  useGetTrendingMoviesQuery,
  useGetMoviesQuery,
  useGetMovieByIdQuery,
} = apiSlice;
