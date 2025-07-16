import axios from 'axios';
import { api } from './apiConfig';
import { ENDPOINTS_GET_BANER_ACTIVE, ENDPOINTS_ADD_BANNER } from './endpointsAPI';

export const addBanner = async (bannerData) => {                                                                                                             
     return api.post(ENDPOINTS_ADD_BANNER, bannerData, {
      withCredentials: true                                                                                                                                                      
     });
   };

export const getBannerActive = async () => {
  return api.get(ENDPOINTS_GET_BANER_ACTIVE);
};
