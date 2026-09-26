import React, { useState } from 'react';
import { Bell, CheckCheck, FolderKanban, CheckSquare, CreditCard, HelpCircle, ShieldAlert } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDashboard();
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const filtered = notifications.filter(n => filter === 'All' || !n.read);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Project update': return <FolderKanban className="w-4 h-4 text-[#D4B483]" />;
      case 'Task assigned': return <CheckSquare className="w-4 h-4 text-[#A6815B]" />;
      case 'Payment update': return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'Support response': return <HelpCircle className="w-4 h-4 text-sky-600" />;
      default: return <ShieldAlert className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            Notification Center
          </h1>
          <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
            Real-time project updates, deployment notifications, and security alerts.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={markAllNotificationsRead} icon={<CheckCheck className="w-4 h-4" />}>
          Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#D4B483]/30 pb-3">
        {(['All', 'Unread'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filter === f
                ? 'bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B]'
                : 'bg-white dark:bg-[#241812] text-[#6B4E3A] dark:text-[#D4B483]'
            }`}
          >
            {f} Notifications
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl shadow-sm overflow-hidden divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-4 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
              n.read ? 'hover:bg-[#F8F4EB]/50 dark:hover:bg-[#31231B]' : 'bg-[#D4B483]/10 dark:bg-[#D4B483]/15'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] shrink-0 mt-0.5">
                {getCategoryIcon(n.category)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{n.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483]">
                    {n.category}
                  </span>
                </div>
                <p className="text-xs text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed">{n.message}</p>
                <div className="text-[10px] text-[#A6815B]">{n.timestamp}</div>
              </div>
            </div>

            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4B483] shrink-0 mt-2" title="Unread" />
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#6B4E3A]/60 italic">
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  );
};
