import { ModalType } from '@/context/modalProvider';
import useModal from '@/hooks/useModal';
import React, { useEffect } from 'react';
import ErrorModal from '../modal/Error';
import SuccessModal from '../modal/Success';

type Layout = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Layout> = ({ children }) => {
  const { error, success, setError, setSuccess } = useModal();

  useEffect(() => {
    if (success?.show) {
      setError((prev: ModalType) => ({ ...prev, show: false }));
    }

    if (error?.show) {
      setSuccess((prev: ModalType) => ({ ...prev, show: false }));
    }
  }, [success?.show, error?.show]);

  return (
    <>
      {success?.show && <SuccessModal />}
      {error?.show && <ErrorModal />}
      {children}
    </>
  );
};
export default Layout;
