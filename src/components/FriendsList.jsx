import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddFriend from './AddFriend';

const FriendsList = ({ token }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get('https://friends-website-backend.onrender.com/friends', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setFriends(res.data);
            } catch (err) {
                console.error('Error fetching friends:', err);
            }
        };
        fetchFriends();
    }, [token]);

    const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
    };

    const handleCloseModal = () => {
        setSelectedFriend(null);
    };

    const handleAddFriendClick = () => {
        setIsModalOpen(true);
    };

    const handleFriendAdded = (newFriend) => {
        setFriends((prevFriends) => [...prevFriends, newFriend]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex">
            <div className="w-1/4 bg-orange-500 p-4 h-screen">
                <h2 className="text-white text-lg mb-4">Your Friends:</h2>
                <input
                    type="text"
                    placeholder="Search friends"
                    className="w-full mb-4 p-2 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul>
                    {filteredFriends.map((friend) => (
                        <li
                            key={friend._id}
                            className="bg-yellow-400 text-white mb-2 p-2 rounded flex justify-between items-center cursor-pointer"
                            onClick={() => handleFriendClick(friend)}
                        >
                            <span>{friend.name}</span>
                            <button className="bg-gray-800 text-white p-1 rounded">📋</button>
                        </li>
                    ))}
                </ul>
                <button className="text-white mt-4 block" onClick={handleAddFriendClick}>
                    + Make a New Contact
                </button>
            </div>

            {/* Основний контент */}
            <div className="w-3/4 bg-teal-500 h-screen"></div>

            {/* Модальне вікно з деталями про друга */}
            {selectedFriend && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-orange-400 p-4 rounded-lg shadow-lg relative w-1/3">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                            onClick={handleCloseModal}
                        >
                            ✖
                        </button>
                        <h3 className="text-white text-lg mb-2">{selectedFriend.name}</h3>
                        <p className="text-white">Address: {selectedFriend.address}</p>
                        <p className="text-white">Phone: {selectedFriend.phone}</p>
                        <p className="text-white">Birthday: {selectedFriend.birthday}</p>
                        <p className="text-white">Email: {selectedFriend.email}</p>
                        <p className="text-white">Card: {selectedFriend.card}</p>
                    </div>
                </div>
            )}

            {/* Модальне вікно для додавання друга */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 relative">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>
                        <AddFriend
                            token={token}
                            onFriendAdded={handleFriendAdded}
                            onClose={() => setIsModalOpen(false)} // Передаємо функцію для закриття модального вікна
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendsList;
