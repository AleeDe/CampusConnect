import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { toast } from "react-toastify";

export default function NavBar({ isAuthenticated, handleLogout }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        handleLogout();
        toast.success("Logout successful!");
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div>
            <nav>
                <div className="wrapper">
                    <div className="logo"><Link to="/home">CamPusConnect</Link></div>
                    
                    <ul className="nav-links" style={{ display: menuVisible ? 'flex' : 'none' }}>
                        <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/resources" onClick={toggleMenu}>Resources</Link></li>
                        <li><Link to="/post" onClick={toggleMenu}>Jobs</Link></li>
                        <li><Link to="/contactus" onClick={toggleMenu}>Contact Us</Link></li>
                    </ul>
                    <div className="logout">
                        <h2>{localStorage.getItem('username')}</h2>
                        <li><button className="btn-logout" onClick={handleLogoutClick}>Logout</button></li>
                    </div>
                    <button className="menu-button" onClick={toggleMenu}>
                        {menuVisible ? 'x' : '='}
                    </button>
                </div>
            </nav>
        </div>
    );
}
