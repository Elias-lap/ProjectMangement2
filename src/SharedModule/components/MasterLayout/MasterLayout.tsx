
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { useDarkMode } from "../../../context/DarkLightModa";

export default function MasterLayout() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
