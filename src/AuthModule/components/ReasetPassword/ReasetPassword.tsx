/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/PMS 3.png";
import { Link, useNavigate } from "react-router-dom";
import { FormData } from "../../../interfaces/Auth";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function ReasetPassword() {
 // All states here on the top 
 const [showPassword, setShowPassword] = useState<boolean>(false);
 const [showConfirmPassword, setshowConfirmPassword] = useState<boolean>(false);
 // note we will move it to context for using 
 const [spinner, setSpinner] = useState<boolean>(false);
 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm<FormData>();
 const navigate = useNavigate();

// Function for password visibility
//  void indicates that a function does not return any value
const togglePasswordVisibility = (): void => {
 setShowPassword((prevState: boolean) => !prevState);
};
const toggleConfirmPasswordVisibility = (): void => {
  setshowConfirmPassword((prevState: boolean) => !prevState);
 };
 
// senD Data to Api
const onSubmit = async (data: FormData) => {
 setSpinner(true);

 try {
   const response = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Login', data );
 
   toast.success('Login successfully');
   navigate('/login');
   console.log(response)
 } catch (error ) {
   toast.error("An error occurred with login..");
 } finally {
   setSpinner(false);
 }
};

 return (
   <div className="Auth-container vh-100 d-flex align-items-center justify-content-center">
     <div className="logo">
       <img src={logo} alt="logo" className="mb-3" />
     </div>

     <div className="login-container  w-50 rounded-4 px-5 py-5">
       <p className="text-white">Welcome Back!</p>
       <h3 className="text-warning mb-3">Reset Password</h3>
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
          <div className="form-group">
           <label htmlFor="exampleFormControlInput1 mb-3">OTP Verification</label>
           <input
             type="text"
             className="form-control"
             {...register("seed", {
               required: "seed is required",
             })}
             placeholder="otp"
           />
         </div>
         {errors.seed && (
           <div className="alert alert-danger ">{errors.seed.message}</div>
         )}
         <div className="form-group for-visibilty-password-container">
           <label htmlFor="exampleFormControlInput1">password</label>
           <input
             type={showPassword ? "text" : "password"}
             className="form-control"
             placeholder="password"
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
                 <i className="fa-solid fa-eye"></i>
               </button>
         
         </div>
         {errors.password && (
               <div className="alert alert-danger ">
                 {errors.password.message}
               </div>
             )}
      <div className="form-group for-visibilty-password-container">
           <label htmlFor="exampleFormControlInput1">Confirm Password</label>
           <input
             type={showConfirmPassword ? "text" : "password"}
             className="form-control"
             placeholder="confirmPassword"
             {...register("confirmPassword", {
               required: "confirmPassword is required ",
               pattern: {
                 value:
                   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                 message:
                   "confirmPassword must contain at least 8 characters, including upper and lowercase letters, and numbers",
               },
             })}
           />
                 <button
                 className="btn btn-outline-secondary for-visibilty-password-button"
                 type="button"
                 onClick={toggleConfirmPasswordVisibility}
               >
                 <i className="fa-solid fa-eye"></i>
               </button>
         
         </div>
         {/* {errors.confirmPassword && (
               <div className="alert alert-danger ">
                 {errors.confirmPassword.message}
               </div>
             )} */}
         {/* <div className="d-flex justify-content-between my-2">
           <Link to="/register" className="text-white">
             Register now
           </Link>
           <Link to="/ForgetPasword" className="text-white">
             Forgetpassword
           </Link>
         </div> */}
         <button type="submit" className="w-100 btn btn-warning rounded-5 my-2">
               {spinner ? (
                 <div className="spinner-border" role="status"></div>
               ) : (
                 "Reset Password"
               )}
             </button>
       
       </form>
     </div>
   </div>
 );
}

