import { ModalContext } from '@/context/modalProvider';
import { useContext } from 'react';

function useModal(): any {
  const value = useContext(ModalContext);
  return value;
}

export default useModal;
