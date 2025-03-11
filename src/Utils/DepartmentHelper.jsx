import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";
// import(useNavigate);

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ Id, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      let departments = JSON.parse(localStorage.getItem("departments")) || [];

      // Filter out the department that matches the selected Id
      const updatedDepartments = departments.filter((dep) => dep.id !== Id);

      // Save back to localStorage
      localStorage.setItem("departments", JSON.stringify(updatedDepartments));

      // Notify DepartmentList to update UI
      onDelete(Id);
    }
  };

  return (
    <div className="flex space-x-3">
      <Link
        to="/admin-dashboard/view-department"
        className="px-2 py-1 bg-blue-500 hover:bg-blue-900 rounded text-white"
      >
        View & Edit
      </Link>

      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-600 hover:bg-red-900 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};
