import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    // State variables for form data
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,{name,username,email,password});
            console.log(res)
            alert(res?.data?.message)
            navigate('/login')
        }catch(error){
            console.log(error)
            alert(error?.message)
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <form className="border p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                        <h1 className="text-center mb-4">Signup</h1>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">UserName</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter your username"
                                value={username}
                                onChange={e=>setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Signup</button>

                        <p className='text-center mt-3'>Already have an account <Link to='/login' className='text-decoration-none'>Login now</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
