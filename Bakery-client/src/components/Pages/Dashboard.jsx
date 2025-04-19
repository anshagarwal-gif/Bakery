import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ChevronRight, ShoppingBag, AlertCircle, Heart } from 'lucide-react';

export default function BakeryDashboard() {
  const salesData = [
    { value: 10 },
    { value: 15 },
    { value: 8 },
    { value: 12 },
    { value: 18 },
    { value: 15 },
    { value: 20 }
  ];

  const popularItems = [
    { name: 'Chocolate Croissant', sold: 45, stock: 50, items: 50, stockPercentage: 100, stockLevel: 'Good' },
    { name: 'Blueberry Muffin', sold: 40, stock: 35, items: 35, stockPercentage: 70, stockLevel: 'Good' },
    { name: 'Vanilla Cupcake', sold: 35, stock: 40, items: 40, stockPercentage: 80, stockLevel: 'Good' },
    { name: 'French Baguette', sold: 32, stock: 25, items: 25, stockPercentage: 50, stockLevel: 'Warning' },
    { name: 'Cinnamon Roll', sold: 30, stock: 15, items: 15, stockPercentage: 30, stockLevel: 'Low' },
  ];

  const recentOrders = [
    { id: 'ORD-5543', customer: 'Rahul Sharma', total: '₹550', status: 'Completed', time: '10:45 AM' },
    { id: 'ORD-5542', customer: 'Priya Patel', total: '₹1,245', status: 'Completed', time: '10:32 AM' },
    { id: 'ORD-5541', customer: 'Amit Singh', total: '₹475', status: 'Completed', time: '10:15 AM' },
    { id: 'ORD-5540', customer: 'Sunita Gupta', total: '₹729', status: 'Completed', time: '09:58 AM' },
    { id: 'ORD-5539', customer: 'Vikram Reddy', total: '₹1,850', status: 'Completed', time: '09:40 AM' },
  ];

  const getStockColor = (stockLevel) => {
    switch (stockLevel) {
      case 'Low':
        return 'bg-red-500';
      case 'Warning':
        return 'bg-orange-400';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your bakery today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-purple-100 p-2 rounded-md">
              <ResponsiveContainer width={24} height={24}>
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+8.1%</span>
          </div>
          <span className="text-sm text-gray-500 mb-1">Today's Sales</span>
          <span className="text-2xl font-bold">₹12,450</span>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-md">
              <ShoppingBag size={20} className="text-blue-500" />
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+12.5%</span>
          </div>
          <span className="text-sm text-gray-500 mb-1">Today's Orders</span>
          <span className="text-2xl font-bold">128</span>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-red-100 p-2 rounded-md">
              <AlertCircle size={20} className="text-red-500" />
            </div>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">8</span>
          </div>
          <span className="text-sm text-gray-500 mb-1">Low Stock Items</span>
          <span className="text-2xl font-bold">8</span>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-pink-100 p-2 rounded-md">
              <Heart size={20} className="text-pink-500" />
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+15.3%</span>
          </div>
          <span className="text-sm text-gray-500 mb-1">Active Loyalty Members</span>
          <span className="text-2xl font-bold">2,450</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 flex justify-between items-center border-b border-gray-100">
            <h2 className="font-semibold text-lg">Recent Orders</h2>
            <button className="text-purple-600 text-sm hover:underline flex items-center">
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-50">
                    <td className="p-4 text-purple-600">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.total}</td>
                    <td className="p-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 flex justify-between items-center border-b border-gray-100">
            <h2 className="font-semibold text-lg">Popular Items</h2>
            <button className="text-purple-600 text-sm hover:underline flex items-center">
              View Inventory
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            {popularItems.map((item, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 text-sm">{item.sold} sold today</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStockColor(item.stockLevel)}`}
                      style={{ width: `${item.stockPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Stock</span>
                  <span className="text-gray-600">{item.items} items</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Program */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center relative">
          <div>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Referral Program</span>
            <h3 className="text-lg font-semibold mt-2 mb-1">Refer a friend and get up to ₹1000 cash</h3>
            <p className="text-sm text-gray-500 max-w-lg">
              Share your referral code with friends and family. When they make their first purchase, you both get rewards!
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Share Code
          </button>
        </div>
      </div>
    </div>
  );
}
