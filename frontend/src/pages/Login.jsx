import { useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { useState } from 'react';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleLogin = () => {

        //using api -- login
        fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Login successfull!') {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setIsLoggedIn("true"); // This updates in App.jsx
                    navigate('/dashboard');
                } else {
                    setError(data.message);
                }
            })
            .catch(err => console.error("login error : ", err));

    };

    const handleRegister = () => {
        //using api -- Register
        fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'User registered successfully!') {
                    setSuccess("Registered successfully! Please login.");
                    setError('');
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setIsRegister(false); // switch back to login
                } else {
                    setError(data.message);
                    setSuccess('');
                }
            })
            .catch(err => console.error("register error:", err));
    };

    const handleToggle = () => {
        setIsRegister(!isRegister);
        setError('');
        setSuccess('');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <div className='login-container'>
                <div className='login-card'>
                    <h2>{isRegister ? 'REGISTER' : 'LOGIN'}</h2>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                    {isRegister && (
                        <input
                            className='login-input'
                            type='text'
                            placeholder='username...'
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    )}
                    <input
                        className='login-input'
                        type='email'
                        placeholder='email...'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        className='login-input'
                        type='password'
                        placeholder='password...'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button className='login-button' onClick={isRegister ? handleRegister : handleLogin}>{isRegister ? 'Register' : 'Login'}</button>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '14px' }}>
                        {isRegister ? "Already have an account?" : "Don't have an account?"}
                        <span
                            onClick={handleToggle}
                            style={{ color: '#2563eb', cursor: 'pointer', marginLeft: '5px' }}
                        >
                            {isRegister ? 'Login' : 'Register'}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;