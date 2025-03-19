"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", amount: 100 },
  { month: "Feb", amount: 200 },
  { month: "Mar", amount: 150 },
  { month: "Apr", amount: 300 },
  { month: "May", amount: 400 },
  { month: "Jun", amount: 250 },
  { month: "Jul", amount: 350 },
  { month: "Aug", amount: 500 },
  { month: "Sep", amount: 450 },
  { month: "Oct", amount: 600 },
  { month: "Nov", amount: 550 },
  { month: "Dec", amount: 700 },
];

const MonthlyTransactionChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Monthly Transaction</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTransactionChart;