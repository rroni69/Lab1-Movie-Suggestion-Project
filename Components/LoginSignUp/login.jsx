import React, { useState } from "react";
import "./SignUp.css"; 
import logo from './starwatch.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email){
      Errors.email="Email is required!";
    }else if(!emailRegex.test(formData.email)){
      Errors.email="Incorrect email format!";
    }

    if(!formData.password){
      Errors.password="Password is required"; 
    }
    setErrors(Errors);
    return Object.keys(Errors).length === 0;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(!validate()){
      return;
    }try{
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(data.message);
    }catch(error){
      console.error('Error:', error);
      alert('Something went wrong!');
    } 

}
return (
  <>
    <img src={logo} alt="Logo" className="logo" />
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            <p></p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            
          </div>

          <button type="submit" className="btn btn-danger btn-block mt-3">Login</button>
        </form>
      </div>
    </div>
  </>
);
};

export default Login;