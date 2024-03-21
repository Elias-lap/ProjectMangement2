import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { useToast } from "../../../context/TostifyContext";
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
  const [userid, setUserid] = useState <number | undefined>();
  const { showSuccessToast} = useToast();

  const { Token } = useUser();
  const getuserlist = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Users/Manager?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(response.data?.data);
      setUserList(response.data?.data);
    } catch (error) {
      console.log(error);
    } 
  };
  console.log(userid)
  const ToggleActivated = async (userid :number | undefined) => {
    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Users/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(response);
      showSuccessToast('the process was successful')
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    getuserlist();
  }, []);

  return (
    <div className="container-userList  ">
      <div className=" box-header pt-1">
        <div className="  bg-white ">
          <p className="header  text-muted py-3 ps-4 fs-2 ">Users</p>
        </div>
      </div>
      {/* Modal for Active ANd deActive */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
          
            <div className="modal-body"> <h2 className=" text-white"> Are you sure ✋✋✋</h2> </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={ ()=>{ToggleActivated(userid)}} type="button" className="btn btn-primary">
                Block
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* start Tabel  */}

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
                              onClick={()=>{
                                setUserid(user.id)
                              }}
                            >
                              Block
                            </button>
                          </li>
                          <li className="dropdown-item ">

                            <button className=" btn"> 
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
        </div>
      </div>
    </div>
  );
}
