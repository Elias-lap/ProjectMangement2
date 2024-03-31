import styleTasks from "../TasksList/TasksList.module.css";
import Table from "react-bootstrap/Table";
import { useContext, useEffect, useState } from "react";
import { AuthTasksContext } from "../../../context/TaskesListContext";
import { InfinitySpin } from "react-loader-spinner";
import ImgNotData from "../../../SharedModule/components/ImgNotData/ImgNotData";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDarkMode } from "../../../context/DarkLightModa";

// for loading
interface InfinitySpinProps {
  visible: boolean;
  width: string;
  color: string;
  ariaLabel: string;
}

const props: InfinitySpinProps = {
  visible: true,
  width: "200",
  color: "#315951E5",
  ariaLabel: "infinity-spin-loading",
};
//

export default function TasksList() {
  const { listTasks, getTasks, pagesArray } = useContext(AuthTasksContext);
  // console.log(listTasks);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { adminData } = useUser();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskInfo, setSelectedTaskInfo] = useState({
    title: "",
    status: "",
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [nameSearch, setNameSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [filterStatus, setFilterStatus] = useState("");

  
  // DeleteModal
  const openDeleteModal = (taskId: any) => {
    setSelectedTaskId(taskId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3003/api/v1/Task/${selectedTaskId}`,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
        }
      );
      closeDeleteModal();
      getTasks(1, 10, nameSearch, "");
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  //

  // ViewModal

  const openViewModal = (taskTitle: string, taskStatus: string) => {
    setSelectedTaskInfo({ title: taskTitle, status: taskStatus });
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
  };

  // navigate

  const goNewTask = () => {
    navigate("/dashboard/tasksData");
  };

  const navigateToEdit = (taskId: string) => {
    navigate(`/dashboard/takeUpdate/${taskId}`);
  };
  //

  // ----------------------------------

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    getTasks(currentPage, 10, nameSearch)
      .then(() => setLoading(false)) // Set loading state to false after fetching data
      .catch(() => setLoading(false)); // Set loading state to false if there's an error
  }, [currentPage, nameSearch]);

  //  handle Previous button click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // handle Next button click
  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  // handle Next button click if paga data finished

  const handleNextPage = () => {
    if (currentPage < pagesArray.length) {
      setCurrentPage((prevPage) => prevPage + 1);
      getTasks(currentPage + 1, 10, nameSearch, filterStatus);
    }
  };

  // filter for status

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    getTasks(1, 10, "", e.target.value);
  };

  useEffect(() => {
    getTasks(1, 10, "", filterStatus);
  }, []);

  // useEffect(() => {
  //   getTasks(1, 10, "", filterStatus)
  //     .then((data) => setFilteredTasks(data))
  //     .catch((error) => console.error("Error fetching tasks: ", error));
  // }, [filterStatus]);

  return (
    <>

      <section className=" ">
        <div className=" container">
          <div className="d-flex justify-content-between py-4">
            <h3 className={`${styleTasks.tasksWord} `}>Tasks</h3>
            <button
              onClick={goNewTask}
              className={`${styleTasks.btnAdd}  btn text-white rounded-5 px-5`}
            >
              {" "}
              + Add New Task
            </button>
          </div>
        </div>

        <div className={`${styleTasks.bgColorGray} p-4 bgColorGray`}>
          <div className="container  bg-white p-4 rounded-2">
            <form className=" row ">
              <div className={`${styleTasks.ConInput}  col-md-3`}>
                <input
                  className={`${styleTasks.inputSearch}`}
                  type="text"
                  name="search"
                  placeholder="Search Fleets                 
                  "
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />

                {/* <i
                  className={`${styleTasks.iconSearch} fa-solid fa-magnifying-glass`}
                ></i> */}
              </div>
              <div className="col-4 col-md-2">
                <div className={`${styleTasks.ConInput} input-group mb-3`}>
                  <select
                    className={`${styleTasks.inputSearch} py-1 text-muted`}
                    title=" select"
                    onChange={handleSelectChange}
                    value={filterStatus}
                  >
                    <option className=" text-muted" value="">
                      {/* <i className="fa-solid fa-filter"></i> */}
                      Filter for status
                    </option>
                    <option value="ToDo">ToDo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </form>

            <Table striped bordered hover className=" mt-4 text-center">
              <thead className={`${styleTasks.tableThead}`}>
                <tr>
                  <th className={`${styleTasks.WordsTheadTable}  `}>
                    Title
                    <i
                      className={`${styleTasks.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                    ></i>
                  </th>
                  <th className={`${styleTasks.WordsTheadTable}  `}>
                    Statues
                    <i
                      className={`${styleTasks.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                    ></i>
                  </th>
                  <th className={`${styleTasks.WordsTheadTable}  `}>
                    User
                    <i
                      className={`${styleTasks.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                    ></i>
                  </th>
                  <th className={`${styleTasks.WordsTheadTable}  `}>
                    Project
                    <i
                      className={`${styleTasks.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                    ></i>
                  </th>
                  <th className={`${styleTasks.WordsTheadTable}  `}>
                    Date Created
                    <i
                      className={`${styleTasks.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                    ></i>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={parseInt("6")}>
                      <div className="d-flex justify-content-center align-items-center">
                        <InfinitySpin {...props} />
                      </div>
                    </td>
                  </tr>
                ) : listTasks.length > 0 ? (
                  listTasks.map((tasks, index) => (
                    <tr
                      className=" "
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                      }}
                    >
                      <td className="TdTable">{tasks.title}</td>
                      <td className="TdTable">
                        {tasks.status === "ToDo" ? (
                          <span className="  bg-secondary text-white p-1 px-2 rounded-3">
                            {tasks.status}
                          </span>
                        ) : tasks.status === "InProgress" ? (
                          <span className=" bg-warning text-white p-1 px-2 rounded-3">
                            {tasks.status}
                          </span>
                        ) : tasks.status === "Done" ? (
                          <span className=" bg-success text-white p-1 px-2 rounded-3">
                            {tasks.status}
                          </span>
                        ) : (
                          <span className=" bg-secondary">{tasks.status}</span>
                        )}
                      </td>
                      <td className="TdTable">
                        {tasks.employee ? tasks.employee.userName : "N/A"}
                      </td>
                      <td className="TdTable">{tasks.project.title}</td>
                      <td className="TdTable">
                        {tasks.employee && tasks.employee.creationDate
                          ? tasks.employee.creationDate.substring(0, 10)
                          : "N/A"}
                      </td>
                      {/* Actions column */}
                      <td>
                        {adminData?.userGroup === "Manager" && (
                          <div className="btn-group">
                            <a
                              className=" dropdown-toggle"
                              href="#"
                              role="button"
                              id="dropdownMenuLink"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i
                                className={`${styleTasks.iconTasks} fa-solid fa-ellipsis-vertical`}
                              ></i>
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <span
                                  onClick={() =>
                                    openViewModal(tasks.title, tasks.status)
                                  }
                                  className="dropdown-item"
                                >
                                  <span
                                    className={`${styleTasks.btnCursor} border-0 px-2`}
                                  >
                                    <i
                                      className={`${styleTasks.iconTasks} fa-solid fa-street-view me-1`}
                                    ></i>
                                    View
                                  </span>{" "}
                                </span>
                              </li>
                              <li>
                                <span
                                  onClick={() => navigateToEdit(tasks.id)}
                                  className="dropdown-item"
                                >
                                  <span
                                    className={`${styleTasks.btnCursor}  border-0 px-2`}
                                  >
                                    <i
                                      className={`${styleTasks.iconTasks} fa-solid fa-pen-to-square me-1`}
                                    ></i>
                                    Edit
                                  </span>{" "}
                                </span>
                              </li>
                              <li>
                                <span
                                  onClick={() => openDeleteModal(tasks.id)}
                                  className="dropdown-item"
                                >
                                  <span
                                    className={`${styleTasks.btnCursor}   border-0  px-2`}
                                  >
                                    <i
                                      className={`${styleTasks.iconTasks} fa-solid fa-trash me-1`}
                                    ></i>
                                    Delete
                                  </span>{" "}
                                </span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={parseInt("6")}>
                      <ImgNotData />
                    </td>
                  </tr>
                )}
              </tbody>

              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={handlePreviousPage}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>

                  {pagesArray.map((pageNu, index) => (
                    <li
                      key={index}
                      className="page-item"
                      onClick={() => getTasks(pageNu, 10)}
                    >
                      <a className="page-link">{pageNu}</a>
                    </li>
                  ))}

                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={handleNextPage}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </Table>
          </div>
        </div>
      </section>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header className=" bg-white" closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bgForModalBody">
          <ImgNotData />
        </Modal.Body>
        <Modal.Footer className=" bg-white">
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* view Modal */}

      <Modal show={showViewModal} onHide={closeViewModal}>
        <Modal.Header className=" bg-white" closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bgForModalBody">
          <p>
            <strong>Title:</strong> {selectedTaskInfo.title}
          </p>
          <p>
            <strong>Status:</strong> {selectedTaskInfo.status}
          </p>
        </Modal.Body>
        <Modal.Footer className=" bg-white">
          <Button variant="secondary" onClick={closeViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
