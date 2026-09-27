export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
  location?: string;
  role: 'Owner' | 'Admin' | 'Manager' | 'Member';
  status: 'Active' | 'Pending' | 'Offline';
  createdAt: string;
  onboarded: boolean;
  preferences?: {
    emailNotifications: boolean;
    projectUpdates: boolean;
    taskNotifications: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
    language: string;
    timezone: string;
    dateFormat: string;
    theme: 'light' | 'dark' | 'system';
  };
}

export type ProjectStatus = 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'Archived';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface ProjectTask {
  id: string;
  projectId?: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  priority: Priority;
  assignee: {
    name: string;
    avatar: string;
    email: string;
  };
  dueDate: string;
  createdAt: string;
}

export interface ProjectFile {
  id: string;
  projectId?: string;
  name: string;
  size: string;
  type: string; // 'pdf' | 'figma' | 'docx' | 'zip' | 'code' | 'png' | etc.
  category: 'Document' | 'Design' | 'Archive' | 'Code' | 'Media';
  uploadedBy: string;
  uploadedAt: string;
  url?: string;
}

export interface ProjectActivity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number; // 0-100
  startDate: string;
  deadline: string;
  teamMembers: {
    name: string;
    avatar: string;
    role: string;
  }[];
  tasksCount: {
    completed: number;
    total: number;
  };
  budget?: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string | null;
  projectUrl?: string | null;
  sortOrder: number;
  published: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  icon: string;
  features: string[];
  deliverables: string[];
  estimatedTimeline: string;
  startingPrice: string;
  popular?: boolean;
}

export interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  status: 'Requested' | 'Under Review' | 'In Progress' | 'Completed';
  requestedAt: string;
  estimatedDelivery: string;
  budget: string;
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'Project update' | 'Task assigned' | 'Payment update' | 'System notification' | 'Support response';
  link?: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    isSelf: boolean;
  };
  text: string;
  timestamp: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

export interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar: string;
    role: string;
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Owner' | 'Admin' | 'Manager' | 'Member';
  status: 'Active' | 'Pending' | 'Inactive';
  department: string;
  joinedDate: string;
}

export interface BillingPlan {
  id: string;
  name: 'Starter' | 'Professional' | 'Business' | 'Enterprise';
  price: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  downloadUrl: string;
  description: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: 'Technical' | 'Billing' | 'Project' | 'Consulting' | 'General';
  priority: Priority;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  attachmentsCount?: number;
}
