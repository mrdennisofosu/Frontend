import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBuilding, FaUsers, FaCogs } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 shadow-lg">
      {/* Header */}
      <div className="bg-teal-800 h-16 flex items-center justify-center shadow-md">
        <h3 className="text-xl text-center font-semibold tracking-wide">
          Mojo Employee M.S.
        </h3>
      </div>

      {/* Sidebar Links */}
      <div className="mt-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-800 text-white"
                : "hover:bg-teal-800 hover:text-gray-100"
            } flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/profile"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-800 text-white"
                : "hover:bg-teal-800 hover:text-gray-100"
            } flex items-center m-1 space-x-4 block py-3 px-5 rounded-md transition`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-800 text-white"
                : "hover:bg-teal-800 hover:text-gray-100"
            } flex items-center m-1 space-x-4 block py-3 px-5 rounded-md transition`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-800 text-white"
                : "hover:bg-teal-800 hover:text-gray-100"
            } flex items-center m-1 space-x-4 block py-3 px-5 rounded-md transition`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
