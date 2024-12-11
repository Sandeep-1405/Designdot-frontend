import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HOC from '../HOC/Hoc';

const BlogData = () => {
    const [blogData, setBlogData] = useState([]);
    const { title } = useParams();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${title}`, { headers: { 'Authorization': `Bearer ${jwt}` } });
                setBlogData(res?.data?.blog);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlog()
    }, [title]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Blog Data</h1>

            {blogData.length === 0 ? (
                <p className="text-center">No blog found</p>
            ) : (
                blogData.map(blog => (
                    <div key={blog._id} className="card mb-4">
                        <div className="card-body">
                            <h6>Title:</h6>
                            <p className="card-text">{blog.title}</p>
                            <h6>Description:</h6>
                            <p className="card-text">{blog.description}</p>
                            
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default HOC(BlogData);
