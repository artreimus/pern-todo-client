import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useModal from './useModal';
import useSkeleton from './useSkeleton';

// close modals on route change
const useCloseModalsOnRouteChange = () => {
  const router = useRouter();
  const { setNavOpen, navOpen, error, setError, setSuccess, success } =
    useModal();

  const { setListLoading, listLoading } = useSkeleton();

  useEffect(() => {
    if (navOpen) {
      setNavOpen(!navOpen);
    }

    if (success?.show) {
      setSuccess({ show: false, message: '' });
    }

    if (error?.show) {
      setError({ show: false, message: '' });
    }

    if (listLoading) setListLoading(false);
  }, [router.asPath]);
};

export default useCloseModalsOnRouteChange;
