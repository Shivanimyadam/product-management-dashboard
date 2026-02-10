import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

function Login() {
    const navigate = useNavigate();
    const handleLogin = () => {
        // fake login for now
        localStorage.setItem("isLoggedIn", "true");
        //    console.log("isLoggedIn value in App.jsx",isLoggedIn);
        navigate('/dashboard');
    };
    return (
        <>
            <div className='login-container'>
                <div className='login-card'>
                    <h2>LOGIN</h2>
                    <input
                    className='login-input'
                    type='email'
                    placeholder='email...'
                    />
                    <input
                    className='login-input'
                    type='password'
                    placeholder='password...'
                    />
                    <button className='login-button' onClick={handleLogin}>login button</button>
                </div>
            </div>
        </>
    );
};

export default Login;