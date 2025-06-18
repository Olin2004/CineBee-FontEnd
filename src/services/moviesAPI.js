import { api } from './apiConfig';
import { ENDPOINTS_TRENDING_MOVIES } from './endpointsAPI';
export const trendingMovies = async () => {
  return api.get(ENDPOINTS_TRENDING_MOVIES);
};