import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);

      toast.dismiss(loadingToast);
      toast.success('Login successful!');

      if (response.data.role === 'ROLE_ADMIN') {
        onNavigate('admin-dashboard');
      } else {
        onNavigate('dashboard', { user: response.data });
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      const errorMessage = err.response?.data?.message || 'Invalid credentials.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center px-4 relative">
      <div 
        className="absolute top-8 left-8 flex items-center gap-3 text-white cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-2xl font-bold">Authify</span>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</h2>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="************"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="text-left">
            <button 
              onClick={() => onNavigate('forgot-password')}
              className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigate('signup')}
              className="text-gray-900 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}