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
        <div className="flex justify-center items-center flex-col h-screen">
          <div className="mb-5">
            <Logo />
          </div>
          {auth.accessToken ? (
            <div>
              <button
                className="border px-6 py-3"
                onClick={() => router.push('/lists')}
              >
                Go to App
              </button>
            </div>
          ) : (
            <div>
              <button
                className="border mr-5 px-6 py-3"
                onClick={() => router.push('/auth/login')}
              >
                Login
              </button>
              <button
                className="border px-6 py-3"
                onClick={() => router.push('/auth/register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </>
    </>
  );
}
