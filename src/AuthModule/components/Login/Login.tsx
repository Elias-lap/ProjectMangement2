import logo from '../../../assets/images/PMS 3.png'
import {Link } from 'react-router-dom';
export default function Login() {
  return (
    <div className="Auth-container vh-100  d-flex align-items-center justify-content-center">
      
            <div className="logo">
              <img src={logo} alt='logo' className='mb-3'/>
            </div>
         
            <div className='login-container w-75 rounded-4 px-5 py-5'>
            
                  <p className='text-white'>Welcome Back!</p>
                     <h3 className='text-warning mb-3'>Log In</h3>  
                  <form>
                    <div className="form-group">
                          <label htmlFor="exampleFormControlInput1 mb-3">Email</label>
                          <input type="email" className="form-control" placeholder="email"/>
                    </div>
                    <div className="form-group">
                          <label htmlFor="exampleFormControlInput1">password</label>
                          <input type="password" className="form-control" placeholder="password"/>
                    </div> 
                         <div className='d-flex justify-content-between my-2'>
                            <Link to='/register' className='text-white'>Register now</Link>
                            <Link to='/ForgetPass' className='text-white'>Forgetpassword</Link>
                          </div>
                        <button className='w-100 btn btn-warning rounded-5'>Login</button>
                    </form>
                </div>
              
    </div>
  );
}
