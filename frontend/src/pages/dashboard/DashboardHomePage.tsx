import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  CheckSquare,
  Activity,
  Plus,
  Wrench,
  Upload,
  HelpCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const DashboardHomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { projects, tasks, files, notifications, addProject, addTask, addFile } = useDashboard();
  const navigate = useNavigate();

  // Modals for Quick Actions
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);

  // Form states
  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjService, setNewProjService] = useState('Cloud Infrastructure');
  const [newProjPriority, setNewProjPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');

  const [fileName, setFileName] = useState('');

  // Metric stats
  const activeProjectsCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Planning').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'Completed').length;
  const totalFilesCount = files.length;

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName) return;
    addProject({
      name: newProjName,
      description: newProjDesc || 'Custom enterprise project',
      serviceType: newProjService,
      status: 'In Progress',
      priority: newProjPriority,
      startDate: new Date().toISOString().split('T')[0],
      deadline: '2024-12-31',
      budget: '$25,000'
    });
    setNewProjName('');
    setNewProjDesc('');
    setIsCreateProjectOpen(false);
  };

  const handleUploadFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    addFile({
      name: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
      size: '2.4 MB',
      type: 'pdf',
      category: 'Document',
      uploadedBy: currentUser?.name || 'Alex Morgan'
    });
    setFileName('');
    setIsUploadFileOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#2E1F17] via-[#473224] to-[#2E1F17] text-[#F8F4EB] p-6 sm:p-8 rounded-3xl shadow-xl border border-[#D4B483]/30 relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
            Executive Summary
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">
            Good morning, {currentUser?.name || 'Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-[#E2D3B7]/80">
            Here's what's happening with your active projects and cloud infrastructure today.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Button variant="gold" size="sm" onClick={() => setIsCreateProjectOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Create Project
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 dark:border-[#463226] shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-[#6B4E3A] dark:text-[#D4B483]/80">Active Projects</div>
            <div className="text-2xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB] mt-1">{activeProjectsCount}</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 2 milestones this week
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D4B483]/20 border border-[#D4B483]/40 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 dark:border-[#463226] shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-[#6B4E3A] dark:text-[#D4B483]/80">Completed Projects</div>
            <div className="text-2xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB] mt-1">{completedProjectsCount}</div>
            <div className="text-[11px] text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">100% SLA Guarantee</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 dark:border-[#463226] shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-[#6B4E3A] dark:text-[#D4B483]/80">Pending Tasks</div>
            <div className="text-2xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB] mt-1">{pendingTasksCount}</div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1">3 due this week</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 dark:border-[#463226] shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-[#6B4E3A] dark:text-[#D4B483]/80">Total Files Storage</div>
            <div className="text-2xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB] mt-1">{totalFilesCount} Files</div>
            <div className="text-[11px] text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">39.1 MB Used / 100 GB</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B4E3A] dark:text-[#D4B483] mb-3 font-serif">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setIsCreateProjectOpen(true)}
            className="p-4 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] hover:border-[#D4B483] transition-all text-left group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Create Project</div>
            <div className="text-[10px] text-[#6B4E3A]/70 dark:text-[#D4B483]/60 mt-0.5">Start new initiative</div>
          </button>

          <button
            onClick={() => navigate('/dashboard/services')}
            className="p-4 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] hover:border-[#D4B483] transition-all text-left group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Request Service</div>
            <div className="text-[10px] text-[#6B4E3A]/70 dark:text-[#D4B483]/60 mt-0.5">Browse technical catalog</div>
          </button>

          <button
            onClick={() => setIsUploadFileOpen(true)}
            className="p-4 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] hover:border-[#D4B483] transition-all text-left group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Upload File</div>
            <div className="text-[10px] text-[#6B4E3A]/70 dark:text-[#D4B483]/60 mt-0.5">Share assets & docs</div>
          </button>

          <button
            onClick={() => navigate('/dashboard/support')}
            className="p-4 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] hover:border-[#D4B483] transition-all text-left group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Contact Support</div>
            <div className="text-[10px] text-[#6B4E3A]/70 dark:text-[#D4B483]/60 mt-0.5">Create ticket or query</div>
          </button>
        </div>
      </div>

      {/* Grid of Main Sections: Recent Projects + Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
              Recent Projects
            </h3>
            <Link to="/dashboard/projects" className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 dark:border-[#463226] rounded-2xl shadow-sm overflow-hidden divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F4EB]/50 dark:hover:bg-[#31231B]/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link to={`/dashboard/projects/${p.id}`} className="text-sm font-bold text-[#2E1F17] dark:text-[#F8F4EB] hover:text-[#6B4E3A] dark:hover:text-[#D4B483]">
                      {p.name}
                    </Link>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="text-xs text-[#6B4E3A]/80 dark:text-[#D4B483]/70 line-clamp-1">
                    {p.description}
                  </p>
                  <div className="text-[11px] text-[#A6815B] dark:text-[#D4B483]/60 flex items-center gap-3 pt-1">
                    <span>Deadline: {p.deadline}</span>
                    <span>•</span>
                    <span>Budget: {p.budget}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="sm:w-36 shrink-0 space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#6B4E3A] dark:text-[#D4B483]">Progress</span>
                    <span className="text-[#2E1F17] dark:text-[#F8F4EB]">{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#EFE7D5] dark:bg-[#31231B] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D4B483] to-[#6B4E3A] rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Upcoming Tasks & Activity */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
              Upcoming Tasks
            </h3>
            <Link to="/dashboard/tasks" className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:underline">
              View All
            </Link>
          </div>

          <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 dark:border-[#463226] rounded-2xl p-4 shadow-sm space-y-3">
            {tasks.slice(0, 4).map((t) => (
              <div key={t.id} className="p-3 rounded-xl bg-[#F8F4EB]/70 dark:bg-[#1A110B] border border-[#D4B483]/20 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] line-clamp-1">{t.title}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${t.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                    {t.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6B4E3A] dark:text-[#D4B483]/70">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Due {t.dueDate}
                  </span>
                  <span>{t.assignee.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CREATE PROJECT MODAL */}
      <Modal isOpen={isCreateProjectOpen} onClose={() => setIsCreateProjectOpen(false)} title="Create New Enterprise Project">
        <form onSubmit={handleCreateProjectSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={newProjName}
              onChange={(e) => setNewProjName(e.target.value)}
              placeholder="e.g. AI-Powered Customer Support Portal"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-sm text-[#2E1F17] dark:text-[#F8F4EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={newProjDesc}
              onChange={(e) => setNewProjDesc(e.target.value)}
              placeholder="Detail the scope and deliverables..."
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-sm text-[#2E1F17] dark:text-[#F8F4EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
                Service Category
              </label>
              <select
                value={newProjService}
                onChange={(e) => setNewProjService(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-xs text-[#2E1F17] dark:text-[#F8F4EB]"
              >
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Web Application">Web Application</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Data Pipeline">Data Pipeline</option>
                <option value="AI & Automation">AI & Automation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
                Priority
              </label>
              <select
                value={newProjPriority}
                onChange={(e) => setNewProjPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-xs text-[#2E1F17] dark:text-[#F8F4EB]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreateProjectOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm">
              Launch Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* UPLOAD FILE MODAL */}
      <Modal isOpen={isUploadFileOpen} onClose={() => setIsUploadFileOpen(false)} title="Upload Document or File">
        <form onSubmit={handleUploadFileSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              File Name / Title *
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. Q4_Cloud_Architecture_Specs.pdf"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-sm text-[#2E1F17] dark:text-[#F8F4EB]"
            />
          </div>

          <div className="border-2 border-dashed border-[#D4B483]/50 dark:border-[#463226] rounded-2xl p-8 text-center bg-[#F8F4EB]/50 dark:bg-[#1A110B]">
            <Upload className="w-8 h-8 text-[#D4B483] mx-auto mb-2" />
            <div className="text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB]">
              Drag & drop files here or click to browse
            </div>
            <div className="text-[10px] text-[#6B4E3A]/70 dark:text-[#D4B483]/60 mt-1">
              Supports PDF, DOCX, FIG, ZIP up to 50 MB
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsUploadFileOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm">
              Confirm Upload
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
