/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useDarkMode } from "../../../context/DarkLightModa";
import { InfinitySpin } from "react-loader-spinner";

export default function ProjectsData() {
  // dark Light moda
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;
 // 


  const navigate = useNavigate();
  const { Token } = useUser();
  const param = useParams();
  //   console.log(param);

  interface FormData {
    title: string;
    description: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const getProjects = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Project/${
          param.id ? param.id : ""
        }`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      //   console.log(rsponse.data.data);
      setValue("title", response.data.title);
      setValue("description", response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const addProject: SubmitHandler<FormData> = async (data) => {
    try {
      const addProgect = await axios.post(
        `https://upskilling-egypt.com:3003/api/v1/Project`,
        data,
        { headers: { Authorization: `Bearer ${Token}` } }
      );
      console.log(addProgect);
      goToProject();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject: SubmitHandler<FormData> = async (data) => {
    try {
      const addProgect = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Project/${param.id}`,
        data,
        { headers: { Authorization: `Bearer ${Token}` } }
      );
      console.log(addProgect);
      goToProject();
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  };

  const goToProject = () => {
    navigate("/dashboard/project");
  };

  useEffect(() => {
    getProjects();
  }, []);
  
  if (!darkModeContext) {
    return (
      <div className="d-flex justify-content-center align-items-center">
      <InfinitySpin  />
    </div>)
    }

  return (
    <>
      <div className="project-form ">
        <div   className={` ${
              isDarkMode ? "dark-mode" : "bg-white"
            }  title mb-3 mt-1 `}>
          <div className="container  py-3 ">
            <p
              className=""
              onClick={goToProject}
            >
              {" "}
              <i
                className=""
                
              ></i>{" "}
              View All Projects
            </p>
            <h3 >
              Add a New Project
            </h3>
          </div>
        </div>

        <div className=" container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="form-con col-md-8 shadow bg-white  rounded-4 p-4 mt-4 ">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control formControlProject  "
                  id="formGroupExampleInput"
                  placeholder="Enter project Title  "
                  {...register("title", {
                    required: " title is required",
                  })}
                />
                {errors.title && errors.title.type === "required" && (
                  <p className="text-danger"> Title is required</p>
                )}
              </div>
              <div className="border_bottom mb-4"></div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control text-dark  formControlProject"
                  placeholder="Enter project Description"
                  id="floatingTextarea2"
                  {...register("description", {
                    required: " description is required",
                  })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <p className="text-danger"> Description is required</p>
                  )}
              </div>

              <div className="d-flex justify-content-between border-top pt-5">
                <button
                  onClick={goToProject}
                  className="btn bg-white px-3 border-dark rounded-5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit(param.id ? updateProject : addProject)}
                  className="btn btn-warning px-4 rounded-5"
                >
                  {param.id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
