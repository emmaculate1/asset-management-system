import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Package, CheckCircle2, Briefcase, Wrench, Plus,
  ChevronDown, UserCircle2, Printer
} from 'lucide-react';

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, iconBg, valueColor }) => (
  <div className="stat-card">
    <div>
      <p className="text-sm text-slate-500 mb-1 font-medium">{label}</p>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
      <Icon size={22} className="text-white" />
    </div>
  </div>
);

// ─── Pie Legend ───────────────────────────────────────────────────────────────
const PIE_COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6'];
const PIE_LABELS = ['Electronics', 'Furniture', 'Vehicles', 'Other'];

const CustomLegend = () => (
  <ul className="flex flex-col gap-2 mt-2">
    {PIE_LABELS.map((label, i) => (
      <li key={label} className="flex items-center gap-2 text-sm text-slate-600">
        <span className="w-3 h-3 rounded-full inline-block" style={{ background: PIE_COLORS[i] }}></span>
        {label}
      </li>
    ))}
  </ul>
);

// ─── Recent Activity Item ─────────────────────────────────────────────────────
const activityData = [
  {
    id: 1,
    icon: UserCircle2,
    iconBg: 'bg-slate-200',
    iconColor: 'text-slate-500',
    text: <>Laptop assigned <strong>to John</strong></>,
    time: 'Just now',
  },
  {
    id: 2,
    icon: Wrench,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    text: <>Projector sent <strong>for maintenance</strong></>,
    time: '30 mins ago',
  },
  {
    id: 3,
    icon: Plus,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    text: <>New printer <strong>added to inventory</strong></>,
    time: '1 day ago',
  },
];

const ActivityItem = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0 group">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
          <Icon size={17} className={item.iconColor} />
        </div>
        <span className="text-sm text-slate-600">{item.text}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0 ml-4">
        <span>{item.time}</span>
        <ChevronDown size={13} className="text-slate-300" />
      </div>
    </div>
  );
};

// ─── Bar data ─────────────────────────────────────────────────────────────────
const barData = [
  { name: 'Jan', usage: 13 },
  { name: 'Feb', usage: 18 },
  { name: 'Mar', usage: 23 },
  { name: 'Apr', usage: 13 },
  { name: 'May', usage: 18 },
  { name: 'Jun', usage: 28 },
  { name: 'Jul', usage: 20 },
  { name: 'Jun', usage: 35 },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/assets')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setAssets(data) : setAssets([]))
      .catch(() => setAssets([]));
  }, []);

  const totalAssets = assets.length || 120;
  const available = assets.filter(a => a.status === 'Available').length || 80;
  const inUse = assets.filter(a => a.status === 'In Use').length || 30;
  const maintenance = assets.filter(a => a.status === 'Maintenance').length || 10;

  // Pie: group by category
  const categoryCount = assets.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});
  const pieData = PIE_LABELS.map((name, i) => ({
    name,
    value: categoryCount[name] || [60, 20, 10, 10][i],
  }));

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <button
          id="add-asset-btn"
          onClick={() => navigate('/add-asset')}
          className="btn-primary"
        >
          <Plus size={17} />
          Add Asset
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Assets"
          value={totalAssets}
          icon={Package}
          iconBg="bg-blue-500"
          valueColor="text-slate-800"
        />
        <StatCard
          label="Available"
          value={available}
          icon={CheckCircle2}
          iconBg="bg-green-500"
          valueColor="text-green-600"
        />
        <StatCard
          label="In Use"
          value={inUse}
          icon={Briefcase}
          iconBg="bg-orange-400"
          valueColor="text-orange-500"
        />
        <StatCard
          label="Under Maintenance"
          value={maintenance}
          icon={Wrench}
          iconBg="bg-red-500"
          valueColor="text-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-700 mb-4">Asset Distribution</h3>
          <div className="flex items-center gap-6">
            <PieChart width={220} height={200}>
              <Pie
                data={pieData}
                cx={105}
                cy={95}
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <CustomLegend />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-700 mb-4">Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barCategoryGap="30%">
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 40]}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-base font-semibold text-slate-700 mb-2">Recent Activities</h3>
        <div className="divide-y divide-slate-100">
          {activityData.map(item => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;