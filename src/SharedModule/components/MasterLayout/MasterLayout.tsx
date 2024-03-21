
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

export default function MasterLayout() {
  return (
  <> 
    <NavBar />
  <div className=' d-flex main-div '>
    <div className='sideBar-container'>
      <SideBar/>
    </div>
  <div className='main-content w-100'>
      <Outlet/>
  </div>
    


  </div>
  
  
  </>
  )
}
