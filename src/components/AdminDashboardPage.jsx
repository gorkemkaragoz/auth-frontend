import { useState } from 'react';

export default function AdminDashboardPage({ onNavigate }) {
  const [users] = useState([
    { id: 1, firstName: 'Görkem', lastName: 'Karagöz', email: 'gorkem@example.com', role: 'ADMIN' },
    { id: 2, firstName: 'John', lastName: 'Doe', email: 'john@doe.com', role: 'USER' },
    { id: 3, firstName: 'Jane', lastName: 'Smith', email: 'jane@smith.com', role: 'USER' }
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Navbar - Glassmorphism touch */}
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
          <button 
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 font-semibold transition-all duration-300 rounded-lg hover:bg-red-50"
          >
            <span>Sign Out</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <span className="text-2xl font-black text-slate-800">{users.length}</span>
             </div>
          </div>
        </div>
        
        {/* Table Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
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
                        {user.firstName[0]}{user.lastName[0]}
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
                      user.role === 'ADMIN' 
                        ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-200' 
                        : 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'ADMIN' ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                       </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}