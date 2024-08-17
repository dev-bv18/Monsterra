import React, { useState } from 'react';

const Navbar = () => {

    const [logoDropdownVisible, setLogoDropdownVisible] = useState(false);

    const toggleLogoDropdown = () => {
        setLogoDropdownVisible(!logoDropdownVisible);
    };

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {/* Logo with Dropdown */}
            <div className="relative">
                <div className="cursor-pointer text-3xl" onClick={toggleLogoDropdown}>
                    <div id="logo" className={`${logoDropdownVisible ? 'transform rotate-180' : ''} transition-transform`}>
                        ☔
                    </div>
                </div>
                <div className={`absolute left-0 mt-4 bg-gray-900 w-48 rounded-lg transform ${logoDropdownVisible ? 'scale-100' : 'scale-0'} transition-transform origin-top z-10`}>
                    <ul className='text-center space-y-4 py-4'>
                        <li className="hover:text-blue-400 cursor-pointer">Ypur profile</li>
                        <li className="hover:text-blue-400 cursor-pointer">Subscriptions</li>
                        <li className="hover:text-red-400 cursor-pointer">Log Out</li>
                    </ul>
                </div>
            </div>

            <div className='hidden md:flex space-x-8'>
                <div className="hover:text-blue-400 cursor-pointer">Home</div>
                <div className="hover:text-blue-400 cursor-pointer">About us</div>
                <div className="hover:text-blue-400 cursor-pointer">Contact Us</div>
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter here"
                />
                <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
            </div>
        </div>
    );
};

export default Navbar;
