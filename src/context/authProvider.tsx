import { createContext, useState } from 'react';

type AuthProviderProps = { children?: JSX.Element | JSX.Element[] };

type AuthType = {
  email: string;
  accessToken: string;
  user_id: string;
};

export type ContextValueType = {
  auth: AuthType;
  setAuth: (value: AuthType | ((prev: AuthType) => AuthType)) => void;
};

const AuthContext = createContext({});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({});

  const value = { auth, setAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
