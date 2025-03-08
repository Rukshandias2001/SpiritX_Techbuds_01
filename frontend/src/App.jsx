import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import SignUp from "./pages/SignUp";
import WelcomePage from "./pages/WelcomePage";
 

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcomePage" element={<WelcomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
