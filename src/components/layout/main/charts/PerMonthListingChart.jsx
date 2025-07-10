import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const months = [
  { month: 'Jan', active: 5, cancelled: 2 },
  { month: 'Feb', active: 8, cancelled: 3 },
  { month: 'Mar', active: 12, cancelled: 4 },
  { month: 'Apr', active: 5, cancelled: 5 },
  { month: 'May', active: 18, cancelled: 6 },
  { month: 'Jun', active: 2, cancelled: 7 },
  { month: 'Jul', active: 25, cancelled: 8 },
  { month: 'Aug', active: 25, cancelled: 9 },
  { month: 'Sep', active: 8, cancelled: 10 },
  { month: 'Oct', active: 12, cancelled: 11 },
  { month: 'Nov', active: 15, cancelled: 12 },
  { month: 'Dec', active: 18, cancelled: 13 },
];

function PerMonthListingChart() {
  return (
    <div className="w-full h-[350px]">
      <h1 className="text-2xl font-bold mb-4">Per Month Listing</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={months}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            width={40}
            radius={[8, 8, 0, 0]}
            dataKey="active"
            fill="var(--primary-color)"
            name="Active"
          />
          <Bar
            width={40}
            radius={[8, 8, 0, 0]}
            dataKey="cancelled"
            fill="#88B8DF"
            name="Cancelled"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerMonthListingChart;
