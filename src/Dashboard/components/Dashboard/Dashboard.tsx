import { useDarkMode } from "../../../context/DarkLightModa";
import Header from "../Header/Header";

export default function Dasxboard() {
  const darkModeContext = useDarkMode();

  if (!darkModeContext) {
    return null;
  }

  const { isDarkMode, toggleDarkMode } = darkModeContext;


  return (
    <>
      <div className="main-content ">
        <Header />

        {/* <div className="dashboaed container-fluid p-4">
        <div className="row">
          <div className="hit col-md-6 bg-warning  ">
            <div className="titles p-2 ">
              <h3 className="">Tasks</h3>
              <p>List of all tasks</p>
            </div>
            <div className="taskes-count d-flex">
              <div className="col-md-4 bg-danger p-2 mx-2">
              <i className="fa-solid fa-chart-simple"></i>
                <p className="py-3 text-dark-light">In-progress</p>
                <h3 className="text-dark-light">$2000.50</h3>
              </div>
              <div className="col-md-4 bg-info mx-2">
                <h1>saasss</h1>
              </div>
              <div className="col-md-4 bg-success mx-2">
                <h1>saasss</h1>
              </div>
            </div>
          </div>
          <div className="hit col-md-6 bg-black d-flex ">
            <div className="col-md-4 bg-danger mx-2">
              <h1>saasss</h1>
            </div>
            <div className="col-md-4 bg-info mx-2">
              <h1>saasss</h1>
            </div>
          </div>
        </div>
       
      </div> */}

<div className={`container-fluid py-5 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
<div className="dashboaed-charts justify-content-around d-flex">
            <div className=" px-5  w-50  bg-white rounded-4">
              <div className="titles ">
                <h3 className="">Tasks</h3>
                <p>List of all tasks</p>
              </div>
              <div className="row tasks-count my-5 ">
                <div className="col-md-4 ">
                  <div className="tasks d-flex flex-column  p-3  rounded-4">
                    <i className="fa fa-tasks my-3"> </i>
                    <span className="py-3 text-dark-light">To do</span>
                    <h3 className="text-dark-light">{"daa"}</h3>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="tasks1 d-flex flex-column  p-3 rounded-4">
                  <i className="fa-solid fa-group-arrows-rotate  my-3"></i>
                    <span className="py-3 text-dark-light">In-progress</span>
                    <h3 className="text-dark-light">{"ada"}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="tasks2 d-flex flex-column   p-3  rounded-4">
                  <i className="fa-solid fa-calendar-check my-3"></i>
                    <span className="py-3 text-dark-light">Done</span>
                    <h3 className="text-dark-light">{"ada"}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-50 px-5 ms-4 bg-white rounded-4">
              <div className="titles">
                <h3>Users</h3>
                <p>List of all users</p>
              </div>
              <div className="row users-count my-5 ">
                <div className="col-md-4">
                  <div className="  user d-flex flex-column  rounded-4 p-3">
                  <i className="fa-solid fa-user-large my-3"></i>
                    <span className="py-3 text-dark-light">Active users</span>
                    <h3 className="text-dark-light">{"dada"}</h3>
                  </div>
                </div>
                <div className="col-md-4  ">
                  <div className=" user d-flex flex-column  rounded-4 p-3">
                  <i className="fa-solid fa-user-large-slash my-3"></i>
                    <span className="py-3 text-dark-light">
                      De-active users
                    </span>
                    <h3 className="text-dark-light">{"aaa"}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
