import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AuthLayout from "./SharedModule/components/AuthLayout/AuthLayout";
import NotFound from "./SharedModule/components/NotFound/NotFound";
import Login from "./AuthModule/components/Login/Login";
import Register from "./AuthModule/components/Register/Register";
import ForgotPassword from "./AuthModule/components/ForgotPassword/ForgotPassword";
import ReasetPassword from "./AuthModule/components/ReasetPassword/ReasetPassword";
import VerifyAccount from "./AuthModule/components/VerifyAccount/VerifyAccount";
import MasterLayout from "./SharedModule/components/MasterLayout/MasterLayout";
import Dashboard from "./Dashboard/components/Dashboard/Dashboard";
import ProjectList from "./ProjectModule/components/ProjectList/ProjectList";
import UserList from "./UsersModule/Components/userList/UserList";

import ProtectedRoute from "./SharedModule/components/ProtectedRoute/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import BaceUrlContext from "./context/BaceUrlContext";
import TaskesListContext from "./context/TaskesListContext";
import TasksData from "./TasksModule/components/TasksList/TasksData";
import { ListUserAndProject } from "./context/ListUserAndProject";
import TasksList from "./TasksModule/components/TasksList/TasksList";
import TakeUpdate from "./TasksModule/components/TasksList/TakeUpdate";
import ProjectsData from "./ProjectModule/components/ProjectsData/ProjectsData";
import { DarkModeProvider } from "./context/DarkLightModa";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "Register",
          element: <Register />,
        },
        {
          path: "ForgetPasword",
          element: <ForgotPassword />,
        },
        {
          path: "ResetPasword",
          element: <ReasetPassword />,
        },
        {
          path: "VerifyEmail",
          element: <VerifyAccount />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },

        {
          path: "project",
          element: <ProjectList />,
        },
        {
          path: "project-data/:id?",
          element: <ProjectsData />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "tasks",
          element: <TasksList />,
        },
        {
          path: "takeUpdate/:id?",
          element: < TakeUpdate/>,
        },
        {
          path: "TasksData",
          element: < TasksData/>,
        },
      ],
    },
  ]);

  return (
    <>

      <TaskesListContext>
        <BaceUrlContext>
          <ListUserAndProject>
          <DarkModeProvider>

            <RouterProvider router={router} />
            </DarkModeProvider>
            </ListUserAndProject>


        </BaceUrlContext>
      </TaskesListContext>
    </>
  );
}

export default App;
