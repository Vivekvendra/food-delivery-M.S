import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ChefHatIcon } from '../../components/common/Logo';
import DeliveryRiderIllustration from '../../components/common/DeliveryRiderIllustration';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      agreeTerms: true,
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    if (!data.agreeTerms) {
      toast.warning('Please agree to the Terms & Conditions to proceed.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerUser({
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      });

      if (res.success) {
        toast.success(`Account created successfully! Welcome, ${res.user.fullName}!`, {
          position: "top-right",
          autoClose: 2500,
        });
        navigate('/dashboard', { replace: true });
      } else {
        toast.error(res.error || 'Registration failed. Please try again.');
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:h-screen w-full flex items-center justify-center bg-[#F3F4F6] p-2 sm:p-4 overflow-y-auto md:overflow-hidden select-none">
      {/* Main Container Card matching the screenshot */}
      <div className="w-full max-w-[860px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200/80 md:h-[560px] my-auto">
        
        {/* Left Side: Delivery rider illustration */}
        <div className="md:w-[46%] bg-gradient-to-br from-orange-50/70 via-amber-50/30 to-white p-6 sm:p-7 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative overflow-hidden">
          <div className="w-full flex flex-col items-center justify-center my-auto">
            <DeliveryRiderIllustration className="w-full max-w-[280px] sm:max-w-[320px]" />
            <div className="text-center mt-3">
              <h3 className="text-base font-bold text-slate-800">
                Superfast Delivery at Your Doorstep
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xs mx-auto">
                Join thousands of food lovers enjoying meals from top-rated restaurants.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:w-[54%] p-6 sm:p-7 flex flex-col justify-center bg-white">
          {/* Top Brand & Title */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center mb-1">
              <ChefHatIcon className="w-8 h-8" color="#f97316" />
            </div>
            <div className="text-base font-bold text-slate-900 tracking-tight leading-tight">
              Food<span className="text-orange-500">Express</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Create Your Account
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Join FoodExpress and start ordering
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
            {/* Full Name */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'At least 2 characters',
                    },
                  })}
                  className={`w-full pl-9 pr-3 py-1.5 sm:py-2 bg-white rounded-lg border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition shadow-2xs ${
                    errors.fullName ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-[10px] mt-0.5 pl-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Valid email required',
                    },
                  })}
                  className={`w-full pl-9 pr-3 py-1.5 sm:py-2 bg-white rounded-lg border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition shadow-2xs ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-0.5 pl-1">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  {...register('mobile', {
                    required: 'Mobile number is required',
                  })}
                  className={`w-full pl-9 pr-3 py-1.5 sm:py-2 bg-white rounded-lg border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition shadow-2xs ${
                    errors.mobile ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-[10px] mt-0.5 pl-1">{errors.mobile.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'At least 6 characters',
                    },
                  })}
                  className={`w-full pl-9 pr-8 py-1.5 sm:py-2 bg-white rounded-lg border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition shadow-2xs ${
                    errors.password ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-0.5 pl-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  className={`w-full pl-9 pr-8 py-1.5 sm:py-2 bg-white rounded-lg border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition shadow-2xs ${
                    errors.confirmPassword ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-[10px] mt-0.5 pl-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="pt-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  {...register('agreeTerms', {
                    required: 'Please agree to terms',
                  })}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-orange-500 accent-orange-500 cursor-pointer"
                />
                <span className="text-[11px] sm:text-xs">
                  I agree to the{' '}
                  <span className="text-orange-500 font-semibold hover:underline">
                    Terms & Conditions
                  </span>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-[10px] mt-0.5 pl-1">{errors.agreeTerms.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold rounded-lg shadow-sm text-xs sm:text-sm transition cursor-pointer mt-1"
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Already have an account link */}
          <p className="text-center text-xs text-slate-500 mt-3.5 font-medium">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-600 font-bold transition"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
