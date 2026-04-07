import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { UserLayout } from './layouts/UserLayout';
import AdminAssetsPage from './pages/AdminAssetsPage';
import UserAssetsPage from './pages/UserAssetsPage';

// A simple landing to route them manually if they go to /
const AppLanding = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#f4f7fa]">
    <div className="bg-white p-10 rounded-xl shadow border border-slate-200 text-center max-w-md w-full">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Asset Management System</h1>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Please select which part of the application you would like to test.
      </p>
      
      <div className="flex flex-col gap-4">
        <Link 
          to="/admin/assets" 
          className="bg-[#24344d] hover:bg-[#1b273b] text-white font-medium px-6 py-4 rounded shadow transition-colors block text-lg"
        >
          Enter Admin Panel
        </Link>
        <Link 
          to="/user/assets" 
          className="bg-[#28a745] hover:bg-green-700 text-white font-medium px-6 py-4 rounded shadow transition-colors block text-lg"
        >
          Enter User Panel
        </Link>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<AppLanding />} />

        {/* --- Admin Module --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/assets" replace />} />
          <Route path="assets" element={<AdminAssetsPage />} />
          {/* Fallbacks */}
          <Route path="*" element={<div className="text-slate-500 text-center pt-20">Admin page coming soon. Go to <Link to="/admin/assets" className="text-blue-500">Assets</Link>.</div>} />
        </Route>

        {/* --- User Module --- */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/assets" replace />} />
          <Route path="assets" element={<UserAssetsPage />} />
          <Route path="electronics" element={<Navigate to="/user/assets" replace />} />
          {/* Fallbacks */}
          <Route path="*" element={<div className="text-slate-500 text-center pt-20">User page coming soon. Go to <Link to="/user/assets" className="text-blue-500">Assets</Link>.</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;