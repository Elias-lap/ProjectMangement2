
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/PMS 3.png";
import {  useNavigate } from "react-router-dom";
import {  FormDataVerify } from "../../../interfaces/Auth";
import {  useState } from "react";
import {useToast} from '../../../context/TostifyContext'
import axios from "axios"
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
    const response = await axios.put('https://upskilling-egypt.com:3003/api/v1/Users/verify', data );
    showSuccessToast('Account verified successfully');
    navigate('/');
    console.log(response)
  } catch (error ) {
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
  <div className="logo  col-md-5 text-center col-sm-10">
    <img src={logo} alt="logo" className="mb-3" />
  </div>

  <div className="login-container  col-md-5 rounded-4 px-5 py-5">
    <p className="text-white">Welcome Back!</p>
    <h3 className="color-text mb-3">Verify Account</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label className="color-text" htmlFor="exampleFormControlInput1 ">Email</label>
        <input
        id="exampleFormControlInput1"
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
        <label  className="color-text" htmlFor="exampleFormControlInput2 ">OTP Verification</label>
        <input
        id="exampleFormControlInput2"
          type="text"
          className="form-control"
          {...register("code", {
            required: "code is required",
          })}
          placeholder="code Verification"
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
  
)
}

