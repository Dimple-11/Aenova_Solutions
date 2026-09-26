import React, { createContext, useContext, useState } from 'react';
import {
  Project,
  ProjectTask,
  ProjectFile,
  ServiceRequest,
  NotificationItem,
  Conversation,
  MessageItem,
  TeamMember,
  SupportTicket,
  BillingPlan
} from '../types';
import {
  initialProjectsMock,
  initialTasksMock,
  initialFilesMock,
  activeServiceRequestsMock,
  notificationsMock,
  conversationsMock,
  messagesMock,
  teamMembersMock,
  billingPlansMock,
  supportTicketsMock
} from '../data/mockData';

interface DashboardContextType {
  projects: Project[];
  tasks: ProjectTask[];
  files: ProjectFile[];
  serviceRequests: ServiceRequest[];
  notifications: NotificationItem[];
  conversations: Conversation[];
  messages: Record<string, MessageItem[]>;
  teamMembers: TeamMember[];
  billingPlans: BillingPlan[];
  supportTickets: SupportTicket[];
  
  // Handlers
  addProject: (project: Omit<Project, 'id' | 'progress' | 'tasksCount' | 'teamMembers'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addTask: (task: Omit<ProjectTask, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<ProjectTask>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;

  addFile: (file: Omit<ProjectFile, 'id' | 'uploadedAt'>) => void;
  deleteFile: (id: string) => void;

  requestService: (serviceId: string, title: string, category: string, budget: string, notes: string) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  sendMessage: (conversationId: string, text: string, attachments?: { name: string; size: string; type: string }[]) => void;

  inviteTeamMember: (name: string, email: string, role: TeamMember['role'], department: string) => void;
  updateTeamMemberRole: (id: string, role: TeamMember['role']) => void;
  removeTeamMember: (id: string) => void;

  createSupportTicket: (subject: string, category: SupportTicket['category'], priority: SupportTicket['priority'], description: string) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjectsMock);
  const [tasks, setTasks] = useState<ProjectTask[]>(initialTasksMock);
  const [files, setFiles] = useState<ProjectFile[]>(initialFilesMock);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(activeServiceRequestsMock);
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsMock);
  const [conversations, setConversations] = useState<Conversation[]>(conversationsMock);
  const [messages, setMessages] = useState<Record<string, MessageItem[]>>(messagesMock);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamMembersMock);
  const [billingPlans] = useState<BillingPlan[]>(billingPlansMock);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(supportTicketsMock);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Projects
  const addProject = (newProj: Omit<Project, 'id' | 'progress' | 'tasksCount' | 'teamMembers'>) => {
    const project: Project = {
      ...newProj,
      id: `proj-${Date.now()}`,
      progress: 0,
      tasksCount: { completed: 0, total: 0 },
      teamMembers: [
        { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', role: 'Owner' }
      ]
    };
    setProjects([project, ...projects]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // Tasks
  const addTask = (newTask: Omit<ProjectTask, 'id' | 'createdAt'>) => {
    const task: ProjectTask = {
      ...newTask,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([task, ...tasks]);
  };

  const updateTask = (id: string, updates: Partial<ProjectTask>) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const newStatus = t.status === 'Completed' ? 'In Progress' : 'Completed';
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  // Files
  const addFile = (newFile: Omit<ProjectFile, 'id' | 'uploadedAt'>) => {
    const file: ProjectFile = {
      ...newFile,
      id: `file-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setFiles([file, ...files]);
  };

  const deleteFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  // Service Request
  const requestService = (serviceId: string, title: string, category: string, budget: string, notes: string) => {
    const req: ServiceRequest = {
      id: `req-${Date.now()}`,
      serviceId,
      serviceTitle: title,
      category,
      status: 'Requested',
      requestedAt: new Date().toISOString().split('T')[0],
      estimatedDelivery: 'TBD',
      budget,
      notes
    };
    setServiceRequests([req, ...serviceRequests]);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Messages
  const sendMessage = (conversationId: string, text: string, attachments?: { name: string; size: string; type: string }[]) => {
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId,
      sender: {
        id: 'user-001',
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        isSelf: true
      },
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations(conversations.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'Just now'
        };
      }
      return c;
    }));
  };

  // Team
  const inviteTeamMember = (name: string, email: string, role: TeamMember['role'], department: string) => {
    const member: TeamMember = {
      id: `tm-${Date.now()}`,
      name,
      email,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200`,
      role,
      status: 'Pending',
      department,
      joinedDate: 'Just now'
    };
    setTeamMembers([...teamMembers, member]);
  };

  const updateTeamMemberRole = (id: string, role: TeamMember['role']) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, role } : m));
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  // Support
  const createSupportTicket = (subject: string, category: SupportTicket['category'], priority: SupportTicket['priority'], description: string) => {
    const ticket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      priority,
      description,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      attachmentsCount: 0
    };
    setSupportTickets([ticket, ...supportTickets]);
  };

  return (
    <DashboardContext.Provider
      value={{
        projects,
        tasks,
        files,
        serviceRequests,
        notifications,
        conversations,
        messages,
        teamMembers,
        billingPlans,
        supportTickets,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        addFile,
        deleteFile,
        requestService,
        markNotificationRead,
        markAllNotificationsRead,
        sendMessage,
        inviteTeamMember,
        updateTeamMemberRole,
        removeTeamMember,
        createSupportTicket,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
