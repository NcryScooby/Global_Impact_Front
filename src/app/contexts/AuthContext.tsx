import { createContext } from "react";

interface AuthContextProps {
  signedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={{ signedIn: false }}>
      {children}
    </AuthContext.Provider>
  );
};
