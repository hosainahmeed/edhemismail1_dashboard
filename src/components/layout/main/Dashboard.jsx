import React from "react";
import CategorisePieChart from "./charts/CategorisePieChart";
import PerMonthListingChart from "./charts/PerMonthListingChart";
import UserTrachChart from "./charts/UserTrachChart";
const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cards */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">1,234</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
        <p className="text-3xl font-bold text-green-600">$12,345</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">New Orders</h3>
        <p className="text-3xl font-bold text-purple-600">42</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-3 mt-6">
        <div className="w-full mt-12 h-[700px] grid grid-cols-2 gap-4">
          <PerMonthListingChart />
          <UserTrachChart />
          <CategorisePieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
