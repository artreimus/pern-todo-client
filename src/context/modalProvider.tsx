import useRefreshToken from '@/hooks/useRefreshToken';
import { createContext, useEffect, useState } from 'react';

type ModalProviderProps = { children?: JSX.Element | JSX.Element[] };

export type ModalType = { show: boolean; message: string };

export type ContextValueType = {
  error: ModalType;
  success: ModalType;
  setError: (value: ModalType | ((prev: ModalType) => ModalType)) => void;
  setSuccess: (value: ModalType | ((prev: ModalType) => ModalType)) => void;
};

const ModalContext = createContext({});

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [error, setError] = useState({ show: false, message: '' });
  const [success, setSuccess] = useState({ show: false, message: '' });

  const value = {
    error,
    setError,
    success,
    setSuccess,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };
