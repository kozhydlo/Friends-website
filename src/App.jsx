import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import FriendsList from './components/FriendsList';

const App = () => {
    const [token, setToken] = useState(null);
    const [isLogin, setIsLogin] = useState(true);

    const handleSignupSuccess = (token) => {
        setToken(token);
    };

    const handleLoginSuccess = (token) => {
        setToken(token);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="App">
            {!token ? (
                <AuthPage
                    onLoginSuccess={handleLoginSuccess}
                    onSignupSuccess={handleSignupSuccess}
                />
            ) : (
                <FriendsList token={token} />
            )}
        </div>
    );
};

export default App;
