import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import styleChangPass from "./ChangPass.module.css";
import axios from "axios";
import { useToast } from "../../../context/TostifyContext";
import { ChangPassProps, FormValues } from "../../../interfaces/Auth";

const ChangePassword: React.FC<ChangPassProps> = ({ handleClose }) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [spinner, setSpinner] = useState<boolean>(false);
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  // Custom validation function to check if passwords match
  const validatePasswordMatch = (value: unknown) => {
    const password = watch("newPassword"); // Get the value of the "password" field
    return value === password || "Passwords do not match"; // Return error message if passwords don't match
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSpinner(true);
    console.log(data);
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3003/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response)
      handleClose();
      showSuccessToast("Password has been updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(error.response.data.message);
      }
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      <div className="  row justify-content-center align-items-center">
        <div className=" col-md-12 col-sm-10">
          <div className="  rounded-3 px-5 py-4">
            <small className=" text-white">welcome to PMS</small>

            <h4 className={`${styleChangPass.changeWord} mb-5 `}>
              {" "}
              Change Password
              <div className="color "></div>
            </h4>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group conInput  mb-3">
                <label className=" color-text" htmlFor="old ">
                  Old Password
                </label>
                <input
                  className={`${styleChangPass.styleInput} form-control mt-2 `}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Old Password  "
                  {...register("oldPassword", {
                    required: "old Password is required ",
                        pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                },
                  })}
                  id="old"
                />
              
                    <button
              className="btn btn-outline-secondary for-visibilty-password-button"
              type="button"
              onClick={togglePasswordVisibility}
            >
                <i
                  className={`fa-regular fa-eye${
                    !showPassword ? "-slash" : ""
                  }`}
                ></i>
            </button>

                {errors.oldPassword && (
                  <div className="alert alert-danger  ">
                    {errors.oldPassword.message}
                  </div>
                )}
                <div className="border_bottom"></div>
              </div>

              {/*new password */}

              <div className="form-group conInput  my-4">
                <label className=" color-text" htmlFor="New ">
                  New Password
                </label>
                <input
                  className={`${styleChangPass.styleInput} form-control mt-2 `}
                  placeholder="Enter your New Password"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "new Password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                    },
                  })}
                  id="New"
                />
                    <button
              className="btn btn-outline-secondary for-visibilty-password-button"
              type="button"
              onClick={toggleNewPassword}
            >
                <i
                  className={`fa-regular fa-eye${
                    !showNewPassword ? "-slash" : ""
                  }`}
                ></i>
            </button>

                {errors.newPassword && (
                  <div className="alert alert-danger  ">
                    {errors.newPassword.message}
                  </div>
                )}
                <div className="border_bottom"></div>
              </div>

              {/* confirmPassword */}

              <div className="form-group conInput  my-4">
                <label className="color-text" htmlFor="ConfirmPass ">
                  Confirm New Password
                </label>
                <input
                  className={`${styleChangPass.styleInput} form-control mt-2 `}
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "confirm Password is required",
                    validate: validatePasswordMatch,
                  })}
                  id="ConfirmPass"
                />
                    <button
              className="btn btn-outline-secondary for-visibilty-password-button"
              type="button"
              onClick={togglePasswordVisibilityconfirm}
            >
                <i
                  className={`fa-regular fa-eye${
                    !showPasswordConfirm ? "-slash" : ""
                  }`}
                ></i>
            </button>

                {errors.confirmNewPassword && (
                  <div className="alert alert-danger   ">
                    {errors.confirmNewPassword.message}
                  </div>
                )}
                <div className="border_bottom"></div>
              </div>
              <button
                type="submit"
                className="w-100 btn color-button rounded-5"
              >
                {spinner ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
