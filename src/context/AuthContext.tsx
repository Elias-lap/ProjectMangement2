
import  { jwtDecode} from "jwt-decode";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  saveAdminData: () => void;
  adminData?: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

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

  const contextValue: AuthContextType = {
    adminData,
    saveAdminData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook to use the toast context
export const useUser = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};




