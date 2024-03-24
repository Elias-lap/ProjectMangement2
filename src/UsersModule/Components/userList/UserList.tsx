import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { useToast } from "../../../context/TostifyContext";
import { Button, Modal, Spinner } from "react-bootstrap";
interface UserListTypes {
  country: string;
  phoneNumber: string;
  email: string;
  id: number;
  imagePath: string | null;
  isActivated: boolean;
  task: [];
  userName: string;
}

export default function UserList() {
  const [userlist, setUserList] = useState<UserListTypes[]>([]);
  const [userid, setUserid] = useState<number | undefined>();
  const [isActivated, setisActivated] = useState<boolean | undefined>();
  const [Pagination, setPagination] = useState<number[]>([]);
  // state for handel close modal Block/
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  // state for handel close modal Taks
  const [show2, setShow2] = useState<boolean>(false);
  const handleClose2 = (): void => setShow2(false);
  const handleShow2 = (): void => setShow2(true);
  const [lengthOfTask, setlengthOfTask] = useState<number>(0);
  const { showSuccessToast } = useToast();
  // state for spinner 
  const [spinner , setSpinner] = useState<boolean>(false)
  //  function get All users
  const { Token } = useUser();
  const getuserlist = async (pageNumber: number) => {
    try {
      setSpinner(true)
      const response = await axios.get(
        `  https://upskilling-egypt.com:3003/api/v1/Users/Manager?pageSize=10&pageNumber=${pageNumber}`,
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
    }finally{
      setSpinner(false)
    }
  };
  // console.log(userid);
  // const ToggleActivated = async (userid: number | undefined) => {
  //   try {
  //     const response = await axios.put(
  //       `https://upskilling-egypt.com:3003/api/v1/Users/${userid}`,

  //       {}, // This is the data you want to send in the request body. You can add data here if needed.

  //       {
  //         headers: {
  //           Authorization: `Bearer ${Token}`,
  //         },
  //       }
  //     );
  //     console.log(response);

  //     setCloseOpenModal(false); // Close the modal
  //     showSuccessToast("The process was successful");
  //     getuserlist(1);
  //   } catch (error) {
  //     console.log(error);
  //   }finally{
  //     console.log('')
  //   }
  // };
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
      getuserlist(1);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("");
    }
  };

  useEffect(() => {
    getuserlist(1);
  }, []);

  return (
    <div className="container-userList  ">
      <div className=" box-header pt-1">
        <div className="  bg-white ">
          <p className="header  text-muted py-3 ps-4 fs-2 ">Users</p>
        </div>
      </div>
      {/* Modal for Active ANd deActive */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h2 className=" text-white"> Are you sure ✋✋✋</h2>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              ToggleActivated(userid), handleClose();
            }}
          >
            {isActivated ? "Block" : "Active"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for view Tasks  */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Tasks Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <p className=" text-white fs-1">Total tasks: {lengthOfTask}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

      {/* start Tabel  */}
      {spinner ? (
  <div className="d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    <span className="ms-2 fs-1">Loading...</span>
  </div>
) : (
  <div className=" container-fluid">
  <div className=" table-responsive ">
    <table className="table">
      <thead>
        <tr>
          <th
            className="thead-userList border  text-white  border-black"
            scope="col"
          >
            User Name
            <i className=" ps-2 fa-solid fa-chevron-down"></i>
          </th>
          <th
            className="thead-userList border text-white  border-black "
            scope="col"
          >
            status
            <i className=" ps-2 fa-solid fa-chevron-down"></i>
          </th>
          <th
            className="thead-userList border text-white border-black "
            scope="col"
          >
            phone Number
            <i className=" ps-2 fa-solid fa-chevron-down"></i>
          </th>
          <th
            className="thead-userList border  text-white border-black"
            scope="col"
          >
            Email
            <i className=" ps-2 fa-solid fa-chevron-down"></i>
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
                  <button className=" btn btn-danger">Not Active</button>
                )}
              </td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn  dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
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
                        className=" btn"
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
            <li onClick={() => getuserlist(page)} className="page-item">
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
  // Your table content here
)}
        {/* {spinner ?  <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>{' '}
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button> :
        <div className=" container-fluid">
        <div className=" table-responsive ">
          <table className="table">
            <thead>
              <tr>
                <th
                  className="thead-userList border  text-white  border-black"
                  scope="col"
                >
                  User Name
                  <i className=" ps-2 fa-solid fa-chevron-down"></i>
                </th>
                <th
                  className="thead-userList border text-white  border-black "
                  scope="col"
                >
                  status
                  <i className=" ps-2 fa-solid fa-chevron-down"></i>
                </th>
                <th
                  className="thead-userList border text-white border-black "
                  scope="col"
                >
                  phone Number
                  <i className=" ps-2 fa-solid fa-chevron-down"></i>
                </th>
                <th
                  className="thead-userList border  text-white border-black"
                  scope="col"
                >
                  Email
                  <i className=" ps-2 fa-solid fa-chevron-down"></i>
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
                        <button className=" btn btn-danger">Not Active</button>
                      )}
                    </td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn  dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>
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
                              className=" btn"
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
                  <li onClick={() => getuserlist(page)} className="page-item">
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
      } */}
    
    </div>
  );
}
