/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { useDarkMode } from "../../../context/DarkLightModa";

interface progectListType {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  manager: { id: number | null };
}

export default function ProjectModule() {
  const { userRole } = useUser();

  // dark Light moda
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;

  // closing and opening Modal
  const [show, setShow] = useState<boolean>(false);
  const [projectId, setprojectId] = useState<number>(0);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const { Token } = useUser();
  const navigate = useNavigate();

  const navigateToProjectData = () => {
    navigate("/dashboard/project-data");
  };

  // let token = localStorage.getItem("adminToken");

  const [projecList, setprojecList] = useState<progectListType[]>([]);
  const [pagesArray, setpagesArray] = useState<number[]>([]);

  const getProjects = async (
    pageNo: number,
    pageSize: number,
    title?: string
  ) => {
    console.log(userRole);
    try {
      if (userRole == "undefined") {
        const response = await axios.get(
          "https://upskilling-egypt.com:3003/api/v1/Project/",
          {
            headers: { Authorization: `Bearer ${Token}` },
            params: {
              pageNumber: pageNo,
              pageSize: pageSize,
              title: title,
            },
          }
        );
        // console.log(rsponse.data.totalNumberOfPages);
        setpagesArray(
          Array(response.data.totalNumberOfPages)
            .fill([])
            .map((_, i) => i + 1)
        );
        setprojecList(response.data.data);
      } else if (userRole == "Manager") {
        const response = await axios.get(
          `https://upskilling-egypt.com:3003/api/v1/Project/manager?pageSize=${pageSize}&pageNumber=${pageNo}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
            params: {
              title: title,
            },
          }
        );
        // console.log(rsponse.data.totalNumberOfPages);
        setpagesArray(
          Array(response.data.totalNumberOfPages)
            .fill([])
            .map((_, i) => i + 1)
        );
        setprojecList(response.data.data);
      } else {
        const response = await axios.get(
          `https://upskilling-egypt.com:3003/api/v1/Project/employee?pageSize=${pageSize}&pageNumber=${pageNo}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
            params: {
              title: title,
            },
          }
        );
        // console.log(rsponse.data.totalNumberOfPages);
        setpagesArray(
          Array(response.data.totalNumberOfPages)
            .fill([])
            .map((_, i) => i + 1)
        );
        setprojecList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://upskilling-egypt.com:3003/api/v1/Project/${id}`, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        handleClose();
        getProjects(1, 10);

        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const getNameValue = (input: ChangeEvent<HTMLInputElement>) => {
    // console.log(input.target.value);
    getProjects(1, 7, (input.target as HTMLInputElement).value);
  };

  useEffect(() => {
    getProjects(1, 10);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="text-white">
            Are you sure you want to delete this project?{" "}
          </h3>
        </Modal.Body>
        <div className="delete-button d-flex justify-content-end p-3">
          <button
            onClick={() => {
              handleDelete(projectId);
            }}
            className="btn btn-danger"
          >
            Delete this item
          </button>
        </div>
      </Modal>
      <div
        className={` ${
          isDarkMode ? "dark-mode" : "light-mode"
        }  title mb-3 mt-1 `}
      >
        <div className="container-fluid  py-3 d-flex justify-content-between">
          <h3>Projects</h3>
          {userRole == "Manager" ? (
            <button
              onClick={navigateToProjectData}
              className="btn p-2 text-white btn-warning rounded-5"
            >
              <i className="fa fa-plus " aria-hidden="true"></i> Add New Project
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row p-3 ">
          <div className="group">
            <input
              placeholder="Search by Title"
              type="search"
              className="input"
              onChange={getNameValue}
            />
          </div>
        </div>

        <div className="container-fluid">
          {projecList.length > 0 ? (
            <div className="table-responsive">
              <table className="table  text-center">
                <thead>
                  <tr className="thead-style">
                    <th
                      className="text-white thead-userList border"
                      scope="col"
                    >
                      Title
                    </th>
                    <th
                      className="text-white thead-userList border"
                      scope="col"
                    >
                      Num Users
                    </th>
                    <th
                      className="text-white thead-userList border"
                      scope="col"
                    >
                      Description
                    </th>
                    <th
                      className="text-white thead-userList border "
                      scope="col"
                    >
                      Date Created
                    </th>
                    {userRole == "Manager" ? (
                      <th
                        className="text-white thead-userList border"
                        scope="col"
                      >
                        Action
                      </th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>
                <tbody>
                  {projecList.map((pro) => (
                    <tr key={pro.id}>
                      <th scope="row">{pro.title}</th>
                      <td>{pro.manager?.id}</td>
                      <td>{pro.description}</td>
                      <td>{pro.creationDate}</td>
                      {userRole == "Manager" ? (
                        <td>
                          <Link to={`/dashboard/project-data/${pro.id}`}>
                            <i
                              title="تعديل"
                              className="fas fa-edit text-warning mx-2 px-2 "
                            ></i>
                          </Link>
                          <button
                            onClick={() => {
                              handleShow(), setprojectId(pro.id);
                            }}
                            title="Deletep"
                            className="fas fa-trash text-danger px-2 border-0  bg-transparent"
                          ></button>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <InfinitySpin />
            </div>
          )}
        </div>
      </div>
      <nav
        aria-label="Page navigation example "
        className="d-flex justify-content-center"
      >
        <ul className="pagination ">
          <li className="page-item ">
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pagesArray.map((pageNo) => (
            <li
              onClick={() => getProjects(pageNo, 10)}
              key={pageNo}
              className="page-item "
            >
              <a className="page-link">{pageNo}</a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
