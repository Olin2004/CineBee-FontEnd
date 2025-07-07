import { api } from './apiConfig';
import {
  ENDPOINTS_ADD_MOVIE_NEW,
  ENDPOINTS_DELETE_MOVIE,
  ENDPOINTS_GET_LIST_MOVIES,
  ENDPOINTS_SEARCH_MOVIES,
  ENDPOINTS_TRENDING_MOVIES,
  ENDPOINTS_UPDATE_MOVIE,
} from './endpointsAPI';

export const trendingMovies = async () => {
  return api.get(ENDPOINTS_TRENDING_MOVIES);
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

  return api.post(ENDPOINTS_ADD_MOVIE_NEW, formData, {
    withCredentials: true,
  });
};

export const updateMovie = async (movieId, movieData, posterFile) => {
  const formData = new FormData();
  if (posterFile) {
    formData.append('info', JSON.stringify(movieData));
    formData.append('posterImageFile', posterFile);
  } else if (movieData.posterUrl && Object.keys(movieData).length === 1) {
    formData.append('info', JSON.stringify({ posterUrl: movieData.posterUrl }));
  } else {
    formData.append('info', JSON.stringify(movieData));
  }
  return api.post(`${ENDPOINTS_UPDATE_MOVIE}?id=${movieId}`, formData, {
    withCredentials: true,
  });
};

//http://localhost:8080/api/movies/list-movies?page=2&size=20
export const getListMovies = async (page, size) => {
  return api.get(ENDPOINTS_GET_LIST_MOVIES, {
    params: { page, size },
    withCredentials: true,
  });
};

export const deleteMovie = async (movieId) => {
  return api.post(
    `${ENDPOINTS_DELETE_MOVIE}?id=${movieId}`,
    {},
    {
      withCredentials: true,
    }
  );
};
