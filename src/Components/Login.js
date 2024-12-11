import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,{email,password})
            localStorage.setItem('jwt',res.data.jwtToken)
            console.log(res)
            alert(res?.data?.message)
            navigate('/')
        }catch(error){
            console.log(error)
            alert(error?.response?.data?.message)
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                        <h1 className="text-center mb-4">Login</h1>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        

                        <button type="submit" className="btn btn-primary w-100">Login</button>

                        <p className='text-center mt-3'>Don't have an account <Link to='/register' className='text-decoration-none'>create now</Link></p>

                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
