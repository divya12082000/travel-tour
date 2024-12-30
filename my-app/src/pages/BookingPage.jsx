import React, { useState } from 'react';
import axios from 'axios';

const BookingPage = () => {
    const [formData, setFormData] = useState({
        packageId: '',
        numberOfPeople: '',
        name: '',
        email: '',
        phone: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('/api/bookings', formData);
            if (response.status === 201) {
                setSuccessMessage('Booking successfully created!');
                setFormData({
                    packageId: '',
                    numberOfPeople: '',
                    name: '',
                    email: '',
                    phone: ''
                });
            }
        } catch (error) {
            setErrorMessage('Failed to create booking. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Book Your Tour</h1>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="packageId" className="form-label">Tour Package ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="packageId"
                        name="packageId"
                        value={formData.packageId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numberOfPeople" className="form-label">Number of People</label>
                    <input
                        type="number"
                        className="form-control"
                        id="numberOfPeople"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Book Now</button>
            </form>
        </div>
    );
};

export default BookingPage;
