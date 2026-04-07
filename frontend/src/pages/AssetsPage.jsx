import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Search } from 'lucide-react';

const statusClass = {
  'Available': 'badge-available',
  'In Use': 'badge-inuse',
  'Under Maintenance': 'badge-maintenance',
};

const DUMMY_ASSETS = [
  { id: 1, name: 'Dell Laptop', category: 'Electronics', status: 'Available', assignedTo: 'Michael' },
  { id: 2, name: 'Projector', category: 'Electronics', status: 'In Use', assignedTo: 'Sarah' },
  { id: 3, name: 'iPad', category: 'Electronics', status: 'Under Maintenance', assignedTo: '-' },
  { id: 4, name: 'Headphones', category: 'Electronics', status: 'Available', assignedTo: 'Unassigned' },
  { id: 5, name: 'Printer', category: 'Electronics', status: 'Available', assignedTo: 'David' }
];

const categories = ['All', 'Electronics', 'Furniture', 'Equipment'];

const AssetsPage = () => {
  const { user } = useUser();
  const isAdmin = user.role === 'admin';

  const [assets, setAssets] = useState(DUMMY_ASSETS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('Electronics');

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' || asset.status === statusFilter) &&
    (isAdmin ? (categoryFilter === '' || asset.category === categoryFilter) : (activeCategoryTab === 'All' || asset.category === activeCategoryTab))
  );

  return (
    <div className="max-w-[1000px] pb-10">
      {/* Page Header */}
      <h2 className="text-3xl font-bold text-[#203147] mb-7">Assets</h2>

      {/* Category Pills */}
      <div className="flex gap-2.5 mb-7">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryTab(cat)}
            className={`relative px-5 py-2 rounded text-sm font-medium border transition-colors ${
              activeCategoryTab === cat
                ? 'bg-[#1a6ac9] text-white border-[#1a6ac9]'
                : 'bg-white text-[#5c6e83] border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
            {/* Caret for active tab */}
            {activeCategoryTab === cat && (
              <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#1a6ac9] border-r-[6px] border-r-transparent"></span>
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="asset-search"
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#f6f8fb] sm:bg-white border border-slate-200 rounded text-sm focus:outline-none"
          />
        </div>
        {isAdmin && (
          <>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded pl-4 pr-10 py-2.5 text-sm text-[#5c6e83] focus:outline-none min-w-[200px]"
              >
                <option value="">Filter by Status</option>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded pl-4 pr-10 py-2.5 text-sm text-[#5c6e83] focus:outline-none min-w-[200px]"
              >
                <option value="">Filter by Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Equipment">Equipment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden mt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f5f8] border-b border-slate-200">
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[18%]">Name</th>
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[18%]">Category</th>
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[20%]">Status</th>
              {isAdmin ? (
                <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[20%]">Assigned To</th>
              ) : (
                <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[20%]">Status</th>
              )}
              <th className={`py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide ${isAdmin ? 'text-center' : ''}`}>{isAdmin ? 'Actions' : 'Action'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-400 text-sm">
                  No assets found.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset, index) => (
                <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="py-4 px-6 text-[14px] text-[#203147] font-medium">{asset.name}</td>
                  <td className="py-4 px-6 text-[14px] text-[#203147] font-medium">{asset.category}</td>
                  <td className="py-4 px-6">
                    <span className={statusClass[asset.status] || 'badge bg-slate-400 text-white'}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#203147] flex items-center h-[60px]">
                    {asset.assignedTo === '-' && !isAdmin ? (
                      <span className="text-slate-400 text-[10px] w-4 mt-auto mb-auto bg-transparent">▴</span>
                    ) : (
                      <span className="font-medium">{asset.assignedTo}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {isAdmin ? (
                      <div className="flex items-center justify-center gap-2">
                        <button className="bg-[#1a6ac9] hover:bg-blue-700 text-white text-xs font-medium px-4 py-1.5 rounded">
                          View
                        </button>
                        <button className="bg-[#f0ad4e] hover:bg-orange-500 text-white text-xs font-medium px-4 py-1.5 rounded">
                          Edit
                        </button>
                        <button className="bg-[#d9534f] hover:bg-red-600 text-white text-xs font-medium px-4 py-1.5 rounded">
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {asset.status === 'Available' ? (
                          <button className="bg-[#28a745] hover:bg-green-600 text-white text-xs font-medium px-4 py-1.5 rounded">
                            Request
                          </button>
                        ) : (
                          <button className="bg-[#7d8b9e] text-white text-xs font-medium px-4 py-1.5 rounded cursor-not-allowed">
                            Unavailable
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsPage;