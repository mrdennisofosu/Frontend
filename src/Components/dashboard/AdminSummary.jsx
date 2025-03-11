import React from "react";
import SummaryCards from "./SummaryCards";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  // FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-left text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <SummaryCards
          icon={<FaUsers />}
          text="Total Employees"
          number={20}
          color="bg-teal-600"
        />
        <SummaryCards
          icon={<FaBuilding />}
          text="Total Departments"
          number={5}
          color="bg-yellow-600"
        />
        {/* <SummaryCards
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number="$9,800"
          color="bg-red-600"
        /> */}
      </div>

      <div className="mt-12">
        <h4 className="text-left text-2xl font-bold">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCards
            icon={<FaFileAlt />}
            text="Leaves Applied"
            number={5}
            color="bg-teal-600"
          />
          <SummaryCards
            icon={<FaCheckCircle />}
            text="Leaves Approved"
            number={2}
            color="bg-green-600"
          />
          <SummaryCards
            icon={<FaHourglassHalf />}
            text="Leaves Pending"
            number={4}
            color="bg-yellow-600"
          />
          <SummaryCards
            icon={<FaTimesCircle />}
            text="Leaves Rejected"
            number={1}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
