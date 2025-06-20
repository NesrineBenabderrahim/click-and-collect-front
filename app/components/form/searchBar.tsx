import React, { useState } from 'react';
import useCard from "@/app/hooks/useCard";

interface SearchProps {
    setIdUserSearch:any;
    setSearch:Function;
}

const Search: React.FC<SearchProps> = ({ setIdUserSearch ,setSearch}) => {
    const { AllUser ,getAllUser} = useCard();
    const [email, setEmail] = useState('');
    getAllUser()
    // console.log(AllUser)

    const handleSearch = () => {
        setSearch(true)
        console.log(email);
        console.log(AllUser)
        const user = AllUser.filter((user:any )=> user.email === email);
        if (user) {
            setIdUserSearch(user[0].id);
        } else {
            alert('User not found');
        }
    };
    const handleCancel = () => {
        setEmail('');
        setIdUserSearch(null);
        setSearch(false) // Assuming you want to clear the search result
    };

    return (
        <div className="flex items-center p-6 space-x-6 justify-center rounded-xl transform hover:scale-105 transition duration-500">
            <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    className="bg-gray-100 outline-none"
                    type="text"
                    placeholder="email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div
                className="bg-gray-800 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={handleSearch}
            >
                <span>chercher</span>
            </div>
            <div
                className="bg-gray-200 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={handleCancel}
            >
                <span>annuler</span>
            </div>
        </div>
    );
};

export default Search;
