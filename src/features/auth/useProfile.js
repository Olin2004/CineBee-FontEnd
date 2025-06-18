import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/authSlice';

export const useProfile = () => {
  const dispatch = useDispatch();
  const { profile, isAuthenticated } = useSelector((state) => state.auth);

  // Gọi khi cần reload profile
  const reloadProfile = () => dispatch(fetchProfile());

  return { profile, isAuthenticated, reloadProfile };
};
