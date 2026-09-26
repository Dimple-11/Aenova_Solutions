import React, { useState } from 'react';
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Filter,
  UserCheck
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ProjectTask } from '../../types';

export const TasksPage: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete } = useDashboard();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');
  const [assigneeName, setAssigneeName] = useState('Alex Morgan');
  const [dueDate, setDueDate] = useState('2024-10-15');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTask({
      title,
      description: description || 'Task deliverable item',
      status: 'To Do',
      priority,
      assignee: {
        name: assigneeName,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        email: 'alex@aevona.com'
      },
      dueDate
    });
    setTitle('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  const kanbanColumns: ProjectTask['status'][] = ['To Do', 'In Progress', 'Review', 'Completed'];

  return (
    <div className="space-y-6">
      {/* Title & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            Task Management
          </h1>
          <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
            Track agile deliverables, technical assignments, and project tasks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-white dark:bg-[#241812] border border-[#D4B483]/40 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B]'
                  : 'text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B]'
                  : 'text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5]'
              }`}
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>

          <Button variant="gold" size="md" onClick={() => setIsCreateModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Create Task
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#241812] p-3.5 rounded-2xl border border-[#D4B483]/30">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#A6815B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-4 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/40 rounded-xl text-xs text-[#2E1F17] dark:text-[#F8F4EB]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-[#6B4E3A]">
          <span>Priority Filter:</span>
          {['All', 'Low', 'Medium', 'High', 'Urgent'].map((pr) => (
            <button
              key={pr}
              onClick={() => setPriorityFilter(pr)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                priorityFilter === pr
                  ? 'bg-[#D4B483] text-[#2E1F17]'
                  : 'bg-[#F8F4EB] dark:bg-[#1A110B] text-[#6B4E3A] dark:text-[#D4B483]'
              }`}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
          {kanbanColumns.map((colStatus) => {
            const colTasks = filteredTasks.filter(t => t.status === colStatus);
            return (
              <div
                key={colStatus}
                className="bg-[#F8F4EB]/70 dark:bg-[#1E130D] border border-[#D4B483]/30 rounded-3xl p-4 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D4B483]/30">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={colStatus} />
                    <span className="text-xs font-bold text-[#6B4E3A] dark:text-[#D4B483]">
                      ({colTasks.length})
                    </span>
                  </div>
                </div>

                {/* Task Cards Column */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${task.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                          {task.priority} Priority
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] leading-snug">
                          {task.title}
                        </h4>
                        <p className="text-[11px] text-[#6B4E3A]/80 dark:text-[#D4B483]/70 mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#EFE7D5] dark:border-[#3D2C23]">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#6B4E3A] dark:text-[#D4B483]">
                          <Clock className="w-3 h-3" />
                          <span>Due {task.dueDate}</span>
                        </div>
                        <img
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          title={task.assignee.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#D4B483]"
                        />
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="py-8 text-center text-xs text-[#6B4E3A]/60 italic">
                      No tasks in {colStatus}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl shadow-sm overflow-hidden divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
          {filteredTasks.map((t) => (
            <div key={t.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#F8F4EB]/50 dark:hover:bg-[#31231B]/50 transition-colors">
              <div className="flex items-center gap-3">
                <button onClick={() => toggleTaskComplete(t.id)}>
                  <CheckCircle2 className={`w-5 h-5 ${t.status === 'Completed' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`} />
                </button>
                <div>
                  <div className={`text-xs font-bold ${t.status === 'Completed' ? 'line-through text-gray-400' : 'text-[#2E1F17] dark:text-[#F8F4EB]'}`}>
                    {t.title}
                  </div>
                  <div className="text-[11px] text-[#6B4E3A] dark:text-[#D4B483]/70">{t.description}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-[#6B4E3A]">Due {t.dueDate}</span>
                <StatusBadge status={t.status} />
                <button onClick={() => deleteTask(t.id)} className="text-rose-500 hover:text-rose-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE TASK MODAL */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Task">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Optimize Database Indexes"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task instructions and details..."
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
                Assignee
              </label>
              <select
                value={assigneeName}
                onChange={(e) => setAssigneeName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
              >
                <option value="Alex Morgan">Alex Morgan</option>
                <option value="Sophia Bennett">Sophia Bennett</option>
                <option value="Daniel Carter">Daniel Carter</option>
                <option value="Olivia Reynolds">Olivia Reynolds</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
