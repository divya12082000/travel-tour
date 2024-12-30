import { useState, useEffect } from "react";
import axios from "axios";

const ManageTourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for popup visibility
  const [newPackage, setNewPackage] = useState({
    title: "",
    destination: "",
    price_per_person: "",
    duration_days: "",
    start_date: "",
    end_date: "",
    itinerary: "",
    inclusions: "",
    exclusions: "",
  });

  // Fetch existing packages
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tour-packages")
      .then((res) => setPackages(res.data))
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
  };

  // Submit new package to the backend
  const handleAddPackage = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/tour-packages", newPackage)
      .then((res) => {
        setPackages([...packages, res.data]); // Add new package to the list
        setNewPackage({
          title: "",
          destination: "",
          price_per_person: "",
          duration_days: "",
          start_date: "",
          end_date: "",
          itinerary: "",
          inclusions: "",
          exclusions: "",
        }); // Reset the form
        setShowModal(false); // Close the popup
      })
      .catch((err) => console.error("Error adding package:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tour Packages</h1>

      {/* Add Package Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Package
        </button>
      </div>

      {/* Tour Packages Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Destination</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td className="border border-gray-300 p-2">{pkg.id}</td>
              <td className="border border-gray-300 p-2">{pkg.title}</td>
              <td className="border border-gray-300 p-2">{pkg.destination}</td>
              <td className="border border-gray-300 p-2">{pkg.price_per_person}</td>
              <td className="border border-gray-300 p-2">{pkg.duration_days}</td>
              <td className="border border-gray-300 p-2">{pkg.start_date}</td>
              <td className="border border-gray-300 p-2">{pkg.end_date}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Package Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/2">
            <h2 className="text-xl font-bold mb-4">Add New Package</h2>
            <form onSubmit={handleAddPackage} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newPackage.title}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={newPackage.destination}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="number"
                name="price_per_person"
                placeholder="Price per Person"
                value={newPackage.price_per_person}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="number"
                name="duration_days"
                placeholder="Duration (Days)"
                value={newPackage.duration_days}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="date"
                name="start_date"
                placeholder="Start Date"
                value={newPackage.start_date}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="date"
                name="end_date"
                placeholder="End Date"
                value={newPackage.end_date}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <textarea
                name="itinerary"
                placeholder="Itinerary"
                value={newPackage.itinerary}
                onChange={handleChange}
                className="border p-2 col-span-2"
              />
              <textarea
                name="inclusions"
                placeholder="Inclusions"
                value={newPackage.inclusions}
                onChange={handleChange}
                className="border p-2 col-span-2"
              />
              <textarea
                name="exclusions"
                placeholder="Exclusions"
                value={newPackage.exclusions}
                onChange={handleChange}
                className="border p-2 col-span-2"
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
                  Add Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTourPackages;
