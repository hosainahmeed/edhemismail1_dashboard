import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', users: 500 },
  { month: 'Feb', users: 650 },
  { month: 'Mar', users: 800 },
  { month: 'Apr', users: 950 },
  { month: 'May', users: 1100 },
  { month: 'Jun', users: 1300 },
  { month: 'Jul', users: 1500 },
  { month: 'Aug', users: 1700 },
  { month: 'Sep', users: 1900 },
  { month: 'Oct', users: 2100 },
  { month: 'Nov', users: 2300 },
  { month: 'Dec', users: 2500 },
];

function UserTrachChart() {
  return (
    <div className="w-full h-[350px]">
      <h1 className="text-2xl font-bold mb-4">User Growth</h1>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={350}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stroke="var(--primary-color)"
            fill="var(--primary-color)"
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserTrachChart;
