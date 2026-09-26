import React, { useState } from 'react';
import { Users, UserPlus, Shield, Trash2, Mail, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { TeamMember } from '../../types';

export const TeamPage: React.FC = () => {
  const { teamMembers, inviteTeamMember, updateTeamMemberRole, removeTeamMember } = useDashboard();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('Member');
  const [department, setDepartment] = useState('Frontend Engineering');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    inviteTeamMember(name, email, role, department);
    setName('');
    setEmail('');
    setIsInviteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            Team & Access Control
          </h1>
          <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
            Manage organization members, assign role permissions, and send workspace invitations.
          </p>
        </div>

        <Button variant="gold" size="md" onClick={() => setIsInviteModalOpen(true)} icon={<UserPlus className="w-4 h-4" />}>
          Invite Team Member
        </Button>
      </div>

      {/* Team Members Grid */}
      <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl shadow-sm overflow-hidden">
        <div className="divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F4EB]/50 dark:hover:bg-[#31231B]/50 transition-colors">
              <div className="flex items-center gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#D4B483]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{member.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${member.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {member.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80">{member.email}</div>
                  <div className="text-[10px] text-[#A6815B] mt-0.5">{member.department} • Joined {member.joinedDate}</div>
                </div>
              </div>

              {/* Role Select & Actions */}
              <div className="flex items-center gap-3">
                <select
                  value={member.role}
                  disabled={member.role === 'Owner'}
                  onChange={(e) => updateTeamMemberRole(member.id, e.target.value as any)}
                  className="px-3 py-1.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/40 rounded-xl text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB]"
                >
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Member">Member</option>
                </select>

                {member.role !== 'Owner' && (
                  <button
                    onClick={() => removeTeamMember(member.id)}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Remove Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INVITE MEMBER MODAL */}
      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite New Team Member">
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Marcus Vance"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="marcus@company.com"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
                Access Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Member">Member</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Engineering"
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Send Invitation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
