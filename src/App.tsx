
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import AuthLayout from './SharedModule/components/AuthLayout/AuthLayout';
import NotFound from './SharedModule/components/NotFound/NotFound';
import Login from './AuthModule/components/Login/Login';
import Register from './AuthModule/components/Register/Register';
import ForgotPassword from './AuthModule/components/ForgotPassword/ForgotPassword';
import ReasetPassword from './AuthModule/components/ReasetPassword/ReasetPassword';
import VerifyAccount from './AuthModule/components/VerifyAccount/VerifyAccount';
import MasterLayout from './SharedModule/components/MasterLayout/MasterLayout';

import Dashboard from './Dashboard/components/Dashboard/Dashboard';
import ProjectList from './ProjectModule/components/ProjectList/ProjectList';
import UserList from './UsersModule/Components/userList/UserList';
import TasksList from './TasksModule/components/TasksList/TasksList';
function App() {





  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        
          <AuthLayout />
        
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login  />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "Register",
          element: <Register/>,
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
          element: <VerifyAccount/>,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
      
          <MasterLayout  />
      
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard/>,
        },
      
        {
          path: "project",
          element: <ProjectList/>,
        },
        {
          path: "users",
          element: <UserList/>,
        },
        {
          path: "tasks",
          element: <TasksList/>,
        },
      
      ],
    },
  ]);



  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );

}

export default App
