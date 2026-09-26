import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  User as UserIcon,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronDown,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useDashboard } from '../../context/DashboardContext';

interface DashboardTopbarProps {
  onOpenMobileSidebar: () => void;
}

export const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ onOpenMobileSidebar }) => {
  const { currentUser, logout } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const { notifications, markNotificationRead, setIsSearchModalOpen } = useDashboard();
  const navigate = useNavigate();
  const location = useLocation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.read);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setNotifMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format breadcrumbs title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/dashboard/projects/')) return 'Project Details';
    if (path.startsWith('/dashboard/projects')) return 'Projects Management';
    if (path.startsWith('/dashboard/services')) return 'Services Directory';
    if (path.startsWith('/dashboard/analytics')) return 'Platform Analytics';
    if (path.startsWith('/dashboard/tasks')) return 'Task Management';
    if (path.startsWith('/dashboard/files')) return 'File Management';
    if (path.startsWith('/dashboard/messages')) return 'Team Messaging';
    if (path.startsWith('/dashboard/notifications')) return 'Notification Center';
    if (path.startsWith('/dashboard/team')) return 'Team & Access Management';
    if (path.startsWith('/dashboard/billing')) return 'Billing & Subscriptions';
    if (path.startsWith('/dashboard/settings')) return 'System Settings';
    if (path.startsWith('/dashboard/support')) return 'Help & Support';
    return 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 bg-[#F8F4EB]/90 dark:bg-[#1A110B]/90 backdrop-blur-md border-b border-[#D4B483]/30 dark:border-[#463226] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side: Mobile Toggle + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5] dark:hover:bg-[#31231B]"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            {getPageTitle()}
          </h2>
          <div className="text-[11px] text-[#6B4E3A]/70 dark:text-[#D4B483]/70 hidden sm:block">
            AEVONA SaaS Platform • Enterprise Workspace
          </div>
        </div>
      </div>

      {/* Right side: Search, Theme, Notifications, User Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search trigger button */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#EFE7D5]/70 dark:bg-[#261A13] border border-[#D4B483]/40 dark:border-[#463226] text-xs font-medium text-[#6B4E3A] dark:text-[#E2D3B7] hover:bg-[#EFE7D5] dark:hover:bg-[#31231B] transition-all"
        >
          <Search className="w-4 h-4 text-[#A6815B] dark:text-[#D4B483]" />
          <span className="hidden md:inline">Search...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#3D2C23] rounded text-[#6B4E3A] dark:text-[#D4B483] shadow-xs">
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          title="Toggle Theme"
          className="p-2.5 rounded-xl bg-[#EFE7D5]/70 dark:bg-[#261A13] border border-[#D4B483]/40 dark:border-[#463226] text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5] dark:hover:bg-[#31231B] transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative p-2.5 rounded-xl bg-[#EFE7D5]/70 dark:bg-[#261A13] border border-[#D4B483]/40 dark:border-[#463226] text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5] dark:hover:bg-[#31231B] transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4B483] text-[#2E1F17] text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-[#1A110B]">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] shadow-2xl p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE7D5] dark:border-[#3D2C23]">
                <h4 className="text-sm font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB]">
                  Notifications ({unreadNotifs.length} new)
                </h4>
                <Link
                  to="/dashboard/notifications"
                  onClick={() => setNotifMenuOpen(false)}
                  className="text-xs text-[#6B4E3A] dark:text-[#D4B483] font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="max-h-80 overflow-y-auto py-2 space-y-2">
                {notifications.length === 0 ? (
                  <div className="text-xs text-center py-6 text-[#6B4E3A]">No notifications</div>
                ) : (
                  notifications.slice(0, 4).map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.link) navigate(n.link);
                        setNotifMenuOpen(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer text-left transition-colors ${
                        n.read
                          ? 'hover:bg-[#F8F4EB] dark:hover:bg-[#2F2018]'
                          : 'bg-[#D4B483]/10 dark:bg-[#D4B483]/15 hover:bg-[#D4B483]/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{n.title}</span>
                        <span className="text-[10px] text-[#6B4E3A]/70 dark:text-[#D4B483]/60">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1 line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#EFE7D5]/70 dark:hover:bg-[#261A13] transition-colors"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={currentUser?.name}
              className="w-9 h-9 rounded-full border-2 border-[#D4B483] object-cover"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] leading-tight">{currentUser?.name}</div>
              <div className="text-[10px] text-[#6B4E3A] dark:text-[#D4B483]">{currentUser?.role || 'Owner'}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#6B4E3A] dark:text-[#D4B483] hidden sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] shadow-2xl p-2 z-50 animate-fade-in space-y-1">
              {/* Header inside user dropdown */}
              <div className="p-3 border-b border-[#EFE7D5] dark:border-[#3D2C23]">
                <p className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] truncate">{currentUser?.name}</p>
                <p className="text-[10px] text-[#6B4E3A] dark:text-[#D4B483] truncate">{currentUser?.email}</p>
              </div>

              <Link
                to="/dashboard/settings?tab=profile"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#2E1F17] dark:text-[#F8F4EB] hover:bg-[#F8F4EB] dark:hover:bg-[#31231B] transition-colors"
              >
                <UserIcon className="w-4 h-4 text-[#D4B483]" />
                <span>Profile</span>
              </Link>

              <Link
                to="/dashboard/settings"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#2E1F17] dark:text-[#F8F4EB] hover:bg-[#F8F4EB] dark:hover:bg-[#31231B] transition-colors"
              >
                <Settings className="w-4 h-4 text-[#D4B483]" />
                <span>Settings</span>
              </Link>

              <Link
                to="/dashboard/billing"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#2E1F17] dark:text-[#F8F4EB] hover:bg-[#F8F4EB] dark:hover:bg-[#31231B] transition-colors"
              >
                <CreditCard className="w-4 h-4 text-[#D4B483]" />
                <span>Billing</span>
              </Link>

              <Link
                to="/dashboard/support"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#2E1F17] dark:text-[#F8F4EB] hover:bg-[#F8F4EB] dark:hover:bg-[#31231B] transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#D4B483]" />
                <span>Help & Support</span>
              </Link>

              <div className="pt-1 border-t border-[#EFE7D5] dark:border-[#3D2C23]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
