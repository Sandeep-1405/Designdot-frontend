import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [displayBlogs, setDisplayBlogs] = useState([]);
    const [blogCreated, setBlogCreated] = useState(true);
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    //console.log(jwt)

    if(jwt === null){
        navigate('/login')
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:3001/blogs', {
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    },
                });
                setBlogCreated(false)
                console.log(res)
                setDisplayBlogs(res?.data?.blogs);
            } catch (error) {
                console.log(error)
            }
        };

        if (blogCreated) {
            fetchBlogs();
            setBlogCreated(false);
        }
    }, [blogCreated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:3001/blog',
                { title, description },
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    },
                }
            );
            alert(res?.data?.message);
            setTitle('');
            setDescription('');
            setBlogCreated(true);
        } catch (error) {
            alert(error?.response?.data?.message);
        }
    };

    const onClickLogout = ()=>{
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className='d-flex justify-content-between mb-3'>
                    <h1>Blogs</h1>
                    <button className='btn btn-outline-danger' onClick={onClickLogout}>Logout</button>
                </div>
                <div className="col-12">
                    <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm">
                        <h5 className="text-start mb-4">Create a Blog</h5>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-bold">Title</label>
                            <input
                                type="text"
                                id="title"
                                className="form-control"
                                placeholder="Enter your Blog Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-bold">Description</label>
                            <textarea 
                                className="form-control"
                                placeholder="Enter your Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                                rows={5}
                            ></textarea>
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-outline-secondary w-25">Create</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-5">
                <h4>Recent Blogs</h4>
                <hr />
                {displayBlogs.length === 0 ? (
                    <h6>No Recent Blogs</h6>
                ) : (
                    displayBlogs.map(blog => (
                        <Link to={`/${blog.title}`} key={blog._id} className="mb-4 card p-3 text-decoration-none" >
                            <p className="lh-1 mb-2">{blog.userId.name}</p>
                            <p className="lh-1">{new Date(blog.updatedAt).toLocaleString()}</p>

                            <h3 className='mt-2'>{blog.title}</h3>
                            
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
