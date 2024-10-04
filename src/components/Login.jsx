import { useState } from 'react';
import axios from 'axios';

const AuthPage = ({ onLoginSuccess, onSignupSuccess }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setSuccessMessage('');
        try {
            const res = await axios.post('https://friends-website-backend.onrender.com/auth/login', {
                email: loginEmail,
                password: loginPassword,
            });
            onLoginSuccess(res.data.token);
            setSuccessMessage('Login successful!');
        } catch (err) {
            setLoginError('Login failed. Please try again.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupError('');
        setSuccessMessage('');
        try {
            const res = await axios.post('https://friends-website-backend.onrender.com/auth/register', {
                email: signupEmail,
                password: signupPassword,
            }, {
                withCredentials: true
            });
            onSignupSuccess(res.data.token);
            setSuccessMessage('Registration successful!');
        } catch (err) {
            setSignupError('Registration failed. Try again.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#2A9D8F]">
            {/* Заголовок Hello */}
            <h2 className="text-3xl mb-8 text-center font-semibold flex items-center justify-center text-white">
                <span role="img" aria-label="wave" className="mr-2">👋</span>HELLO!
            </h2>
            <div className="p-8 bg-[#E9C46A] shadow-md rounded-lg flex justify-around items-center w-[800px]">

                <div className="flex justify-between w-full">

                    <form className="p-4 bg-[#F4A261] shadow-md rounded-lg w-[300px]" onSubmit={handleLogin}>
                        <h3 className="text-xl mb-4 text-center">LOGIN</h3>
                        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                        <div className="mb-4">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="border p-2 w-full rounded-lg"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="border p-2 w-full rounded-lg"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#264653] text-white py-2 px-4 rounded-lg w-full hover:bg-gray-900"
                        >
                            LOGIN
                        </button>
                    </form>


                    <form className="p-4 bg-[#F4A261] shadow-md rounded-lg w-[300px]" onSubmit={handleSignup}>
                        <h3 className="text-xl mb-4 text-center">REGISTER</h3>
                        {signupError && <p className="text-red-500 mb-4">{signupError}</p>}
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                        <div className="mb-4">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="border p-2 w-full rounded-lg"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="border p-2 w-full rounded-lg"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#264653] text-white py-2 px-4 rounded-lg w-full hover:bg-gray-900"
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
