import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../Utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = () => {
      const storedEmployees =
        JSON.parse(localStorage.getItem("employees")) || [];
      const storedDepartments =
        JSON.parse(localStorage.getItem("departments")) || [];

      // Create a mapping of department IDs to department names
      const departmentMap = storedDepartments.reduce((acc, dep) => {
        acc[dep.id] = dep.dep_name; // Use dep.dep_name instead of dep.name
        return acc;
      }, {});

      // Map employees with department names
      const employeesWithData = storedEmployees.map((emp, index) => ({
        ...emp,
        id: emp.id,
        sno: index + 1,
        department: departmentMap[emp.department] || "N/A",
        action: <EmployeeButtons Id={emp.id} />,
        image: emp.image || "https://via.placeholder.com/50", // Default image if none is provided
      }));

      setEmployees(employeesWithData);
      setFilteredEmployees(employeesWithData);
    };

    fetchEmployees();
  }, []);

  const filterEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Emp. Name"
          className="px-4 py-0.5 border rounded"
          onChange={filterEmployees}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-800 hover:bg-teal-900 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={filteredEmployees} pagination />
      </div>
    </div>
  );
};

export default List;
