import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackagePlus, ChevronLeft } from 'lucide-react';

const AddAssetPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: '',
    serialNumber: '',
    purchaseDate: '',
    status: 'Available',
    assignedTo: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', category: '', serialNumber: '', purchaseDate: '', status: 'Available', assignedTo: '' });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[700px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          id="back-btn"
          onClick={() => navigate('/assets')}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Add New Asset</h2>
          <p className="text-sm text-slate-500 mt-0.5">Fill in the details to register a new asset</p>
        </div>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          Asset added successfully!
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <PackagePlus size={18} className="text-blue-600" />
          </div>
          <span className="font-semibold text-slate-700">Asset Information</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Row 1: Name + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="asset-name" className="form-label">Asset Name <span className="text-red-500">*</span></label>
              <input
                id="asset-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Dell Laptop Pro"
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="asset-category" className="form-label">Category <span className="text-red-500">*</span></label>
              <select
                id="asset-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 2: Serial Number + Purchase Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="serial-number" className="form-label">Serial Number <span className="text-red-500">*</span></label>
              <input
                id="serial-number"
                type="text"
                name="serialNumber"
                value={form.serialNumber}
                onChange={handleChange}
                placeholder="e.g. SN-20240101"
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="purchase-date" className="form-label">Purchase Date <span className="text-red-500">*</span></label>
              <input
                id="purchase-date"
                type="date"
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Row 3: Status + Assigned To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="asset-status" className="form-label">Status</label>
              <select
                id="asset-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label htmlFor="assigned-to" className="form-label">Assigned To</label>
              <input
                id="assigned-to"
                type="text"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="form-input"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-100 mt-2">
            <button
              id="submit-asset-btn"
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                <>
                  <PackagePlus size={17} />
                  Add Asset
                </>
              )}
            </button>
            <button
              id="cancel-asset-btn"
              type="button"
              onClick={() => navigate('/assets')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssetPage;