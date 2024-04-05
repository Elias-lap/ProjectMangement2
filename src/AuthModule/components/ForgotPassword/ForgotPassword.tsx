/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/PMS 3.png";
import { useNavigate } from "react-router-dom";
import { FormData } from "../../../interfaces/Auth";
import {useToast} from '../../../context/TostifyContext'
import axios from "axios";
import {  useState } from "react";
export default function ForgotPassword() {


  const [spinner, setSpinner] = useState<boolean>(false);
  const {  showSuccessToast, showErrorToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setSpinner(true);
    try {
      const response = await axios.post("https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request", data );
    
      showSuccessToast('Verification code sent successfully to');
      navigate("/ResetPasword");
      console.log(response)
    } catch (error ) {
      showErrorToast("An error occurred with sent Verification code..");
      
  }finally{
    setSpinner(false);
  }

      
  };


  return (
    <div className="Auth-container vh-100 row align-items-center justify-content-center overflow-auto gx-0 flex-nowrap ">
  <div className="logo  col-md-5 col-sm-10 text-center">
      <img src={logo} alt="logo" className="mb-3" />
    </div>

    <div className="login-container col-md-5 col-sm-10 rounded-4 px-5 py-5 ">
      <p className="text-white">Welcome Back!</p>
      <h3 className="color-text mb-3">Forget Password </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="color-text" htmlFor="EmailForgot">Email</label>
          <input
            id="EmailForgot"
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
            <button type="submit" className="w-100 btn color-button rounded-5">
                  {spinner ? (
                    <div className="spinner-border" role="status"></div>
                  ) : (
                    "Verify"
                  )}
                </button>
      
      </form>
    </div>
  </div>
  );
}
