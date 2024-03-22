import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ProjectsData() {
  const navigate = useNavigate();
  const { Token } = useUser();
  let param = useParams ();
//   console.log(param);
  
interface addProjectType{
    title:string;
    description:string;
}
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getProjects = async () => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Project/${param.id?param.id : ""}`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
    //   console.log(rsponse.data.data);
    setValue("title", response.data.title);
    setValue("description", response.data.description);

    } catch (error) {}
  };

 
  const addProject =async(data:addProjectType)=>{
   try {
   let addProgect= await axios.post(`https://upskilling-egypt.com:3003/api/v1/Project`,data,
    {headers:{Authorization: `Bearer ${Token}`}}
    )
    // console.log(addProgect);
    goToProject();
    
   } catch (error) {
    
   }

  }

  const updateProject =async(data:addProjectType)=>{
   try {
   let addProgect= await axios.put(`https://upskilling-egypt.com:3003/api/v1/Project/${param.id}`,data,
    {headers:{Authorization: `Bearer ${Token}`}}
    )
    console.log(addProgect);
    goToProject();
    
   } catch (error) {
    
   }
// console.log(data);
  }

  const goToProject = () => {
    navigate("/dashboard/project");
  };

  useEffect(() => {
    getProjects()
  
  }, [])
  
  return (
    <>
      <div className="title mb-3 mt-1 bg-white">
        <div className="container  py-3 ">
          <p onClick={goToProject}>
            {" "}
            <i className="fa-solid mx-2 fa-left-long"></i> View All Projects
          </p>
          <h3>Add a New Project</h3>
        </div>
      </div>
<div className="row justify-content-center align-items-center">
      <div className="form-con col-md-8 shadow  rounded-4 p-4 mt-4 ">
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
          Title
          </label>
          <input
            type="text"
            className="form-control " 
            id="formGroupExampleInput"
            placeholder="Title"
            {...register("title", {
                required: " title is required",
              })}
          />
          {errors.title && errors.title.type==="required"&&(
            <p className="text-danger"> Title is required</p>
          )}
        </div>
        <div className="border_bottom mb-4"></div>
       
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
          Description
          </label>
          <textarea
            className="form-control mb-5 "
            placeholder="Description"
            id="floatingTextarea2"
            {...register("description", {
                required: " description is required",
              })}
          ></textarea>
           {errors.description && errors.description.type==="required"&&(
            <p className="text-danger"> Description is required</p>
          )}
           
        </div>
       
        <div className="d-flex justify-content-between border-top pt-5">
            <button onClick={goToProject} className="btn bg-white px-3 border-dark rounded-5">
           Cancel
            </button>
            <button onClick={handleSubmit(param.id?updateProject : addProject)} className="btn btn-warning px-4 rounded-5">
             {param.id? "Update" :"Save"}
            </button>
          </div>
      </div>
     
      </div>
    </>
  );
}
