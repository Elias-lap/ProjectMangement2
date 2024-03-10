import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
Navigate
export default function ProtectedRoute({loginData,children}) {

  if(loginData== null && localStorage.getItem("token") == null){
    return <Navigate to="/login"/>;
 }else{
    return children;
 }
}