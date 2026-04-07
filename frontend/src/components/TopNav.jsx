import { Bell, Menu } from 'lucide-react';
import { useUser } from '../context/UserContext';

const TopNav = () => {
  const { user, toggleRole } = useUser();

  return (
    <header className="bg-[#24344d] border-b border-[#1b273b] px-6 py-3.5 flex items-center justify-between z-20">
      {/* Title */}
      <div className="flex items-center gap-4">
        <Menu size={24} className="text-white cursor-pointer" />
        <h1 className="text-lg font-medium text-white tracking-wide">Asset Management System</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <button className="relative flex items-center justify-center text-slate-300 hover:text-white transition-colors">
          <Bell size={20} className="fill-white self-center text-white"/>
          <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>
        </button>

        {/* User Profile */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={toggleRole}
          title="Click to toggle Admin/User role"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-500 bg-white">
            <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-medium text-white">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;