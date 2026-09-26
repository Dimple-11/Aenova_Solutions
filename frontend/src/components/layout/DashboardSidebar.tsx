import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  BarChart3,
  CheckSquare,
  FileText,
  MessageSquare,
  Bell,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  User as UserIcon,
  LogOut,
  X
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile
}) => {
  const { logout, currentUser } = useAuth();
  const { notifications } = useDashboard();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Projects', path: '/dashboard/projects', icon: FolderKanban },
    { name: 'Services', path: '/dashboard/services', icon: Wrench },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Tasks', path: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Files', path: '/dashboard/files', icon: FileText },
    { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: unreadCount },
    { name: 'Team', path: '/dashboard/team', icon: Users },
    { name: 'Billing', path: '/dashboard/billing', icon: CreditCard },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#2E1F17] dark:bg-[#1E130D] text-[#F8F4EB] border-r border-[#6B4E3A]/40 w-64 shrink-0 transition-all">
      {/* Header / Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-[#6B4E3A]/40 shrink-0">
        <Logo variant="dark" size="md" to="/dashboard" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-[#E2D3B7] hover:bg-[#473224]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4B483] px-3 mb-2 font-serif">
          Main Menu
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#D4B483] text-[#2E1F17] font-semibold shadow-md shadow-[#D4B483]/20'
                    : 'text-[#E2D3B7]/80 hover:bg-[#473224]/70 hover:text-[#F8F4EB]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#2E1F17]' : 'text-[#D4B483]'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#2E1F17] text-[#D4B483]'
                          : 'bg-[#D4B483] text-[#2E1F17]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#6B4E3A]/40 space-y-1 bg-[#241812] shrink-0">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4B483] px-3 mb-1 font-serif">
          Account & Support
        </div>

        <NavLink
          to="/dashboard/support"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive ? 'bg-[#473224] text-[#D4B483]' : 'text-[#E2D3B7]/80 hover:bg-[#473224]/50 hover:text-[#F8F4EB]'
            }`
          }
        >
          <HelpCircle className="w-4 h-4 text-[#D4B483]" />
          <span>Help & Support</span>
        </NavLink>

        <NavLink
          to="/dashboard/settings?tab=profile"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive ? 'bg-[#473224] text-[#D4B483]' : 'text-[#E2D3B7]/80 hover:bg-[#473224]/50 hover:text-[#F8F4EB]'
            }`
          }
        >
          <UserIcon className="w-4 h-4 text-[#D4B483]" />
          <span>User Profile</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition-all text-left mt-2"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Logout</span>
        </button>

        {/* User Card */}
        <div className="pt-3 mt-2 border-t border-[#6B4E3A]/30 flex items-center gap-3 px-2">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={currentUser?.name}
            className="w-8 h-8 rounded-full border border-[#D4B483]/50 object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#F8F4EB] truncate">{currentUser?.name}</div>
            <div className="text-[10px] text-[#D4B483] truncate">{currentUser?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
