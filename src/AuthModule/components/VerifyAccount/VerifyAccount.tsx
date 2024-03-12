
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/PMS 3.png";
import {  useNavigate } from "react-router-dom";
import {  FormDataVerify } from "../../../interfaces/Auth";
import {  useState } from "react";
import {useToast} from '../../../context/TostifyContext'
import axios from "axios";

export default function VerifyAccount() {
  const { showSuccessToast, showErrorToast } = useToast();
  const [spinner, setSpinner] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataVerify>();
  const navigate = useNavigate();

// senD Data to Api
const onSubmit = async (data: FormDataVerify) => {
  setSpinner(true);

  try {
    const response = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Login', data );
    showSuccessToast('Verify successfully');
    localStorage.setItem("token",response.data.token);
    navigate('/');
  } catch (error ) {
    showErrorToast("An error occurred with Verify..");
  } finally {
    setSpinner(false);
  }
};
  return (
    <div className="Auth-container vh-100 row align-items-center justify-content-center overflow-auto gx-0 flex-nowrap ">
    <div className="logo  col-md-5 text-center">
      <img src={logo} alt="logo" className="mb-3" />
    </div>

    <div className="login-container  col-md-5 rounded-4 px-5 py-5">
      <p className="text-white">Welcome Back!</p>
      <h3 className="text-warning mb-3">Log In</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1 mb-3">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "email is not valid ",
              },
            })}
            placeholder="email"
          />
          <div className="border_bottom"></div>
        </div>
        {errors.email && (
          <div className="alert alert-danger ">{errors.email.message}</div>
        )}
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1 mb-3">OTP Verification</label>
          <input
            type="text"
            className="form-control"
            {...register("code", {
              required: "code is required",
            })}
            placeholder="email"
          />
          <div className="border_bottom"></div>
        </div>
        {errors.email && (
          <div className="alert alert-danger ">{errors.email.message}</div>
        )}
      
      
        <button type="submit" className="w-100 btn btn-warning rounded-5">
              {spinner ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                "Verify"
              )}
            </button>
      
      </form>
    </div>
  </div>
  )
}
