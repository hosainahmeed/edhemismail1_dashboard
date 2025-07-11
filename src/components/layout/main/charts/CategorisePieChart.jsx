import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Vehicles', value: 35 },
  { name: 'Job Offers', value: 25 },
  { name: 'Products', value: 20 },
  { name: 'Animals', value: 10 },
];

const COLORS = [
  'var(--primary-color)',
  '#88B8DF',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CategorisePieChart = () => {
  return (
    <div className="w-full h-[350px]">
      <h1 className="text-2xl font-bold mb-4">Top Categorise</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={350}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CategorisePieChart;
