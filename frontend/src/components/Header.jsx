import '../styles/header.css'
import {useNavigate} from 'react-router-dom'

function Header(){
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("isLoggedIn");
        navigate('/login');
    };

    return (
    <>
    <header>
        <div className="dashboard-header">
            <h2>Product Dashboard</h2>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    </header>
    </>
    );
};

export default Header;