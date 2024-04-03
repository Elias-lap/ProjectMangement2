import { Menu, MenuItem } from "react-pro-sidebar";
import navLogo from "../../../assets/images/nav-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import { Modal } from "react-bootstrap";
import ChangePassword from "../../../AuthModule/components/ChangPass/ChangPass";
import { useState } from "react";
import { useDarkMode } from "../../../context/DarkLightModa";
import styleNav from "./NavBar.module.css";
import navLogoDark from "../../../assets/images/PMS 3Dark.png";

export default function NavBar() {
  const darkModeContext = useDarkMode();
  const { userRole } = useUser();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;
  const toggleDarkMode = darkModeContext ? darkModeContext.toggleDarkMode : () => {};
  const navigate = useNavigate();

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

  if (!darkModeContext) {
    return null; // You might want to handle this case differently
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangePassword handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <nav
        className={`navbar navbar-expand-lg navbar-light ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="container-fluid ">
          <div className="  ">
            {isDarkMode ? (
              <img
                src={navLogoDark}
                alt="Dark Logo"
                className={`${styleNav.logoDark}`}
              />
            ) : (
              <img src={navLogo} alt="Light Logo" className="logo  " />
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse  navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Menu className=" display-none">
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
                <MenuItem
                  onClick={logOut}
                  icon={<i className="fa-solid fa-right-from-bracket"></i>}
                >
                  {" "}
                  LogOut
                </MenuItem>
              </Menu>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
