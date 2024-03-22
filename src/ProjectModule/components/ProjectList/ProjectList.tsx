import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

interface progectListType {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  manager: {id:number|null} ;
}

export default function ProjectModule() {

// closing and opening Modal
const [show, setShow] = useState<boolean>(false);
const [projectId, setprojectId] = useState<number>(0)
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

  const getProjects = async () => {
    try {
      let rsponse = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=12&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      console.log(rsponse.data);
      setprojecList(rsponse.data.data);
    } catch (error) {}
  };

  const handleDelete = (id:number)=>{
    axios.delete(`https://upskilling-egypt.com:3003/api/v1/Project/${id}`,
    {
      headers : { Authorization: `Bearer ${Token}` }
    })
    .then((response) => {
     
      handleClose();
      getProjects();
      
      console.log(response);
    })
    .catch((error) =>

     console.log(error)
     );
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
         <h3 className="text-white" >Are you sure you want to delete this project? </h3>
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
      <div className="title mb-3 mt-1 bg-white">
        <div className="container-fluid  py-3 d-flex justify-content-between">
          <h3>Projects</h3>
          <button
            onClick={navigateToProjectData}
            className="btn p-2 text-white btn-warning rounded-5"
          >
            <i className="fa fa-plus mx-2" aria-hidden="true"></i> Add New
            Project
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <div className="table-con  table-responsive">
          {projecList.length > 0 ? (
            <table className="table table-striped text-center">
              <thead>
                <tr className="thead-style">
                  <th className="text-white" scope="col">
                    Title
                  </th>
                  <th className="text-white" scope="col">
                    Num Users
                  </th>
                  <th className="text-white" scope="col">
                    Num Tasks
                  </th>
                  <th className="text-white" scope="col">
                    Date Created
                  </th>
                  <th className="text-white" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {projecList.map((pro) => (
                  <tr key={pro.id}>
                    <th scope="row">{pro.id}</th>
                    <td>{pro.manager?.id}</td>
                    <td>{pro.description}</td>
                    <td>{pro.creationDate}</td>
                    <td>
                      <Link to={`/dashboard/project-data/${pro.id}`}>
                        <i title="تعديل" className="fas fa-edit text-warning mx-2 px-2 "></i>
                      </Link>
                      <button onClick={()=>{handleShow(),setprojectId(pro.id)}} title="Deletep" className="fas fa-trash text-danger px-2 border-0  bg-transparent"></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="loader text-center"></div>
          )}
        </div>
      </div>
    </>
  );
}
