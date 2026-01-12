import { useState } from 'react';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import VerifyOtpPage from './components/VerifyOtpPage';
import AdminDashboardPage from './components/AdminDashboardPage'; // YENİ EKLEDİK

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [navData, setNavData] = useState({});

  const handleNavigate = (page, data = {}) => {
    setNavData(data);
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'forgot-password' && <ForgotPasswordPage onNavigate={handleNavigate} />}
      {currentPage === 'verify-otp' && <VerifyOtpPage onNavigate={handleNavigate} email={navData.email} />}
      {currentPage === 'reset-password' && <ResetPasswordPage onNavigate={handleNavigate} />}
      
      {/* ADMIN PANELİ BURADA */}
      {currentPage === 'admin-dashboard' && <AdminDashboardPage onNavigate={handleNavigate} />}
    </>
  );
}

export default App;