import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TourPackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredPackages, setFilteredPackages] = useState([]);

    useEffect(() => {
        fetchPackages();
    }, []);

    useEffect(() => {
        setFilteredPackages(
            packages.filter((pkg) =>
                pkg.title.toLowerCase().includes(search.toLowerCase()) ||
                pkg.destination.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, packages]);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tour-packages');
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Available Tour Packages</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title or destination"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Package List */}
            <div className="row">
                {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
                        <div className="col-md-4 mb-4" key={pkg._id}>
                            <div className="card">
                                {pkg.image && (
                                    <img
                                        src={pkg.image}
                                        className="card-img-top"
                                        alt={pkg.title}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{pkg.title}</h5>
                                    <p className="card-text">
                                        <strong>Destination:</strong> {pkg.destination}
                                    </p>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${pkg.price_per_person} per person
                                    </p>
                                    <p className="card-text">
                                        <strong>Duration:</strong> {pkg.duration_days} days
                                    </p>
                                    <button className="btn btn-primary">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No packages found.</p>
                )}
            </div>
        </div>
    );
};

export default TourPackagesPage;
