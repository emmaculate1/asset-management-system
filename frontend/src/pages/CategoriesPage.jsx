import { useState, useEffect } from 'react';
import { 
  Plus, 
  Layers, 
  ChevronRight, 
  FolderPlus, 
  Trash2, 
  Edit3,
  ListTree
} from 'lucide-react';
import axios from 'axios';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [miniCategories, setMiniCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('categories');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catsRes, miniCatsRes] = await Promise.all([
        axios.get('/api/categories'),
        axios.get('/api/categories/mini/all')
      ]);
      setCategories(catsRes.data);
      setMiniCategories(miniCatsRes.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMiniCatsForCat = (catId) => {
    return miniCategories.filter(mc => mc.category_id === catId);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 brand-font transition-all">Classification Management</h1>
          <p className="text-sm text-slate-500 font-medium">Define your asset hierarchy and categories</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 shadow-sm transition-all">
            <Plus size={18} /> New Category
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FolderPlus size={18} /> New Mini-Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Statistics or Quick Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="premium-card p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 outline-none">
              <ListTree size={20} /> Structure Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm opacity-80">Parent Categories</span>
                <span className="text-xl font-bold">{categories.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm opacity-80">Sub-Categories</span>
                <span className="text-xl font-bold">{miniCategories.length}</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-xl text-xs leading-relaxed">
              Define parent categories to group related items, then add mini-categories for granular asset tracking.
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="text-slate-900 font-bold mb-4 outline-none">Quick Links</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-sm font-medium flex items-center justify-between group">
                Audit Category Assignments
                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500" />
              </button>
              <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-sm font-medium flex items-center justify-between group">
                Bulk Category Import
                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-8 space-y-4">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
            ))
          ) : categories.map((cat) => (
            <div key={cat.id} className="premium-card overflow-hidden transition-all duration-300 hover:border-blue-200">
              <div className="p-5 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-blue-600 font-bold transition-all">
                    {cat.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 brand-font">{cat.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{cat.description || 'No description provided.'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Plus size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <Edit3 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-5 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {getMiniCatsForCat(cat.id).length > 0 ? (
                    getMiniCatsForCat(cat.id).map(mini => (
                      <div key={mini.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-blue-100 hover:shadow-sm transition-all group">
                        <span className="text-sm text-slate-600 font-medium">{mini.name}</span>
                        <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-4 text-center text-slate-300 text-xs italic">
                      No mini-categories defined for this group.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
