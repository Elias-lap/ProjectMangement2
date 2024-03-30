import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import ChangPass from "../../../AuthModule/components/ChangPass/ChangPass";
import { Modal } from "react-bootstrap";
import { useDarkMode } from "../../../context/DarkLightModa";

export default function SideBar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  // dark Light moda
  const darkModeContext = useDarkMode();

  if (!darkModeContext) {
    return null;
  }

  const { isDarkMode, toggleDarkMode } = darkModeContext;
// 


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // closing and opening Modal
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // function Logout
  const logOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangPass handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="sidbar-con ">
        <Sidebar className="vh-100 sidebar-style" collapsed={isCollapsed}>
          <Menu>
            <MenuItem className="frist" onClick={toggleCollapse}>
              {isCollapsed === true ? (
                <i className="py-3 fa-solid fa-chevron-right chevron-right"></i>
              ) : (
                <i className="py-3 fa-solid fa-chevron-left chevron-right"></i>
              )}
            </MenuItem>

            <MenuItem
              icon={<i className=" fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className=" fa fa-user"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-rectangle-list"></i>}
              component={<Link to="/dashboard/project" />}
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-list"></i>}
              component={<Link to="/dashboard/tasks" />}
            >
              Tasks
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-lock"></i>}
              onClick={handleShow}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logOut}
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
            >
              LogOut
            </MenuItem>
            <MenuItem
              icon={
                <i >
                  {isDarkMode ? (
                    <i className="fa-solid fa-toggle-on"></i>
                  ) : (
                    <i className="fa-solid fa-toggle-off"></i>
                  )}
                </i>
              }
              onClick={toggleDarkMode}
            >
              {isDarkMode ? "dark-mode" : "light-mode"}{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
