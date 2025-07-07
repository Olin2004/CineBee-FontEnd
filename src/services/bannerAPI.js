import { api } from './apiConfig';
import { ENDPOINTS_GET_BANER_ACTIVE } from './endpointsAPI';

export const getBannerActive = async () => {
  return api.get(ENDPOINTS_GET_BANER_ACTIVE);
};
