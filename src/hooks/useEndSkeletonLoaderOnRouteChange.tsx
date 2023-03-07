import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useModal from './useModal';
import useSkeleton from './useSkeleton';

// end skeleton loader on route change
const useEndSkeletonLoaderOnRouteChange = () => {
  const router = useRouter();

  const { setListLoading, listLoading, navLoading, setNavLoading } =
    useSkeleton();

  useEffect(() => {
    if (listLoading) setListLoading(false);
    if (navLoading) setNavLoading(false);
  }, [router.asPath]);
};

export default useEndSkeletonLoaderOnRouteChange;
