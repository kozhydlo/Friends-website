// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import AddFriend from './AddFriend';
//
// const FriendsList = ({ token }) => {
//     const [friends, setFriends] = useState([]);
//     const [selectedFriend, setSelectedFriend] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//
//     useEffect(() => {
//         const fetchFriends = async () => {
//             setLoading(true);
//             try {
//                 const res = await axios.get('https://friends-website-backend.onrender.com/friends', {
//                     headers: {
//                         'x-auth-token': token,
//                     },
//                 });
//                 setFriends(res.data);
//             } catch (err) {
//                 console.error('Error fetching friends:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchFriends();
//     }, [token]);
//
//     const filteredFriends = useMemo(() => {
//         return friends.filter((friend) =>
//             friend.name && friend.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     }, [friends, searchQuery]);
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
//         setIsModalOpen(true);
//     };
//
//     const handleFriendAdded = (newFriend) => {
//         setFriends([...friends, newFriend]);
//         setIsModalOpen(false);
//     };
//
//     return (
//         <div className="flex flex-col lg:flex-row">
//             {/* Left panel */}
//             <div className="lg:w-1/5 w-full bg-[#E76F51] p-4 lg:h-screen">
//                 <h2 className="text-white text-lg mb-4">Your Friends:</h2>
//                 <input
//                     type="text"
//                     placeholder="Search friends"
//                     className="w-full mb-4 p-2 rounded bg-white/70"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 {loading ? (
//                     <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E76F51] border-t-transparent"></div>
//                     </div>
//                 ) : (
//                     <ul>
//                         {filteredFriends.map((friend) => (
//                             <li
//                                 key={friend._id}
//                                 className="bg-[#E9C46A] text-white mb-2 p-2 rounded flex justify-between items-center cursor-pointer"
//                                 onClick={() => handleFriendClick(friend)}
//                             >
//                                 <span className="text-black">{friend.name}</span>
//                                 <button className="bg-gray-800 text-white p-1 rounded">📋</button>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//                 <button
//                     className="text-white mt-4 block mx-auto"
//                     onClick={handleAddFriendClick}
//                 >
//                     + Make a New Contact
//                 </button>
//             </div>
//
//             {/* Right panel */}
//             <div className="lg:w-full w-full bg-teal-500 h-screen">
//
//             </div>
//
//             {/* Деталі друга */}
//             {selectedFriend && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-[#F4A261] p-4 rounded-lg shadow-lg relative w-11/12 lg:w-1/3">
//                         <button
//                             className="absolute top-2 right-2 text-black p-1 rounded"
//                             onClick={handleCloseModal}
//                         >
//                             ✖
//                         </button>
//                         <h3 className="text-black text-lg mb-2">{selectedFriend.name}</h3>
//                         <p className="text-black">Address: {selectedFriend.address}</p>
//                         <p className="text-black">Phone: {selectedFriend.phone}</p>
//                         <p className="text-black">Birthday: {selectedFriend.birthday}</p>
//                         <p className="text-black">Email: {selectedFriend.email}</p>
//                         <p className="text-black">Card: {selectedFriend.card}</p>
//                     </div>
//                 </div>
//             )}
//
//             {/* Модальне вікно для додавання друга */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <AddFriend
//                         token={token}
//                         onFriendAdded={handleFriendAdded}
//                         onClose={() => setIsModalOpen(false)}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default FriendsList;


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AddFriend from './AddFriend';

const FriendsList = ({ token }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(false); // Додаємо стан для повідомлення
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://friends-website-backend.onrender.com/friends', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setFriends(res.data);
            } catch (err) {
                console.error('Error fetching friends:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFriends();
    }, [token]);

    const filteredFriends = useMemo(() => {
        return friends.filter((friend) =>
            friend.name && friend.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [friends, searchQuery]);

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
        setIsModalOpen(false);
        setIsFriendAdded(true); // Відображаємо повідомлення після додавання друга
    };

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Left panel */}
            <div className="lg:w-1/5 w-full bg-[#E76F51] p-4 lg:h-screen">
                <h2 className="text-white text-lg mb-4">Your Friends:</h2>
                <input
                    type="text"
                    placeholder="Search friends"
                    className="w-full mb-4 p-2 rounded bg-white/70"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E76F51] border-t-transparent"></div>
                    </div>
                ) : (
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
                )}
                <button
                    className="text-white mt-4 block mx-auto"
                    onClick={handleAddFriendClick}
                >
                    + Make a New Contact
                </button>
            </div>

            {/* Right panel */}
            <div className="lg:w-full w-full bg-teal-500 h-screen flex justify-center items-center">
                {isFriendAdded ? (
                    <div className="text-white text-3xl">Перезавантажте сторінку</div>
                ) : (
                    <div className="text-white text-2xl">Список друзів порожній або немає оновлень.</div>
                )}
            </div>

            {/* Деталі друга */}
            {selectedFriend && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#F4A261] p-4 rounded-lg shadow-lg relative w-11/12 lg:w-1/3">
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
                    <AddFriend
                        token={token}
                        onFriendAdded={handleFriendAdded}
                        onClose={() => setIsModalOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default FriendsList;
