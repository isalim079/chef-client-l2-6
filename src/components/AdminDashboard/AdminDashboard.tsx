/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { FaUsers, FaChartLine, FaBox, FaDollarSign } from "react-icons/fa";
import { HiSquaresPlus } from "react-icons/hi2";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AdminMobileSidebar from "./AdminSidebar/AdminMobileSidebar";

const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [sales, setSales] = useState(0);
  const [products, setProducts] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // Mock data for charts
  const salesData = [
    { month: "Jan", sales: 1000 },
    { month: "Feb", sales: 1500 },
    { month: "Mar", sales: 2000 },
    { month: "Apr", sales: 1800 },
    { month: "May", sales: 2500 },
    { month: "Jun", sales: 3000 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 500 },
    { month: "Feb", revenue: 800 },
    { month: "Mar", revenue: 1200 },
    { month: "Apr", revenue: 900 },
    { month: "May", revenue: 1500 },
    { month: "Jun", revenue: 2000 },
  ];

  // Fetch data (mock implementation)
  useEffect(() => {
    setTimeout(() => {
      setUsers(1200);
      setSales(4500);
      setProducts(320);
      setRevenue(18000);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Admin Dashboard</h1>
        {/* <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          <FaCog className="mr-2" />
          Settings
        </button> */}

            {/* mobile nav */}
                <div className="lg:hidden block fixed right-0 top-5">
                  <div className="drawer drawer-end">
                    <input
                      id="adminMobileSidebarDrawer"
                      type="checkbox"
                      className="drawer-toggle"
                    />
                    <div className="drawer-content">
                      {/* Page content here */}
                      <label htmlFor="adminMobileSidebarDrawer" className="">
                        <p className="p-3 bg-white shadow-md rounded-full w-fit flex ml-auto mr-6">
                          <HiSquaresPlus className="text-2xl" />
                        </p>
                      </label>
                    </div>
                    <div className="drawer-side z-50 h-full">
                      <label
                        htmlFor="adminMobileSidebarDrawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                      ></label>
                      <ul className="bg-gray-800 w-[65%] min-h-full p-6">
                        {/* Sidebar content here */}
                        <AdminMobileSidebar />
                      </ul>
                    </div>
                  </div>
                </div>
                {/*  */}

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center">
            <FaUsers className="text-4xl text-blue-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Users</h2>
              <p className="text-2xl font-semibold">{users}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center">
            <FaChartLine className="text-4xl text-green-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Sales</h2>
              <p className="text-2xl font-semibold">${sales}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center">
            <FaBox className="text-4xl text-orange-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Products</h2>
              <p className="text-2xl font-semibold">{products}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center">
            <FaDollarSign className="text-4xl text-purple-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Revenue</h2>
              <p className="text-2xl font-semibold">${revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

   
    </div>
  );
};

export default AdminDashboard;