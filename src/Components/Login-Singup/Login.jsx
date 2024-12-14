import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify"


export default function Login({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://54.166.196.136:8080/log', formData);
            if (response.data) { // Assuming the API returns the token as a plain string
                setSuccessMessage("Login successful!");
                toast.success("Login successful!");
                setErrorMessage('');
                localStorage.setItem('token', response.data);
                localStorage.setItem('username', formData.name); // Store token in local storage
                setIsAuthenticated(true); // Update authentication state
                navigate('/home'); // Redirect to home page
            } else {
                setErrorMessage('Invalid email or password');
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.error('There was an error!', error);
            setErrorMessage('There was an error during login.');
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="login-root">
            <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
                <div className="loginbackground box-background--white padding-top--64">
                    <div className="loginbackground-gridContainer">
                        <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                            <div className="box-root" style={{ backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)', flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                            <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                            <div className="box-root box-background--blue800" style={{ flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                            <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                            <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                            <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                            <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                            <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                            <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }} />
                        </div>
                    </div>
                </div>
                <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
                    
                    <div className="formbg-outer">
                        <div className="formbg">
                        <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                        <h1><a className='logo'href="http://blog.stackfindover.com/" rel="dofollow">Campus Connect</a></h1>
                    </div>
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15">Sign in to your account</span>
                                <form id="stripe-login" onSubmit={handleSubmit}>
                                    <div className="field padding-bottom--24">
                                        <label htmlFor="name">Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <div className="grid--50-50">
                                            <label htmlFor="password">Password</label>
                                            <div className="reset-pass">
                                                <a href="/">Forgot your password?</a>
                                            </div>
                                        </div>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            value={formData.password} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                        <label htmlFor="checkbox">
                                            <input type="checkbox" name="checkbox" /> Stay signed in for a week
                                        </label>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <button type="submit">Continue <FontAwesomeIcon icon={faArrowRight} /></button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                        <div className="footer-link padding-top--24">
                            <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                <span><a href="/">© CampusConnect</a></span>
                                <span><a href="/">Contact</a></span>
                                <span><a href="/">Privacy &amp; terms</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
