import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    console.log("gfhjk");
    
  };
  return (
    <>
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem  onClick={toggleCollapse}>
            
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
          </MenuItem>
        
          <MenuItem icon={<i className="fa fa-user" ></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-rectangle-list"></i>} component={<Link to="/dashboard/categories" />}> Projects</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} > LogOut</MenuItem>
         
         
        </Menu>
      </Sidebar>
      ;
    </>
  );
}
