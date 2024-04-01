
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { useDarkMode } from "../../../context/DarkLightModa";
import { InfinitySpin } from "react-loader-spinner";

export default function MasterLayout() {

     // dark Light moda

   const darkModeContext = useDarkMode();

  

  if (!darkModeContext) {
    return (
      <div className="d-flex justify-content-center align-items-center">
      <InfinitySpin  />
    </div>)
    }
 
   const { isDarkMode } = darkModeContext;
 // 
 
  return (
  <> 
   <NavBar />
      <div className={`d-flex ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className='sideBar-container'>
          <SideBar />
        </div>
        <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} main-content w-100`}>

          <Outlet />
        </div>
      </div>
  
  
  </>
  )
}
