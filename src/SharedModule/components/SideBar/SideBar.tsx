import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ChangPass from '../../../AuthModule/components/ChangPass/ChangPass';

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    console.log("gfhjk");
  };

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal  show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body>
        <Modal.Header closeButton></Modal.Header>
          <ChangPass handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem onClick={toggleCollapse}>
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
          </MenuItem>

          <MenuItem icon={<i className="fa fa-user"></i>} component={<Link to="/dashboard/users" />}>
            Users
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-rectangle-list"></i>} component={<Link to="/dashboard/categories" />}>
            Projects
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-lock"></i>} onClick={handleShow}>
            Change Password
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>}>LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
