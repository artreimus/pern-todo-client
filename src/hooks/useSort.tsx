import { SortContext } from '@/context/sortProvider';
import { useContext } from 'react';

function useSort(): any {
  const value = useContext(SortContext);
  return value;
}

export default useSort;
