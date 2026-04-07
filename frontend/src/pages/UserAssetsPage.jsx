import { useState } from 'react';
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

const UserAssetsPage = () => {
  const [assets, setAssets] = useState(DUMMY_ASSETS);
  const [search, setSearch] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('Electronics');

  // Strict constraint for the User logic: only show specific category or search matching
  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase()) &&
    (activeCategoryTab === 'All' || asset.category === activeCategoryTab)
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
            {activeCategoryTab === cat && (
              <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#1a6ac9] border-r-[6px] border-r-transparent"></span>
            )}
          </button>
        ))}
      </div>

      {/* Filters (Simplified for User) */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="asset-search"
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#f6f8fb] sm:bg-white border border-slate-200 rounded text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden mt-2">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#f2f5f8] border-b border-slate-200">
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[18%]">Name</th>
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[18%]">Category</th>
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[20%]">Status</th>
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide w-[20%]">Status</th>
              <th className="py-3.5 px-6 text-[13px] font-bold text-[#203147] tracking-wide">Action</th>
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
                    {asset.assignedTo === '-' ? (
                      <span className="text-slate-400 text-[10px] w-4 mt-auto mb-auto bg-transparent">▴</span>
                    ) : (
                      <span className="font-medium">{asset.assignedTo}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {asset.status === 'Available' ? (
                        <button className="bg-[#28a745] hover:bg-green-600 text-white text-xs font-medium px-5 py-1.5 rounded shadow-sm">
                          Request
                        </button>
                      ) : (
                        <button className="bg-[#7d8b9e] text-white text-xs font-medium px-5 py-1.5 rounded cursor-not-allowed shadow-sm">
                          Unavailable
                        </button>
                      )}
                    </div>
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

export default UserAssetsPage;
