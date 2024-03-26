import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChangPass from '../../../AuthModule/components/ChangPass/ChangPass';
import  {Modal}  from "react-bootstrap";

export default function SideBar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
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
    navigate("/login")
  }
  return (
    <>
    <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangPass handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="sidbar-icon ">
      <Sidebar   collapsed={isCollapsed}>
        <Menu>
          <div className="position-relative mb-4 pt-2"  onClick={toggleCollapse}>
            {isCollapsed===true? <i className="py-3 fa-solid fa-chevron-right chevron-right"></i>:
            <i className="py-3 fa-solid fa-chevron-left chevron-right"></i>}     
         
          </div>
        
          <MenuItem className="pt-4" icon={<i className=" fa fa-home" ></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem className="" icon={<i className=" fa fa-user" ></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-rectangle-list"></i>} component={<Link to="/dashboard/project" />}> Projects</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="/dashboard/tasks" />}> Tasks</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-lock"></i>} onClick={handleShow}>
            Change Password
          </MenuItem>
          <MenuItem onClick={logOut} icon={<i className="fa-solid fa-right-from-bracket"></i>} > LogOut</MenuItem>
         
         
        </Menu>
      </Sidebar>
      </div>
      </>
)}
