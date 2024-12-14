import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './ResourcePage.css';
import ResourceUpload from './ResourceUpload';
import { toast } from "react-toastify";
import CommonLoader from '../../Components/Loader/CommonLoader'; // Import CommonLoader component

const ResourcePage = () => {
    const [resources, setResources] = useState([]);
    const [expandedResources, setExpandedResources] = useState([]); // State to track expanded resources
    const token = localStorage.getItem('token'); // Get token from local storage
    const username = localStorage.getItem('username'); // Get username from local storage
    const [showUploadForm, setShowUploadForm] = useState(false); // State to toggle the upload form
    const [loading, setLoading] = useState(false); // State to manage loading

    const fetchResources = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://54.221.19.62:8080/resources', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setResources(response.data);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    const deleteResource = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/resources/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                fetchResources(); // Refresh the resources list after deletion
                toast.success("Resource deleted successfully!");
            } else {
                toast.error("Failed to delete resource.");
            }
        } catch (error) {
            console.error('Error deleting resource:', error);
            toast.error("Error deleting resource.");
        }
    };

    const downloadFile = (fileData, filename, contentType) => {
        const byteCharacters = atob(fileData); // Decode base64 to binary
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
        URL.revokeObjectURL(url); // Release memory
    };

    const toggleExpand = (id) => {
        setExpandedResources(prev =>
            prev.includes(id) ? prev.filter(resourceId => resourceId !== id) : [...prev, id]
        );
    };

    const truncate = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    const formatFileSize = (bytes) => {
        if (isNaN(bytes) || bytes === null || bytes === undefined) return 'N/A';
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="resourcePage">
            {loading && <CommonLoader />} {/* Display loader if loading */}
            {!loading && (
                <>
                    <h1>Resource Board</h1>
                    <div className="add-resource-container">
                        <button onClick={() => setShowUploadForm(!showUploadForm)} className="add-resource-button">
                            {showUploadForm ? "Close Upload Form" : "Upload New Resource"}
                        </button>
                        {showUploadForm && <ResourceUpload refreshData={fetchResources} />}
                    </div>
                    <div className="resourceList">
                        {resources.map((resource) => {
                            const isExpanded = expandedResources.includes(resource.stringId); // Check if resource is expanded
                            const shouldTruncate = resource.description.length > 150;

                            return (
                                <div key={resource.stringId} className="resourceCard">
                                    <div className="resourceCardInner" style={{ '--card-color': resource.color }}>
                                        <div className="resource-header">
                                            <h2>{resource.title}</h2>
                                            {username === resource.postedby && (
                                                <button onClick={() => deleteResource(resource.stringId)} className="delete-button">
                                                    <span className="delete-icon">×</span>
                                                </button>
                                            )}
                                        </div>
                                        <div className="resource-tags">
                                            {resource.tags && resource.tags.split(',').map((tag, index) => (
                                                <span key={index} className="tag">{tag.trim()}</span>
                                            ))}
                                        </div>
                                        <p className="resource-description">
                                            {shouldTruncate && !isExpanded ? truncate(resource.description, 150) : resource.description}
                                        </p>
                                        {shouldTruncate && (
                                            <button
                                                onClick={() => toggleExpand(resource.stringId)}
                                                className="read-more-button"
                                            >
                                                {isExpanded ? 'Show Less' : 'Read More'}
                                            </button>
                                        )}
                                        <div className="resource-meta">
                                            <span className="subject">{resource.subject}</span>
                                            <span className="semester">{resource.semester}</span>
                                            <span className="posted-by">Posted by: {resource.postedby}</span>
                                            <span className="date-posted">Date: {formatDate(resource.date)}</span>
                                        </div>
                                        {resource.files.length > 0 && (
                                            <div className="resource-files">
                                                <h4>Attached Files:</h4>
                                                <ul>
                                                    {resource.files.map((file, index) => (
                                                        <li key={index}>
                                                            <span
                                                                className="file-name"
                                                                onClick={() => downloadFile(file.data, file.name, file.header)}
                                                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                                            >
                                                                {file.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default ResourcePage;
