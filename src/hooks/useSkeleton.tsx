import { SkeletonContext } from '@/context/skeletonProvider';
import { useContext } from 'react';

function useSkeleton(): any {
  const value = useContext(SkeletonContext);
  return value;
}

export default useSkeleton;
