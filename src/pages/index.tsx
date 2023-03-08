import Head from 'next/head';
import Logo from '@/components/logo';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useCloseModalsOnRouteChange from '@/hooks/useCloseModalsOnRoute';

export default function Home() {
  const router = useRouter();
  const { auth } = useAuth();

  useCloseModalsOnRouteChange();

  return (
    <>
      <Head>
        <title>iDo</title>
        <meta name="description" content="To do list application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="h-screen bg-slate-100 ">
          <div className="flex pt-4 items-center">
            <div className="mb-3 ml-4  text-5xl ">
              <Logo />
            </div>
            {auth.accessToken ? (
              <div className="ml-auto text-md text-black font-medium">
                <button
                  className=" border border-black rounded-lg tracking-wider px-3 py-2 text-center mr-2 mb-2"
                  onClick={() => router.push('/lists')}
                >
                  Go to App
                </button>
              </div>
            ) : (
              <div className="ml-auto text-md text-black font-medium">
                <button
                  className=" border border-black rounded-lg tracking-wider px-3 py-2 text-center mr-2 mb-2"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </button>
                <button
                  className="ml-1 border border-black rounded-lg tracking-wider px-3 py-2 text-center mr-2 mb-2"
                  onClick={() => router.push('/auth/register')}
                >
                  Register
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center flex-col h-5/6">
            <div className="text-5xl sm:text-6xl tracking-wider max-w-80 text-center font-bold mb-6">
              <h2>
                Effortlessly organize your tasks with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                  {' '}
                  iDo
                </span>
              </h2>
            </div>
            <div className="text-md font-semibold max-w-80 text-center mb-4">
              <p>
                iDo is an elegant and intuitive todo application designed to
                help users streamline their tasks, goals, and priorities. With
                iDo, users can create custom lists, add tasks with due dates,
                and manage their day or week with ease.
              </p>
            </div>
            <div>
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 tracking-wider text-center mr-2 mb-2"
                onClick={() => router.push('/lists')}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
