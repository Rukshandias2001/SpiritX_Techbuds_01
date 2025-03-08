import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import SignUp from "./pages/SignUp";
 

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
