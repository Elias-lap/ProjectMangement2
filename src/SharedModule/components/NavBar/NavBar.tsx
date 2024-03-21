
import avatar from "../../../assets/images/avatar.png";
import { AuthAdmin } from "../../../interfaces/Auth";
import navLogo from "../../../assets/images/nav-logo.png"
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
// interface AuthAdmin{adminData:string};
export default function NavBar() {
  let{adminData}=useContext(AuthContext);
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src={navLogo} alt=""  />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center mx-2">
         <i className="fa fa-bell" aria-hidden="true"></i>
        </li>
        <li className="nav-item dropdown">
          <div className="border-left d-flex align-items-center">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="d-flex align-items-center">
                        <div className="me-2">
                          <img src={avatar} />
                        </div>
                        <h6>{adminData?.userName}</h6>
                </div>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
              </ul>
          </div>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
