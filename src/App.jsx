import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import AddFriend from './components/AddFriend';
import FriendsList from './components/FriendsList';

const App = () => {
    const [token, setToken] = useState(null);
    const [isLogin, setIsLogin] = useState(true); // Контролюємо перемикання між входом і реєстрацією

    const handleSignupSuccess = (token) => {
        setToken(token);
    };

    const handleLoginSuccess = (token) => {
        setToken(token);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); // Перемикання між Login та Signup
    };

    return (
        <div className="App">
            {!token ? (
                <>
                    {isLogin ? (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    ) : (
                        <Signup onSignupSuccess={handleSignupSuccess} />
                    )}

                </>
            ) : (
                <FriendsList token={token} />
                // <div className="flex justify-center space-x-4">
                //     {/*<AddFriend token={token} onFriendAdded={() => {}} />*/}
                //     <FriendsList token={token} />
                // </div>
            )}
        </div>
    );
};

export default App;
