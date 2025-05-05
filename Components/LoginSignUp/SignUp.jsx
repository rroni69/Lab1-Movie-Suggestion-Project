import React, { useState } from "react";
import "./SignUp.css";
import logo from './starwatch.png';
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const { name, email, password } = formData;
  const [alert, setAlert] = useState({type: '', message: ''});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };



  const validate = () => {
    const Errors = {};
    if (!formData.name) {
      Errors.name = "Name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      Errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      Errors.email = "Incorrect email format";
    }
    if (!formData.password) {
      Errors.password = "Password is required";
    } else if (password.length < 5) {
      Errors.password = "Password must be at least 5 characters long";
    }
    setErrors(Errors);
    return Object.keys(Errors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setAlert({type: res.ok ? 'success' : 'danger', message: data.message});
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };
  return (
    <>
      <img src={logo} alt="Logo" className="logo" />
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Sign Up</h2>

          {alert.message && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              <p></p>

            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
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
              <p className='accountg'>Already have an account? <Link to="/login">Login!</Link></p>

            </div>

            <button type="submit" className="btn btn-danger btn-block mt-3">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;