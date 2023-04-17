import useAuth from '@/hooks/useAuth';
import useRefreshToken from '@/hooks/useRefreshToken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';

const AuthModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const router = useRouter();

  useEffect(() => {
    if (auth.accessToken) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (!auth.accessToken) refresh();
  }, []);

  return (
    <>
      {show && (
        <>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <div className="flex items-center min-h-4/5 px-4 py-8">
              <div className="relative w-full p-4 mx-auto bg-white rounded-md shadow-lg max-w-[1000px] w-4/5">
                <div className="sm:flex">
                  <div className="mt-2 w-full">
                    <div className="md:flex items-center flex-col justify-center">
                      <div className="rounded-full border-2 border-gray-500 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto text-5xl text-gray-600 mb-3">
                        <AiOutlineLogin />
                      </div>
                      <div className="text-center">
                        <p className="font-bold">
                          Please login or register to continue using the
                          application
                        </p>
                        <p className="text-sm text-gray-700 mt-1 mb-2 text-justify">
                          If you have already created an account, please click
                          on the "Login" button to sign in with your
                          credentials. If you have not yet registered, please
                          click on the "Register" button to create a new
                          account.
                        </p>
                      </div>
                    </div>
                    <div className="text-center md:flex justify-center">
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                        onClick={() => router.push('/auth/login')}
                      >
                        Login
                      </button>
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gradient-to-r from-pink-500 to-yellow-500  rounded-lg font-semibold text-sm text-white mt-4
          md:mt-0 md:order-1"
                        onClick={() => router.push('/auth/register')}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
                <></>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AuthModal;
