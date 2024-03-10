/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/PMS 3.png";
import { useNavigate } from "react-router-dom";
import { FormData } from "../../../interfaces/Auth";
import {useToast} from '../../../context/TostifyContext'
import axios from "axios";
export default function ForgotPassword() {
  const {  showSuccessToast, showErrorToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request", data );
    
      showSuccessToast('successfully password reseted');
      navigate("/ResetPasword");
      console.log(response)
    } catch (error ) {
      showErrorToast("An error occurred with Reset..");
      
  }

      
  };


  return (
    <div className="Auth-container vh-100 row align-items-center justify-content-center overflow-auto gx-0 flex-nowrap ">
  <div className="logo  col-md-5 d-flex align-items-center justify-content-center">
      <img src={logo} alt="logo" className="mb-3" />
    </div>

    <div className="login-container col-md-5 rounded-4 px-5 py-5">
      <p className="text-white">Welcome Back!</p>
      <h3 className="text-warning mb-3">Forget Password </h3>
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
        </div>
        {errors.email && (
            <div className="alert alert-danger ">{errors.email.message}</div>
          )}
        <button type="submit" className="w-100 btn btn-warning rounded-5">
        Verify
            </button>
      
      </form>
    </div>
  </div>
  );
}
