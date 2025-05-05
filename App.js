import React, { useState } from 'react';
import './App.css';
import SignUp from './Components/LoginSignUp/SignUp.jsx'; 
import Login from './Components/LoginSignUp/login.jsx'; 
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<SignUp />} /> {}
    </Routes>
  );
}

export default App;
