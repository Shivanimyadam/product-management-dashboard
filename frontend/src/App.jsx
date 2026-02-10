import { useState } from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard';
import Login from './pages/login';

function App() {
const isLoggedIn = localStorage.getItem("isLoggedIn");
console.log("isLoggedIn value in App.jsx",isLoggedIn);
  return (
    <div className='app-container'>
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={isLoggedIn ? <Dashboard/> : <Navigate to="/login"/> } />
    </Routes>
    </div>
    
  )
}

export default App
