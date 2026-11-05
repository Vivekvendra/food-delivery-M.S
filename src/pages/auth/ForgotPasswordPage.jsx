import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ChefHatIcon } from '../../components/common/Logo';
import ForgotPasswordIllustration from '../../components/common/ForgotPasswordIllustration';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data.email);
      setSentEmail(data.email);
      setIsSent(true);
      toast.success(res.message || 'Password reset link sent!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdatePassword = async (data) => {
    setIsLoading(true);
    try {
      await resetPassword(sentEmail, data.newPassword);
      toast.success('Password updated successfully! You can now log in.', {
        position: 'top-right',
        autoClose: 2500,
      });
      navigate('/login');
    } catch {
      toast.error('Could not update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F3F4F6] p-3 sm:p-4 overflow-hidden select-none">
      {/* Centered Card matching the screenshot */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200/80 flex flex-col items-center text-center my-auto">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-1.5 mb-3">
          <ChefHatIcon className="w-7 h-7" color="#f97316" />
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Food<span className="text-orange-500">Express</span>
          </span>
        </div>

        {/* Envelope & Padlock Illustration */}
        <div className="mb-2">
          <ForgotPasswordIllustration className="w-28 h-28" />
        </div>

        {/* Heading & Subtitle */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
          Forgot Password?
        </h2>
        <p className="text-xs text-slate-400 font-medium max-w-[280px] mb-5">
          No worries! Enter your email and we'll send you a reset link.
        </p>

        {!isSent ? (
          /* Form for sending reset email */
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
            <div>
              <div className="relative text-left">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Valid email required',
                    },
                  })}
                  className={`w-full pl-9 pr-3 py-2 bg-white rounded-lg border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition shadow-2xs ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-0.5 pl-1 font-medium text-left">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Send Reset Link Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold rounded-lg shadow-sm text-xs sm:text-sm transition cursor-pointer"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          /* Simulated interactive reset view */
          <div className="w-full text-left bg-orange-50/70 p-3.5 rounded-xl border border-orange-200 mb-3">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">Reset link sent to {sentEmail}</span>
            </div>
            <form onSubmit={handleResetSubmit(onUpdatePassword)} className="space-y-2 mt-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  {...registerReset('newPassword', {
                    required: 'New password required',
                    minLength: { value: 6, message: 'Min 6 characters' },
                  })}
                  className="w-full pl-8 pr-8 py-1.5 bg-white rounded-md border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400"
                >
                  {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {resetErrors.newPassword && (
                <p className="text-red-500 text-[10px]">{resetErrors.newPassword.message}</p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-1.5 bg-orange-500 text-white rounded-md font-bold text-xs hover:bg-orange-600 transition"
              >
                Update & Login
              </button>
            </form>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="mt-4">
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 font-semibold text-xs transition"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
