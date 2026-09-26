import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Clock,
  CheckSquare,
  FileText,
  Activity,
  Plus,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { StatusBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, tasks, files, addTask, toggleTaskComplete, addFile } = useDashboard();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Tasks' | 'Files' | 'Activity'>('Overview');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);

  // Form states
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');

  const [fileName, setFileName] = useState('');

  const project = projects.find(p => p.id === id) || projects[0];
  const projectTasks = tasks.filter(t => t.projectId === project.id || !t.projectId);
  const projectFiles = files.filter(f => f.projectId === project.id || !f.projectId);

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    addTask({
      projectId: project.id,
      title: taskTitle,
      description: 'Project milestone deliverable task',
      status: 'In Progress',
      priority: taskPriority,
      assignee: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        email: 'alex@aevona.com'
      },
      dueDate: '2024-11-01'
    });
    setTaskTitle('');
    setIsAddTaskModalOpen(false);
  };

  const handleAddFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    addFile({
      projectId: project.id,
      name: fileName,
      size: '3.6 MB',
      type: 'pdf',
      category: 'Document',
      uploadedBy: 'Alex Morgan'
    });
    setFileName('');
    setIsAddFileModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <div>
        <Link
          to="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:underline mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects Directory
        </Link>
      </div>

      {/* Project Header Card */}
      <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 dark:border-[#463226] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6815B] dark:text-[#D4B483] px-2.5 py-0.5 rounded-full bg-[#D4B483]/15">
                {project.serviceType}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
              {project.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B4E3A]/80 dark:text-[#D4B483]/80 mt-1 max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddFileModalOpen(true)} icon={<FileText className="w-4 h-4" />}>
              Add File
            </Button>
            <Button variant="gold" size="sm" onClick={() => setIsAddTaskModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
              Add Task
            </Button>
          </div>
        </div>

        {/* Metrics summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6B4E3A] dark:text-[#D4B483]">Start Date</div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-0.5">{project.startDate}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6B4E3A] dark:text-[#D4B483]">Deadline</div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-0.5">{project.deadline}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6B4E3A] dark:text-[#D4B483]">Budget</div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-0.5">{project.budget || '$45,000'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6B4E3A] dark:text-[#D4B483]">Priority</div>
            <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-0.5">{project.priority}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#6B4E3A] dark:text-[#D4B483]">Overall Milestone Completion</span>
            <span className="text-[#2E1F17] dark:text-[#F8F4EB] font-bold">{project.progress}%</span>
          </div>
          <div className="h-3 w-full bg-[#EFE7D5] dark:bg-[#31231B] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4B483] via-[#A6815B] to-[#6B4E3A] rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="border-b border-[#D4B483]/30 flex items-center space-x-2">
        {(['Overview', 'Tasks', 'Files', 'Activity'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-[#6B4E3A] text-[#6B4E3A] dark:border-[#D4B483] dark:text-[#D4B483]'
                : 'border-transparent text-[#2E1F17]/60 dark:text-[#F8F4EB]/60 hover:text-[#6B4E3A] dark:hover:text-[#D4B483]'
            }`}
          >
            {tab} {tab === 'Tasks' ? `(${projectTasks.length})` : tab === 'Files' ? `(${projectFiles.length})` : ''}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-2xl p-6 space-y-3 shadow-xs">
                <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                  Project Summary & Goals
                </h3>
                <p className="text-xs text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed">
                  This project delivers high-performance digital infrastructure for {project.name}. Our engineering SLA covers architecture design, automated staging environments, security hardening, and deployment.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20">
                    <div className="font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Infrastructure Cluster</div>
                    <div className="text-[11px] text-[#6B4E3A]">Multi-region AWS cluster (us-east-1, eu-west-1)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20">
                    <div className="font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Security Level</div>
                    <div className="text-[11px] text-[#6B4E3A]">SOC2 Type II & End-to-End Encryption</div>
                  </div>
                </div>
              </div>

              {/* Tasks preview inside overview */}
              <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-2xl p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                    Active Project Tasks
                  </h3>
                  <button onClick={() => setActiveTab('Tasks')} className="text-xs text-[#6B4E3A] font-semibold hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {projectTasks.slice(0, 3).map(t => (
                    <div key={t.id} className="p-3 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleTaskComplete(t.id)}>
                          <CheckCircle2 className={`w-4 h-4 ${t.status === 'Completed' ? 'text-emerald-600' : 'text-gray-400'}`} />
                        </button>
                        <span className={`text-xs font-semibold ${t.status === 'Completed' ? 'line-through text-gray-400' : 'text-[#2E1F17] dark:text-[#F8F4EB]'}`}>
                          {t.title}
                        </span>
                      </div>
                      <StatusBadge status={t.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Assigned Team Members */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                  Assigned Team
                </h3>
                <div className="space-y-3">
                  {project.teamMembers.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B]">
                      <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{m.name}</div>
                        <div className="text-[10px] text-[#6B4E3A] dark:text-[#D4B483]">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'Tasks' && (
          <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                Tasks & Milestones
              </h3>
              <Button variant="gold" size="sm" onClick={() => setIsAddTaskModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                Add Task
              </Button>
            </div>

            <div className="space-y-2">
              {projectTasks.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleTaskComplete(t.id)} className="shrink-0">
                      <CheckCircle2 className={`w-5 h-5 ${t.status === 'Completed' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`} />
                    </button>
                    <div>
                      <div className={`text-sm font-bold ${t.status === 'Completed' ? 'line-through text-gray-400' : 'text-[#2E1F17] dark:text-[#F8F4EB]'}`}>
                        {t.title}
                      </div>
                      <div className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/70">{t.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#6B4E3A]">Due {t.dueDate}</span>
                    <StatusBadge status={t.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FILES TAB */}
        {activeTab === 'Files' && (
          <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                Project Deliverables & Files
              </h3>
              <Button variant="gold" size="sm" onClick={() => setIsAddFileModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                Upload File
              </Button>
            </div>

            <div className="divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
              {projectFiles.map(f => (
                <div key={f.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#D4B483]" />
                    <div>
                      <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{f.name}</div>
                      <div className="text-[10px] text-[#6B4E3A]">{f.size} • Uploaded by {f.uploadedBy} on {f.uploadedAt}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'Activity' && (
          <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
              Recent Activity Stream
            </h3>
            <div className="space-y-4 relative pl-4 border-l-2 border-[#D4B483]/40">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-[#D4B483]" />
                <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Sophia Bennett updated Terraform multi-region subnets</div>
                <div className="text-[10px] text-[#6B4E3A] dark:text-[#D4B483]/60">2 hours ago</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-[#A6815B]" />
                <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Alex Morgan added milestone task "Implement OAuth 2.0 Callback"</div>
                <div className="text-[10px] text-[#6B4E3A] dark:text-[#D4B483]/60">1 day ago</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600" />
                <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Daniel Carter completed penetration security audit</div>
                <div className="text-[10px] text-[#6B4E3A] dark:text-[#D4B483]/60">2 days ago</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD TASK MODAL */}
      <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} title="Add Task to Project">
        <form onSubmit={handleAddTaskSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Audit Redis Cache Strategy"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Priority
            </label>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddTaskModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Save Task</Button>
          </div>
        </form>
      </Modal>

      {/* ADD FILE MODAL */}
      <Modal isOpen={isAddFileModalOpen} onClose={() => setIsAddFileModalOpen(false)} title="Upload Project File">
        <form onSubmit={handleAddFileSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              File Title *
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. Architecture_Whitepaper.pdf"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddFileModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Upload File</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
