import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Shield, Bell, Palette, Globe, Save, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [searchParams] = useSearchParams();

  const initialTab = (searchParams.get('tab') as any) || 'profile';
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'security' | 'notifications' | 'appearance'>(initialTab);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');
  const [company, setCompany] = useState(currentUser?.company || 'Aevona Enterprises');
  const [jobTitle, setJobTitle] = useState(currentUser?.jobTitle || 'VP of Strategy');
  const [location, setLocation] = useState(currentUser?.location || 'San Francisco, CA');

  // Account Preferences State
  const [language, setLanguage] = useState(currentUser?.preferences?.language || 'English (US)');
  const [timezone, setTimezone] = useState(currentUser?.preferences?.timezone || 'PST (UTC-8)');
  const [dateFormat, setDateFormat] = useState(currentUser?.preferences?.dateFormat || 'MM/DD/YYYY');

  // Notification Toggles
  const [notifs, setNotifs] = useState({
    emailNotifications: currentUser?.preferences?.emailNotifications ?? true,
    projectUpdates: currentUser?.preferences?.projectUpdates ?? true,
    taskNotifications: currentUser?.preferences?.taskNotifications ?? true,
    marketingEmails: currentUser?.preferences?.marketingEmails ?? false,
    securityAlerts: currentUser?.preferences?.securityAlerts ?? true
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      phone,
      company,
      jobTitle,
      location,
      preferences: {
        ...currentUser?.preferences,
        language,
        timezone,
        dateFormat,
        ...notifs,
        theme
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          System Settings & Preferences
        </h1>
        <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
          Manage your personal profile, security configuration, notifications, and theme settings.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      {/* Tabs Row */}
      <div className="flex items-center space-x-2 border-b border-[#D4B483]/30 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'account', label: 'Account', icon: Globe },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'appearance', label: 'Appearance', icon: Palette },
        ].map((t) => {
          const Icon = t.icon;
          const isCurrent = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isCurrent
                  ? 'bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B]'
                  : 'bg-white dark:bg-[#241812] text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5]'
              }`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-4 pb-6 border-b border-[#EFE7D5] dark:border-[#3D2C23]">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#D4B483]"
            />
            <div>
              <h3 className="text-base font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{name}</h3>
              <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]">{jobTitle} • {company}</p>
              <button type="button" className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:underline mt-1">
                Change Avatar Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#EFE7D5] dark:border-[#3D2C23]">
            <Button type="submit" variant="gold" size="md" icon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: ACCOUNT */}
      {activeTab === 'account' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Localization & Account Format</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="German">German</option>
                <option value="French">French</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
              >
                <option value="PST (UTC-8)">PST (UTC-8)</option>
                <option value="EST (UTC-5)">EST (UTC-5)</option>
                <option value="UTC">UTC</option>
                <option value="CET (UTC+1)">CET (UTC+1)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Date Format</label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#EFE7D5] dark:border-[#3D2C23]">
            <Button type="submit" variant="gold" size="md" icon={<Save className="w-4 h-4" />}>
              Save Preferences
            </Button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Security & Authentication</h3>

          <div className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Two-Factor Authentication (2FA)</div>
              <div className="text-[11px] text-[#6B4E3A] dark:text-[#D4B483]">Enforce TOTP authenticator app on login.</div>
            </div>
            <Button variant="outline" size="sm">Enable 2FA</Button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Active Login Sessions</h4>
            <div className="p-3.5 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Chrome on macOS (San Francisco, CA)</div>
                <div className="text-[10px] text-[#6B4E3A]">Current Session • IP: 192.168.1.45</div>
              </div>
              <span className="text-emerald-600 font-bold">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Notification Preferences</h3>

          {Object.entries(notifs).map(([key, val]) => (
            <label key={key} className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 cursor-pointer">
              <span className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <input
                type="checkbox"
                checked={val}
                onChange={(e) => setNotifs({ ...notifs, [key]: e.target.checked })}
                className="w-4 h-4 accent-[#6B4E3A] dark:accent-[#D4B483]"
              />
            </label>
          ))}
        </div>
      )}

      {/* TAB CONTENT: APPEARANCE */}
      {activeTab === 'appearance' && (
        <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Theme Identity Preference</h3>
            <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
              Select your UI theme. The Aevona dark theme preserves warm brown, gold, and cream identity tones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { id: 'light', title: 'Light Theme', desc: 'Cream background with warm coffee text' },
              { id: 'dark', title: 'Aevona Dark', desc: 'Deep warm dark brown with glowing gold' },
              { id: 'system', title: 'System Default', desc: 'Sync with browser preferences' }
            ].map((t) => (
              <div
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  theme === t.id
                    ? 'border-[#D4B483] bg-[#D4B483]/15 shadow-md'
                    : 'border-[#D4B483]/30 bg-[#F8F4EB]/50 dark:bg-[#1A110B] hover:border-[#D4B483]'
                }`}
              >
                <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{t.title}</div>
                <div className="text-[11px] text-[#6B4E3A]/80 dark:text-[#D4B483]/70 mt-1">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
