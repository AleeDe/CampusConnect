import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './PostCreator.css';
import {toast} from "react-toastify"

export default function EditPost({ onClose, post, refreshData }) {
    const [postData, setPostData] = useState({
        formTitle: post.formTitle,
        title: post.title,
        desc: post.desc,
        postedby: post.postedby
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://54.221.19.62:8080/jiPost/${post.stringId}`, postData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setSuccessMessage('Post updated successfully!');
                toast.success("Post updated successfully!");
                setErrorMessage('');
                refreshData(); // Refresh the post data after submission
                onClose(); // Close the form after submission
            } else {
                setErrorMessage('Failed to update post.');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            setErrorMessage('Error updating post.');
            toast.errorMessage("Error updating post.");
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
                    <header>Edit Post</header>
                    <form onSubmit={handleSubmit}>
                        <div className="content">
                            <img src="" alt="logo" />
                            <div className="details">
                                <p>{postData.postedby}</p>
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
                            value={postData.formTitle}
                            onChange={handleChange}
                        />
                        <textarea className='de'
                            name="title"
                            placeholder="Title"
                            spellCheck="false"
                            required
                            value={postData.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="desc"
                            placeholder="Form Description?"
                            spellCheck="false"
                            required
                            value={postData.desc}
                            onChange={handleChange}
                        />
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </form>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </section>
            </div>
        </div>
    );
}
