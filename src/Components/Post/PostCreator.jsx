import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './PostCreator.css';
import {toast} from "react-toastify"

export default function PostCreator({ onClose, refreshData }) {
    const [formData, setFormData] = useState({
        formTitle: '',
        title:'',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://18.212.239.27:8080/jiPost', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                setSuccessMessage('Post added successfully!');
                toast.success("Post added successfully!")
                setErrorMessage('');
                refreshData(); // Refresh the post data after submission
                onClose(); // Close the form after submission
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
            onClose();
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
                    <header>Create Post</header>
                    <form onSubmit={handleSubmit}>
                        <div className="content">
                            <img src="" alt="logo" />
                            <div className="details">
                                <p>{formData.postedby}</p>
                                <div className="privacy">
                                    <span>users</span>
                                </div>
                            </div>
                        </div>
                        <textarea className='de'
                            name="formTitle"
                            placeholder="Form Title"
                            spellCheck="false"
                            required
                            value={formData.formTitle}
                            onChange={handleChange}
                        />
                        <textarea className='de'
                            name="title"
                            placeholder="Title"
                            spellCheck="false"
                            required
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="desc"
                            placeholder="Form Description?"
                            spellCheck="false"
                            required
                            value={formData.desc}
                            onChange={handleChange}
                        />
                        <button type="submit">Post</button>
                    </form>
                </section>
            </div>
        </div>
    );
}
