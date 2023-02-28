import axios from '@/api/axios';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React from 'react';

type NavUserProps = {
  email: string;
};

const NavUser: React.FC<NavUserProps> = ({ email }) => {
  const router = useRouter();
  const { setAuth } = useAuth();
  const handleLogout = async () => {
    try {
      const response = await axios.get('auth/logout', {
        withCredentials: true,
      });
      setAuth({});
      router.push('/');
    } catch (error) {
      console.error('handleLogout', error);
    }
  };

  return (
    <div className="border py-3 px-2 rounded-sm mb-3 w-full flex items-center">
      <div className="flex items-center">
        <div className="rounded-full text-center py-1 px-3 sm:py-2 sm:px-4 uppercase bg-green-300 font-bold">
          <p>{email[0]}</p>
        </div>
        <div className="ml-3 font-medium tracking-wide">{email}</div>
      </div>
      <div className="ml-auto font-bold text-xs text-red-600">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
export default NavUser;
