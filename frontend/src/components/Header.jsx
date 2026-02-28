import '../styles/header.css'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");  // ✅ clear user too
        navigate('/login');
    };

    return (
        <>
            <header>
                <div className="dashboard-header">
                    <h2>Product Dashboard</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>Welcome, <strong>{user?.username}</strong></span>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;