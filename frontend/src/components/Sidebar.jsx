import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Users,
  Wrench,
  BarChart2,
  Settings,
  Cpu,
  Archive
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const adminNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Assets', icon: Package, to: '/assets' },
  { label: 'Add Asset', icon: PlusCircle, to: '/add-asset' },
  { label: 'Users', icon: Users, to: '/users' },
  { label: 'Maintenance', icon: Wrench, to: '/maintenance' },
  { label: 'Reports', icon: BarChart2, to: '/reports' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

const userNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Assets', icon: Package, to: '/assets' },
  { label: 'Electronics', icon: Cpu, to: '/electronics' },
  { label: 'My Requests', icon: Archive, to: '/requests' },
  { label: 'Maintenance', icon: Wrench, to: '/maintenance' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();

  const navItems = user.role === 'admin' ? adminNavItems : userNavItems;

  return (
    <aside className="w-[190px] flex-shrink-0 bg-[#2f435c] flex flex-col h-full z-10 border-r border-[#1b273b]">
      {/* Navigation */}
      <nav className="flex-1 pt-6 pb-4 flex flex-col overflow-y-auto">
        {navItems.map((item) => {
          // Standard match with location.pathname with electronics handling
          const isActive = location.pathname === item.to || (item.to === '/electronics' && location.pathname === '/assets' && user.role === 'user');
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={user.role === 'user' && item.label === 'Electronics' ? '/assets' : item.to}
              className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive ? 'bg-[#2a68c9] text-white border-l-4 border-white' : 'text-[#aabacc] hover:bg-white/5 hover:text-white border-l-4 border-transparent'
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

export default Sidebar;