import useRefreshToken from '@/hooks/useRefreshToken';
import { createContext, useEffect, useState } from 'react';

type SkeletonProviderProps = { children?: JSX.Element | JSX.Element[] };

export type ContextValueType = {
  listLoading: boolean;
  setListLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  navLoading: boolean;
  setNavLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const SkeletonContext = createContext({});

const SkeletonProvider = ({ children }: SkeletonProviderProps) => {
  const [listLoading, setListLoading] = useState(false);
  const [navLoading, setNavLoading] = useState(false);

  const value = {
    listLoading,
    setListLoading,
    navLoading,
    setNavLoading,
  };

  return (
    <SkeletonContext.Provider value={value}>
      {children}
    </SkeletonContext.Provider>
  );
};

export { SkeletonProvider, SkeletonContext };
