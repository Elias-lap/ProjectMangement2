/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BaceUrlCon } from "../../../context/BaceUrlContext";
import styleTasks from "../TasksList/TasksList.module.css";
import { toast } from "react-toastify";
import { useDarkMode } from "../../../context/DarkLightModa";
import { InfinitySpin } from "react-loader-spinner";

interface FormData {
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
}

interface User {
  id: string;
  userName: string;
}

interface Project {
  id: string;
  title: string;
}

export default function TakeUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  // context
  const baceUrlContext = useContext(BaceUrlCon);
  const BaceUrl = baceUrlContext as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.put(`${BaceUrl}/Task/${id}`, data, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      console.log(response);
      toast.success(`Task Updated Successfully`);
      navigate("/dashboard/tasks");
    } catch (error) {
      console.error("Error updating task: ", error);
      toast.error(`Failed to update task`);
    }
  };

  const [userList, setUserList] = useState<User[]>([]);
  const [userProject, setUserProject] = useState<Project[]>([]);
  console.log(userProject)
  // dark Light moda
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;

  //

  const getUserList = async () => {
    try {
      const response = await axios.get(
        `${BaceUrl}/Users/Manager?pageSize=10&pageNumber=1`,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
        }
      );
      setUserList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectList = async () => {
    try {
      const response = await axios.get(
        `${BaceUrl}/Project/manager?pageSize=10&pageNumber=1`,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
        }
      );
      setUserProject(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskDetails = async () => {
    try {
      const response = await axios.get(`${BaceUrl}/Task/${id}`, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });

      if (response.status === 200 && response.data && response.data.title) {
        const task = response.data;
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("employeeId", task.employee?.id.toString());
        setValue("projectId", task.projectId);
      } else {
        console.error("Error retrieving task details:", response.data);
      }
    } catch (error) {
      console.error("Error retrieving task details:", error);
    }
  };
  useEffect(() => {
    getTaskDetails();

    getUserList();
    getProjectList();
  }, []);

  if (!darkModeContext) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <InfinitySpin />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="py-4">
          <h6
            onClick={() => navigate("/dashboard/tasks")}
            className={` ${
              isDarkMode ? "text-white" : " text-muted "
            } custom-cursor  `}
          >
            <i
              className={` ${
                isDarkMode ? "text-white" : " text-muted "
              } fa-solid fa-angle-left  me-3 `}
            ></i>
            View All Tasks
          </h6>
          <h3>Edit Task</h3>
        </div>
      </div>

      <div className={`${styleTasks.bgGray} my-3 py-4 bgGray`}>
        <div
          className={`${styleTasks.conForm}  container bg-white py-3   rounded-3 `}
        >
          <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="row">
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
                    {...register("employeeId", { required: true })}
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
            </div>

            <div className={`${styleTasks.line}`}></div>

            <div className="row">
              <div className="col-md-6">
                <button
                  onClick={() => navigate("/dashboard/tasks")}
                  className="btn btn-outline-secondary rounded-4 py-2 px-4"
                  title=" btn close"
                >
                  Close
                </button>
              </div>

              <div className="col-md-6 text-end">
                <button
                  type="submit"
                  className="btn btn-outline-warning rounded-4 py-2 px-4"
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
