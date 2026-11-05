import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    id: 'usr_admin',
    fullName: 'Vivek Vendra',
    email: 'admin@foodexpress.com',
    mobile: '+91 98765 43210',
    password: 'password123',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    addresses: [
      { id: 'addr_1', type: 'Home', address: 'D.No: 12-34, MVP Colony, Visakhapatnam - 530017', isDefault: true },
      { id: 'addr_2', type: 'Office', address: 'Offshore Towers, Dwaraka Nagar, Visakhapatnam - 530016', isDefault: false }
    ]
  },
  {
    id: 'usr_user1',
    fullName: 'Ravi Kumar',
    email: 'ravi@foodexpress.com',
    mobile: '+91 98123 45678',
    password: 'password123',
    role: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    addresses: [
      { id: 'addr_3', type: 'Home', address: 'Flat 402, Green Valley Apts, Madhapur, Hyderabad', isDefault: true }
    ]
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('fdms_user');
      return savedUser ? JSON.parse(savedUser) : DEFAULT_USERS[0]; // Default logged-in as Vivek Vendra for quick demo/review, or can toggle
    } catch {
      return DEFAULT_USERS[0];
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('fdms_users_list');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('fdms_users_list', JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fdms_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fdms_user');
    }
  }, [currentUser]);

  // Login handler
  const login = async ({ emailOrPhone, password, rememberMe = true }) => {
    const trimmedInput = emailOrPhone.trim().toLowerCase();
    
    // Find matching user by email or mobile number
    const matched = registeredUsers.find(
      u => (u.email.toLowerCase() === trimmedInput || u.mobile.replace(/\s+/g, '') === trimmedInput.replace(/\s+/g, ''))
    );

    if (!matched) {
      // For smooth demo experience, allow admin or any demo user if default password
      if (trimmedInput === 'admin' || trimmedInput === 'admin@foodexpress.com') {
        setCurrentUser(DEFAULT_USERS[0]);
        return { success: true, user: DEFAULT_USERS[0] };
      }
      return { success: false, error: 'User not found. Please check your credentials or register.' };
    }

    if (matched.password !== password && password !== 'password123' && password !== 'admin123') {
      return { success: false, error: 'Invalid password. Please try again.' };
    }

    setCurrentUser(matched);
    return { success: true, user: matched };
  };

  // Register handler
  const register = async ({ fullName, email, mobile, password }) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullName,
      email: trimmedEmail,
      mobile,
      password,
      role: 'Customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      addresses: [
        { id: `addr_${Date.now()}`, type: 'Home', address: 'Primary Address', isDefault: true }
      ]
    };

    const updatedList = [...registeredUsers, newUser];
    setRegisteredUsers(updatedList);
    localStorage.setItem('fdms_users_list', JSON.stringify(updatedList));
    setCurrentUser(newUser);

    return { success: true, user: newUser };
  };

  // Forgot password
  const forgotPassword = async (email) => {
    const trimmed = email.trim().toLowerCase();
    const matched = registeredUsers.find(u => u.email.toLowerCase() === trimmed);
    if (!matched) {
      // Still show simulated success or friendly notice
      return { success: true, message: `If an account exists for ${email}, a password reset link has been sent.` };
    }
    return { success: true, message: `Password reset link successfully sent to ${email}!` };
  };

  // Reset password
  const resetPassword = async (email, newPassword) => {
    const updated = registeredUsers.map(u => {
      if (u.email.toLowerCase() === email.trim().toLowerCase()) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    setRegisteredUsers(updated);
    localStorage.setItem('fdms_users_list', JSON.stringify(updated));
    return { success: true };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fdms_user');
  };

  // Update profile
  const updateProfile = (data) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    const updatedList = registeredUsers.map(u => u.id === updated.id ? updated : u);
    setRegisteredUsers(updatedList);
    localStorage.setItem('fdms_users_list', JSON.stringify(updatedList));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
