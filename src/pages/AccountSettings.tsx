import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Trash2, LogOut, Upload, Camera } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  const { user, logout, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: true
  });

  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploading(false);
        toast.success('Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/register');
    toast.success('Logged out successfully');
  };

  const validatePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return false;
    }
    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSaveChanges = async () => {
    if (formData.newPassword && !validatePasswordChange()) {
      return;
    }

    try {
      // Update user data
      await updateUser({
        ...user,
        username: formData.username,
        profileImage,
      });

      // If password change is requested
      if (formData.newPassword) {
        // Here you would typically call your password update API
        console.log('Password update would happen here');
      }

      toast.success('Settings saved successfully');
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error('Failed to save changes');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      try {
        // Here you would typically call your account deletion API
        toast.success('Account deleted successfully');
        logout();
        navigate('/register');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <Settings className="text-[#D0FD3E]" size={32} />
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Account Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <motion.section
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#D0FD3E]">Profile Information</h2>
            
            {/* Profile Picture */}
            <div className="mb-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10 mb-4">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="text-[#D0FD3E]" size={32} />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-[#D0FD3E] rounded-full text-[#0A1A2F] hover:opacity-90 transition-opacity"
                >
                  <Upload size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              {isUploading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-[#D0FD3E] border-t-transparent rounded-full"
                />
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Bell className="text-[#D0FD3E]" />
              <h2 className="text-xl font-semibold text-[#D0FD3E]">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Push Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Product Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.updates}
                    onChange={(e) => setNotifications({ ...notifications, updates: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security Settings */}
        <motion.section
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Lock className="text-[#D0FD3E]" />
              <h2 className="text-xl font-semibold text-[#D0FD3E]">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Trash2 className="text-red-500" />
              <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleDeleteAccount}
                className="w-full p-4 text-left text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <LogOut size={20} />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSettings;