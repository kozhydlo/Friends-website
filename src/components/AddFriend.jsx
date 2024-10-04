import React, { useState } from 'react';
import axios from 'axios';

const AddFriend = ({ token, onFriendAdded, onClose  }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [card, setCard] = useState('');



    const handleAddFriend = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://friends-website-backend.onrender.com/friends/add', {
                name,
                email,
                phone,
                birthday,
                address,
                card,
            }, {
                headers: {
                    'x-auth-token': token,
                },
            });
            onFriendAdded(res.data);
            onClose()
        } catch (err) {
            console.error('Error adding friend:', err);
        }
    };

    return (
        <div className="p-8 bg-[#F4A261] text-white shadow-md rounded-lg relative w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Friend</h2>
            <button
                className="absolute top-2 right-2 text-black p-1 rounded"
                onClick={onClose}
            >
                ✖
            </button>
            <form onSubmit={handleAddFriend}>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Name:</label>
                    <input
                        type="text"
                        className="p-2 w-full text-black rounded bg-[#E9C46A] focus:outline-none focus:border-none focus:ring-0"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your friend's name"
                    />

                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Address:</label>
                    <input
                        type="text"
                        className="p-2 w-full text-black rounded bg-[#E9C46A] focus:outline-none focus:border-none focus:ring-0"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Phone:</label>
                    <input
                        type="number"
                        className="p-2 w-full text-black rounded bg-[#E9C46A] focus:outline-none focus:border-none focus:ring-0"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Birthday:</label>
                    <input
                        type="date"
                        className="p-2 w-full text-black rounded bg-[#E9C46A] focus:outline-none focus:border-none focus:ring-0"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Email:</label>
                    <input
                        type="email"
                        className="p-2 w-full text-black rounded bg-[#E9C46A] focus:outline-none focus:border-none focus:ring-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black">Card:</label>
                    <input
                        type="number"
                        className="p-2 w-full text-black rounded bg-[#E9C46A] focus:outline-none focus:border-none focus:ring-0"
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        placeholder="Enter card number"
                    />
                </div>
                <button className="bg-[#264653] hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4"
                        type="submit">
                    Add Friend
                </button>
            </form>
        </div>
    );
};

export default AddFriend;
