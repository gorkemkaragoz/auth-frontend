import { useState } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import getErrorMessage from '../utils/getErrorMessage';

export default function LoginPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await apiClient.post('/auth/login', formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userData', JSON.stringify(response.data));

      toast.dismiss(loadingToast);
      toast.success('Login successful!');

      if (response.data.role === 'ROLE_ADMIN') {
        onNavigate('admin-dashboard');
      } else {
        onNavigate('dashboard', { user: response.data });
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(getErrorMessage(err, 'Invalid email or password.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
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
              onKeyDown={handleKeyDown}
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="************"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
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
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {isLoading ? 'Signing in...' : 'Login'}
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
