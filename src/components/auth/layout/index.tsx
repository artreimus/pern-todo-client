import React, { useState } from 'react';
import axios from '@/api/axios';
import Logo from '@/components/logo';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import setErrorModal from '@/utils/setErrorModal';
import setSuccessModal from '@/utils/setSuccessModal';

type TextInput = { email: string; password: string };

type AuthLayoutProps = {
  title?: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ title }) => {
  const [textInputs, setTextInputs] = useState<TextInput>({
    email: '',
    password: '',
  });

  const route =
    title === 'register'
      ? { route: 'Login', message: 'Already have an account?' }
      : { route: 'Register', message: 'Dont have an account yet? ' };

  const { setAuth } = useAuth();

  const { setSuccess, setError } = useModal();
  const router = useRouter();

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = {};
      if (title === 'login') {
        response = await login(textInputs);
      } else if (title === 'register') {
        response = await register(textInputs);
      }

      if (!response)
        throw new Error('An error was encountered while submitting the form');

      const { accessToken, user_id }: any = response;
      const { email } = textInputs;
      setAuth({ email, accessToken, user_id });
      setSuccess(setSuccessModal(`${title} successful`));
      router.push('/lists');
    } catch (error) {
      setError(setErrorModal(error));
    }
  };

  const login = async ({ email, password }: TextInput) => {
    const response = await axios.post(
      'auth/login',
      JSON.stringify({ email, password }),
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );

    return response?.data;
  };

  const register = async ({ email, password }: TextInput) => {
    const response = await axios.post(
      'auth/register',
      JSON.stringify({ email, password }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      }
    );

    return response?.data;
  };

  return (
    <div className="h-screen">
      <div className="mt-5 ml-5 justify-self-auto">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="border-2 border-solid border-black rounded w-5/6 max-w-xl mx-auto my-20 py-5 px-10">
        <h2 className="text-5xl font-semibold mb-5 text-center capitalize">
          {title ?? 'Form'}
        </h2>
        <form className="font-semibold text-lg w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={textInputs.email}
              onChange={onTextChange}
              className="font-light border border-solid border-black rounded py-1 px-2"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={textInputs.password}
              onChange={onTextChange}
              className="font-light border border-solid border-black rounded py-1 px-2"
            />
          </div>
          <div className="flex justify-center">
            <button
              className={`border border-white border-solid rounded-md px-4 py-2 max-w-xs w-4/6  capitalize tracking-wider text-white font-semibold bg-gradient-to-r ${
                title === 'login'
                  ? 'from-green-400 to-blue-500'
                  : 'from-pink-500 to-yellow-500'
              } `}
            >
              {title ?? 'Submit'}
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
          <p>
            {route.message}{' '}
            <span>
              <Link
                href={`/auth/${route.route.toLowerCase()}`}
                className="font-bold"
              >
                {route.route}
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
