import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResourceUpload.css';
import { toast } from "react-toastify";

const ResourceUpload = ({ refreshData }) => {
    const [resources, setResources] = useState({
        title: '',
        description: '',
        subject: '',
        semester: '',
        postedby: '',
        tags: '',
        files: [],
        date: new Date()
    });

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setResources(prevState => ({
            ...prevState,
            files: Array.from(event.target.files)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResources(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', resources.title);
        formData.append('description', resources.description);
        formData.append('subject', resources.subject);
        formData.append('semester', resources.semester);
        formData.append('postedby', localStorage.getItem('username'));
        formData.append('tags', resources.tags); // Add tags

        resources.files.forEach(file => {
            formData.append('files', file);
        });

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://54.221.19.62:8080/resources', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            toast.success("Resource saved successfully!");
            refreshData(); // Refresh data after successful upload
            navigate('/resources'); // Redirect to resources page
            console.log('Resource saved:', response.data);
        } catch (err) {
            console.error('Error uploading resource:', err);
            toast.error("Error uploading resource");
        }
    };

    return (
        <div className="resource-upload-form">
            <h2>Upload New Resource</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        value={resources.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={resources.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        id="subject"
                        name="subject"
                        value={resources.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="semester">Semester</label>
                    <input
                        id="semester"
                        name="semester"
                        value={resources.semester}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="files">Files</label>
                    <input
                        id="files"
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Upload Resource</button>
            </form>
        </div>
    );
};

export default ResourceUpload;
