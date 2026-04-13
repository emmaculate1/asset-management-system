import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import { Laptop, Printer, Monitor, Tablet, Plus, UserPlus, Info, ChevronRight, CheckCircle2, X, Wrench, AlertCircle, Trash2, Users, FileText, Bell, Calendar as CalendarIcon, Award, TrendingUp, History } from 'lucide-react';

const ASSET_STATUS_DATA = [
  { name: 'Available', value: 45, color: '#3fb548' },
  { name: 'Assigned', value: 37, color: '#ef5523' },
  { name: 'Maintenance', value: 18, color: '#dc2626' },
];

const ASSET_CATEGORY_DATA = [
  { name: 'Electronics', value: 150, color: '#1a6fca' },
  { name: 'Furniture', value: 90, color: '#f26d21' },
  { name: 'Vehicles', value: 70, color: '#735bc1' },
];

const INITIAL_RECENT_ACTIVITIES = [
  { id: 1, icon: Laptop, text: 'Laptop assigned to John', date: 'Today' },
  { id: 2, icon: Printer, text: 'Printer added to inventory', date: 'Yesterday' },
  { id: 3, icon: Monitor, text: 'Projector returned by Sarah', date: '2 days ago' },
  { id: 4, icon: Tablet, text: 'Tablet sent for maintenance', date: '3 days ago' },
];

const INITIAL_USERS = [
  { id: 1, avatar: 'https://i.pravatar.cc/150?img=11', name: 'John Doe', email: 'john@example.com', activeAssets: 12 },
  { id: 2, avatar: 'https://i.pravatar.cc/150?img=5', name: 'Sarah K.', email: 'sarah@example.com', activeAssets: 8 },
  { id: 3, avatar: 'https://i.pravatar.cc/150?img=33', name: 'Michael W.', email: 'mw@example.com', activeAssets: 5 },
  { id: 4, avatar: 'https://i.pravatar.cc/150?img=44', name: 'Alice T.', email: 'alice@example.com', activeAssets: 3 },
  { id: 5, avatar: 'https://i.pravatar.cc/150?img=55', name: 'Robert G.', email: 'robert@example.com', activeAssets: 1 },
];

const INITIAL_MAINTENANCE_HISTORY = [
  { id: 1, assetName: 'HP LaserJet', date: '01/04/2024', status: 'Pending', cost: '$45.00' },
  { id: 2, assetName: 'Meeting Table', date: '01/04/2024', status: 'Completed', cost: '$120.00' },
  { id: 3, assetName: 'Ford Transit', date: '28/03/2024', status: 'Completed', cost: '$350.00' },
  { id: 4, assetName: 'Cisco Router', date: '15/03/2024', status: 'Completed', cost: '$80.00' },
];

const CATEGORIES = [
  { id: 'Electronics', name: 'Electronics'},
  { id: 'Furniture', name: 'Furniture'},
  { id: 'Vehicles', name: 'Vehicles'},
  { id: 'Others', name: 'Others'}
];

const MINI_CATEGORIES = {
  'Electronics': ['Laptops', 'Desktops', 'Printers', 'Networking Devices', 'Accessories'],
  'Furniture': ['Chairs', 'Desks', 'Tables', 'Storage', 'Sofas'],
  'Vehicles': ['Cars', 'Trucks', 'Motorcycles'],
  'Others': ['Miscellaneous', 'Stationery', 'Tools']
};

