import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastProvider } from "./context/TostifyContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css"; // Import ReactToastify CSS
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import BaceUrlFun from "./context/BaceUrlContext.tsx";
import TaskesListContext from "./context/TaskesListContext.tsx";
TaskesListContext

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastProvider>
      <TaskesListContext>
        <BaceUrlFun>
        <App />
        </BaceUrlFun>
        </TaskesListContext>
      </ToastProvider>
      <ToastContainer />
    </AuthContextProvider>
  </React.StrictMode>
);
