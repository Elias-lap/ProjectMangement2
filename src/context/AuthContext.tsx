import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";





export let AuthContext =createContext(null);


export default function AuthContextProvider(props:any){

  const [loginData, setloginData] = useState(null);
  const savLoginData=()=>{
    let encodedToken =JSON.stringify(localStorage.getItem("token"));
    let decodetToken:any=jwtDecode(encodedToken);
    localStorage.setItem("loginData",JSON.stringify(decodetToken))
    setloginData(decodetToken);

  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      savLoginData();
    }
  },[]);
  return (
    <AuthContext.Provider value={{loginData,savLoginData}}>
    {props.children}
  </AuthContext.Provider>
  )
  

}