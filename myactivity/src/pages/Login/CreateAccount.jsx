import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../assets/style.css";

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const [service, setService] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create_account', { name, email, password, role, service, contact, address });
      console.log('Account created successfully:', response.data);
      toast.success('Account created successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error creating account:', error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Internal server error');
      }
    }
  };
  
  return (
    <main>
      <div className="container account">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <br />
                <br />
                <div className="d-flex justify-content-center py-4">
                  <a className="logo d-flex align-items-center w-auto">
                    <span className="d-none d-lg-block custom-expense-text">Homely Heros</span>
                  </a>
                </div>
                <div className="card mb-3 custom-background">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                    </div>
                    <form className="row g-3 custom-form needs-validation" onSubmit={handleCreateAccount}>
                      <br />
                      <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Name</label>
                        <br />
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className="form-control form-control-custom" id="yourName" required />
                      </div>
                      <br />
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">Email</label>
                        <br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="form-control form-control-custom" id="yourEmail" required />
                      </div>
                      <br />
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="form-control form-control-custom" id="yourPassword" required />
                      </div>
                      <br />
                      <div className="col-12">
                        <label htmlFor="role" className="form-label">Role</label>
                        <br />
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select form-select-custom">
                          <option value="Customer">Customer</option>
                          <option value="Service Provider">Service Provider</option>
                        </select>
                      </div>
                      {role === 'Service Provider' && (
                        <div className="col-12">
                          <label htmlFor="service" className="form-label">Service</label>
                          <br />
                          <input type="text" value={service} onChange={(e) => setService(e.target.value)} name="service" className="form-control form-control-custom" id="service" required />
                        </div>
                      )}
                      <div className="col-12">
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <br />
                        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} name="contact" className="form-control form-control-custom" id="contact" required />
                      </div>
                      <br />
                      <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <br />
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="address" className="form-control form-control-custom" id="address" required />
                      </div>
                      <br />
                      <div className="col-12">
                        <button className="btn btn-primary btn-lg w-100 custom-login-button" type="submit">Create Account</button>
                      </div>
                      <br />
                      <div className="col-12">
                        <p className="small mb-0">Already have an account? <Link to="/login">Log in</Link></p>
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

export default CreateAccount;
