import { useState, useEffect } from "react";
import axios from "axios";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for popup visibility
  const [newBooking, setNewBooking] = useState({
    user_id: "",
    package_id: "",
    num_people: "",
    total_price: "",
    start_date: "",
    end_date: "",
    status: "Pending", // Default status
  });

  // Fetch existing bookings
  useEffect(() => {
    axios
      .get("http://localhost:5000/bookings/:user_id") // Backend endpoint for fetching bookings
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  // Submit new booking to the backend
  const handleAddBooking = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/bookings", newBooking)
      .then((res) => {
        setBookings([...bookings, res.data]); // Add new booking to the list
        setNewBooking({
          user_id: "",
          package_id: "",
          num_people: "",
          total_price: "",
          start_date: "",
          end_date: "",
          status: "Pending",
        }); // Reset the form
        setShowModal(false); // Close the popup
      })
      .catch((err) => console.error("Error adding booking:", err));
  };

  // Update booking status (Confirm or Cancel)
  const updateBookingStatus = (bookingId, status) => {
    axios
      .patch(`http://localhost:5000/api/admin/bookings/status/${bookingId}`, { status })
      .then((res) => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: res.data.status } : booking
          )
        );
      })
      .catch((err) => console.error("Error updating booking status:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>

      {/* Add Booking Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Booking
        </button>
      </div>

      {/* Bookings Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Booking ID</th>
            <th className="border border-gray-300 p-2">User ID</th>
            <th className="border border-gray-300 p-2">Package ID</th>
            <th className="border border-gray-300 p-2">No. of People</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border border-gray-300 p-2">{booking.id}</td>
              <td className="border border-gray-300 p-2">{booking.user_id}</td>
              <td className="border border-gray-300 p-2">{booking.package_id}</td>
              <td className="border border-gray-300 p-2">{booking.num_people}</td>
              <td className="border border-gray-300 p-2">{booking.total_price}</td>
              <td className="border border-gray-300 p-2">{booking.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Booking Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/2">
            <h2 className="text-xl font-bold mb-4">Add New Booking</h2>
            <form onSubmit={handleAddBooking} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="user_id"
                placeholder="User ID"
                value={newBooking.user_id}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="package_id"
                placeholder="Package ID"
                value={newBooking.package_id}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="number"
                name="num_people"
                placeholder="No. of People"
                value={newBooking.num_people}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="number"
                name="total_price"
                placeholder="Total Price"
                value={newBooking.total_price}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="date"
                name="start_date"
                placeholder="Start Date"
                value={newBooking.start_date}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="date"
                name="end_date"
                placeholder="End Date"
                value={newBooking.end_date}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
