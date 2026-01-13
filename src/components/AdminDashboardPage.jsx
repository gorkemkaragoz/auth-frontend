import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminDashboardPage({ onNavigate }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      toast.error('Failed to fetch users.');
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const loadingToast = toast.loading('Deleting user...');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(users.filter(user => user.id !== id));
      toast.dismiss(loadingToast);
      toast.success('User deleted successfully.');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Failed to delete user.');
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    const loadingToast = toast.loading('Updating user info...');
    try {
      const token = localStorage.getItem('token');
      

      const payload = {
        ...editFormData,
        role: editingUser.role 
      };

      const response = await axios.put(`http://localhost:8080/users/${editingUser.id}`, 
        payload, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(users.map(u => (u.id === editingUser.id ? response.data : u)));
      
      toast.dismiss(loadingToast);
      toast.success('User updated successfully!');
      setIsEditModalOpen(false);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Update failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    toast.success('Admin logged out.');
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans relative">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-10 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-200 flex items-center justify-center rotate-3">
            <svg className="w-6 h-6 text-white -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Authify Central</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Control Plane</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <button onClick={handleLogout} className="group flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 font-semibold transition-all duration-300 rounded-lg hover:bg-red-50">
            <span>Sign Out</span>
            <svg className="w-5 h-5 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">User Management</h2>
            <p className="text-slate-500 mt-2 text-lg">Manage and monitor all registered accounts in the system.</p>
          </div>
          <div className="flex gap-3">
             <div className="bg-white shadow-sm border border-slate-200 rounded-xl px-5 py-3 flex flex-col">
                <span className="text-xs text-slate-400 font-bold uppercase">Total Users</span>
                {isLoading ? (
                  <span className="text-sm text-slate-400">Loading...</span>
                ) : (
                  <span className="text-2xl font-black text-slate-800">{users.length}</span>
                )}
             </div>
          </div>
        </div>
        
        {/* Table Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-slate-500">Loading users data...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Profile</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Access Level</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                          {user.lastName ? user.lastName[0].toUpperCase() : ''}
                        </div>
                        <div>
                          <div className="text-base font-bold text-slate-900">{user.firstName} {user.lastName}</div>
                          <div className="text-xs text-slate-400 font-medium">ID: #{user.id.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-slate-600 font-medium">{user.email}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black tracking-wide uppercase ${
                        user.role === 'ROLE_ADMIN' 
                          ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-200' 
                          : 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'ROLE_ADMIN' ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
                        {user.role ? user.role.replace('ROLE_', '') : 'USER'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* EDIT BUTTON */}
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-2 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-200 text-slate-400 hover:text-blue-600 transition-all"
                          title="Edit User"
                        >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                           </svg>
                        </button>
                        
                        {/* DELETE BUTTON */}
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 text-slate-400 hover:text-red-600 transition-all"
                          title="Delete User"
                        >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                           </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-up">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Edit User Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  value={editFormData.firstName} 
                  onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={editFormData.lastName} 
                  onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={editFormData.email} 
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}