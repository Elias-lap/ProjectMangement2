import React from "react";

export default function TaskBord() {
  return (
    <>
        <div className="container-header">
          <h2 className=' w-100 custom-color p-4 text-white'>
            Task Board
          </h2>

      </div>
      <div className=" container-fluid ">
        <div className="row w-100   justify-content-center align-items-center  mt-3 gap-2">
          <div className="col-md-3  ">
            <h2>
              To Do 
            </h2>
            
            
            
            </div>
          <div className="col-md-3  ">
          <h2>
              In Progress
            </h2>
            
            
            
            </div>
          <div className="col-md-3   ">
          <h2>
              Done
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
