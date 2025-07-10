import React from 'react';
import CategorisePieChart from './charts/CategorisePieChart';
import PerMonthListingChart from './charts/PerMonthListingChart';
import UserTrachChart from './charts/UserTrachChart';
import StatusCard from './components/StatusCard';
import listing from '../../../assets/listing.png';
import user from '../../../assets/user.png';
import statusIcon from '../../../assets/statusIcon.png';
import featured from '../../../assets/featuredIcon.png';
import approved from '../../../assets/approved.png';
import AllListing from '../../../features/listing/AllListing';
import { useLocation } from 'react-router-dom';
const Dashboard = () => {
  const location = useLocation();
  const data = [
    {
      title: 'Total Listings',
      number: 340,
      icon: listing,
    },
    {
      title: 'Total Users',
      number: 120,
      icon: user,
    },
    {
      title: 'Pending',
      number: 45,
      icon: statusIcon,
    },
    {
      title: 'Approved',
      number: 213,
      icon: approved,
    },
    {
      title: 'Featured Listing',
      number: 213,
      icon: featured,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data?.map((stats, i) => (
          <StatusCard key={i} stats={stats} />
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg shadow mt-6">
        <div className="w-full h-[420px] p-4 grid grid-cols-3 gap-4">
          <PerMonthListingChart />
          <UserTrachChart />
          <CategorisePieChart />
        </div>
      </div>
      <div className="mt-6">
        <AllListing location={location?.pathname} />
      </div>
    </div>
  );
};

export default Dashboard;
