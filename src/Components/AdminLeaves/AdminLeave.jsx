// import React from "react";

// const AdminLeave = () => {
//   return <div>Welcome to the leave section admin</div>;
// };

// export default AdminLeave;

import React, { useState, useEffect } from "react";

const AdminLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Admin - Leave Requests
      </h2>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">Employee ID</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length > 0 ? (
            leaveRequests.map((leave) => (
              <tr key={leave.id} className="bg-white border-b">
                <td className="px-6 py-3">{leave.userId}</td>
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
              <td colSpan="6" className="text-center py-4">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* View Leave Modal */}
      {/* {selectedLeave && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex justify-center items-center  ml-50 ">
          <div className="bg-blue-100 p-6  rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Leave Details</h3>
            <p>
              <strong>Employee ID:</strong> {selectedLeave.userId}
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

            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                onClick={() => handleStatusUpdate("Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
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
            </div>
          </div>
        </div>
      )} */}

      {selectedLeave && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex justify-center items-center ml-50">
          <div className="bg-blue-100 p-6 rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Leave Details</h3>
            <p>
              <strong>Employee ID:</strong> {selectedLeave.userId}
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
      )}
    </div>
  );
};

export default AdminLeave;
