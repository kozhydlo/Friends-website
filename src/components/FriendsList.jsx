import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddFriend from './AddFriend';

const FriendsList = ({ token }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(false); // Додано стан для відстеження додавання друга

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
        friend.name && friend.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        setFriends([...friends, newFriend]);
        setIsModalOpen(false); // Закриваємо модальне вікно після додавання
        setIsFriendAdded(true); // Встановлюємо стан, що друг доданий
    };

    return (
        <div className="flex">
            <div className="w-1/5 bg-[#E76F51] p-4 h-screen">
                <h2 className="text-white text-lg mb-4">Your Friends:</h2>
                <input
                    type="text"
                    placeholder="Search friends"
                    className="w-full mb-4 p-2 rounded bg-white/70"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul>
                    {filteredFriends.map((friend) => (
                        <li
                            key={friend._id}
                            className="bg-[#E9C46A] text-white mb-2 p-2 rounded flex justify-between items-center cursor-pointer"
                            onClick={() => handleFriendClick(friend)}
                        >
                            <span className="text-black">{friend.name}</span>
                            <button className="bg-gray-800 text-white p-1 rounded">📋</button>
                        </li>
                    ))}
                </ul>
                <button
                    className="text-white mt-4 block mx-auto" // Додаємо mx-auto для горизонтального центрування
                    onClick={handleAddFriendClick} // Відкриття модального вікна
                >
                    + Make a New Contact
                </button>
            </div>

            {/* Основний контент */}
            <div className="w-full bg-teal-500 h-screen">
                {isFriendAdded ? ( // Якщо друг доданий, відображаємо нову сторінку
                    <div className="flex justify-center items-center h-full">
                        <h1 className="text-white text-3xl">Перезавантажте сторінку</h1>
                    </div>
                ) : (
                    <div></div> // Тут можна додати інший контент, якщо потрібно
                )}
            </div>

            {/* Модальне вікно з деталями про друга */}
            {selectedFriend && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#F4A261] p-4 rounded-lg shadow-lg relative w-1/3">
                        <button
                            className="absolute top-2 right-2 text-black p-1 rounded"
                            onClick={handleCloseModal}
                        >
                            ✖
                        </button>
                        <h3 className="text-black text-lg mb-2">{selectedFriend.name}</h3>
                        <p className="text-black">Address: {selectedFriend.address}</p>
                        <p className="text-black">Phone: {selectedFriend.phone}</p>
                        <p className="text-black">Birthday: {selectedFriend.birthday}</p>
                        <p className="text-black">Email: {selectedFriend.email}</p>
                        <p className="text-black">Card: {selectedFriend.card}</p>
                    </div>
                </div>
            )}

            {/* Модальне вікно для додавання друга */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <button
                        className="absolute top-2 right-2 text-black p-1 rounded"
                        onClick={() => setIsModalOpen(false)} // Закриваємо модальне вікно
                    >
                        ✖
                    </button>
                    <AddFriend
                        token={token}
                        onFriendAdded={handleFriendAdded} // Передаємо функцію для додавання друга
                        onClose={() => setIsModalOpen(false)} // Передаємо функцію для закриття
                    />
                </div>
            )}
        </div>
    );
};

export default FriendsList;
