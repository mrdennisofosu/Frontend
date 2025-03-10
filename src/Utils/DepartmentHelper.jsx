import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleEdit = () => {
    let departments = JSON.parse(localStorage.getItem("departments")) || [];

    // Find the department to edit
    const departmentToEdit = departments.find((dep) => dep.id === Id);
    if (!departmentToEdit) return;

    // Prompt user for new department name
    const newDepName = prompt(
      "Enter new department name:",
      departmentToEdit.dep_name
    );
    if (!newDepName) return;

    // Update department name
    departmentToEdit.dep_name = newDepName;

    // Save updated list back to localStorage
    const updatedDepartments = departments.map((dep) =>
      dep.id === Id ? departmentToEdit : dep
    );

    localStorage.setItem("departments", JSON.stringify(updatedDepartments));

    // Notify `DepartmentList` about the update
    onEdit(departmentToEdit);
    navigate(`/admin-dashboard/edit-department/${Id}`);
  };

  return (
    <div className="flex space-x-3">
      {/* <Link
        to="/admin-dashboard/edit-department"
        className="px-4 py-1 bg-teal-500  hover:bg-teal-700 rounded text-white"
      >
        Edit
    
      </Link> */}

      <button
        onClick={handleEdit}
        className="px-4 py-1 bg-teal-500 rounded text-white"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-600 hover:bg-red-900 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};
