import { useDarkMode } from "../../../context/DarkLightModa";

export default function Header() {
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  const darkModeContext = useDarkMode();

  if (!darkModeContext) {
    return null;
  }

  const { isDarkMode} = darkModeContext;


  return (
    <>
      <div className={` ${isDarkMode ? " dark-mode" : "light-mode"}  mt-2  `}>
        <div className="container-fluid ">
          <div className="header-container d-flex align-items-center   ">
            {/* <img className='w-100 ' src={headerBg} alt=""  /> */}
            <div className="  ">
              <div className="header-content ps-5 ">
                <h2 className="mb-4">
                  Welcome <span className={` ${isDarkMode ? "text-warning" : "text-danger"}   `} > Upskilling</span>
                </h2>
                <p>You can add project and assign tasks to your team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
