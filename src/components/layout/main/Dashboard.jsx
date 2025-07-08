import React from "react";
import CategorisePieChart from "./charts/CategorisePieChart";
import PerMonthListingChart from "./charts/PerMonthListingChart";
import UserTrachChart from "./charts/UserTrachChart";
import StatusCard from "./components/StatusCard";
import { MdOutlineList } from "react-icons/md";
const Dashboard = () => {
  const data = [
    {
      title: "Total Listings",
      sub_title: 340,
      icon: MdOutlineList,
    },
    {
      title: "Total Users",
      sub_title: 120,
      icon: MdOutlineList,
    },
    {
      title: "Pending",
      sub_title: "Approval",
      icon: MdOutlineList,
    },
    {
      title: "Featured Listing",
      sub_title: 213,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.map((stats, i) => (
          <StatusCard key={i} i={i} stats={stats} />
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <div className="w-full mt-12 h-[350px] grid grid-cols-3 gap-4">
          <PerMonthListingChart />
          <UserTrachChart />
          <CategorisePieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
