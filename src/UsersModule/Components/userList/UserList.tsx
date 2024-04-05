/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { useToast } from "../../../context/TostifyContext";
import { Button, Modal } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { useDarkMode } from "../../../context/DarkLightModa";
import styleUser from "./UserList.module.css";
import Table from "react-bootstrap/Table";
import ImgNotData from "../../../SharedModule/components/ImgNotData/ImgNotData";

interface UserListTypes {
  country: string;
  phoneNumber: string;
  email: string;
  id: number;
  imagePath: string | null;
  isActivated: boolean;
  task: [];
  userName: string;
  creationDate: string;
}

export default function UserList() {
  const [userlist, setUserList] = useState<UserListTypes[]>([]);

  const [userid, setUserid] = useState<number | undefined>();

  const [isActivated, setisActivated] = useState<boolean | undefined>();
  const [Pagination, setPagination] = useState<number[]>([]);
  const [searchName, setsearchName] = useState<string | undefined>("");
  const [searcByGroup, setsearcByGroup] = useState<number>(1);
  console.log(searcByGroup)
  const [loading, setLoading] = useState(true);

  // dark Light moda
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;
  //

  // state for handel close modal Block/
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  // state for handel close modal Taks
  const [show2, setShow2] = useState<boolean>(false);
  const handleClose2 = (): void => setShow2(false);
  const handleShow2 = (): void => setShow2(true);
  const [lengthOfTask, setlengthOfTask] = useState<number>(0);
  const { showSuccessToast, showErrorToast } = useToast();
  const [pageNumber, setPageNumber] = useState(1);

  //  function get All users
  const { Token } = useUser();
  const getuserlist = async (
    pageNumber: number,
    searchName: string | undefined,
    searcByGroup: number
  ) => {
    try {
      // setSpinner(true);
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Users/?userName=${searchName}&groups=${searcByGroup}&pageSize=10&pageNumber=${pageNumber}`,

        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      const totalNumberOfPages: number = response.data.totalNumberOfPages;
      console.log(response.data);
      setPagination(
        Array(totalNumberOfPages)
          .fill(null)
          .map((_, i) => i + 1)
      );
      // console.log(response);
      setUserList(response.data?.data);
    } catch (error) {
      console.log(error);
      showErrorToast("An error occurred while processing your request.");
    }
  };
  // Toggle status User =>
  const ToggleActivated = async (userid: number | undefined) => {
    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Users/${userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(response);

      // Close the modal
      showSuccessToast("The process was successful");
      getuserlist(1, "", 1);
    } catch (error) {
      console.log(error);
      showErrorToast("An error occurred while processing your request.");
    }
  };
  // Search By Name =>
  const SearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchName(e.target.value);
    getuserlist(1, searchName, 1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Your select change handling logic here
    setsearcByGroup(+e.target.value);
    getuserlist(1, searchName, +e.target.value);
  };
  // handle Previous button click
  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      const prevPage = pageNumber - 1;
      setPageNumber(prevPage);
      getuserlist(prevPage, "", 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < Pagination.length) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      getuserlist(nextPage, "", 1);
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    getuserlist(1, "", 1)
      .then(() => setLoading(false)) // Set loading state to false after fetching data
      .catch(() => setLoading(false)); // Set loading state to false if there's an error
  }, []);

  if (!darkModeContext) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <InfinitySpin />
      </div>
    );
  }

  return (
    <div className="   ">
      <div className="  box-header pt-1 ">
        <div className={`${isDarkMode ? " dark-mode" : `bg-white }`}  `}>
          <h3
            className={` ${
              isDarkMode ? "text-white" : " text-muted "
            }  header  py-3 ps-4 fs-2 container `}
          >
            Users
          </h3>
        </div>
      </div>
      {/* Modal for Active ANd deActive */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className=" bg-white" closeButton></Modal.Header>
        <Modal.Body className="bgForModalBody">
          <h2 className=" "> Are you sure ✋✋✋</h2>{" "}
        </Modal.Body>
        <Modal.Footer className=" bg-white  ">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{
              backgroundColor: isActivated ? "red" : "green",
              color: "white",
              border: " 1px solid transparent",
            }}
            onClick={() => {
              ToggleActivated(userid);
              handleClose();
            }}
          >
            {isActivated ? "Block" : "Active"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for view Tasks  */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header className=" bg-white" closeButton>
          <Modal.Title>Tasks Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bgForModalBody">
          {" "}
          <p className="  fs-1">Total tasks: {lengthOfTask}</p>
        </Modal.Body>
        <Modal.Footer className=" bg-white">
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className={`${
          isDarkMode ? " dark-mode" : `bg-white }`
        } container rounded-3 BoxShadowForTables py-4 mt-5`}
      >
        <div className="  ">
          <div className="row m-3  ">
            <div className="col-md-3  ">
              <div className=" mb-3 text-black">
                <input
                  type="text"
                  className={`${styleUser.inputSearch}`}
                  placeholder="Search By Name"
                  aria-label="Username"
                  onChange={SearchByName}
                />
                <div className="border_bottom"></div>
              </div>
            </div>

            <div className="col-md-2 ">
              <div className=" input-group">
                <select
                  className={`${styleUser.inputSearch} py-2 text-muted`}
                  onChange={handleSelectChange}
                  title=" select user"
                >
                  <option className="  " value="1" selected>
                    Select a Role
                  </option>
                  <option className="  " value="1">
                    manager
                  </option>
                  <option className="  " value="2">
                    employee
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className=" table-responsive ">
          <Table className=" container  text-center table ">
          <thead className={`${styleUser.tableThead}`}>
              <tr>
                <th className={`${styleUser.WordsTheadTable} h-50 align-content-center  `}>
                  User Name
                  {/* <i
                    className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                <th className={`${styleUser.WordsTheadTable} h-50 align-content-center   `}>
                  Statues
                  {/* <i
                    className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                <th className={`${styleUser.WordsTheadTable} h-50 align-content-center   `}>
                  Phone Number
                  {/* <i
                    className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                <th className={`${styleUser.WordsTheadTable}  h-50 align-content-center  `}>
                  Email
                  {/* <i
                    className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                <th className={`${styleUser.WordsTheadTable} h-50 align-content-center  `}>
                  Date Created
                  {/* <i
                    className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                {/* Add an empty th for the actions column */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="  ">
                  <td colSpan={parseInt("6")}>
                    <div className="d-flex justify-content-center align-items-center">
                      <InfinitySpin />
                    </div>
                  </td>
                </tr>
              ) : userlist.length > 0 ? (
                userlist.map((user, index) => (
                  <tr
                    className=" "
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                    }}
                  >
                    <td className="TdTable ">{user.userName}</td>
                    <td className="TdTable">
                      {user.isActivated ? (
                        <button className=" btn btn-success">Active</button>
                      ) : (
                        <button
                          className={`${styleUser.btnNotActive} btn btn text-white`}
                        >
                          Not Active
                        </button>
                      )}
                    </td>
                    <td className="TdTable">{user.phoneNumber}</td>
                    <td className="TdTable">{user.email}</td>

                    <td className="TdTable">
                      {user && user.creationDate
                        ? user.creationDate.substring(0, 10)
                        : "N/A"}
                    </td>

                    {/* Actions column */}
                    <td>
                      <div className="btn-group">
                        <a
                          className=" dropdown-toggle fa-2x"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            className={`${styleUser.iconTasks} fa-solid fa-ellipsis-vertical `}
                          ></i>
                        </a>
                        <ul className="dropdown-menu">
                          <li className="dropdown-item ">
                            <button
                              type="button"
                              className="btn "
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => {
                                setUserid(user.id);
                                setisActivated(user.isActivated);
                                handleShow();
                              }}
                            >
                              {user.isActivated ? (
                                // <span>
                                //   <i className="fa-solid fa-xmark me-2 "></i>
                                //   Block
                                // </span>
                                <span
                                  className={`${styleUser.btnCursor}  border-0 px-2 `}
                                >
                                  <i className="fa-solid fa-xmark   me-1 text-danger "></i>
                                  Block
                                </span>
                              ) : (
                                <span>
                                  <i className="fa-solid fa-check  text-success"></i>{" "}
                                  Active
                                </span>
                              )}
                            </button>
                          </li>
                          <li className="dropdown-item ">
                            <button
                              className=" btn "
                              onClick={() => {
                                handleShow2(),
                                  setlengthOfTask(user.task.length);
                              }}
                            >
                              <i
                                className={`${styleUser.iconTasks} fa-solid fa-street-view me-1`}
                              ></i>{" "}
                              View
                            </button>
                          </li>
                        </ul>
                      </div>
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
          </Table>
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
              {Pagination.map((page, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => getuserlist(page, "", 1)}
                    className="page-item"
                  >
                    <a className="page-link">{page}</a>
                  </li>
                );
              })}

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
        </div>
      </div>

      {/* start Tabel  */}
      {/* {spinner ? (
        <div className="d-flex justify-content-center align-items-center">
          <InfinitySpin />
        </div>
      ) : (
        <div className=" container-fluid">
          <div className=" table-responsive ">
            <table className="table">
              <thead className=" text-white">
                <tr>
                  <th
                    className="thead-userList border  text-white  "
                    scope="col"
                  >
                    User Name
                    <i className=" ps-2 fa-solid fa-chevron-down"></i>
                  </th>
                  <th
                    className="thead-userList border text-white   "
                    scope="col"
                  >
                    status
                    <i className=" ps-2 fa-solid fa-chevron-down"></i>
                  </th>
                  <th
                    className="thead-userList border text-white  "
                    scope="col"
                  >
                    phone Number
                    <i className=" ps-2 fa-solid fa-chevron-down"></i>
                  </th>
                  <th
                    className="thead-userList border  text-white border-black "
                    scope="col"
                  >
                    Email
                    <i className=" ps-2 fa-solid fa-chevron-down text-white"></i>
                  </th>

                  <th
                    className="thead-userList border  text-white border-black"
                    scope="col"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {userlist.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.userName}</td>
                      <td>
                        {user.isActivated ? (
                          <button className=" btn btn-success">Active</button>
                        ) : (
                          <button className=" btn btn-danger">
                            Not Active
                          </button>
                        )}
                      </td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="dropdown ">
                          <button
                            className="btn   dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            title=" btn "
                          >
                            <i className=" ps-2 fa-solid fa-chevron-down"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li className="dropdown-item ">
                              <button
                                type="button"
                                className="btn "
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setUserid(user.id);
                                  setisActivated(user.isActivated);
                                  handleShow();
                                }}
                              >
                                {user.isActivated ? "Block" : "Active"}
                              </button>
                            </li>
                            <li className="dropdown-item ">
                              <button
                                className=" btn "
                                onClick={() => {
                                  handleShow2(),
                                    setlengthOfTask(user.task.length);
                                }}
                              >
                                <i className="fa-solid fa-eye"></i> View
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                {Pagination.map((page) => {
                  return (
                    <li
                      onClick={() => getuserlist(page, "", 1)}
                      className="page-item"
                    >
                      <a className="page-link">{page}</a>
                    </li>
                  );
                })}

                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div> 

       )}  */}
    </div>
  );
}
