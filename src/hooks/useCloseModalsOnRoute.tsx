import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useModal from './useModal';

// close modals on route change
const useCloseModalsOnRouteChange = () => {
  const router = useRouter();
  const { setNavOpen, navOpen, error, setError, setSuccess, success } =
    useModal();

  useEffect(() => {
    if (navOpen) {
      setNavOpen(!navOpen);
    }

    if (success.show) {
      setSuccess({ show: false, message: '' });
    }

    if (error.show) {
      setError({ show: false, message: '' });
    }
  }, [router.asPath]);
};

export default useCloseModalsOnRouteChange;
