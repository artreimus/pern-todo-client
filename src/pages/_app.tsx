import Layout from '@/components/layout';
import { ModalProvider } from '@/context/modalProvider';
import { SortProvider } from '@/context/sortProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/authProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <SortProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SortProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
