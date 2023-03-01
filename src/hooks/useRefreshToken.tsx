import useAuth from './useAuth';
import axios from '../api/axios';
import { ContextValueType } from '@/context/authProvider';
import setErrorModal from '@/utils/setErrorModal';
import useModal from './useModal';

const useRefreshToken = () => {
  const { setAuth }: ContextValueType = useAuth();
  const { setError } = useModal();

  const refresh = async () => {
    try {
      const response = await axios.get('/auth/refresh', {
        withCredentials: true,
      });

      setAuth((prev) => {
        return {
          accessToken: response.data.accessToken,
          user_id: response.data.user_id,
          email: response.data.email,
        };
      });

      return response.data.accessToken;
    } catch (error) {
      setError(setErrorModal(error));
    }
  };
  return refresh;
};
export default useRefreshToken;
