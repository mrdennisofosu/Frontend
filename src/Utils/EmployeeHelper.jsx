import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row, index) => index + 1,
    width: "60px",
  },
  {
    name: "image",
    selector: (row) => row.image,
    cell: (row) => (
      <img
        src={row.image}
        // alt="Employee"
        className="w-12 h-12 rounded-full object-cover"
      />
    ),
    sortable: false,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.department || "N/A",

    width: "150px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob || "N/A",

    width: "150px",
  },
  {
    name: "Action",
    width: "300px",
    cell: (row) => <EmployeeButtons Id={row.id} />,
  },
];

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin-dashboard/edit-employee/${Id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      let employees = JSON.parse(localStorage.getItem("employees")) || [];
      const updatedEmployees = employees.filter((emp) => emp.id !== Id);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      window.location.reload();
    }
  };

  return (
    <div className="flex space-x-2">
      <button className="px-2 py-1 bg-blue-500 rounded text-white">View</button>
      <button
        onClick={handleEdit}
        className="px-2 py-1 bg-green-500 rounded text-white"
      >
        Edit
      </button>
      <button className="px-2 py-1 bg-yellow-500 rounded text-white">
        Leave
      </button>
      <button
        onClick={handleDelete}
        className="px-2 py-1 bg-red-600 hover:bg-red-900 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};
