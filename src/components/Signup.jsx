import { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignupSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/auth/register', {
                email,
                password,
            });
            onSignupSuccess(res.data.token);
        } catch (err) {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-200">
            <form className="p-8 bg-white shadow-md rounded-lg" onSubmit={handleSignup}>
                <h2 className="text-2xl mb-4">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="border p-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="border p-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
