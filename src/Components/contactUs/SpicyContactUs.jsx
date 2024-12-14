import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SpicyContactUs.css';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';

export default function SpicyContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        desc: '',
        postedby: localStorage.getItem('username'),
        date:new Date()
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://54.221.19.62:8080/contactus', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                setSuccessMessage('Post added successfully!');
                toast.success("Post added successfully!")
                navigate('/home');
                setErrorMessage('');
                 // Close the form after submission
            } else {
                setErrorMessage('Failed to add post.');
            }
        } catch (error) {
            console.error('Error adding post:', error);
            setErrorMessage('Error adding post.');
            toast.error("Error adding post.")
        }
    };

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="cont">
            <div className="wrapper" ref={formRef}>
                <section className="post">
                    <header>Contact Us</header>
                    <form onSubmit={handleSubmit}>
                        <textarea className='de'
                            name="name"
                            placeholder="name"
                            spellCheck="false"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <textarea className='de'
                            name="email"
                            placeholder="email"
                            spellCheck="false"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            name="desc"
                            placeholder="Description"
                            spellCheck="false"
                            required
                            value={formData.desc}
                            onChange={handleChange}
                        />
                        <button type="submit">Send Message</button>
                    </form>
                </section>
            </div>
        </div>
    );
}
