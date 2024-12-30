import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container mt-5">
            <div className="jumbotron text-center">
                <h1>Welcome to Travel Package Management</h1>
                <p>Explore, Book, and Manage your dream vacations effortlessly!</p>
            </div>

            {/* Main Features Section */}
            <div className="row text-center">
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Explore Packages</h5>
                            <p className="card-text">Browse and choose from a variety of travel packages.</p>
                            <Link to="/packages" className="btn btn-primary">View Packages</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Your Bookings</h5>
                            <p className="card-text">Manage your bookings and plan your travels efficiently.</p>
                            <Link to="/booking" className="btn btn-primary">Manage Bookings</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Admin Panel</h5>
                            <p className="card-text">Admin access to manage packages, bookings, and users.</p>
                            <Link to="/admin" className="btn btn-warning">Go to Admin Panel</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-5">
                <h2 className="text-center">Why Choose Us?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <h4>Affordable Packages</h4>
                        <p>We offer the best travel packages at competitive prices.</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Customizable Plans</h4>
                        <p>Tailor your travel experiences to match your preferences.</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Reliable Support</h4>
                        <p>Our team is available 24/7 to assist you with your needs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;