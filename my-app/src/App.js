import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TourPackagesPage from './pages/TourPackagesPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/admin/Dashboard';
import ManageTourPackages from './pages/admin/ManageTourPackages';
import ManageBooking from './pages/admin/ManageBooking';
import ManageUsers from './pages/admin/ManageUsers';
import AdminLayout from './components/layouts/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const location = useLocation(); // Get the current location path

  // Check if the current path is part of the admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render Navbar */}
      {!isAdminRoute && <Navbar />}

      {/* Main Content */}
      <div className="flex flex-1">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<TourPackagesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-tour-packages" element={<ManageTourPackages />} />
            <Route path="manage-booking" element={<ManageBooking />} />
            <Route path="manage-users" element={<ManageUsers />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<div className="text-center mt-4">404 - Page Not Found</div>} />
        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
