import Layout from '@/components/layout';
import { ModalProvider } from '@/context/modalProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/authProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </AuthProvider>
  );
}
