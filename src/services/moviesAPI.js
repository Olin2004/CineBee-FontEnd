import { api } from './apiConfig';
import { ENDPOINTS_TRENDING_MOVIES } from './endpointsAPI';
export const trendingMovies = async () => {
  return api.get(ENDPOINTS_TRENDING_MOVIES);
};

export const moviesAllByLikesPaged = async (page, size) => {
  return api.get(ENDPOINTS_MOVIES_ALL_BY_LIKES_PAGED, { params: { page, size } });
};