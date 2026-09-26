import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  BillingPlan,
  Invoice
} from '../types';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

interface FAQ {
  question: string;
  answer: string;
}

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
  invoices: Invoice[];
  supportTickets: SupportTicket[];
  faqs: FAQ[];
  isLoading: boolean;

  // Handlers
  addProject: (project: Omit<Project, 'id' | 'progress' | 'tasksCount' | 'teamMembers'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addTask: (task: Omit<ProjectTask, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<ProjectTask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;

  addFile: (file: Omit<ProjectFile, 'id' | 'uploadedAt'>) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;

  requestService: (serviceId: string, title: string, category: string, budget: string, notes: string) => Promise<void>;

  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;

  sendMessage: (conversationId: string, text: string, attachments?: { name: string; size: string; type: string }[]) => Promise<void>;

  inviteTeamMember: (name: string, email: string, role: TeamMember['role'], department: string) => Promise<void>;
  updateTeamMemberRole: (id: string, role: TeamMember['role']) => Promise<void>;
  removeTeamMember: (id: string) => Promise<void>;

  createSupportTicket: (subject: string, category: SupportTicket['category'], priority: SupportTicket['priority'], description: string) => Promise<void>;

  upgradePlan: (planId: string) => Promise<void>;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const emptyState = {
  projects: [] as Project[],
  tasks: [] as ProjectTask[],
  files: [] as ProjectFile[],
  serviceRequests: [] as ServiceRequest[],
  notifications: [] as NotificationItem[],
  conversations: [] as Conversation[],
  messages: {} as Record<string, MessageItem[]>,
  teamMembers: [] as TeamMember[],
  billingPlans: [] as BillingPlan[],
  invoices: [] as Invoice[],
  supportTickets: [] as SupportTicket[],
  faqs: [] as FAQ[]
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [projects, setProjects] = useState<Project[]>(emptyState.projects);
  const [tasks, setTasks] = useState<ProjectTask[]>(emptyState.tasks);
  const [files, setFiles] = useState<ProjectFile[]>(emptyState.files);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(emptyState.serviceRequests);
  const [notifications, setNotifications] = useState<NotificationItem[]>(emptyState.notifications);
  const [conversations, setConversations] = useState<Conversation[]>(emptyState.conversations);
  const [messages, setMessages] = useState<Record<string, MessageItem[]>>(emptyState.messages);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(emptyState.teamMembers);
  const [billingPlans, setBillingPlans] = useState<BillingPlan[]>(emptyState.billingPlans);
  const [invoices, setInvoices] = useState<Invoice[]>(emptyState.invoices);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(emptyState.supportTickets);
  const [faqs, setFaqs] = useState<FAQ[]>(emptyState.faqs);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        projectsRes,
        tasksRes,
        filesRes,
        serviceRequestsRes,
        notificationsRes,
        conversationsRes,
        teamMembersRes,
        billingPlansRes,
        invoicesRes,
        supportTicketsRes,
        faqsRes
      ] = await Promise.all([
        api.projects.list(),
        api.tasks.list(),
        api.files.list(),
        api.serviceRequests.list(),
        api.notifications.list(),
        api.conversations.list(),
        api.team.list(),
        api.billing.plans(),
        api.billing.invoices(),
        api.support.tickets(),
        api.support.faqs()
      ]);

      setProjects(projectsRes);
      setTasks(tasksRes);
      setFiles(filesRes);
      setServiceRequests(serviceRequestsRes);
      setNotifications(notificationsRes);
      setConversations(conversationsRes);
      setTeamMembers(teamMembersRes);
      setBillingPlans(billingPlansRes);
      setInvoices(invoicesRes);
      setSupportTickets(supportTicketsRes);
      setFaqs(faqsRes);

      const messageEntries = await Promise.all(
        conversationsRes.map(async (c) => [c.id, await api.conversations.messages(c.id)] as const)
      );
      setMessages(Object.fromEntries(messageEntries));
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    } else {
      setProjects(emptyState.projects);
      setTasks(emptyState.tasks);
      setFiles(emptyState.files);
      setServiceRequests(emptyState.serviceRequests);
      setNotifications(emptyState.notifications);
      setConversations(emptyState.conversations);
      setMessages(emptyState.messages);
      setTeamMembers(emptyState.teamMembers);
      setBillingPlans(emptyState.billingPlans);
      setInvoices(emptyState.invoices);
      setSupportTickets(emptyState.supportTickets);
      setFaqs(emptyState.faqs);
    }
  }, [isAuthenticated, loadDashboardData]);

  // Projects
  const addProject = async (newProj: Omit<Project, 'id' | 'progress' | 'tasksCount' | 'teamMembers'>) => {
    const project = await api.projects.create(newProj);
    setProjects(prev => [project, ...prev]);
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const updated = await api.projects.update(id, updates);
    setProjects(prev => prev.map(p => (p.id === id ? updated : p)));
  };

  const deleteProject = async (id: string) => {
    await api.projects.remove(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Tasks
  const addTask = async (newTask: Omit<ProjectTask, 'id' | 'createdAt'>) => {
    const task = await api.tasks.create(newTask);
    setTasks(prev => [task, ...prev]);
  };

  const updateTask = async (id: string, updates: Partial<ProjectTask>) => {
    const updated = await api.tasks.update(id, updates);
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id: string) => {
    await api.tasks.remove(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaskComplete = async (id: string) => {
    const updated = await api.tasks.toggleComplete(id);
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  };

  // Files
  const addFile = async (newFile: Omit<ProjectFile, 'id' | 'uploadedAt'>) => {
    const file = await api.files.create(newFile);
    setFiles(prev => [file, ...prev]);
  };

  const deleteFile = async (id: string) => {
    await api.files.remove(id);
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // Service Request
  const requestService = async (serviceId: string, title: string, category: string, budget: string, notes: string) => {
    const req = await api.serviceRequests.create(serviceId, title, category, budget, notes);
    setServiceRequests(prev => [req, ...prev]);
  };

  // Notifications
  const markNotificationRead = async (id: string) => {
    const updated = await api.notifications.markRead(id);
    setNotifications(prev => prev.map(n => (n.id === id ? updated : n)));
  };

  const markAllNotificationsRead = async () => {
    await api.notifications.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Messages
  const sendMessage = async (conversationId: string, text: string, attachments?: { name: string; size: string; type: string }[]) => {
    const newMsg = await api.conversations.send(conversationId, text, attachments);

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return { ...c, lastMessage: text, lastMessageTime: 'Just now' };
      }
      return c;
    }));
  };

  // Team
  const inviteTeamMember = async (name: string, email: string, role: TeamMember['role'], department: string) => {
    const member = await api.team.invite(name, email, role, department);
    setTeamMembers(prev => [...prev, member]);
  };

  const updateTeamMemberRole = async (id: string, role: TeamMember['role']) => {
    const updated = await api.team.updateRole(id, role);
    setTeamMembers(prev => prev.map(m => (m.id === id ? updated : m)));
  };

  const removeTeamMember = async (id: string) => {
    await api.team.remove(id);
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  // Support
  const createSupportTicket = async (subject: string, category: SupportTicket['category'], priority: SupportTicket['priority'], description: string) => {
    const ticket = await api.support.createTicket(subject, category, priority, description);
    setSupportTickets(prev => [ticket, ...prev]);
  };

  // Billing
  const upgradePlan = async (planId: string) => {
    await api.billing.upgrade(planId);
    const plans = await api.billing.plans();
    setBillingPlans(plans);
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
        invoices,
        supportTickets,
        faqs,
        isLoading,
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
        upgradePlan,
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
