import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Tour Packages</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav ms-auto"> {/* ms-auto for right alignment */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/packages">Packages</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/booking">Booking</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
