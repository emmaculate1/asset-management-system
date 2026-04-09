import { Outlet } from 'react-router-dom';
import { Bell, User, Search, Plus, X } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="h-20 bg-white border-b border-gray-200 px-6 lg:px-8 flex items-center justify-between shadow-sm z-10">
        {/* Left side - Title and Search */}
        <div className="flex items-center gap-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Asset Management System</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        {/* Right side - Add Asset, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Add Asset Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={20} />
            <span className="font-medium hidden sm:inline">Add Asset</span>
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
