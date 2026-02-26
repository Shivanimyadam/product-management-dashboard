import { useState } from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
// const isLoggedIn = localStorage.getItem("isLoggedIn");
const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
console.log("isLoggedIn value in App.jsx",isLoggedIn);
  return (
    <div className='app-container'>
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>} />
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path='/dashboard' element={isLoggedIn ? <Dashboard/> : <Navigate to="/login"/> } />
    </Routes>
    </div>
    
  )
}

export default App
