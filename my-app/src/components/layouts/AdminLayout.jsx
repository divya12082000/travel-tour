// src/layouts/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import {
  AiFillDashboard,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineFolder,
} from "react-icons/ai";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full">
        <div className="p-5 text-xl font-bold">Admin Panel</div>
        <nav className="flex flex-col space-y-2 p-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `p-3 rounded flex items-center ${
                isActive ? "bg-gray-700 text-white" : "text-gray-400"
              } hover:bg-gray-700 hover:text-white`
            }
          >
            <AiFillDashboard className="inline mr-2" /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/manage-tour-packages"
            className={({ isActive }) =>
              `p-3 rounded flex items-center ${
                isActive ? "bg-gray-700 text-white" : "text-gray-400"
              } hover:bg-gray-700 hover:text-white`
            }
          >
            <AiOutlineFolder className="inline mr-2" /> Manage Tour Packages
          </NavLink>
          <NavLink
            to="/admin/manage-bookings"
            className={({ isActive }) =>
              `p-3 rounded flex items-center ${
                isActive ? "bg-gray-700 text-white" : "text-gray-400"
              } hover:bg-gray-700 hover:text-white`
            }
          >
            <AiOutlineBook className="inline mr-2" /> Manage Bookings
          </NavLink>
          <NavLink
            to="/admin/manage-users"
            className={({ isActive }) =>
              `p-3 rounded flex items-center ${
                isActive ? "bg-gray-700 text-white" : "text-gray-400"
              } hover:bg-gray-700 hover:text-white`
            }
          >
            <AiOutlineUser className="inline mr-2" /> Manage Users
          </NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 text-white w-full flex justify-between items-center p-6 h-16">
          <span className="font-bold text-lg">Admin Dashboard</span>
          <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Content Area with Nested Routing */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
