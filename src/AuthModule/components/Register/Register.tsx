import { useState } from "react";
import logo from "../../../assets/images/PMS 3.png";
import { useToast } from "../../../context/TostifyContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormDataRegister } from "../../../interfaces/Auth";
import imageLogo from "../../../assets/images/8550fbcbe60cd242d12760784feff287.jpeg";
import imageLogo2 from "../../../assets/images/Vector.png";
import axios from "axios";
export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useToast();
  

  const [spinner, setSpinner] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataRegister>();
  const navigate = useNavigate();
  // test done
  // Function for password visibility
  //  void indicates that a function does not return any value
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState: boolean) => !prevState);
  };
  const togglePasswordVisibility2 = (): void => {
    setShowPassword2((prevState: boolean) => !prevState);
  };
  // Custom validation function to check if passwords match
  const validatePasswordMatch = (value: unknown) => {
    const password = watch("password"); // Get the value of the "password" field
    return value === password || "Passwords do not match"; // Return error message if passwords don't match
  };
  // Custom validation function to check if name match
  const validateUserName = (value: string) => {
    // Regular expression to match characters followed by numbers without spaces
    const regex = /^[a-zA-Z]+[0-9]+$/;
    // Test the value against the regular expression
    const isValid = regex.test(value);
    // Return true if the value matches the pattern, otherwise return false
    return (
      isValid ||
      "Username must contain characters and end with numbers without spaces"
    );
  };
  // change data to FormData 

  const appendToFormData = (data :FormDataRegister) => {
    const profileImage = data.profileImage[0];
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", profileImage);
    return formData ;
  };
  // senD Data to Api
  
  const onSubmit = async (data: FormDataRegister) => {
    setSpinner(true);
     const fotmData = appendToFormData(data)
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Register",
        fotmData
      );
    
      console.log(response);
      showSuccessToast(response.data.message);
      navigate("/VerifyEmail")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(error.response.data.message)}
        else {
          // Handle other types of errors here
          showErrorToast("An error occurred.");
        }
    } finally {
      setSpinner(false);
    }

  };

  return (
    <div className="Auth-container vh-100 row align-items-center justify-content-center overflow-auto gx-0 flex-nowrap ">
      <div className="logo  col-md-5 col-sm-10 text-center  ">
        <img src={logo} alt="logo" className="mb-3" />
      </div>

      <div className="login-container  col-md-8 rounded-4 px-3 py-2">
        <div className=" p-2">
          <p className="text-white">Welcome To PMS!</p>
          <h3 className="color-text mb-3">Create New Account</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" container-register-Box-Image w-100 d-flex justify-content-center mb-2 ">
            <div className="register-Box-Image  text-center position-relative">
              <label
                htmlFor="profileImage"
                className="custom-cursor position-absolute vector2 color-transparent w-100"
              >
                Upload Image
              </label>
              <input
                id="profileImage"
                className="d-none"
                type="file"
                {...register("profileImage")}
              />
              <img
                className=" w-100 h-100 rounded-circle "
                src={imageLogo}
                alt="image"
              />
              <img
                src={imageLogo2}
                alt="image"
                className=" position-absolute vector "
              />
            </div>
          </div>
          <div className=" row w-100">
            <div className=" col-md-6">
              <div className="form-group">
                <label
                  className="color-text"
                  htmlFor="exampleFormControlInput1"
                >
                  Name
                </label>
                <input
                  id="exampleFormControlInput1"
                  type="text"
                  className="form-control"
                  {...register("userName", {
                    required: "userName is required",
                    validate: validateUserName,
                  })}
                  placeholder="Enter Your name"
                />
                <div className="border_bottom"></div>
              </div>
              {errors.userName && (
                <div className="alert alert-danger ">
                  {errors.userName.message}
                </div>
              )}
              <div className="form-group">
                <label
                  className="color-text"
                  htmlFor="exampleFormControlInput2"
                >
                  Country
                </label>
                <input
                  id="exampleFormControlInput2"
                  type="text"
                  className="form-control"
                  {...register("country", {
                    required: "country is required",
                  })}
                  placeholder="Enter Your country"
                />
                <div className="border_bottom"></div>
              </div>
              {errors.country && (
                <div className="alert alert-danger ">
                  {errors.country.message}
                </div>
              )}

              <div className="form-group for-visibilty-password-container">
                <label
                  className="color-text"
                  htmlFor="exampleFormControlInput3"
                >
                  password
                </label>
                <input
                  id="exampleFormControlInput3"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Your Password"
                  {...register("password", {
                    required: "password is required ",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                    },
                  })}
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
                <div className="border_bottom"></div>
              </div>
              {errors.password && (
                <div className="alert alert-danger ">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className=" col-md-6">
              <div className="form-group ">
                <label
                  className="color-text"
                  htmlFor="exampleFormControlInput4"
                >
                  E-mail
                </label>
                <input
                  id="exampleFormControlInput4"
                  type="email"
                  className="form-control"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "email is not valid ",
                    },
                  })}
                  placeholder="Enter your E-mail"
                />
                <div className="border_bottom"></div>
              </div>
              {errors.email && (
                <div className="alert alert-danger ">
                  {errors.email.message}
                </div>
              )}
              <div className="form-group">
                <label
                  className="color-text"
                  htmlFor="exampleFormControlInput5"
                >
                  phone number
                </label>
                <input
                  id="exampleFormControlInput5"
                  type="tel"
                  className="form-control"
                  {...register("phoneNumber", {
                    required: "phone Number is required",
                  })}
                  placeholder="Enter your phone number"
                />
                <div className="border_bottom"></div>
              </div>
              {errors.phoneNumber && (
                <div className="alert alert-danger ">
                  {errors.phoneNumber.message}
                </div>
              )}
              <div className="form-group for-visibilty-password-container">
                <label
                  className="color-text"
                  htmlFor="exampleFormControlInput6"
                >
                  Confirm Password
                </label>
                <input
                  id="exampleFormControlInput6"
                  type={showPassword2 ? "text" : "password"}
                  className="form-control"
                  placeholder="confirmPassword"
                  {...register("confirmPassword", {
                    required: "password is required ",
                    validate: validatePasswordMatch,
                  })}
                />
                <button
                  className="btn btn-outline-secondary for-visibilty-password-button"
                  type="button"
                  onClick={togglePasswordVisibility2}
                >
                    <i
                  className={`fa-regular fa-eye${
                    !showPassword2 ? "-slash" : ""
                  }`}
                ></i>
                </button>
                <div className="border_bottom"></div>
              </div>
              {errors.confirmPassword && (
                <div className="alert alert-danger ">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>
          <div className=" d-flex w-100 justify-content-center mt-2">
            <button type="submit" className="w-50  btn color-button rounded-5">
              {spinner ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                "save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
