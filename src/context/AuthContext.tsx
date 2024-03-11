import  { jwtDecode} from "jwt-decode";
import { ReactNode, createContext, useEffect, useState } from "react";

interface Authcontext {
  saveAdminData: () => void;
  adminData?: string | null;
}

export const AuthContext = createContext<Authcontext | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminData, setAdminData] = useState<string | null>(null);

  const saveAdminData = () => {
    const encodedToken = localStorage.getItem("adminToken");
    if (encodedToken) {
      const decodedToken = jwtDecode(encodedToken) as string;
      setAdminData(decodedToken);
    }
  };

  useEffect(() => {
    saveAdminData();
  }, []);

  const contextValue: Authcontext = {
    adminData,
    saveAdminData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
