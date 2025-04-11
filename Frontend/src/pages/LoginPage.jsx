import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
            dispatch(login(res.data.token));
            alert('Logged in!');
            navigate('/dashboard');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input className="border p-2 mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="border p-2 mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
        </div>
    );
}
