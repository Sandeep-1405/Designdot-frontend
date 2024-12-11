import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogData = () => {
    const [blogData, setBlogData] = useState([]);
    const { title } = useParams();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/${title}`, { headers: { 'Authorization': `Bearer ${jwt}` } });
                setBlogData(res.data.blog);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlog();
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
                            <h4>Title:</h4>
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

export default BlogData;
