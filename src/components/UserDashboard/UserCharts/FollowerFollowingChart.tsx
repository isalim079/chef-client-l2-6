"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", followers: 10, following: 5 },
  { month: "Feb", followers: 15, following: 8 },
  { month: "Mar", followers: 20, following: 10 },
  { month: "Apr", followers: 25, following: 12 },
  { month: "May", followers: 30, following: 15 },
  { month: "Jun", followers: 35, following: 18 },
  { month: "Jul", followers: 40, following: 20 },
  { month: "Aug", followers: 45, following: 22 },
  { month: "Sep", followers: 50, following: 25 },
  { month: "Oct", followers: 55, following: 28 },
  { month: "Nov", followers: 60, following: 30 },
  { month: "Dec", followers: 65, following: 32 },
];

const FollowerFollowingChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Followers & Following</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="followers" fill="#8884d8" />
          <Bar dataKey="following" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FollowerFollowingChart;