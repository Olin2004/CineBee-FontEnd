import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/authSlice';

export const useProfile = () => {
  const dispatch = useDispatch();
  const { profile, isAuthenticated } = useSelector((state) => state.auth);

  // Call when profile needs to be reloaded
  const reloadProfile = () => dispatch(fetchProfile());

  return { profile, isAuthenticated, reloadProfile };
};
