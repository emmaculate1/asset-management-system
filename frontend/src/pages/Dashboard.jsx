import { useState, useEffect } from 'react';
import { 
  Search, 
  Laptop, 
  Monitor, 
  Printer, 
  Wifi, 
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  Armchair, 
  Car, 
  Building,
  Briefcase,
  Wrench,
  Package,
  Plus,
  User,
  Edit,
  Trash2,
  Filter,
  ChevronDown
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Electronics', name: 'Electronics', icon: Laptop },
  { id: 'Furniture', name: 'Furniture', icon: Armchair },
  { id: 'Vehicles', name: 'Vehicles', icon: Car },
  { id: 'Office', name: 'Office', icon: Briefcase },
  { id: 'Equipment', name: 'Equipment', icon: Wrench },
  { id: 'Buildings', name: 'Buildings', icon: Building },
  { id: 'Others', name: 'Others', icon: Package }
];

const MINI_CATEGORIES = {
  'Electronics': ['Laptops', 'Desktops', 'Printers', 'Networking Devices', 'Accessories'],
  'Furniture': ['Chairs', 'Desks', 'Tables', 'Storage', 'Sofas'],
  'Vehicles': ['Cars', 'Trucks', 'Motorcycles'],
  'Office': ['Stationery', 'Supplies'],
  'Equipment': ['Power Tools', 'Hand Tools', 'Measurement Tools'],
  'Buildings': ['Offices', 'Warehouses', 'Parking'],
  'Others': ['Miscellaneous']
};

const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', avatar: 'JS' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234-567-8902', avatar: 'MJ' }
];

const MOCK_ASSETS = [
  { 
    id: 'A001', 
    name: 'Dell Laptop', 
    category: 'Electronics', 
    mini_category: 'Laptops', 
    status: 'Available', 
    description: 'High-performance laptop for office work',
    assignedUser: null,
    image: 'https://picsum.photos/seed/dell-laptop/300/200.jpg'
  },
  { 
    id: 'A002', 
    name: 'HP Desktop', 
    category: 'Electronics', 
    mini_category: 'Desktops', 
    status: 'In Use', 
    description: 'Powerful desktop computer for development',
    assignedUser: MOCK_USERS[0],
    image: 'https://picsum.photos/seed/hp-desktop/300/200.jpg'
  },
  { 
    id: 'A003', 
    name: 'Canon Printer', 
    category: 'Electronics', 
    mini_category: 'Printers', 
    status: 'Under Maintenance', 
    description: 'Multi-function printer for office use',
    assignedUser: MOCK_USERS[1],
    image: 'https://picsum.photos/seed/canon-printer/300/200.jpg'
  },
  { 
    id: 'A004', 
    name: 'Router', 
    category: 'Electronics', 
    mini_category: 'Networking Devices', 
    status: 'Available', 
    description: 'High-speed wireless router',
    assignedUser: null,
    image: 'https://picsum.photos/seed/router/300/200.jpg'
  },
  { 
    id: 'A005', 
    name: 'Keyboard', 
    category: 'Electronics', 
    mini_category: 'Accessories', 
    status: 'In Use', 
    description: 'Mechanical keyboard with RGB lighting',
    assignedUser: MOCK_USERS[2],
    image: 'https://picsum.photos/seed/keyboard/300/200.jpg'
  },
  { 
    id: 'A006', 
    name: 'Mouse', 
    category: 'Electronics', 
    mini_category: 'Accessories', 
    status: 'Available', 
    description: 'Wireless ergonomic mouse',
    assignedUser: null,
    image: 'https://picsum.photos/seed/mouse/300/200.jpg'
  }
];

