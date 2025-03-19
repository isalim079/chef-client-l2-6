"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", recipes: 5 },
  { month: "Feb", recipes: 10 },
  { month: "Mar", recipes: 15 },
  { month: "Apr", recipes: 20 },
  { month: "May", recipes: 25 },
  { month: "Jun", recipes: 30 },
  { month: "Jul", recipes: 35 },
  { month: "Aug", recipes: 40 },
  { month: "Sep", recipes: 45 },
  { month: "Oct", recipes: 50 },
  { month: "Nov", recipes: 55 },
  { month: "Dec", recipes: 60 },
];

const TotalRecipesChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Total Recipes Created</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="recipes" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalRecipesChart;