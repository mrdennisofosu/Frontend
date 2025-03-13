import React, { useState, useEffect } from "react";

const AdminLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    // Fetch all leave requests from local storage
    const storedLeaves =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(storedLeaves);
  }, []);

  const handleView = (leave) => {
    setSelectedLeave(leave);
  };

  const handleStatusUpdate = (status) => {
    if (!selectedLeave) return;

    // Update the leave request status
    const updatedLeaves = leaveRequests.map((leave) =>
      leave.id === selectedLeave.id ? { ...leave, status } : leave
    );

    // Save updated leaves to local storage
    localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));

    // Update state
    setLeaveRequests(updatedLeaves);
    setSelectedLeave(null);
  };

  // Filtering logic
  const filteredLeaves =
    filterStatus === "All"
      ? leaveRequests
      : leaveRequests.filter((leave) =>
          filterStatus === "Pending"
            ? !leave.status || leave.status === "Pending" // Pending should include empty statuses
            : leave.status === filterStatus
        );

  return (
    <div className="p-6">
      {/* Header and Filter Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin - Leave Requests</h2>
        <div className="space-x-2">
          <button
            className={`py-2 px-4 rounded ${
              filterStatus === "All" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("All")}
          >
            Show All
          </button>
          <button
            className={`py-2 px-4 rounded ${
              filterStatus === "Pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Pending")}
          >
            Show Pending
          </button>
          <button
            className={`py-2 px-4 rounded ${
              filterStatus === "Approved"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Approved")}
          >
            Show Approved
          </button>
          <button
            className={`py-2 px-4 rounded ${
              filterStatus === "Rejected"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Rejected")}
          >
            Show Rejected
          </button>
        </div>
      </div>

      {/* Leave Requests Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">Employee ID</th>
            <th className="px-6 py-3">Employee Name</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave) => (
              <tr key={leave.id} className="bg-white border-b">
                <td className="px-6 py-3">{leave.userId}</td>
                <td className="px-6 py-3">{leave.name}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">{leave.startDate}</td>
                <td className="px-6 py-3">{leave.endDate}</td>
                <td
                  className={`px-6 py-3 font-semibold ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {leave.status ? leave.status : "Pending"}
                </td>

                <td className="px-6 py-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    onClick={() => handleView(leave)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Viewing Leave Details */}
      {/* {selectedLeave && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex justify-center items-center">
          <div className="bg-blue-100 p-6 rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Leave Details</h3>
            <p>
              <strong>Employee ID:</strong> {selectedLeave.userId}
            </p>
            <p>
              <strong>Employee Name:</strong> {selectedLeave.name}
            </p>
            <p>
              <strong>Leave Type:</strong> {selectedLeave.leaveType}
            </p>
            <p>
              <strong>From:</strong> {selectedLeave.startDate}
            </p>
            <p>
              <strong>To:</strong> {selectedLeave.endDate}
            </p>
            <p>
              <strong>Reason:</strong> {selectedLeave.reason}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedLeave.status === "Approved"
                    ? "text-green-600"
                    : selectedLeave.status === "Rejected"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {selectedLeave.status || "Pending"}
              </span>
            </p>

            <div className="mt-4 flex justify-center">
              {selectedLeave.status === "Approved" ||
              selectedLeave.status === "Rejected" ? (
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                  onClick={() => setSelectedLeave(null)}
                >
                  Close
                </button>
              ) : (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-3"
                    onClick={() => handleStatusUpdate("Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-3"
                    onClick={() => handleStatusUpdate("Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                    onClick={() => setSelectedLeave(null)}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )} */}

      {/* Modal for Viewing Leave Details */}
      {selectedLeave && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex justify-center items-center">
          <div className="bg-blue-100 p-6 rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Leave Details</h3>
            <p>
              <strong>Employee ID:</strong> {selectedLeave.userId}
            </p>
            <p>
              <strong>Employee Name:</strong> {selectedLeave.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedLeave.email}
            </p>
            <p>
              <strong>Leave Type:</strong> {selectedLeave.leaveType}
            </p>
            <p>
              <strong>From:</strong> {selectedLeave.startDate}
            </p>
            <p>
              <strong>To:</strong> {selectedLeave.endDate}
            </p>
            <p>
              <strong>Reason:</strong> {selectedLeave.reason}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedLeave.status === "Approved"
                    ? "text-green-600"
                    : selectedLeave.status === "Rejected"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {selectedLeave.status || "Pending"}
              </span>
            </p>

            <div className="mt-4 flex justify-between items-center">
              {/* Approve and Reject buttons (only if pending) */}
              {selectedLeave.status === "Approved" ||
              selectedLeave.status === "Rejected" ? (
                <>
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                    onClick={() => setSelectedLeave(null)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    onClick={() => {
                      const mailtoLink = `mailto:${selectedLeave.email}?subject=Leave Request ${selectedLeave.status}&body=Dear ${selectedLeave.name},%0D%0A%0D%0AYour leave request for ${selectedLeave.leaveType} from ${selectedLeave.startDate} to ${selectedLeave.endDate} has been ${selectedLeave.status}.`;
                      window.location.href = mailtoLink;
                    }}
                  >
                    Send Email
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-3"
                    onClick={() => handleStatusUpdate("Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-3"
                    onClick={() => handleStatusUpdate("Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                    onClick={() => setSelectedLeave(null)}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeave;