const Dashboard = () => {
  const [assets, setAssets] = useState(MOCK_ASSETS);
  const [activeTab, setActiveTab] = useState('Electronics');
  const [activeMini, setActiveMini] = useState('Laptops');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const currentMiniCats = MINI_CATEGORIES[activeTab] || [];

  useEffect(() => {
    if (currentMiniCats.length > 0) {
      if (!currentMiniCats.includes(activeMini)) {
        setActiveMini(currentMiniCats[0]);
      }
    } else {
      setActiveMini(null);
    }
  }, [activeTab]);

  const filteredAssets = assets.filter(asset => {
    const catMatch = asset.category === activeTab;
    const miniMatch = activeMini ? asset.mini_category === activeMini : true;
    const statusMatch = statusFilter === 'All' || asset.status === statusFilter;
    
    if (searchTerm) {
      const searchMatch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.id.toLowerCase().includes(searchTerm.toLowerCase());
      return catMatch && miniMatch && statusMatch && searchMatch;
    }
    return catMatch && miniMatch && statusMatch;
  });

  const stats = {
    total: assets.length,
    inUse: assets.filter(a => a.status === 'In Use').length,
    available: assets.filter(a => a.status === 'Available').length,
    underMaintenance: assets.filter(a => a.status === 'Under Maintenance').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Use': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Under Maintenance': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'In Use': return 'bg-orange-500';
      case 'Under Maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAssignUser = (asset) => {
    setSelectedAsset(asset);
    setShowAssignModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Category Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar - Mini Categories and Status Filters */}
        <div className="w-80 space-y-6">
          {/* Mini Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Mini Categories</h3>
            <div className="space-y-1">
              {currentMiniCats.map((mini) => {
                const isActive = activeMini === mini;
                return (
                  <button
                    key={mini}
                    onClick={() => setActiveMini(mini)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    {mini}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Status Filters</h3>
            <div className="space-y-1">
              {['All', 'Available', 'In Use', 'Under Maintenance'].map((status) => {
                const isActive = statusFilter === status;
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Asset Cards */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAssets.length > 0 ? filteredAssets.map((asset) => (
              <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
                {/* Asset Image */}
                <div className="h-48 bg-gray-50 relative overflow-hidden">
                  <img 
                    src={asset.image} 
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusBadgeColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </div>
                </div>
                
                {/* Asset Details */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{asset.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{asset.description}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Asset ID</p>
                      <p className="font-mono text-sm font-semibold text-gray-900">{asset.id}</p>
                    </div>
                    
                    {/* User Assignment */}
                    <div className="text-right">
                      {asset.assignedUser ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {asset.assignedUser.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{asset.assignedUser.name}</p>
                            <p className="text-xs text-gray-500">Assigned</p>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleAssignUser(asset)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Assign User
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-16 text-center">
                <Package size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets found</h3>
                <p className="text-gray-500">Try adjusting your filters or add a new asset.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Assigned Assets & Maintenance */}
        <div className="w-80 space-y-6">
          {/* Assigned Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Assigned Users</h3>
            <div className="space-y-3">
              {MOCK_USERS.filter(user => assets.some(asset => asset.assignedUser?.id === user.id)).map((user) => {
                const assignedAssets = assets.filter(asset => asset.assignedUser?.id === user.id);
                return (
                  <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{assignedAssets.length} assets</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Under Maintenance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Under Maintenance</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {assets.filter(asset => asset.status === 'Under Maintenance').slice(0, 3).map((asset) => (
                <div key={asset.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Package size={20} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{asset.name}</p>
                    <p className="text-xs text-gray-500">{asset.id}</p>
                    {asset.assignedUser && (
                      <p className="text-xs text-gray-600">Assigned: {asset.assignedUser.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Quick Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Package size={32} className="text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500">Total Assets</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <User size={32} className="text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.inUse}</p>
            <p className="text-sm text-gray-500">In Use</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Package size={32} className="text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.available}</p>
            <p className="text-sm text-gray-500">Available</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Wrench size={32} className="text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.underMaintenance}</p>
            <p className="text-sm text-gray-500">Under Maintenance</p>
          </div>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Add New Asset</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter asset name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset ID</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Auto-generated or manual" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mini Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select mini category</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter asset description"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Available">Available</option>
                    <option value="In Use">In Use</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <input type="file" accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign User (Optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select user</option>
                    {MOCK_USERS.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                  Add Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign User Modal */}
      {showAssignModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Assign User to {selectedAsset.name}</h3>
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Select User</label>
              <div className="space-y-2 mb-6">
                {MOCK_USERS.map(user => (
                  <label key={user.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="user" className="text-blue-600" />
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                  Assign User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
