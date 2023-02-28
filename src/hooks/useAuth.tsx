import { AuthContext } from '@/context/authProvider';
import { useContext } from 'react';

function useAuth(): any {
  const value = useContext(AuthContext);
  return value;
}

export default useAuth;
