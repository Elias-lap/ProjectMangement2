  {/* <div className="container">
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
        </div> */}
// ============================================================


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
        </div> */}



      {/* )} */}



      // '''''''''''''''''''''''''''''''


      <div className=" table-responsive">
      <Table className=" mt-4 text-center table">
        <thead className={`${styleUser.tableThead}`}>
          <tr>
            <th className={`${styleUser.WordsTheadTable}  `}>
              Title
              <i
                className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
              ></i>
            </th>
            <th className={`${styleUser.WordsTheadTable}  `}>
              Statues
              <i
                className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
              ></i>
            </th>
            <th className={`${styleUser.WordsTheadTable}  `}>
              User
              <i
                className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
              ></i>
            </th>
            <th className={`${styleUser.WordsTheadTable}  `}>
              Project
              <i
                className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
              ></i>
            </th>
            <th className={`${styleUser.WordsTheadTable}  `}>
              Date Created
              <i
                className={`${styleUser.fontChevron}  fa-solid fa-chevron-down ms-3 `}
              ></i>
            </th>
            {/* Add an empty th for the actions column */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
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
                  backgroundColor:
                    index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                }}
              >
               
                <td className="TdTable">{user.userName}</td>
                <td className="TdTable">
                {user.isActivated ? (
                <button className=" btn btn-success">Active</button>
              ) : (
                <button className=" btn btn-danger">
                  Not Active
                </button>)}
                </td>

                {/* Actions column */}
                {/* <td>
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
                            onClick={() =>
                              navigateToEdit(tasks.id.toString())
                            }
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
                </td> */}
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

      
      </Table>
    </div>