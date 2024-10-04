// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const FriendsList = ({ token }) => {
//     const [friends, setFriends] = useState([]);
//
//     useEffect(() => {
//         const fetchFriends = async () => {
//             try {
//                 const res = await axios.get('http://localhost:4000/friends', {
//                     headers: {
//                         'x-auth-token': token,
//                     },
//                 });
//                 setFriends(res.data);
//             } catch (err) {
//                 console.error('Error fetching friends:', err);
//             }
//         };
//         fetchFriends();
//     }, [token]);
//
//     return (
//         <div className="p-8">
//             <h2 className="text-xl mb-4">Your Friends</h2>
//             {friends.length > 0 ? (
//                 <ul>
//                     {friends.map((friend) => (
//                         <li key={friend._id} className="p-4 border-b">
//                             <h3 className="text-lg">{friend.name}</h3>
//                             <p>{friend.email}</p>
//                             <p>{friend.phone}</p>
//                             <p>{friend.birthday}</p>
//                             <p>{friend.address}</p>
//                             <p>{friend.card}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No friends found.</p>
//             )}
//         </div>
//     );
// };
//
// export default FriendsList;
//
//
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const FriendsList = ({ token }) => {
//     const [friends, setFriends] = useState([]);
//     const [selectedFriend, setSelectedFriend] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//
//     useEffect(() => {
//         const fetchFriends = async () => {
//             try {
//                 const res = await axios.get('http://localhost:4000/friends', {
//                     headers: {
//                         'x-auth-token': token,
//                     },
//                 });
//                 setFriends(res.data);
//             } catch (err) {
//                 console.error('Error fetching friends:', err);
//             }
//         };
//         fetchFriends();
//     }, [token]);
//
//     const filteredFriends = friends.filter((friend) =>
//         friend.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     const handleFriendClick = (friend) => {
//         setSelectedFriend(friend);
//     };
//
//     const handleCloseModal = () => {
//         setSelectedFriend(null);
//     };
//
//     return (
//         <div className="flex">
//             {/* Бокова панель з переліком друзів */}
//             <div className="w-1/4 bg-orange-500 p-4 h-screen">
//                 <h2 className="text-white text-lg mb-4">Your Friends:</h2>
//                 <input
//                     type="text"
//                     placeholder="Search friends"
//                     className="w-full mb-4 p-2 rounded"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <ul>
//                     {filteredFriends.map((friend) => (
//                         <li
//                             key={friend._id}
//                             className="bg-yellow-400 text-white mb-2 p-2 rounded flex justify-between items-center cursor-pointer"
//                             onClick={() => handleFriendClick(friend)}
//                         >
//                             <span>{friend.name}</span>
//                             <button className="bg-gray-800 text-white p-1 rounded">📋</button>
//                         </li>
//                     ))}
//                 </ul>
//                 <button className="text-white mt-4 block">+ Make a New Contact</button>
//             </div>
//
//             {/* Основний контент */}
//             <div className="w-3/4 bg-teal-500 h-screen"></div>
//
//             {/* Модальне вікно з деталями про друга */}
//             {selectedFriend && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-orange-400 p-4 rounded-lg shadow-lg relative w-1/3">
//                         <button
//                             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
//                             onClick={handleCloseModal}
//                         >
//                             ✖
//                         </button>
//                         <h3 className="text-white text-lg mb-2">{selectedFriend.name}</h3>
//                         <p className="text-white">Address: {selectedFriend.address}</p>
//                         <p className="text-white">Phone: {selectedFriend.phone}</p>
//                         <p className="text-white">Birthday: {selectedFriend.birthday}</p>
//                         <p className="text-white">Email: {selectedFriend.email}</p>
//                         <p className="text-white">Card: {selectedFriend.card}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default FriendsList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddFriend from './AddFriend'; // Імпортуємо компонент AddFriend
//
// const FriendsList = ({ token }) => {
//     const [friends, setFriends] = useState([]);
//     const [selectedFriend, setSelectedFriend] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модального вікна
//
//     useEffect(() => {
//         const fetchFriends = async () => {
//             try {
//                 const res = await axios.get('http://localhost:4000/friends', {
//                     headers: {
//                         'x-auth-token': token,
//                     },
//                 });
//                 setFriends(res.data);
//             } catch (err) {
//                 console.error('Error fetching friends:', err);
//             }
//         };
//         fetchFriends();
//     }, [token]);
//
//     const filteredFriends = friends.filter((friend) =>
//         friend.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     const handleFriendClick = (friend) => {
//         setSelectedFriend(friend);
//     };
//
//     const handleCloseModal = () => {
//         setSelectedFriend(null);
//     };
//
//     const handleAddFriendClick = () => {
//         setIsModalOpen(true); // Відкриваємо модальне вікно
//     };
//
//     const handleFriendAdded = (newFriend) => {
//         setFriends([...friends, newFriend]); // Додаємо нового друга в список
//         setIsModalOpen(false); // Закриваємо модальне вікно після додавання
//     };
//
//     return (
//         <div className="flex">
//             {/* Бокова панель з переліком друзів */}
//             <div className="w-1/4 bg-orange-500 p-4 h-screen">
//                 <h2 className="text-white text-lg mb-4">Your Friends:</h2>
//                 <input
//                     type="text"
//                     placeholder="Search friends"
//                     className="w-full mb-4 p-2 rounded"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <ul>
//                     {filteredFriends.map((friend) => (
//                         <li
//                             key={friend._id}
//                             className="bg-yellow-400 text-white mb-2 p-2 rounded flex justify-between items-center cursor-pointer"
//                             onClick={() => handleFriendClick(friend)}
//                         >
//                             <span>{friend.name}</span>
//                             <button className="bg-gray-800 text-white p-1 rounded">📋</button>
//                         </li>
//                     ))}
//                 </ul>
//                 <button
//                     className="text-white mt-4 block"
//                     onClick={handleAddFriendClick} // Відкриття модального вікна
//                 >
//                     + Make a New Contact
//                 </button>
//             </div>
//
//             {/* Основний контент */}
//             <div className="w-3/4 bg-teal-500 h-screen"></div>
//
//             {/* Модальне вікно з деталями про друга */}
//             {selectedFriend && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-orange-400 p-4 rounded-lg shadow-lg relative w-1/3">
//                         <button
//                             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
//                             onClick={handleCloseModal}
//                         >
//                             ✖
//                         </button>
//                         <h3 className="text-white text-lg mb-2">{selectedFriend.name}</h3>
//                         <p className="text-white">Address: {selectedFriend.address}</p>
//                         <p className="text-white">Phone: {selectedFriend.phone}</p>
//                         <p className="text-white">Birthday: {selectedFriend.birthday}</p>
//                         <p className="text-white">Email: {selectedFriend.email}</p>
//                         <p className="text-white">Card: {selectedFriend.card}</p>
//                     </div>
//                 </div>
//             )}
//
//             {/* Модальне вікно для додавання друга */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 relative">
//                         <button
//                             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
//                             onClick={() => setIsModalOpen(false)} // Закриваємо модальне вікно
//                         >
//                             ✖
//                         </button>
//                         <AddFriend
//                             token={token}
//                             onFriendAdded={handleFriendAdded} // Передаємо функцію для додавання друга
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default FriendsList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddFriend from './AddFriend'; // Імпортуємо компонент AddFriend

const FriendsList = ({ token }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модального вікна

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
        setIsModalOpen(true); // Відкриваємо модальне вікно
    };

    const handleFriendAdded = (newFriend) => {
        setFriends([...friends, newFriend]); // Додаємо нового друга в список
        setIsModalOpen(false); // Закриваємо модальне вікно після додавання
    };

    return (
        <div className="flex">
            {/* Бокова панель з переліком друзів */}
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
            <div className="w-full bg-teal-500 h-screen"></div>

            {/* Модальне вікно з деталями про друга */}
            {selectedFriend && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#F4A261] p-4 rounded-lg shadow-lg relative w-1/3">
                        <button
                            className="absolute top-2 right-2  text-black p-1 rounded"
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
                    {/*<div className="bg-orange-400 p-4 rounded-lg shadow-lg w-1/3 relative">*/}
                        <button
                            className="absolute top-2 right-2  text-black p-1 rounded"
                            onClick={() => setIsModalOpen(false)} // Закриваємо модальне вікно
                        >
                            ✖
                        </button>
                        <AddFriend
                            token={token}
                            onFriendAdded={handleFriendAdded} // Передаємо функцію для додавання друга
                            onClose={() => setIsModalOpen(false)} // Передаємо функцію для закриття
                        />
                    {/*</div>*/}
                </div>
            )}

        </div>
    );
};

export default FriendsList;
