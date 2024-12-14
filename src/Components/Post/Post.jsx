import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import './Post.css';
import PostCreator from './PostCreator';
import EditPost from './EditPost';
import { toast } from "react-toastify";
import CommonLoader from '../../Components/Loader/CommonLoader'; // Import CommonLoader component

export default function Post() {
    const [postData, setPostData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAddPost, setShowAddPost] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [expandedPost, setExpandedPost] = useState(null); // State to track expanded post
    const token = localStorage.getItem('token'); // Get token from local storage
    const username = localStorage.getItem('username'); // Get username from local storage
    const formRef = useRef(null); // Ref for the form to handle outside clicks
     const [loading, setLoading] = useState(false); 

    const fetchStudentData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://54.166.196.136:8080/jiPost', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response data:', response.data);
            if (response.data && Array.isArray(response.data)) {
                setPostData(response.data);
            } else {
                setErrorMessage('No post data available.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post data:', error);
            setErrorMessage('Error fetching post data.');
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://54.166.196.136:8080/jiPost/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Delete Successful");
            if (response.status === 204) {
                fetchStudentData(); // Refresh the post data after deletion
            } else {
                setErrorMessage('Failed to delete post.');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            setErrorMessage('Error deleting post.');
            toast.error("Error deleting post.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchStudentData();
        }
    }, [token, fetchStudentData]);

    const handleEdit = (post) => {
        setSelectedPost(post);
        setShowEditPost(true);
    };

    const handleExpand = (post) => {
        setExpandedPost(post);
    };

    const handleCloseExpand = () => {
        setExpandedPost(null);
    };

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setShowAddPost(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="cont-1">
            {loading && <CommonLoader />}
            <h1>Job & Internship Board</h1>
            <div className="button-group">
                {!showAddPost && (
                    <button onClick={() => setShowAddPost(true)}>Add New Post</button>
                )}
                {showAddPost && (
                <div ref={formRef}>
                    <PostCreator
                        onClose={() => setShowAddPost(false)}
                        refreshData={fetchStudentData}
                    />
                </div>
                )}
            </div>
            
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {postData.length > 0 ? (
                <div className="unique-row">
                    {postData.map((post) => (
                        <div className="unique-card" key={post.id} onClick={() => handleExpand(post)}>
                            <div className="unique-postedHead">
                                <div className="unique-postedBy">
                                    <img src="https://via.placeholder.com/50" alt="Profile" />
                                    <h4>{post.postedby}</h4>
                                </div>
                                <div className="unique-formtype">
                                    <h4>{post.formTitle}</h4>
                                </div>
                                
                            </div>
                            <div className="unique-subead">
                                <div className="unique-title">
                                    <h3>{post.title}</h3>
                                </div>
                                {username === post.postedby && (
                                    <div className="unique-btns" onClick={(e) => e.stopPropagation()}>
                                        <button className="unique-edit-button" onClick={() => handleEdit(post)}>Edit</button>
                                        <button className="unique-delete-button" onClick={() => handleDelete(post.stringId)}>Delete</button>
                                    </div>
                                )}
                                
                            </div>
                            <p className="unique-description">
                                {post.desc.length > 300 ? `${post.desc.slice(0, 300)}...` : post.desc}
                            </p>
                            <div className="unique-date">
                                <p>Posted on {new Date(post.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No post data available.</div>
            )}
            {showEditPost && selectedPost && (
                <EditPost
                    post={selectedPost}
                    onClose={() => setShowEditPost(false)}
                    refreshData={fetchStudentData}
                />
            )}
            {expandedPost && (
                <div className="modal" onClick={handleCloseExpand}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{expandedPost.title}</h3>
                        <p>{expandedPost.desc}</p>
                        <button className="modal-close-button" onClick={handleCloseExpand}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
