import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const CareersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const openRoles = [
    { id: '1', title: 'Senior Cloud & DevOps Architect', dept: 'Cloud Engineering', location: 'San Francisco, CA / Remote', type: 'Full-Time' },
    { id: '2', title: 'Lead Full Stack Engineer (React + Node)', dept: 'Software Development', location: 'San Francisco, CA / Hybrid', type: 'Full-Time' },
    { id: '3', title: 'Senior UI/UX Designer', dept: 'Design & Excellence', location: 'Remote', type: 'Full-Time' },
    { id: '4', title: 'Data Pipeline Specialist (PostgreSQL / ETL)', dept: 'Data Solutions', location: 'Remote', type: 'Full-Time' },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedRole(null);
    }, 2000);
  };

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
          Join Aevona Solution
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Build Your Future With Us.
        </h1>
        <p className="text-base text-[#6B4E3A] dark:text-[#D4B483]/80 max-w-2xl mx-auto">
          We are a team of innovators, problem solvers, and creators building technology for a brighter tomorrow.
        </p>
      </section>

      {/* Open Roles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Open Positions</h2>

        <div className="space-y-4">
          {openRoles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D4B483] transition-all"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-[#A6815B]">{role.dept}</span>
                <h3 className="text-lg font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-0.5">{role.title}</h3>
                <div className="flex items-center gap-4 text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {role.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {role.type}</span>
                </div>
              </div>

              <Button variant="gold" size="sm" onClick={() => setSelectedRole(role.title)}>
                Apply Now
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* APPLY MODAL */}
      <Modal isOpen={!!selectedRole} onClose={() => setSelectedRole(null)} title={`Apply for ${selectedRole}`}>
        {applied ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <div className="text-base font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Application Submitted!</div>
            <p className="text-xs text-[#6B4E3A]">Our talent team will review your application within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Full Name *</label>
              <input type="text" required placeholder="Alex Morgan" className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Email Address *</label>
              <input type="email" required placeholder="alex@domain.com" className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">LinkedIn / Portfolio Link</label>
              <input type="url" placeholder="https://linkedin.com/in/..." className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedRole(null)}>Cancel</Button>
              <Button type="submit" variant="gold" size="sm">Submit Application</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
