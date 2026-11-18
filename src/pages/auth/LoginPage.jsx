import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Check,
  User,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ChefHatIcon } from '../../components/common/Logo';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('Customer'); // 'Customer' | 'Admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrPhone: 'customer@foodexpress.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  // Switch role tab and pre-fill default credentials
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    if (role === 'Admin') {
      setValue('emailOrPhone', 'admin@foodexpress.com');
      setValue('password', 'password123');
    } else {
      setValue('emailOrPhone', 'customer@foodexpress.com');
      setValue('password', 'password123');
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await login({
        emailOrPhone: data.emailOrPhone,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (res.success) {
        toast.success(`Welcome, ${res.user.fullName}! Logged in as ${res.user.role}.`, {
          position: "top-right",
          autoClose: 2000,
        });

        // Determine target route strictly by role
        const targetPath = res.redirectPath || (res.user.role === 'Admin' ? '/admin/dashboard' : '/restaurants');
        navigate(targetPath, { replace: true });
      } else {
        toast.error(res.error || 'Login failed. Please check your credentials.', {
          position: "top-right",
        });
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    const isCustomer = selectedRole === 'Customer';
    const email = isCustomer ? 'customer@foodexpress.com' : 'admin@foodexpress.com';
    toast.info(`${provider} login: connecting as ${selectedRole}...`);
    setValue('emailOrPhone', email);
    setValue('password', 'password123');
    const res = await login({
      emailOrPhone: email,
      password: 'password123',
      rememberMe: true,
    });
    if (res.success) {
      const target = isCustomer ? '/restaurants' : '/admin/dashboard';
      navigate(target, { replace: true });
    }
  };

  return (
    <div className="w-screen h-screen max-w-full max-h-screen overflow-hidden relative select-none bg-[#18100B] font-sans">
      
      {/* Background Image: Cheeseburger Feast with Cola and Fries */}
      <img
        src="/cheeseburger-feast.png"
        alt="Cheeseburger Feast with Cola and Fries"
        className="absolute inset-0 w-full h-full object-cover object-left md:object-center pointer-events-none filter brightness-95 contrast-105"
        onError={(e) => {
          e.target.src = "/Cheeseburger%20Feast%20with%20Cola%20and%20Fries.png";
        }}
      />

      {/* Main Overlay Viewport Container (Locked to 100vh, Zero Scroll) */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-3 md:py-4">
        
        {/* Left Side: Brand Logo, Headline & Bullets */}
        <div className="hidden md:flex flex-col justify-start max-w-sm lg:max-w-md xl:max-w-lg pt-2 lg:pt-4 self-start">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 mb-5 lg:mb-6">
            <ChefHatIcon className="w-8 h-8 lg:w-9 lg:h-9" color="#FF5A1F" />
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-white">
              Food<span className="text-[#FF5A1F]">Express</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] tracking-tight mb-5 lg:mb-6 drop-shadow-md">
            Order<br />
            Your Favorite<br />
            Food Online
          </h1>

          {/* Bullets with Circular Checkmark Icons */}
          <div className="space-y-3 lg:space-y-3.5">
            <div className="flex items-center gap-3 text-white drop-shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="text-sm lg:text-base font-medium tracking-normal text-white">1000+ Restaurants</span>
            </div>

            <div className="flex items-center gap-3 text-white drop-shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="text-sm lg:text-base font-medium tracking-normal text-white">Fast Delivery</span>
            </div>

            <div className="flex items-center gap-3 text-white drop-shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="text-sm lg:text-base font-medium tracking-normal text-white">Strict Role Isolation</span>
            </div>
          </div>
        </div>

        {/* Right Side: Spacious & Wider Login Grid Card */}
        <div className="w-full md:w-auto flex items-center justify-center my-auto md:mr-2 lg:mr-6 xl:mr-10">
          <div className="w-full max-w-[450px] sm:max-w-[470px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] p-5 sm:p-7 flex flex-col justify-center border border-white/60">
            
            {/* Top Mascot Chef Hat & Header */}
            <div className="text-center mb-3 sm:mb-4">
              <div className="inline-flex items-center justify-center mb-1 drop-shadow-xs">
                <ChefHatIcon className="w-11 h-11 sm:w-12 sm:h-12" color="#FF5A1F" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-none">
                Food<span className="text-[#FF5A1F]">Express</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-1 flex items-center justify-center gap-1.5">
                Welcome Back! <span>👋</span>
              </h2>
            </div>

            {/* SEPARATE ROLE SELECTOR TABS */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/90 rounded-2xl mb-4 border border-slate-200/80">
              <button
                type="button"
                onClick={() => handleSelectRole('Customer')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRole === 'Customer'
                    ? 'bg-[#FF5A1F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('Admin')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRole === 'Admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Admin</span>
              </button>
            </div>

            {/* Login Details Grid / Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Email or Phone Input */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4 stroke-[1.6]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Email or Mobile Number"
                    {...register('emailOrPhone', {
                      required: 'Email or Mobile Number is required',
                    })}
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl border text-xs sm:text-sm font-normal text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F] focus:border-[#FF5A1F] transition ${
                      errors.emailOrPhone ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.emailOrPhone && (
                  <p className="text-red-500 text-[11px] font-normal mt-0.5 pl-1">
                    {errors.emailOrPhone.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4 stroke-[1.6]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    className={`w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border text-xs sm:text-sm font-normal text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F] focus:border-[#FF5A1F] transition ${
                      errors.password ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4 stroke-[1.6]" />
                    ) : (
                      <EyeOff className="w-4 h-4 stroke-[1.6]" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[11px] font-normal mt-0.5 pl-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 font-normal">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#FF5A1F] accent-[#FF5A1F] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[#FF5A1F] hover:underline font-medium transition"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-4 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-[0.99] text-white font-semibold rounded-xl shadow-md shadow-orange-500/20 text-sm sm:text-base transition cursor-pointer mt-1"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </span>
                ) : (
                  `Login as ${selectedRole}`
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Info Card */}
            <div className="mt-3 p-2.5 rounded-xl bg-orange-50/70 border border-orange-100 flex items-center justify-between text-[11px] text-slate-700">
              <div className="truncate">
                <span className="font-bold text-orange-800">
                  {selectedRole === 'Admin' ? 'Admin Portal:' : 'Customer Portal:'}
                </span>{' '}
                <span className="font-mono text-slate-600 truncate">
                  {selectedRole === 'Admin' ? 'admin@foodexpress.com' : 'customer@foodexpress.com'}
                </span>
                <span className="text-slate-400 mx-1">|</span>
                <span className="font-mono text-slate-600">password123</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelectRole(selectedRole === 'Admin' ? 'Customer' : 'Admin')}
                className="text-[11px] font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer flex-shrink-0 ml-2"
              >
                Switch to {selectedRole === 'Admin' ? 'Customer' : 'Admin'}
              </button>
            </div>

            {/* Social Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-[11px]">
                <span className="bg-white px-3 text-gray-400 font-normal">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-medium text-gray-700 transition cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-medium text-gray-700 transition cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4 text-gray-900 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Bottom Register Link */}
            <p className="text-center text-xs font-normal text-gray-600 mt-3.5">
              Don’t have an account?{' '}
              <Link
                to="/register"
                className="text-[#FF5A1F] hover:underline font-semibold transition ml-0.5"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
