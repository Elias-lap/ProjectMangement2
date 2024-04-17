/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import ChangPass from "../../../AuthModule/components/ChangPass/ChangPass";
import { Modal } from "react-bootstrap";
import { useUser } from "../../../context/AuthContext";
import { useDarkMode } from "../../../context/DarkLightModa";
import { InfinitySpin } from "react-loader-spinner";
export default function SideBar() {
  const { userRole } = useUser();
  console.log(userRole);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  // dark Light moda
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;
  const toggleDarkMode = darkModeContext
    ? darkModeContext.toggleDarkMode
    : () => {};
  //
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  // const handleToggle = () => {
  //   setIsCollapsed(!isCollapsed);
  // };
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

  if (!darkModeContext) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <InfinitySpin />
      </div>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangPass handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="sidbar-icon  ">
        <Sidebar className="vh-100  sidebar-style " collapsed={isCollapsed}>
          <Menu>
            {/* <MenuItem
              className={`toggle-sidebar-btn ${
                isCollapsed ? "collapsed" : ""
              } `}
              onClick={handleToggle}
            >
              {isCollapsed ? (
                <i className="fa-solid fa-arrow-right" />
              ) : (
                <i className="fa-solid fa-arrow-left" />
              )}
            </MenuItem> */}
            <MenuItem   className={`toggle-sidebar-btn ${isCollapsed ? "collapsed" : ""} first`} onClick={toggleCollapse}>
              {isCollapsed === true ? (
                <i className="py-3 fa-solid fa-chevron-right chevron-right"></i>
              ) : (
                <i className="py-3 fa-solid fa-chevron-left chevron-left"></i>
              )}
            </MenuItem>

            <MenuItem
              icon={<i className=" fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home
            </MenuItem>

            {userRole === "Manager" ? (
              <MenuItem
                icon={<i className=" fa fa-user"></i>}
                component={<Link to="/dashboard/users" />}
              >
                {" "}
                Users
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              icon={<i className="fa-solid fa-rectangle-list"></i>}
              component={<Link to="/dashboard/project" />}
            >
              {" "}
              Projects
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-list"></i>}
              component={<Link to="/dashboard/tasks" />}
            >
              {" "}
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
              {" "}
              LogOut
            </MenuItem>
            <MenuItem
              icon={
                <i>
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
