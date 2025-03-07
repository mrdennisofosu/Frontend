import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../Utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = () => {
      const storedDepartments =
        JSON.parse(localStorage.getItem("departments")) || [];

      // Format departments correctly
      const formattedDepartments = storedDepartments.map((dep, index) => ({
        ...dep,
        sno: index + 1,
        action: <DepartmentButtons Id={dep.id} onDelete={handleDelete} />, // Ensure correct ID is passed
      }));

      setDepartments(formattedDepartments);
    };

    const handleDelete = (deletedId) => {
      setDepartments((prevDepartments) =>
        prevDepartments.filter((dep) => dep.id !== deletedId)
      );

      setDepartments(formattedDepartments);
    };

    fetchDepartments();
  }, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep. Name"
          className="px-4 py-0.5 border rounded"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600  hover:bg-teal-900 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={departments} pagination />
      </div>
    </div>
  );
};

export default DepartmentList;
