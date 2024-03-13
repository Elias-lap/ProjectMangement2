
import { ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import {useToken} from '../../../context/AuthContext';


const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {

  const {adminData} = useToken();
  
  if (adminData == null && localStorage.getItem("adminToken") == null) {
    return <Navigate to="/login" />;
  } else {
    return children; // Return the children directly
  }
};

export default ProtectedRoute;
