import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderKanban, CheckSquare, FileText, Wrench, MessageSquare, ArrowRight } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Modal } from './Modal';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, projects, tasks, files, conversations } = useDashboard();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredProjects = query
    ? projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
    : projects.slice(0, 3);

  const filteredTasks = query
    ? tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
    : tasks.slice(0, 3);

  const filteredFiles = query
    ? files.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : files.slice(0, 3);

  const filteredConversations = query
    ? conversations.filter(c => c.participant.name.toLowerCase().includes(query.toLowerCase()) || c.lastMessage.toLowerCase().includes(query.toLowerCase()))
    : conversations.slice(0, 2);

  const handleNavigate = (path: string) => {
    setIsSearchModalOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <Modal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} maxWidth="lg">
      <div className="space-y-4">
        {/* Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-[#8A6848] dark:text-[#D4B483]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tasks, files, messages..."
            autoFocus
            className="w-full pl-11 pr-4 py-3 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-[#2E1F17] dark:text-[#F8F4EB] focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
          />
        </div>

        {/* Shortcut indicator */}
        <div className="flex items-center justify-between text-xs text-[#8A6848] dark:text-[#D4B483]/70 px-1">
          <span>{query ? `Results matching "${query}"` : 'Recent & Suggested Items'}</span>
          <span className="flex items-center gap-1 font-mono bg-[#EFE7D5] dark:bg-[#31231B] px-2 py-0.5 rounded">
            <kbd>ESC</kbd> to close
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6848] dark:text-[#D4B483] uppercase tracking-wider mb-2">
                <FolderKanban className="w-3.5 h-3.5" />
                Projects ({filteredProjects.length})
              </div>
              <div className="space-y-1">
                {filteredProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleNavigate(`/dashboard/projects/${p.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#EFE7D5]/60 dark:hover:bg-[#31231B] text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#2E1F17] dark:text-[#F8F4EB] group-hover:text-[#6B4E3A] dark:group-hover:text-[#D4B483]">
                        {p.name}
                      </div>
                      <div className="text-xs text-[#6B4E3A]/70 dark:text-[#D4B483]/60 line-clamp-1">
                        {p.serviceType} • {p.status}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A6848] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6848] dark:text-[#D4B483] uppercase tracking-wider mb-2">
                <CheckSquare className="w-3.5 h-3.5" />
                Tasks ({filteredTasks.length})
              </div>
              <div className="space-y-1">
                {filteredTasks.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleNavigate('/dashboard/tasks')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#EFE7D5]/60 dark:hover:bg-[#31231B] text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#2E1F17] dark:text-[#F8F4EB]">
                        {t.title}
                      </div>
                      <div className="text-xs text-[#6B4E3A]/70 dark:text-[#D4B483]/60">
                        Priority: {t.priority} • Due {t.dueDate}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A6848] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {filteredFiles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6848] dark:text-[#D4B483] uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                Files ({filteredFiles.length})
              </div>
              <div className="space-y-1">
                {filteredFiles.map(f => (
                  <button
                    key={f.id}
                    onClick={() => handleNavigate('/dashboard/files')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#EFE7D5]/60 dark:hover:bg-[#31231B] text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#2E1F17] dark:text-[#F8F4EB]">
                        {f.name}
                      </div>
                      <div className="text-xs text-[#6B4E3A]/70 dark:text-[#D4B483]/60">
                        {f.size} • Uploaded by {f.uploadedBy}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A6848] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {filteredConversations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6848] dark:text-[#D4B483] uppercase tracking-wider mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Messages ({filteredConversations.length})
              </div>
              <div className="space-y-1">
                {filteredConversations.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleNavigate('/dashboard/messages')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#EFE7D5]/60 dark:hover:bg-[#31231B] text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#2E1F17] dark:text-[#F8F4EB]">
                        {c.participant.name} ({c.participant.role})
                      </div>
                      <div className="text-xs text-[#6B4E3A]/70 dark:text-[#D4B483]/60 line-clamp-1">
                        "{c.lastMessage}"
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A6848] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && filteredTasks.length === 0 && filteredFiles.length === 0 && (
            <div className="py-8 text-center text-sm text-[#8A6848] dark:text-[#D4B483]/70">
              No matching results found for "{query}".
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
