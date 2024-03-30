import navLogo from "../../../assets/images/nav-logo.png";
import navLogoDark from "../../../assets/images/PMS 3Dark.png";
import { useDarkMode } from "../../../context/DarkLightModa";
import styleNav from "./NavBar.module.css"
export default function NavBar() {
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  const darkModeContext = useDarkMode();

  if (!darkModeContext) {
    return null;
  }

  const { isDarkMode, toggleDarkMode } = darkModeContext;



  return (
    <>
   

      <nav className={`navbar navbar-expand-lg navbar-light ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container-fluid">
      <a className="navbar-brand" href="#">
            {/* <img src={isDarkMode ? navLogoDark : navLogo} alt="logo" /> */}
            {isDarkMode ? (
        <img src={navLogoDark} alt="Dark Logo" className={`${styleNav.logoDark}`} />
      ) : (
        <img src={navLogo} alt="Light Logo" className="logo  " />
      )}
          </a>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ` }>
            <li className="nav-item d-flex align-items-center mx-2">
              <i className="fa fa-bell" aria-hidden="true"></i>
            </li>
            <li className="nav-item">
            <a className={`nav-link` } href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}
