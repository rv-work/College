"use client"

import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  goto : string;
  setGoto : (goto : string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {

  const [isLoggedIn, setIsLoggedIn  ] = useState<boolean>(false);
  const [goto , setGoto] = useState<string>("")


  return (
    <AuthContext.Provider value ={{isLoggedIn, setIsLoggedIn ,setGoto , goto }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a useAuthProvider");
  }
  return context;
};

export default AuthContextProvider;
