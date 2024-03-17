import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { RotatingLines } from "react-loader-spinner";
import styleChangPass from "./ChangPass.module.css"
import axios, { AxiosError } from "axios";


interface ChangPassProps {
  handleClose: () => void;
}

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
interface AxiosResponseData {
  message: string;
}

const ChangPass: React.FC<ChangPassProps> = ({ handleClose }) => {
  //   const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  // const [massageError, setMassageError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleNewPassword = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const togglePasswordVisibilityconfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };

//   password
  const isPasswordComplex = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",<.>/?]).{6,}$/;
    return passwordRegex.test(password);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

 
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!isPasswordComplex(data.newPassword)) {
        throw new Error("The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.");
      }
  
      if (data.newPassword !== data.confirmNewPassword) {
        throw new Error("New Password and Confirm New Password do not match");
      }
  
      const token = localStorage.getItem("TokenUser");
      if (!token) {
        throw new Error("User is not authenticated");
      }
  
      const response = await axios.put(
        "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (response.data.success) {
        handleClose();
        toast.success("Password changed successfully");
      } else {
        throw new Error("Failed to change password");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // console.log(axiosError.response)
          toast.error((axiosError.response?.data as AxiosResponseData)?.message || "Failed to change password");

          // toast.error(axiosError.response.data.message || "Failed to change password");
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error(
          error instanceof Error ? error.message : "Failed to change password"
        );
      }
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className=" row justify-content-center align-items-center">
        <div className=" col-md-12">
          <div className="  rounded-3 px-5 py-4">
            <small className=" text-white">welcome to PMS</small>

            <h4 className={`${styleChangPass.changeWord} mb-5 `}>
              {" "}
              Change Password
              <div className="color "></div>
            </h4>

            <form onSubmit={handleSubmit(onSubmit)}>
             

                <div className="form-group conInput  mb-3">
                  <label className=" textYellow" htmlFor="old ">Old Password</label>
                  <input
                    className={`${styleChangPass.styleInput} form-control mt-2 `}

                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Old Password  "
                    {...register("oldPassword", {
                      required: "old Password is required ",
                    })}
                    id="old"
                  />
                 <i
                        className={`fa-regular fa-eye${
                          showPassword ? "-slash" : ""
                        }`}
                        onClick={togglePasswordVisibility}
                      ></i>

                {errors.oldPassword && (
                  <div className="alert alert-danger  d-inline-block w-100 mt-1">
                    {errors.oldPassword.message}
                  </div>
                )}
              </div>

              {/*new password */}

            

              <div className="form-group conInput  my-4">
                  <label className=" textYellow" htmlFor="New ">New Password</label>
                  <input
                    className={`${styleChangPass.styleInput} form-control mt-2 `}

                    placeholder="Enter your New Password"
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "new Password is required",
                    })}
                    id="New"
                  />
                    <i
                  className={`fa-regular fa-eye${
                    showNewPassword ? "-slash" : ""
                  }`}
                  onClick={toggleNewPassword}
                ></i>

{errors.newPassword && (
                  <div className="alert alert-danger  d-inline-block w-100 mt-1">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>

              {/* confirmPassword */}

                          <div className="form-group conInput  my-4">
                  <label className=" textYellow" htmlFor="ConfirmPass ">Confirm New Password</label>
                  <input
                    className={`${styleChangPass.styleInput} form-control mt-2 `}

                    type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "confirm Password is required",
                  })}
                    id="ConfirmPass"
                  />
                      <i
                  className={`fa-regular fa-eye${
                    showPasswordConfirm ? "-slash" : ""
                  }`}
                  onClick={togglePasswordVisibilityconfirm}
                ></i>

{errors.confirmNewPassword && (
                  <div className="alert alert-danger  d-inline-block w-100 mt-1 ">
                    {errors.confirmNewPassword.message}
                  </div>
                )}
              </div>




              {/* {massageError ? (
                <div className=" alert alert-danger"> {massageError}</div>
              ) : (
                ""
              )} */}


              <button className={`${styleChangPass.btnSave} btn w-100`}>
                Save
                {/* {loadingBtn ? (
                  <RotatingLines
                    visible={true}
                    // height="20"
                    width="20"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Change Password"
                )} */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangPass;
