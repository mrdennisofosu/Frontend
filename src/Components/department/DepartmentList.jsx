// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../Utils/DepartmentHelper";

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartments = () => {
//       const storedDepartments =
//         JSON.parse(localStorage.getItem("departments")) || [];

//       // Format departments correctly
//       const formattedDepartments = storedDepartments.map((dep, index) => ({
//         ...dep,
//         sno: index + 1,
//         action: <DepartmentButtons Id={dep.id} onDelete={handleDelete} />, // Ensure correct ID is passed
//       }));

//       setDepartments(formattedDepartments);
//       setFilteredDepartments(formattedDepartments);
//     };

//     const handleDelete = (deletedId) => {
//       setDepartments((prevDepartments) =>
//         prevDepartments.filter((dep) => dep.id !== deletedId)
//       );

//       setDepartments(formattedDepartments);
//     };

//     fetchDepartments();
//   }, []);

//   const filterDepartments = (e) => {
//     const records = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredDepartments(records);
//   };

//   return (
//     <div className="p-5 font-jakarta">
//       <div className="text-center">
//         <h3 className="text-2xl font-bold">Manage Department</h3>
//       </div>
//       <div className="flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search By Dep. Name"
//           className="px-5 py-1.5 bg-gray-300 rounded"
//           onChange={filterDepartments}
//         />
//         <Link
//           to="/admin-dashboard/add-department"
//           className="px-4 py-1 bg-blue-600  hover:bg-blue-800 rounded text-white"
//         >
//           Add New Department
//         </Link>
//       </div>
//       <div className="mt-5">
//         <DataTable columns={columns} data={filteredDepartments} pagination />
//       </div>
//     </div>
//   );
// };

// export default DepartmentList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../Utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = () => {
      const storedDepartments =
        JSON.parse(localStorage.getItem("departments")) || [];

      // Format departments correctly
      const formattedDepartments = storedDepartments.map((dep, index) => ({
        ...dep,
        sno: index + 1,
        action: <DepartmentButtons Id={dep.id} />,
      }));

      setDepartments(formattedDepartments);
      setFilteredDepartments(formattedDepartments);
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="p-5 font-jakarta">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>

      {/* Search & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search By Dep. Name"
          className="px-5 py-4 bg-gray-300 rounded w-full md:w-auto"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-blue-600 hover:bg-blue-800 rounded text-white ml-2 flex sm:flex-row flex-col items-center leading-tight text-center"
        >
          <span className="text-lg">Add</span>
          <span className="text-lg sm:ml-1">Department</span>
        </Link>

        {/* <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-0.1 bg-blue-600 hover:bg-blue-800 rounded text-white ml-2 flex flex-col items-center leading-tight text-center"
        >
          <span className="text-lg ">Add</span>
          <span className="text-lg ">Department</span>
        </Link> */}
      </div>

      {/* Table View (For Large Screens) */}
      <div className="hidden md:block mt-5">
        <DataTable columns={columns} data={filteredDepartments} pagination />
      </div>

      {/* Grid View (For Mobile Screens) */}
      <div className="md:hidden mt-5 grid gap-4">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((dep) => (
            <div
              key={dep.id}
              className="bg-white p-4 rounded shadow-md flex flex-col space-y-2"
            >
              <h4 className="text-lg font-bold">{dep.dep_name}</h4>
              <p className="text-gray-600">ID: {dep.id}</p>
              <div className="flex justify-end">{dep.action}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No departments found.</p>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
