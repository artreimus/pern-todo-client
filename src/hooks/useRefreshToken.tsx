import useAuth from './useAuth';
import axios from '../api/axios';
import { ContextValueType } from '@/context/authProvider';

const useRefreshToken = () => {
  const { setAuth }: ContextValueType = useAuth();

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
      console.error('refresh', error);
    }
  };
  return refresh;
};
export default useRefreshToken;
