import type {
  User,
  Project,
  ProjectTask,
  ProjectFile,
  PortfolioItem,
  ServiceRequest,
  NotificationItem,
  Conversation,
  MessageItem,
  TeamMember,
  BillingPlan,
  Invoice,
  SupportTicket
} from '../types';

const API_URL = import.meta.env.VITE_API_URL === '__SAME_ORIGIN__'
  ? ''
  : import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ACCESS_TOKEN_KEY = 'aevona_access_token';
const REFRESH_TOKEN_KEY = 'aevona_refresh_token';

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

const ADMIN_ACCESS_TOKEN_KEY = 'aevona_admin_access_token';
const ADMIN_REFRESH_TOKEN_KEY = 'aevona_admin_refresh_token';

export const adminTokenStorage = {
  getAccessToken: () => localStorage.getItem(ADMIN_ACCESS_TOKEN_KEY),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ADMIN_ACCESS_TOKEN_KEY, access);
    localStorage.setItem(ADMIN_REFRESH_TOKEN_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ADMIN_ACCESS_TOKEN_KEY);
    localStorage.removeItem(ADMIN_REFRESH_TOKEN_KEY);
  }
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_URL}/api/auth/refresh?refresh_token=${encodeURIComponent(refreshToken)}`, {
      method: 'POST'
    });
    if (!res.ok) return false;
    const data: TokenResponse = await res.json();
    tokenStorage.setTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    return false;
  }
}

async function request<T>(path: string, options: RequestInit = {}, allowRetry = true): Promise<T> {
  const token = tokenStorage.getAccessToken();
  const headers: Record<string, string> = { ...(options.headers as Record<string, string>) };
  if (!(options.body instanceof URLSearchParams)) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 401 && allowRetry && path !== '/api/auth/refresh' && path !== '/api/auth/login') {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return request<T>(path, options, false);
    }
    tokenStorage.clear();
  }

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      if (body?.detail) {
        message = Array.isArray(body.detail) ? body.detail.map((d: { msg: string }) => d.msg).join(', ') : body.detail;
      }
    } catch {
      // response had no JSON body; keep the default status text
    }
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export const api = {
  auth: {
    signup: (fullName: string, email: string, company: string, password: string) =>
      request<TokenResponse>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ full_name: fullName, email, company, password })
      }),

    login: (email: string, password: string) =>
      request<TokenResponse>('/api/auth/login', {
        method: 'POST',
        body: new URLSearchParams({ username: email, password })
      }),

    googleLogin: (credential: string) =>
      request<TokenResponse>('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential })
      }),

    adminGoogleLogin: async (credential: string) => {
      const response = await fetch(API_URL + '/api/auth/admin/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential })
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new ApiError(response.status, body.detail || response.statusText);
      }
      return (await response.json()) as TokenResponse;
    },

    adminMe: async (accessToken: string) => {
      const response = await fetch(API_URL + '/api/auth/admin/me', {
        headers: { Authorization: 'Bearer ' + accessToken }
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new ApiError(response.status, body.detail || response.statusText);
      }
      return (await response.json()) as { id: string; username: string; name: string; status: string };
    },


    me: () => request<User>('/api/auth/me'),
    verifyEmail: () => request<User>('/api/auth/verify-email', { method: 'POST' }),
    forgotPassword: (email: string) =>
      request<{ message: string }>('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (token: string, newPassword: string) =>
      request<{ message: string }>('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, new_password: newPassword })
      })
  },

  users: {
    updateMe: (fields: Partial<User>) =>
      request<User>('/api/users/me', { method: 'PATCH', body: JSON.stringify(fields) })
  },

  projects: {
    list: () => request<Project[]>('/api/projects'),
    create: (data: Omit<Project, 'id' | 'progress' | 'tasksCount' | 'teamMembers'>) =>
      request<Project>('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Project>) =>
      request<Project>(`/api/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => request<void>(`/api/projects/${id}`, { method: 'DELETE' })
  },

  portfolio: {
    list: () => request<PortfolioItem[]>('/api/portfolio'),
    manage: () => request<PortfolioItem[]>('/api/portfolio/manage'),
    create: (data: Omit<PortfolioItem, 'id'>) =>
      request<PortfolioItem>('/api/portfolio', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Omit<PortfolioItem, 'id'>>) =>
      request<PortfolioItem>(`/api/portfolio/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => request<void>(`/api/portfolio/${id}`, { method: 'DELETE' })
  },

  tasks: {
    list: () => request<ProjectTask[]>('/api/tasks'),
    create: (data: Omit<ProjectTask, 'id' | 'createdAt'>) =>
      request<ProjectTask>('/api/tasks', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<ProjectTask>) =>
      request<ProjectTask>(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => request<void>(`/api/tasks/${id}`, { method: 'DELETE' }),
    toggleComplete: (id: string) => request<ProjectTask>(`/api/tasks/${id}/toggle-complete`, { method: 'POST' })
  },

  files: {
    list: () => request<ProjectFile[]>('/api/files'),
    create: (data: Omit<ProjectFile, 'id' | 'uploadedAt'>) =>
      request<ProjectFile>('/api/files', { method: 'POST', body: JSON.stringify(data) }),
    remove: (id: string) => request<void>(`/api/files/${id}`, { method: 'DELETE' })
  },

  serviceRequests: {
    list: () => request<ServiceRequest[]>('/api/service-requests'),
    create: (serviceId: string, serviceTitle: string, category: string, budget: string, notes: string) =>
      request<ServiceRequest>('/api/service-requests', {
        method: 'POST',
        body: JSON.stringify({ serviceId, serviceTitle, category, budget, notes })
      })
  },

  notifications: {
    list: () => request<NotificationItem[]>('/api/notifications'),
    markRead: (id: string) => request<NotificationItem>(`/api/notifications/${id}/read`, { method: 'POST' }),
    markAllRead: () => request<{ message: string }>('/api/notifications/read-all', { method: 'POST' })
  },

  conversations: {
    list: () => request<Conversation[]>('/api/conversations'),
    create: (teamMemberId: string) =>
      request<Conversation>('/api/conversations', {
        method: 'POST',
        body: JSON.stringify({ team_member_id: teamMemberId })
      }),
    messages: (conversationId: string) => request<MessageItem[]>(`/api/conversations/${conversationId}/messages`),
    send: (conversationId: string, text: string, attachments?: { name: string; size: string; type: string }[]) =>
      request<MessageItem>(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text, attachments })
      })
  },

  team: {
    list: () => request<TeamMember[]>('/api/team'),
    invite: (name: string, email: string, role: TeamMember['role'], department: string) =>
      request<TeamMember>('/api/team', { method: 'POST', body: JSON.stringify({ name, email, role, department }) }),
    updateRole: (id: string, role: TeamMember['role']) =>
      request<TeamMember>(`/api/team/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
    remove: (id: string) => request<void>(`/api/team/${id}`, { method: 'DELETE' })
  },

  billing: {
    plans: () => request<BillingPlan[]>('/api/billing/plans'),
    invoices: () => request<Invoice[]>('/api/billing/invoices'),
    upgrade: (planId: string) =>
      request<BillingPlan>('/api/billing/upgrade', { method: 'POST', body: JSON.stringify({ planId }) })
  },

  support: {
    tickets: () => request<SupportTicket[]>('/api/support/tickets'),
    createTicket: (
      subject: string,
      category: SupportTicket['category'],
      priority: SupportTicket['priority'],
      description: string
    ) =>
      request<SupportTicket>('/api/support/tickets', {
        method: 'POST',
        body: JSON.stringify({ subject, category, priority, description })
      }),
    faqs: () => request<{ question: string; answer: string }[]>('/api/support/faqs')
  }
};