const INITIAL_ASSETS = [
  { id: 'A001', name: 'Dell XPS 15', category: 'Electronics', mini_category: 'Laptops', status: 'Available', assignedTo: null, overdue: false, date: '12/04/2024', usageCount: 145, nearsReturn: false },
  { id: 'A002', name: 'iMac 27"', category: 'Electronics', mini_category: 'Desktops', status: 'Assigned', assignedTo: 1, overdue: true, date: '10/04/2024', usageCount: 98, nearsReturn: false },
  { id: 'A003', name: 'HP LaserJet', category: 'Electronics', mini_category: 'Printers', status: 'Maintenance', assignedTo: null, overdue: false, date: '01/04/2024', usageCount: 204, nearsReturn: false },
  { id: 'A004', name: 'Cisco Router', category: 'Electronics', mini_category: 'Networking Devices', status: 'Available', assignedTo: null, overdue: false, date: '11/04/2024', usageCount: 16, nearsReturn: false },
  { id: 'A005', name: 'Logitech Master MX', category: 'Electronics', mini_category: 'Accessories', status: 'Assigned', assignedTo: 2, overdue: false, date: '12/04/2024', usageCount: 77, nearsReturn: true },
  { id: 'A006', name: 'Ergonomic Chair', category: 'Furniture', mini_category: 'Chairs', status: 'Assigned', assignedTo: 3, overdue: false, date: '05/04/2024', usageCount: 42, nearsReturn: false },
  { id: 'A007', name: 'Standing Desk', category: 'Furniture', mini_category: 'Desks', status: 'Available', assignedTo: null, overdue: false, date: '02/04/2024', usageCount: 31, nearsReturn: false },
  { id: 'A008', name: 'Meeting Table', category: 'Furniture', mini_category: 'Tables', status: 'Maintenance', assignedTo: null, overdue: false, date: '01/04/2024', usageCount: 88, nearsReturn: false },
  { id: 'A009', name: 'Filing Cabinet', category: 'Furniture', mini_category: 'Storage', status: 'Available', assignedTo: null, overdue: false, date: '03/04/2024', usageCount: 12, nearsReturn: false },
  { id: 'A010', name: 'Lobby Sofa', category: 'Furniture', mini_category: 'Sofas', status: 'Available', assignedTo: null, overdue: false, date: '04/04/2024', usageCount: 55, nearsReturn: false },
  { id: 'A011', name: 'Ford Transit', category: 'Vehicles', mini_category: 'Trucks', status: 'Maintenance', assignedTo: null, overdue: false, date: '01/04/2024', usageCount: 110, nearsReturn: false },
  { id: 'A012', name: 'Toyota Prius', category: 'Vehicles', mini_category: 'Cars', status: 'Assigned', assignedTo: 4, overdue: true, date: '15/03/2024', usageCount: 220, nearsReturn: false },
  { id: 'A013', name: 'Honda CB500', category: 'Vehicles', mini_category: 'Motorcycles', status: 'Available', assignedTo: null, overdue: false, date: '11/04/2024', usageCount: 45, nearsReturn: false },
  { id: 'A014', name: 'Projector', category: 'Others', mini_category: 'Miscellaneous', status: 'Assigned', assignedTo: 5, overdue: true, date: '01/03/2024', usageCount: 175, nearsReturn: false },
  { id: 'A015', name: 'Power Drill', category: 'Others', mini_category: 'Tools', status: 'Available', assignedTo: null, overdue: false, date: '11/04/2024', usageCount: 82, nearsReturn: false },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Electronics');
  const [activeMini, setActiveMini] = useState(null);
  
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [activities, setActivities] = useState(INITIAL_RECENT_ACTIVITIES);
  const [maintenanceHistory] = useState(INITIAL_MAINTENANCE_HISTORY);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(null); 
  const [showUsersModal, setShowUsersModal] = useState(false);

  const [newAsset, setNewAsset] = useState({ name: '', category: 'Electronics', mini_category: 'Laptops', status: 'Available' });
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [assignData, setAssignData] = useState({ assetId: '', userId: '' });

  const overdueAssets = assets.filter(a => a.overdue);
  const maintenanceAssets = assets.filter(a => a.status === 'Maintenance');
  const nearsReturnAssets = assets.filter(a => a.nearsReturn);
  const assignedAssetsDisplay = assets.filter(a => a.status === 'Assigned' && a.assignedTo);

  const handleAddAsset = () => {
    if (!newAsset.name) return;
    const newId = `A0${assets.length + 1}`;
    setAssets([...assets, { id: newId, ...newAsset, assignedTo: null, overdue: false, date: 'Just now', usageCount: 0 }]);
    setActivities([{ id: Date.now(), icon: Plus, text: `${newAsset.name} added to inventory`, date: 'Just now' }, ...activities]);
    setShowAddModal(false);
    setNewAsset({ name: '', category: 'Electronics', mini_category: 'Laptops', status: 'Available' });
  };

  const handleAddUser = () => {
    if (!newUser.name) return;
    const newId = users.length + 1;
    setUsers([...users, { id: newId, name: newUser.name, email: newUser.email, avatar: `https://i.pravatar.cc/150?img=${newId + 10}`, activeAssets: 0 }]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '' });
  };

  const handleAssignAsset = () => {
    if (!assignData.assetId || !assignData.userId) return;
    
    const updatedAssets = assets.map(a => 
      a.id === assignData.assetId ? { ...a, status: 'Assigned', assignedTo: Number(assignData.userId), date: new Date().toLocaleDateString('en-GB') } : a
    );
    setAssets(updatedAssets);
    
    // Update user active assets count
    const updatedUsers = users.map(u => 
       u.id === Number(assignData.userId) ? { ...u, activeAssets: (u.activeAssets || 0) + 1 } : u
    );
    setUsers(updatedUsers);

    const assetObj = assets.find(a => a.id === assignData.assetId);
    const userObj = users.find(u => u.id === Number(assignData.userId));
    if (assetObj && userObj) {
        setActivities([{ id: Date.now(), icon: Laptop, text: `${assetObj.name} assigned to ${userObj.name}`, date: 'Just now' }, ...activities]);
    }
    setShowAssignModal(false);
    setAssignData({ assetId: '', userId: '' });
  };

  const handleDeleteUser = (userId) => {
    setAssets(assets.map(a => a.assignedTo === userId ? { ...a, assignedTo: null, status: 'Available' } : a));
    setUsers(users.filter(u => u.id !== userId));
  };

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    return (
      <text x={cx + radius * Math.cos(-midAngle * RADIAN)} y={cy + radius * Math.sin(-midAngle * RADIAN)} fill="white" textAnchor="middle" dominantBaseline="central" className="text-sm font-bold">
        {`${value}%`}
      </text>
    );
  };

  const getFilterModalData = () => {
    switch(showFilterModal) {
      case 'overdue': return { assets: overdueAssets, title: 'Overdue Assets', Icon: AlertCircle, color: 'bg-red-50 text-red-900', iconColor: 'text-red-600' };
      case 'maintenance': return { assets: maintenanceAssets, title: 'Pending Maintenance', Icon: Wrench, color: 'bg-yellow-50 text-yellow-900', iconColor: 'text-yellow-600' };
      case 'available': return { assets: assets.filter(a => a.status === 'Available'), title: 'Available Assets', Icon: CheckCircle2, color: 'bg-green-50 text-green-900', iconColor: 'text-green-600' };
      case 'assigned': return { assets: assets.filter(a => a.status === 'Assigned'), title: 'Assigned Assets', Icon: Laptop, color: 'bg-orange-50 text-orange-900', iconColor: 'text-orange-600' };
      case 'total': return { assets: assets, title: 'Total Assets', Icon: FileText, color: 'bg-blue-50 text-blue-900', iconColor: 'text-blue-600' };
      default: return null;
    }
  };

  const filterModalData = getFilterModalData();

  return (
    <div className="w-full max-w-[1100px] mx-auto py-6 space-y-5 bg-transparent overflow-x-hidden">
      
      {/* --- ROW 1: Top Stats --- */}
      <div className="grid grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div onClick={() => setShowFilterModal('total')} className="bg-gradient-to-br from-[#0b5bb0] to-[#0a4d95] rounded-xl flex flex-col justify-center px-5 py-4 text-white shadow-md relative overflow-hidden h-[85px] cursor-pointer hover:shadow-lg transition-all group">
          <div className="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform whitespace-nowrap"><FileText size={90} /></div>
          <div className="relative z-10 flex justify-between items-center h-full">
            <div className="flex flex-col"><span className="text-sm font-semibold mb-1 opacity-90">Total Assets</span><div className="w-6 h-[2px] bg-white/40"></div></div>
            <span className="text-3xl font-bold">{assets.length}</span>
          </div>
        </div>
        <div onClick={() => setShowFilterModal('available')} className="bg-gradient-to-br from-[#24a148] to-[#1f8d3f] rounded-xl flex flex-col justify-center px-5 py-4 text-white shadow-md relative overflow-hidden h-[85px] cursor-pointer hover:shadow-lg transition-all group">
          <div className="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform whitespace-nowrap"><CheckCircle2 size={90} /></div>
          <div className="relative z-10 flex justify-between items-center h-full">
            <div className="flex flex-col"><span className="text-sm font-semibold mb-1 opacity-90">Available Assets</span><div className="w-6 h-[2px] bg-white/40"></div></div>
            <span className="text-3xl font-bold">{assets.filter(a => a.status === 'Available').length}</span>
          </div>
        </div>
        <div onClick={() => setShowFilterModal('assigned')} className="bg-gradient-to-br from-[#f27420] to-[#d9681c] rounded-xl flex flex-col justify-center px-5 py-4 text-white shadow-md relative overflow-hidden h-[85px] cursor-pointer hover:shadow-lg transition-all group">
          <div className="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform whitespace-nowrap"><Laptop size={90} /></div>
          <div className="relative z-10 flex justify-between items-center h-full">
            <div className="flex flex-col"><span className="text-sm font-semibold mb-1 opacity-90">Assigned Assets</span><div className="w-6 h-[2px] bg-white/40"></div></div>
            <span className="text-3xl font-bold">{assets.filter(a => a.status === 'Assigned').length}</span>
          </div>
        </div>
        <div onClick={() => setShowUsersModal(true)} className="bg-gradient-to-br from-[#7854c6] to-[#6a49af] rounded-xl flex flex-col justify-center px-5 py-4 text-white shadow-md relative overflow-hidden h-[85px] cursor-pointer hover:shadow-lg transition-all group">
          <div className="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform whitespace-nowrap"><Users size={90} /></div>
          <div className="relative z-10 flex justify-between items-center h-full">
             <div className="flex flex-col"><span className="text-sm font-semibold mb-1 opacity-90">Users</span><div className="w-6 h-[2px] bg-white/40"></div></div>
            <span className="text-3xl font-bold">{users.length}</span>
          </div>
        </div>
      </div>

      {/* --- ROW 2: Charts & Notifications Panel --- */}
      <div className="grid grid-cols-[1.2fr_1.3fr_1fr] gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 flex flex-col h-[280px]">
          <h3 className="text-[13px] font-bold text-gray-800 mb-2 flex items-center gap-2"><PieChart size={16} className="text-[#1a5baf]" /> Asset Status</h3>
          <div className="flex-1 flex items-center justify-between px-2">
            <div className="w-[160px] h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ASSET_STATUS_DATA} cx="50%" cy="50%" labelLine={false} label={CustomPieLabel} outerRadius={75} dataKey="value" stroke="none">
                    {ASSET_STATUS_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-4 text-sm font-medium mr-2">
              {ASSET_STATUS_DATA.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between w-[110px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
                    <span className="text-gray-600 text-[12px] font-semibold">{entry.name}</span>
                  </div>
                  <span className="text-gray-900 font-bold text-[12px]">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 flex flex-col h-[280px]">
          <h3 className="text-[13px] font-bold text-gray-800 mb-2 flex items-center gap-2"><BarChart size={16} className="text-[#24a148]" /> Assets by Category</h3>
          <div className="flex-1 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ASSET_CATEGORY_DATA} barSize={35} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={{ stroke: '#f0f0f0' }} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {ASSET_CATEGORY_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  <LabelList dataKey="value" position="top" fill="#4b5563" fontSize={12} fontWeight={700} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 h-[280px] overflow-hidden flex flex-col object-cover">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-[13px] font-bold text-gray-800 flex items-center gap-2"><Bell size={16} className="text-[#e43f40]" /> Notifications</h3>
             <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{overdueAssets.length + maintenanceAssets.length + nearsReturnAssets.length} New</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 custom-scrollbar">
             {overdueAssets.map(a => (
                <div onClick={()=>setShowFilterModal('overdue')} key={`od-${a.id}`} className="flex items-start gap-3 p-2.5 rounded-lg bg-red-50/50 hover:bg-red-50 border border-red-100/50 hover:border-red-200 transition-colors cursor-pointer group">
                   <div className="bg-red-100 p-1.5 rounded-md mt-0.5 group-hover:scale-110 transition-transform"><AlertCircle size={14} className="text-red-500" /></div>
                   <div className="leading-tight">
                     <p className="text-[12px] font-bold text-gray-800">{a.name} is overdue</p>
                     <p className="text-[10px] font-medium text-gray-500 mt-0.5">Assigned to: {users.find(u=>u.id===a.assignedTo)?.name || 'Unknown'}</p>
                   </div>
                </div>
             ))}
             {maintenanceAssets.map(a => (
                <div onClick={()=>setShowFilterModal('maintenance')} key={`mn-${a.id}`} className="flex items-start gap-3 p-2.5 rounded-lg bg-amber-50/50 hover:bg-amber-50 border border-amber-100/50 hover:border-amber-200 transition-colors cursor-pointer group">
                   <div className="bg-amber-100 p-1.5 rounded-md mt-0.5 group-hover:scale-110 transition-transform"><Wrench size={14} className="text-amber-600" /></div>
                   <div className="leading-tight">
                     <p className="text-[12px] font-bold text-gray-800">{a.name}</p>
                     <p className="text-[10px] font-medium text-gray-500 mt-0.5">Pending scheduled maintenance</p>
                   </div>
                </div>
             ))}
             {nearsReturnAssets.map(a => (
                <div key={`nr-${a.id}`} className="flex items-start gap-3 p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/50 transition-colors cursor-pointer group">
                   <div className="bg-emerald-100 p-1.5 rounded-md mt-0.5 group-hover:scale-110 transition-transform"><CalendarIcon size={14} className="text-emerald-500" /></div>
                   <div className="leading-tight">
                     <p className="text-[12px] font-bold text-gray-800">{a.name} return approaching</p>
                     <p className="text-[10px] font-medium text-gray-500 mt-0.5">Return expected in 3 days</p>
                   </div>
                </div>
             ))}
             {overdueAssets.length === 0 && maintenanceAssets.length === 0 && !nearsReturnAssets.length && (
               <p className="text-center text-xs text-gray-400 py-4 font-medium italic">You're all caught up!</p>
             )}
          </div>
        </div>
      </div>

      {/* --- ROW 3: Calendar, Top Users, Most Used Assets --- */}
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Calendar Widget */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 h-[280px] flex flex-col select-none">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[13px] font-bold text-gray-800 flex items-center gap-2"><CalendarIcon size={16} className="text-[#8b5cf6]" /> Schedule</h3>
            <span className="text-[10px] font-bold text-[#1a5baf] bg-[#1a5baf]/10 px-2 py-1 rounded-md">April 2024</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-[10px] font-bold text-gray-400">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 flex-1">
            {/* Blanks for month offset - just 1 for visual layout */}
            <div className="h-6"></div>
            {/* Array of 30 mock days */}
            {Array.from({length: 30}).map((_, i) => {
               const day = i + 1;
               const hasAssignment = [4, 12, 19].includes(day);
               const hasReturn = [10, 15, 26].includes(day);
               const isToday = day === 14; 
               return (
                 <div key={`d-${day}`} className={`h-8 flex flex-col items-center justify-center rounded-md cursor-pointer transition-colors relative
                    ${isToday ? 'bg-[#1a5baf] text-white shadow-md font-bold' : 'hover:bg-gray-50 text-gray-700 font-semibold'}
                 `}>
                    <span className="text-[11px]">{day}</span>
                    <div className="flex gap-[3px] absolute bottom-1">
                      {hasAssignment && !isToday && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-sm" />}
                      {hasReturn && !isToday && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm" />}
                    </div>
                 </div>
               )
            })}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-50 flex gap-4 text-[10px] font-bold text-gray-500 justify-center">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Assignments</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Returns</span>
          </div>
        </div>

        {/* Top Users Widget */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 h-[280px] flex flex-col">
          <h3 className="text-[13px] font-bold text-gray-800 mb-3 flex items-center gap-2"><Award size={16} className="text-[#f59e0b]" /> Most Active Users</h3>
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar">
            {[...users].sort((a,b)=>b.activeAssets - a.activeAssets).map((user, idx) => (
              <div key={user.id} className="flex items-center justify-between group hover:bg-gray-50 p-1.5 -mx-1.5 rounded-lg transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="relative">
                     {user.avatar ? (
                       <img src={user.avatar} className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover" />
                     ) : (
                       <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">{user.name.charAt(0)}</div>
                     )}
                     {idx === 0 && <span className="absolute -top-1 -right-1 text-[9px] bg-yellow-400 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">1</span>}
                     {idx === 1 && <span className="absolute -top-1 -right-1 text-[9px] bg-gray-300 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">2</span>}
                     {idx === 2 && <span className="absolute -top-1 -right-1 text-[9px] bg-orange-300 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">3</span>}
                   </div>
                   <div>
                      <p className="text-[12px] font-bold text-gray-800">{user.name}</p>
                      <p className="text-[10px] font-medium text-gray-500 mt-0.5">{user.email}</p>
                   </div>
                 </div>
                 <div className="flex flex-col items-end mr-1">
                   <span className="text-[10px] font-bold text-[#1a5baf] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">{user.activeAssets} items</span>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Used Assets Widget */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 h-[280px] flex flex-col">
          <h3 className="text-[13px] font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-[#3b82f6]" /> High Usage Assets</h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            {[...assets].sort((a,b)=>(b.usageCount||0) - (a.usageCount||0)).slice(0,5).map((a, i) => (
              <div key={a.id} className="relative group">
                <div className="flex justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-gray-800 truncate w-3/4">{a.name} <span className="text-gray-400 font-normal ml-1">({a.id})</span></span>
                  <span className="text-[#1a5baf]">{a.usageCount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#1a5baf] to-[#3b82f6] h-1.5 rounded-full transition-all duration-1000 ease-out" style={{width: `${Math.min((a.usageCount/250)*100, 100)}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- ROW 4: Categories Tabs & Mini Categories --- */}
      <div className="flex flex-col gap-3 mt-4 mb-2 w-full animate-in fade-in duration-700">
        <div className="flex justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
                key={cat.id}
                onClick={() => { setActiveTab(cat.id); setActiveMini(null); }}
                className={`px-8 py-2 rounded-full text-[13px] font-bold transition-all border ${
                  activeTab === cat.id ? 'bg-[#2b3c5a] text-white border-[#2b3c5a] shadow-md transform scale-105' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        {MINI_CATEGORIES[activeTab] && (
          <div className="flex justify-center gap-2.5 flex-wrap max-w-2xl mx-auto mt-2">
            {MINI_CATEGORIES[activeTab].map(mini => (
              <button 
                key={mini} 
                onClick={() => setActiveMini(mini === activeMini ? null : mini)}
                className={`px-4 py-1.5 rounded-full border text-[11px] font-bold transition-all shadow-sm ${
                  activeMini === mini ? 'bg-[#1a5baf] text-white border-[#1a5baf] scale-105' : 'bg-[#e8eef6] border-[#c4d7ec] text-[#1a5baf] hover:bg-[#d0dfef]'
                }`}
              >
                {mini}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Mini Category Assets Display */}
      {activeMini && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
           <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
             <h3 className="text-[14px] font-bold text-[#2b3c5a] flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1a5baf]"></div> Displaying {activeMini}</h3>
             <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{assets.filter(a => a.mini_category === activeMini).length} Items found</span>
           </div>
           {assets.filter(a => a.mini_category === activeMini).length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
               {assets.filter(a => a.mini_category === activeMini).map(a => (
                 <div key={a.id} className="border border-gray-100 rounded-lg p-3.5 flex justify-between items-center bg-[#fdfdfd] shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                    <div>
                      <p className="text-[13px] font-bold text-gray-800 group-hover:text-[#1a5baf] transition-colors">{a.name}</p>
                      <p className="text-[10px] font-semibold text-gray-400 font-mono mt-1 bg-gray-100 inline-block px-1.5 rounded">ID: {a.id}</p>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm ${
                      a.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      a.status === 'Maintenance' ? 'bg-red-50 text-red-700 border border-red-100' :
                      'bg-orange-50 text-orange-700 border border-orange-100'
                    }`}>
                      {a.status}
                    </span>
                 </div>
               ))}
             </div>
           ) : (
             <div className="py-10 flex flex-col items-center justify-center text-gray-400">
               <Info size={32} className="mb-2 opacity-50" />
               <p className="text-[13px] font-medium">No assets currently listed in this category.</p>
             </div>
           )}
        </div>
      )}

      {/* --- ROW 5: Maintenance History, Recent Activities, Assigned Assets --- */}
      <div className="grid grid-cols-[1.3fr_1fr_1.3fr] gap-4 mb-10 pt-2 animate-in fade-in duration-1000">
         
         {/* Maintenance History */}
         <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 h-[250px] flex flex-col">
            <h3 className="text-[13px] font-bold text-gray-800 mb-3 flex items-center gap-2"><Wrench size={16} className="text-[#64748b]" /> Maintenance Log</h3>
            <div className="overflow-x-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest bg-gray-50/50">
                    <th className="py-2.5 px-2 font-bold rounded-tl-md">Asset</th>
                    <th className="py-2.5 px-1 font-bold">Date</th>
                    <th className="py-2.5 px-1 font-bold">Status</th>
                    <th className="py-2.5 px-2 font-bold text-right rounded-tr-md">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-[11px]">
                  {maintenanceHistory.map((m) => (
                     <tr key={m.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-2 font-bold text-gray-800">{m.assetName}</td>
                        <td className="py-2.5 px-1 font-medium text-gray-500">{m.date}</td>
                        <td className="py-2.5 px-1">
                          <span className={`px-2 py-0.5 rounded font-bold ${m.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-right font-bold text-gray-600">{m.cost}</td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>

         {/* Recent Activities */}
         <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 h-[250px] flex flex-col">
            <h3 className="text-[13px] font-bold text-gray-800 mb-3 flex items-center gap-2"><History size={16} className="text-[#64748b]" /> Feed</h3>
            <div className="flex flex-col gap-3.5 overflow-y-auto pr-2 custom-scrollbar">
              {activities.map((activity, idx) => {
                const Icon = activity.icon || Info;
                return (
                  <div key={activity.id} className={`flex items-start gap-3 ${idx !== activities.length - 1 ? 'border-b border-gray-50 pb-3' : ''}`}>
                    <div className="bg-gray-100 p-1.5 rounded flex-shrink-0"><Icon size={14} className="text-[#64748b]" strokeWidth={2.5}/></div>
                    <div className="flex flex-col">
                       <span className="text-[11.5px] text-gray-800 font-medium leading-tight">
                         {activity.text.split(' ').map((word, i) => {
                           if (['assigned', 'added', 'returned', 'sent'].includes(word.toLowerCase())) return <span key={i} className="text-gray-500">{word} </span>;
                           return <strong key={i} className="font-bold">{word} </strong>;
                         })}
                       </span>
                       <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">{activity.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
         </div>

         {/* Assigned Assets */}
         <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 h-[250px] flex flex-col relative">
            <div className="flex items-center justify-between mb-3">
               <h3 className="text-[13px] font-bold text-gray-800 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#24a148]" /> Active Assignments</h3>
               <span className="text-[10px] font-bold text-[#1a5baf] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                 {assignedAssetsDisplay.length} Total
               </span>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar pb-1">
               {assignedAssetsDisplay.map((asset, idx) => {
                 const user = users.find(u => u.id === asset.assignedTo);
                 return (
                 <div key={asset.id} className="flex items-center justify-between bg-[#fdfdfd] border border-gray-100 p-2.5 rounded-lg shadow-sm hover:border-gray-200 transition-colors">
                   <div className="flex items-center gap-3 w-full">
                     {user?.avatar ? (
                        <img src={user.avatar} className="w-7 h-7 rounded-full border border-gray-200" />
                     ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">{user?.name?.charAt(0)}</div>
                     )}
                     <div className="flex flex-col">
                        <span className="text-[12px] text-gray-800 font-bold">{user?.name || 'Unknown'}</span>
                        <span className="text-[10px] font-medium text-gray-500 truncate w-[140px]">{asset.name}</span>
                     </div>
                   </div>
                   <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ml-2">{asset.date}</span>
                 </div>
               )})}
            </div>
         </div>
      </div>

      {/* Action Buttons Floating at bottom right (optional replacement for inline) */}
      <div className="fixed bottom-6 right-8 flex gap-3 z-40">
         <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-[#2b3c5a] hover:bg-[#1a263c] text-white px-5 py-3 rounded-full shadow-[0_4px_15px_rgba(43,60,90,0.3)] transition-all hover:scale-105 text-[13px] font-bold border border-white/10 group">
            <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" /> Asset
         </button>
         <button onClick={() => setShowAddUserModal(true)} className="flex items-center gap-2 bg-[#2b3c5a] hover:bg-[#1a263c] text-white px-5 py-3 rounded-full shadow-[0_4px_15px_rgba(43,60,90,0.3)] transition-all hover:scale-105 text-[13px] font-bold border border-white/10 group">
            <UserPlus size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" /> User
         </button>
         <button onClick={() => setShowAssignModal(true)} className="flex items-center gap-2 bg-[#1a5baf] hover:bg-[#104283] text-white px-5 py-3 rounded-full shadow-[0_4px_15px_rgba(26,91,175,0.4)] transition-all hover:scale-105 text-[13px] font-bold border border-white/10 group">
            <CheckCircle2 size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" /> Assign
         </button>
      </div>

      {/* --- MODALS --- */}
      
      {/* Dynamic List Modal (All Assets Lists Filters) */}
      {filterModalData && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className={`p-5 border-b border-gray-100 flex items-center justify-between ${filterModalData.color}`}>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <filterModalData.Icon size={20} /> {filterModalData.title}
              </h3>
              <button onClick={() => setShowFilterModal(null)} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-colors rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {filterModalData.assets.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filterModalData.assets.map(a => (
                     <div key={a.id} className="border border-gray-100 rounded-xl p-3.5 flex justify-between items-center bg-[#fdfdfd] hover:border-blue-200 hover:shadow-sm transition-all">
                        <div>
                          <p className="text-[14px] font-bold text-gray-800">{a.name} <span className="text-[11px] font-medium text-gray-400 ml-2">({a.category} • {a.mini_category})</span></p>
                          <p className="text-[11px] font-semibold text-gray-500 mt-1.5 font-mono bg-gray-50 inline-block px-1.5 rounded">ID: {a.id} {a.assignedTo ? `• Assigned to: ${users.find(u=>u.id===a.assignedTo)?.name || 'Unknown User'}` : ''}</p>
                        </div>
                        <span className={`text-[10px] px-3 py-1 rounded-full font-bold shadow-sm ${
                          a.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          a.status === 'Maintenance' ? 'bg-red-50 text-red-700 border border-red-100' :
                          'bg-orange-50 text-orange-700 border border-orange-100'
                        }`}>
                          {a.status}
                        </span>
                     </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 opacity-50">
                  <Info size={40} className="mb-3 text-gray-400" />
                  <p className="text-center text-gray-500 font-medium">No assets found for this filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Plus className="text-[#1a5baf]"/> Add New Asset</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Asset Name</label>
                  <input type="text" value={newAsset.name} onChange={(e) => setNewAsset({...newAsset, name: e.target.value})} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a5baf] transition-all text-[13px] font-medium" placeholder="e.g. MacBook Pro M3" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">System ID</label>
                  <input type="text" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-bold bg-gray-50 text-gray-500 flex items-center select-none" value={`A0${assets.length + 1}`} disabled />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                  <select value={newAsset.category} onChange={(e) => {
                      const newCat = e.target.value;
                      setNewAsset({...newAsset, category: newCat, mini_category: MINI_CATEGORIES[newCat]?.[0] || 'Unknown'});
                    }} 
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a5baf] text-[13px] font-medium appearance-none bg-white">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Sub-Category</label>
                  <select value={newAsset.mini_category} onChange={(e) => setNewAsset({...newAsset, mini_category: e.target.value})} className="w-full px-3.5 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a5baf] text-[13px] font-medium appearance-none bg-white">
                    {MINI_CATEGORIES[newAsset.category]?.map(mc => <option key={mc} value={mc}>{mc}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 border-t border-gray-100 pt-3">
                  <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Status</label>
                  <div className="flex gap-4">
                     {['Available', 'Maintenance'].map(state => (
                        <label key={state} className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${newAsset.status === state ? 'border-[#1a5baf] bg-blue-50/50 text-[#1a5baf] shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                           <input type="radio" value={state} checked={newAsset.status === state} onChange={(e) => setNewAsset({...newAsset, status: e.target.value})} className="hidden" />
                           <span className="text-[13px] font-bold">{state}</span>
                        </label>
                     ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm">Cancel</button>
                <button onClick={handleAddAsset} disabled={!newAsset.name} className="flex-1 bg-[#1a5baf] hover:bg-[#154d96] disabled:bg-gray-300 disabled:shadow-none text-white px-4 py-3 rounded-xl font-bold text-[13px] shadow-md shadow-blue-500/20 transition-all transform active:scale-95 flex justify-center items-center gap-2">
                  <CheckCircle2 size={16} /> Finalize Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><UserPlus className="text-[#1a5baf]"/> Enroll User</h3>
              <button onClick={() => setShowAddUserModal(false)} className="p-1.5 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                 <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                 <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a5baf] text-[13px] font-medium transition-all" placeholder="e.g. John Doe" />
              </div>
              <div>
                 <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                 <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a5baf] text-[13px] font-medium transition-all" placeholder="john@example.com" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddUserModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold text-[13px] hover:bg-gray-50 shadow-sm transition-colors">Cancel</button>
                <button onClick={handleAddUser} disabled={!newUser.name} className="flex-1 bg-[#1a5baf] text-white hover:bg-[#154d96] disabled:bg-gray-300 rounded-xl font-bold text-[13px] shadow-md shadow-blue-500/20 transition-all flex justify-center items-center gap-2">
                  <Plus size={16} /> Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign User Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><CheckCircle2 className="text-[#1a5baf]"/> Complete Assignment</h3>
              <button onClick={() => setShowAssignModal(false)} className="p-1.5 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                 <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Select Asset</label>
                 <select value={assignData.assetId} onChange={(e)=>setAssignData({...assignData, assetId: e.target.value})} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a5baf] text-[13px] font-medium appearance-none shadow-sm cursor-pointer">
                    <option value="">-- Click to choose from Vault --</option>
                    {assets.filter(a => a.status === 'Available').map(a => (
                      <option key={a.id} value={a.id}>{a.name} (ID: {a.id})</option>
                    ))}
                 </select>
              </div>
              <div className="flex justify-center text-gray-300">
                 <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                   <ChevronRight size={16} strokeWidth={3} className="text-[#1a5baf] rotate-90" />
                 </div>
              </div>
              <div>
                 <label className="block text-[12px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Assignee Profile</label>
                 <select value={assignData.userId} onChange={(e)=>setAssignData({...assignData, userId: e.target.value})} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1a5baf] text-[13px] font-medium appearance-none shadow-sm cursor-pointer">
                    <option value="">-- Choose registered personnel --</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                 </select>
              </div>
              <div className="flex gap-3 pt-5 border-t border-gray-100">
                <button onClick={() => setShowAssignModal(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-[13px] hover:bg-gray-50 shadow-sm transition-colors">Cancel</button>
                <button onClick={handleAssignAsset} disabled={!assignData.assetId || !assignData.userId} className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:shadow-none text-white rounded-xl font-bold text-[13px] transition-all transform active:scale-95 shadow-md shadow-emerald-500/30">
                  Confirm Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Users Modal */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#7854c6] text-white">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Users size={20} /> Directory Register
              </h3>
              <button onClick={() => setShowUsersModal(false)} className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 transition-colors rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto w-full bg-gray-50/50 custom-scrollbar">
              {users.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {users.map(u => (
                     <div key={u.id} className="border border-gray-200 rounded-xl p-3 flex justify-between items-center bg-white shadow-sm hover:border-[#7854c6]/40 transition-colors group">
                        <div className="flex items-center gap-3.5">
                           {u.avatar ? (
                             <img src={u.avatar} className="w-10 h-10 rounded-full border-2 border-gray-100 group-hover:border-[#7854c6]/30 transition-colors shadow-sm object-cover" />
                           ) : (
                             <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">{u.name.charAt(0)}</div>
                           )}
                          <div>
                            <p className="text-[14px] font-bold text-gray-800">{u.name}</p>
                            <div className="flex items-center gap-3 mt-0.5">
                               <p className="text-[11px] font-semibold text-gray-500">{u.email}</p>
                               <span className="text-[9px] font-bold bg-[#7854c6]/10 text-[#7854c6] px-1.5 py-0.5 rounded-full">{u.activeAssets || 0} Assets</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Revoke Access">
                          <Trash2 size={16} />
                        </button>
                     </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 flex flex-col items-center">
                   <Users size={40} className="text-gray-300 mb-3" />
                   <p className="text-center text-gray-500 font-medium text-[13px]">No personnel found in directory.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global minimal custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
      `}} />
    </div>
  );
};

export default Dashboard;
