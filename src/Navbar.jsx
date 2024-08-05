import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="nav">
            <div className="nav-logo" onClick={toggleMenu}>
                <div id="logo" className={`${menuVisible ? 'rotate' : ''}`}>☔</div>
                <div className={`menu ${menuVisible ? 'spread' : ''}`}>
                    <ul className='menu-items'>
                        <li>News</li>
                        <li>Maps</li>
                        <li>Parks</li>
                    </ul>
                </div>
            </div>
            <div className='nav-items'>
                <div className="nav-item">Home</div>
                <div className="nav-item">About us</div>
                <div className="nav-item">Contact Us</div>
            </div>
            <div className='search'>
                <input type="text" placeholder='Enter here' />
                <button>Search</button>
            </div>
        </div>
    );
};

export default Navbar;
