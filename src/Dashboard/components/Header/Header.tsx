import React from "react";
import headerBg from "../../../assets/images/bgHeader.jpg";

export default function Header() {
  return (
    <>
      <div className="container-fluid ">
        <div className="header-container  d-flex align-items-center  ">
          {/* <img className='w-100 ' src={headerBg} alt=""  /> */}
          <div className="  ">
            <div className="header-content ps-5 ">
              <h2 className="mb-4">Welcome <span className="text-danger"> Upskilling</span></h2>
              <p>You can add project and assign tasks to your team</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
