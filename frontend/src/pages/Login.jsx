import { useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { useState } from 'react';

function Login({setIsLoggedIn}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleLogin = () => {

        //using api -- login
        fetch('http://localhost:4000/api/login',{
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(data => {
            console.log("login response:", data);
            if(data.message === 'Login successfull!'){
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user",JSON.stringify(data.user));
                setIsLoggedIn("true"); // This updates in App.jsx
                navigate('/dashboard');
            } else {
                setError(data.message);
            }
        })
        .catch(err => console.error("login error : ", err));

        // ----------
        // fake login for now
        // localStorage.setItem("isLoggedIn", "true");
        //    console.log("isLoggedIn value in App.jsx",isLoggedIn);
        // navigate('/dashboard');
        // --------

    };
    return (
        <>
            <div className='login-container'>
                <div className='login-card'>
                    <h2>LOGIN</h2>
                    {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}
                    <input
                    className='login-input'
                    type='email'
                    placeholder='email...'
                    value={email}
                    onChange={(e)=>{ setEmail(e.target.value)}}
                    />
                    <input
                    className='login-input'
                    type='password'
                    placeholder='password...'
                    value={password}
                    onChange={(e)=>{ setPassword(e.target.value)}}
                    />
                    <button className='login-button' onClick={handleLogin}>login button</button>
                </div>
            </div>
        </>
    );
};

export default Login;