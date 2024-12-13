import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Header/NavBar/NavBar';
import Login from './Components/Login-Singup/Login';
import Signup from './Components/Login-Singup/Signup';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Post from './Components/Post/Post';
import ResourceUpload from './Components/ResourcesLibaraySystem/ResourceUpload';
import ResourcePage from './Components/ResourcesLibaraySystem/ResourcePage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpicyContactUs from './Components/contactUs/SpicyContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
// import ResourceList from './Components/ResourcesLibaraySystem/ResourceList';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? true : false;
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("Effect triggered");
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Token found, setting authenticated to true");
            setIsAuthenticated(true);
        } else {
            console.log("No token found, navigating to login");
            setIsAuthenticated(false);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <>
            {location.pathname !== "/" && location.pathname !== "/signup" && (
                <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            )}
            <main className="main-content">
                <Routes>
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/post"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Post />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/upload-resource"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ResourceUpload />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/resources"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ResourcePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/contactus"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <SpicyContactUs/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/aboutus"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <AboutUs/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/aboutus" element={<div>About Us</div>} />
                    <Route path="/contactus" element={<div>Contact Us</div>} />
                    <Route path="/features" element={<div>Features</div>} />
                </Routes>
            </main>
            {location.pathname !== "/" && location.pathname !== "/signup" && (
                <Footer isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            )}
            <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    />
        </>
    );
};

const WrappedApp = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default WrappedApp;
