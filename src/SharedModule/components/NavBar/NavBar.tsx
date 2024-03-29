
import navLogo from "../../../assets/images/nav-logo.png"
export default function NavBar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src={navLogo} alt="logo"  />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center mx-2">
         <i className="fa fa-bell" aria-hidden="true"></i>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
      
      
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
