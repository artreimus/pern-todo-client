import { createContext, useState } from 'react';

type SortProviderProps = { children?: JSX.Element | JSX.Element[] };

type SortType = {
  order: string;
  type: string;
};

export type ContextValueType = {
  sortOption: SortType;
  setSortOption: (value: SortType | ((prev: SortType) => SortType)) => void;
};

const SortContext = createContext({});

const SortProvider = ({ children }: SortProviderProps) => {
  const [sortOption, setSortOption] = useState({ type: 'date', order: 'asc' });

  const value = { sortOption, setSortOption };
  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
};

export { SortProvider, SortContext };
