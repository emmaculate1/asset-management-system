import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Wrench, Settings, Bell, Menu, Cpu, Archive } from 'lucide-react';

const userNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/user' },
  { label: 'Assets', icon: Package, to: '/user/assets' },
  { label: 'Electronics', icon: Cpu, to: '/user/electronics' },
  { label: 'My Requests', icon: Archive, to: '/user/requests' },
  { label: 'Maintenance', icon: Wrench, to: '/user/maintenance' },
  { label: 'Settings', icon: Settings, to: '/user/settings' },
];

const UserTopNav = () => (
  <header className="bg-[#24344d] border-b border-[#1b273b] px-6 py-3.5 flex items-center justify-between z-20">
    <div className="flex items-center gap-4">
      <Menu size={24} className="text-white cursor-pointer" />
      <h1 className="text-lg font-medium text-white tracking-wide">Asset Management System</h1>
    </div>
    <div className="flex items-center gap-5">
      <button className="relative flex items-center justify-center text-slate-300 hover:text-white transition-colors">
        <Bell size={20} className="fill-white self-center text-white"/>
        <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>
      </button>
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-500 bg-white">
          <img src="https://ui-avatars.com/api/?name=Jane+Doe&background=ffb3b3&color=fff" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-medium text-white">Hello, Jane!</span>
      </div>
    </div>
  </header>
);

const UserSidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-[190px] flex-shrink-0 bg-[#2f435c] flex flex-col h-full z-10 border-r border-[#1b273b]">
      <nav className="flex-1 pt-6 pb-4 flex flex-col overflow-y-auto">
        {userNavItems.map((item) => {
          // Highlight Electronics specifically so it matches the image 
          // when navigating to /user/assets or /user/electronics
          const isElectronicsMock = item.label === 'Electronics' && (location.pathname === '/user/assets' || location.pathname === '/user/electronics');
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/') || isElectronicsMock;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.label === 'Electronics' ? '/user/assets' : item.to}
              className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive ? 'bg-[#1a6ac9] text-white border-l-4 border-white' : 'text-[#aabacc] hover:bg-white/5 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export const UserLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f4f7fa]">
      <UserTopNav />
      <div className="flex-1 flex overflow-hidden">
        <UserSidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:px-10 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
