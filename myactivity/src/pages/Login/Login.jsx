import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/loginreg', { email, password });
      console.log('Login successful:', response.data);
      const { message, user } = response.data;
      toast.success(message);
      switch (user.role) {
        case 'Customer':
          navigate('/CDashboard');
          break;
        case 'Admin':
          navigate('/ADashboard');
          break;
        case 'Service Provider':
          navigate('/SDashboard');
          break;
      }
      // Redirect to the appropriate page based on the redirectUrl
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Internal server error');
      }
    }
  };
  
  

  return (
    <main>
      <div className="container login">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <br />
                <br />
                <div className="d-flex justify-content-center py-4">
                  <a className="logo d-flex align-items-center w-auto">
                    <span className="d-none d-lg-block custom-expense-text">Homely Heroes</span>
                  </a>
                </div>
                <div className="card mb-3 custom-background">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    </div>
                    <form className="row g-3 custom-form needs-validation" onSubmit={handleLogin}>
                      <br />
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">Email</label>
                        <br />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="form-control" id="email" required />
                      </div>
                      <br />
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" id="yourPassword" required />
                      </div>
                      <br />
                      <br />
                      <div className="col-12">
                        <button className="btn btn-primary btn-lg w-100 custom-login-button" type="submit">Login</button>
                      </div>
                      <br />
                      <br />
                      <div className="col-12">
                        <p className="text-center">Don't have an account? <Link to="/createAccount">Create Account</Link></p>
                      </div>
                      <div className="col-12">
                        <p className="text-center">Forgotten your password? <Link to="/forgot_password">Forgot Password</Link></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </main>
  );
};

export default Login;
