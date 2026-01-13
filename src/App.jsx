import { useState } from 'react';
import { Toaster } from 'react-hot-toast'; // Toast kütüphanesini dahil ettik
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import VerifyOtpPage from './components/VerifyOtpPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import DashboardPage from './components/DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [navData, setNavData] = useState({});

  const handleNavigate = (page, data = {}) => {
    setNavData(data);
    setCurrentPage(page);
  };

  return (
    <>
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10B981', 
            },
          },
          error: {
            style: {
              background: '#EF4444', 
            },
          },
        }} 
      />

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'forgot-password' && <ForgotPasswordPage onNavigate={handleNavigate} />}
      
      {currentPage === 'verify-otp' && (
        <VerifyOtpPage onNavigate={handleNavigate} email={navData.email} />
      )}
      
      {currentPage === 'reset-password' && (
        <ResetPasswordPage 
          onNavigate={handleNavigate} 
          email={navData.email} 
          otp={navData.otp} 
        />
      )}
      
      {currentPage === 'admin-dashboard' && <AdminDashboardPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} user={navData.user} />}
    </>
  );
}

export default App;