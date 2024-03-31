import React, { useEffect, useState } from "react";

import axios from "axios";
import Tasks from "./Tasks";
interface DataTypesUser {
  id: string;
  title?: string;
  status: string;
}

export default function TaskEmployee() {
  const [listTasksTodo, setListTasksToDo] = useState<DataTypesUser[]>([]);
  const [listTasksInProgress, setListTasksInProgress] = useState<
    DataTypesUser[]
  >([]);
  const [listTasksDone, setListTasksDone] = useState<DataTypesUser[]>([]);
  // state for style colum border
  const [isDragging, setisDragging] = React.useState<boolean>(false);
  const [isDragging1, setisDragging1] = React.useState<boolean>(false);
  const [isDragging2, setisDragging2] = React.useState<boolean>(false);
  // ///To do
  const GetTaskToDoForUser = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task?pageSize=2&pageNumber=1' `,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
          params: {
            status: "ToDo",
          },
        }
      );
      setListTasksToDo(response?.data.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  // /////////////////////////In Progress
  const GetTaskInProgressForUser = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task?pageSize=2&pageNumber=1' `,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
          params: {
            status: "InProgress",
          },
        }
      );
      setListTasksInProgress(response?.data.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  // ////////////////// Done
  const GetTaskDoneForUser = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task?pageSize=2&pageNumber=1' `,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
          params: {
            status: "Done",
          },
        }
      );
      setListTasksDone(response?.data.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  const changeStatusTsk = async (id: string, status: string): Promise<void> => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Task/${id}/change-status`,
        { status }, // Pass status in the request body
        {
          headers: {
            Authorization: adminToken,
          }
        }
      );
  
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    GetTaskToDoForUser(), GetTaskInProgressForUser(), GetTaskDoneForUser();
  }, []);
  return (
    <div className=" container-TasksBoard bg-gray  container">
      <div className="BoxTasks row  w-100  justify-content-between ">
        <div
        
          onDrop={(e) => {
            e.preventDefault();
            setisDragging(false);
            const curentId = e.dataTransfer.getData("dataid");
            const curentStatus = e.dataTransfer.getData("currentStatus");
            const newStatus = 'ToDo'
            console.log(curentId, curentStatus ,newStatus );
            changeStatusTsk(curentId ,newStatus )
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setisDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setisDragging(false);
          }}
          className={`col-md-3 mx-1 rounded  ${
            isDragging ? "custom-box-shadow" : ""
          }`}
        >
          <h2 className=" text-muted"> To Do </h2>
          <div className=" color-box-Taks p-3  rounded-1">
            {listTasksTodo &&
              listTasksTodo.map((task) => {
                return (
                  <Tasks id={task.id} status={task.status} title={task.title} />
                );
              })}
          </div>
        </div>
        <div
          onDrop={(e) => {
            e.preventDefault();
            setisDragging1(false);
            const curentId = e.dataTransfer.getData("dataid");
            const curentStatus = e.dataTransfer.getData("currentStatus");
            const newStatus = 'InProgress'
            console.log(curentId, curentStatus ,newStatus );
            changeStatusTsk(curentId ,newStatus )

          }}
          onDragOver={(e) => {
            e.preventDefault();
            setisDragging1(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setisDragging1(false);
          }}
          className={`col-md-3 mx-1 rounded ${
            isDragging1 ? "custom-box-shadow" : ""
          }`}
        >
          <h2 className=" text-muted"> In progress </h2>
          <div className=" color-box-Taks p-3  rounded-1">
            {listTasksInProgress &&
              listTasksInProgress.map((task) => {
                return (
                  <Tasks id={task.id} status={task.status} title={task.title} />
                );
              })}
          </div>
        </div>
        <div
          onDrop={(e) => {
            e.preventDefault();
            setisDragging2(false);
            const curentId = e.dataTransfer.getData("dataid");
            const curentStatus = e.dataTransfer.getData("currentStatus");
            const newStatus = 'Done'
            console.log(curentId, curentStatus ,newStatus );
            changeStatusTsk(curentId ,newStatus )
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setisDragging2(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setisDragging2(false);
          }}
          className={`col-md-3 mx-1 rounded ${
            isDragging2 ? "custom-box-shadow" : ""
          }`}
        >
          <h2 className=" text-muted"> Done </h2>
          <div className=" color-box-Taks p-3  rounded-1">
            {listTasksDone &&
              listTasksDone.map((task) => {
                return (
                  <Tasks id={task.id} status={task.status} title={task.title} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
