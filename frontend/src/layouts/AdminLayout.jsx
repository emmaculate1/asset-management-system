import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';

const AdminLayout = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="h-screen flex flex-col font-sans bg-[#f4f7f9] overflow-hidden">
      {/* Top Navigation */}
      <header className="h-[60px] bg-[#2b3c5a] px-6 flex items-center justify-between text-white flex-shrink-0 z-10 w-full relative border-b shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        {/* Left side - Title and Logo */}
        <div className="flex items-center gap-3">
          {/* Circular Logo Icon approximation */}
          <div className="w-9 h-9 relative bg-white/10 rounded-full flex items-center justify-center border border-white/20 p-1">
             <div className="bg-blue-500 rounded-full w-full h-full flex items-center justify-center">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v6h6" />
                  <path d="M2 15h10" />
                  <path d="m9 18 3-3-3-3" />
                 </svg>
             </div>
          </div>
          <h1 className="text-xl font-semibold tracking-wide ml-1">Asset Management System</h1>
        </div>

        {/* Right side - Search and Profile */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 bg-[#fdfdfd] border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-800 shadow-sm"
            />
          </div>
          
          {/* User Profile */}
          <div className="relative">
            <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors select-none">
              <span className="text-sm font-medium mr-1">Admin</span>
              <ChevronDown size={14} className="text-gray-300 transition-transform duration-200" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-50 flex items-center gap-2 text-gray-800">
                   <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">A</div>
                   <span className="text-sm font-semibold">Admin</span>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">Settings</button>
                <div className="border-t border-gray-100"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="mx-auto h-full px-2" style={{ maxWidth: '1280px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
