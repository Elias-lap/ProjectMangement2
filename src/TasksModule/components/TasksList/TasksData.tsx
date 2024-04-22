import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BaceUrlCon } from "../../../context/BaceUrlContext";
import styleTasks from "../TasksList/TasksList.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthDataForUserAndProj } from "../../../context/ListUserAndProject";
import { useDarkMode } from "../../../context/DarkLightModa";
import { InfinitySpin } from "react-loader-spinner";

interface FormData {
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
}

export default function TasksData() {
  // dark Light moda
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;
  //

  const navigate = useNavigate();

  // context
  const baceUrlContext = useContext(BaceUrlCon);
  const BaceUrl = baceUrlContext as string;
  //

  const { userProject, userList } = useContext(AuthDataForUserAndProj);
  // console.log(userList)

  const goTaskList = () => {
    navigate("/dashboard/tasks");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${BaceUrl}/Task`, data, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      toast.success(`You Add a New Task`);
      console.log(response);
      goTaskList();
    } catch (error) {
      console.log(error);
      toast.error(`You Can't Add New Task`);
    }
  };

  if (!darkModeContext) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <InfinitySpin />
      </div>
    );
  }

  return (
    <>
      <div className={` ${isDarkMode ? "dark-mode" : "bg-white"} py-4`} >
        <div className=" container" >
          {/* <div className={` ${isDarkMode ? "dark-mode" : "light-mode"}  title mb-3 mt-1 `}> */}

          <h6
            onClick={goTaskList}
            className={` ${
              isDarkMode ? "text-white" : "text-muted"
            }  title mb-3 mt-1 `}
          >
            <i
              className={` ${
                isDarkMode ? "text-white" : "text-muted"
              }  fa-solid fa-angle-left me-3 `}
            ></i>
            View All Tasks
          </h6>
          <h3 className=" ">Add a New Task</h3>
        </div>
      </div>

      <div className={` my-3 py-4  `}>
        <div
          className={`${styleTasks.conForm}  container bg-white py-3   rounded-3 `}
        >
          <form className=" p-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label
                className={`${styleTasks.colorInputTaskesData}`}
                htmlFor="Title"
              >
                Title
              </label>
              <input
                type="text"
                className="form-control formControlTasksData"
                id="Title"
                aria-describedby="emailHelp"
                placeholder="Name"
                {...register("title", {
                  required: true,
                })}
              />
            </div>
            {errors.title && errors.title.type === "required" && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                Title is required
              </div>
            )}

            <div className="form-group mt-2">
              <label
                className={`${styleTasks.colorInputTaskesData}`}
                htmlFor="Description"
              >
                Description
              </label>
              <textarea
                className="form-control formControlTasksData"
                id="Description"
                rows={3}
                placeholder="Description"
                {...register("description", {
                  required: true,
                })}
              ></textarea>
              {errors.description && errors.description.type === "required" && (
                <div className="alert alert-danger  d-inline-block w-100 mt-1">
                  Description is required
                </div>
              )}
            </div>
            <div className=" row ">
              {/* user */}
              <div className="col-4 col-md-6">
                <div className="input-group mb-3">
                  <label
                    className={`${styleTasks.colorInputTaskesData} d-block w-100`}
                    htmlFor="User"
                  >
                    User
                  </label>
                  <select
                    className={`${styleTasks.inputs} form-select d-block rounded-3`}
                    title=" select"
                    {...register("employeeId", {
                      required: true,
                    })}
                  >
                    <option value=""> Choose User</option>
                    {userList.map((user, index) => (
                      <option value={user.id} key={index}>
                        {user.userName}
                      </option>
                    ))}
                  </select>
                  {errors.employeeId &&
                    errors.employeeId.type === "required" && (
                      <div className="alert alert-danger  d-inline-block w-100 mt-1">
                        User is required
                      </div>
                    )}
                </div>
              </div>
              {/*  */}
              {/* Project */}
              <div className="col-4 col-md-6">
                <div className="input-group mb-3">
                  <label
                    className={`${styleTasks.colorInputTaskesData} d-block w-100`}
                    htmlFor="Project"
                  >
                    Project
                  </label>
                  <select
                    className={`${styleTasks.inputs} form-select d-block rounded-3`}
                    title=" select"
                    {...register("projectId", {
                      required: true,
                    })}
                  >
                    <option value=""> Choose Project</option>

                    {userProject.map((project, index) => (
                      <option value={project.id} key={index}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  {errors.projectId && errors.projectId.type === "required" && (
                    <div className="alert alert-danger  d-inline-block w-100 mt-1">
                      Project is required
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`${styleTasks.line}`}> </div>

            <div className=" row">
              <div className=" col-md-6">
                <button
                  onClick={goTaskList}
                  className="btn  btn-outline-secondary rounded-4 py-2 px-4"
                  title=" btn close"
                >
                  Close
                </button>
              </div>

              <div className=" col-md-6 text-end">
                <button
                  type="submit"
                  className="btn  btn-outline-warning rounded-4 py-2 px-4 "
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}