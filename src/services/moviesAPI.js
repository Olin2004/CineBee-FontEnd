import { api } from './apiConfig';
import {
  ENDPOINTS_ADD_MOVIE_NEW,
  ENDPOINTS_MOVIES_ALL_BY_LIKES_PAGED,
  ENDPOINTS_SEARCH_MOVIES,
  ENDPOINTS_TRENDING_MOVIES,
} from './endpointsAPI';

export const trendingMovies = async () => {
  return api.get(ENDPOINTS_TRENDING_MOVIES);
};

export const moviesAllByLikesPaged = async (page, size) => {
  return api.get(ENDPOINTS_MOVIES_ALL_BY_LIKES_PAGED, { params: { page, size } });
};

export const searchMovies = async (title) => {
  const res = await api.get(ENDPOINTS_SEARCH_MOVIES, { params: { title } });
  return res.data;
};

export const addMovieNew = async (movieData, posterFile) => {
  const formData = new FormData();
  formData.append('info', JSON.stringify(movieData));
  if (posterFile) {
    formData.append('posterImageFile', posterFile);
  }
  const accessToken = localStorage.getItem('accessToken'); 

  return api.post(ENDPOINTS_ADD_MOVIE_NEW, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateMovie = async (movieId, movieData, posterFile) => {
  const formData = new FormData();
  formData.append('info', JSON.stringify(movieData));
  if (posterFile) {
    formData.append('posterImageFile', posterFile);
  }
  const accessToken = localStorage.getItem('accessToken');
  return api.post(`/movies/update-film?id=${movieId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

//
