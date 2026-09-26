import {
  User,
  Project,
  ProjectTask,
  ProjectFile,
  ServiceItem,
  ServiceRequest,
  NotificationItem,
  Conversation,
  MessageItem,
  TeamMember,
  BillingPlan,
  Invoice,
  SupportTicket
} from '../types';

export const currentUserMock: User = {
  id: 'user-001',
  name: 'Alex Morgan',
  email: 'alex.morgan@aevona.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  company: 'Aevona Enterprises',
  jobTitle: 'VP of Digital Strategy',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  role: 'Owner',
  status: 'Active',
  createdAt: '2024-01-15',
  onboarded: true,
  preferences: {
    emailNotifications: true,
    projectUpdates: true,
    taskNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    language: 'English (US)',
    timezone: 'PST (UTC-8)',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light'
  }
};

export const initialProjectsMock: Project[] = [
  {
    id: 'proj-101',
    name: 'Enterprise Cloud Migration',
    description: 'Migration of legacy infrastructure to AWS multi-region cluster with automated CI/CD pipeline and zero-downtime strategy.',
    serviceType: 'Cloud Infrastructure',
    status: 'In Progress',
    priority: 'High',
    progress: 68,
    startDate: '2024-08-01',
    deadline: '2024-11-15',
    budget: '$45,000',
    tasksCount: { completed: 18, total: 24 },
    teamMembers: [
      { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', role: 'Lead Architect' },
      { name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'DevOps Engineer' },
      { name: 'Daniel Carter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', role: 'Security Specialist' }
    ]
  },
  {
    id: 'proj-102',
    name: 'EduFlow Learning Portal',
    description: 'Custom SaaS platform for interactive online courses, live student tracking, AI grading assistant, and billing integration.',
    serviceType: 'Web & Application Development',
    status: 'In Progress',
    priority: 'Urgent',
    progress: 82,
    startDate: '2024-06-10',
    deadline: '2024-10-30',
    budget: '$62,000',
    tasksCount: { completed: 37, total: 45 },
    teamMembers: [
      { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', role: 'Product Owner' },
      { name: 'Olivia Reynolds', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', role: 'UI/UX Designer' }
    ]
  },
  {
    id: 'proj-103',
    name: 'FinTrack Wealth Dashboard',
    description: 'High-frequency financial analytics dashboard featuring real-time data streaming, portfolio metrics, and PDF reporting engine.',
    serviceType: 'Data & Analytics Solutions',
    status: 'Completed',
    priority: 'Medium',
    progress: 100,
    startDate: '2024-03-01',
    deadline: '2024-07-20',
    budget: '$38,000',
    tasksCount: { completed: 30, total: 30 },
    teamMembers: [
      { name: 'Daniel Carter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', role: 'Data Engineer' },
      { name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Backend Dev' }
    ]
  },
  {
    id: 'proj-104',
    name: 'HealConnect Mobile Suite',
    description: 'Cross-platform iOS and Android mobile app connecting healthcare providers with patient telemedicine tele-consultation tools.',
    serviceType: 'Mobile App Development',
    status: 'Planning',
    priority: 'Medium',
    progress: 15,
    startDate: '2024-09-15',
    deadline: '2024-12-20',
    budget: '$50,000',
    tasksCount: { completed: 3, total: 20 },
    teamMembers: [
      { name: 'Olivia Reynolds', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', role: 'Mobile Lead' }
    ]
  },
  {
    id: 'proj-105',
    name: 'Automation & ERP Integration',
    description: 'Enterprise workflow automation linking Salesforce, SAP, and custom database endpoints to streamline procurement.',
    serviceType: 'Business Automation',
    status: 'Review',
    priority: 'Low',
    progress: 92,
    startDate: '2024-05-01',
    deadline: '2024-09-30',
    budget: '$29,000',
    tasksCount: { completed: 22, total: 24 },
    teamMembers: [
      { name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Integration Engineer' }
    ]
  }
];

export const initialTasksMock: ProjectTask[] = [
  {
    id: 'task-1',
    projectId: 'proj-101',
    title: 'Configure Terraform AWS VPC subnets & Security Groups',
    description: 'Define multi-AZ public and private subnets with strict security group isolation.',
    status: 'In Progress',
    priority: 'High',
    assignee: { name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', email: 'sophia@aevona.com' },
    dueDate: '2024-10-05',
    createdAt: '2024-09-20'
  },
  {
    id: 'task-2',
    projectId: 'proj-102',
    title: 'Finalize Figma Design Tokens & Dark Theme Palette',
    description: 'Ensure cream/gold/brown brand consistency across all course views.',
    status: 'Completed',
    priority: 'Medium',
    assignee: { name: 'Olivia Reynolds', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', email: 'olivia@aevona.com' },
    dueDate: '2024-09-28',
    createdAt: '2024-09-10'
  },
  {
    id: 'task-3',
    projectId: 'proj-102',
    title: 'Implement OAuth 2.0 & Webhook Callback Service',
    description: 'Integrate Google & Microsoft auth providers with mock JWT refresh handling.',
    status: 'In Progress',
    priority: 'Urgent',
    assignee: { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', email: 'alex.morgan@aevona.com' },
    dueDate: '2024-10-02',
    createdAt: '2024-09-22'
  },
  {
    id: 'task-4',
    projectId: 'proj-101',
    title: 'Perform Penetration Test & Audit IAM Policies',
    description: 'Review least-privilege permissions across all production server roles.',
    status: 'To Do',
    priority: 'High',
    assignee: { name: 'Daniel Carter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', email: 'daniel@aevona.com' },
    dueDate: '2024-10-12',
    createdAt: '2024-09-25'
  },
  {
    id: 'task-5',
    projectId: 'proj-105',
    title: 'Validate SAP Webhook Payload Schema',
    description: 'Verify edge cases for currency formatting and tax rate calculation.',
    status: 'Review',
    priority: 'Low',
    assignee: { name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', email: 'sophia@aevona.com' },
    dueDate: '2024-09-30',
    createdAt: '2024-09-18'
  },
  {
    id: 'task-6',
    projectId: 'proj-104',
    title: 'Draft Mobile Telemedicine Wireframes & User Journey',
    description: 'Create responsive touch targets and screen routing for quick doctor check-in.',
    status: 'To Do',
    priority: 'Medium',
    assignee: { name: 'Olivia Reynolds', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', email: 'olivia@aevona.com' },
    dueDate: '2024-10-10',
    createdAt: '2024-09-26'
  }
];

export const initialFilesMock: ProjectFile[] = [
  {
    id: 'file-1',
    projectId: 'proj-101',
    name: 'AWS_Architecture_Diagram_v3.pdf',
    size: '4.2 MB',
    type: 'pdf',
    category: 'Document',
    uploadedBy: 'Sophia Bennett',
    uploadedAt: '2024-09-20',
    url: '#'
  },
  {
    id: 'file-2',
    projectId: 'proj-102',
    name: 'Aevona_DesignSystem_UI_Kit.fig',
    size: '18.6 MB',
    type: 'figma',
    category: 'Design',
    uploadedBy: 'Olivia Reynolds',
    uploadedAt: '2024-09-18',
    url: '#'
  },
  {
    id: 'file-3',
    projectId: 'proj-103',
    name: 'Q3_Financial_Analytics_Report.pdf',
    size: '2.8 MB',
    type: 'pdf',
    category: 'Document',
    uploadedBy: 'Daniel Carter',
    uploadedAt: '2024-09-12',
    url: '#'
  },
  {
    id: 'file-4',
    projectId: 'proj-101',
    name: 'terraform_production_bundle.zip',
    size: '12.4 MB',
    type: 'zip',
    category: 'Archive',
    uploadedBy: 'Sophia Bennett',
    uploadedAt: '2024-09-22',
    url: '#'
  },
  {
    id: 'file-5',
    projectId: 'proj-105',
    name: 'ERP_Integration_Contracts.docx',
    size: '1.1 MB',
    type: 'docx',
    category: 'Document',
    uploadedBy: 'Alex Morgan',
    uploadedAt: '2024-09-15',
    url: '#'
  }
];

export const catalogServicesMock: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Web & Web Application Development',
    shortDesc: 'Modern, high-performance web applications built for speed, conversion, and global scale.',
    fullDesc: 'We craft robust web applications using React, Next.js, and cutting-edge frontend architecture backed by scalable microservices. Designed with elegance, responsive precision, and SEO optimization.',
    category: 'Development',
    icon: 'Code2',
    features: ['Custom Frontend Frameworks', 'SEO & Performance Tuning', 'REST & GraphQL Integration', 'Accessible & Responsive UX'],
    deliverables: ['Production Application', 'Source Code Repository', 'CI/CD Pipeline', 'Documentation & Handover'],
    estimatedTimeline: '4 - 8 Weeks',
    startingPrice: '$5,000',
    popular: true
  },
  {
    id: 'srv-2',
    title: 'Mobile App Development',
    shortDesc: 'Native & cross-platform iOS and Android mobile solutions with fluid animations.',
    fullDesc: 'Delivering native performance with React Native and Flutter. We build intuitive, secure mobile apps equipped with push notifications, offline storage, and seamless API sync.',
    category: 'Mobile',
    icon: 'Smartphone',
    features: ['iOS & Android Compatibility', 'Biometric Security Integration', 'Offline-First Sync Engine', 'App Store Publishing'],
    deliverables: ['App Store & Play Store Builds', 'Design System Assets', 'API Connectors', 'User Analytics Integration'],
    estimatedTimeline: '6 - 12 Weeks',
    startingPrice: '$8,000',
    popular: false
  },
  {
    id: 'srv-3',
    title: 'Cloud Infrastructure & DevOps',
    shortDesc: 'Scalable, secure, and cost-optimized cloud architectures on AWS, Azure, or Google Cloud.',
    fullDesc: 'Transform legacy workloads into cloud-native microservices with automated Infrastructure as Code (Terraform), Docker containerization, Kubernetes orchestration, and round-the-clock monitoring.',
    category: 'Cloud',
    icon: 'Cloud',
    features: ['Infrastructure as Code (Terraform)', 'Kubernetes & Docker Pipelines', 'Multi-Region High Availability', 'Cost Optimization & FinOps'],
    deliverables: ['Cloud Architecture Specification', 'Terraform Scripts', 'Automated CI/CD Workflows', 'Disaster Recovery Plan'],
    estimatedTimeline: '3 - 6 Weeks',
    startingPrice: '$6,000',
    popular: true
  },
  {
    id: 'srv-4',
    title: 'Database Architecture & Data Pipelines',
    shortDesc: 'Reliable, ACID-compliant database systems, real-time analytics, and data warehouse setup.',
    fullDesc: 'Custom database design using PostgreSQL, MongoDB, Redis, and Snowflake. We handle query optimization, high-throughput ETL pipelines, and security compliance.',
    category: 'Data Solutions',
    icon: 'Database',
    features: ['PostgreSQL & MongoDB Tuning', 'Real-Time Streaming Pipelines', 'ETL Automation', 'Encrypted Backups'],
    deliverables: ['Optimized Database Schema', 'Data Ingestion Scripts', 'Monitoring Dashboards', 'Performance Audit'],
    estimatedTimeline: '3 - 5 Weeks',
    startingPrice: '$4,500',
    popular: false
  },
  {
    id: 'srv-5',
    title: 'IT Consulting & Enterprise Advisory',
    shortDesc: 'Strategic technology guidance to align your digital roadmap with enterprise business goals.',
    fullDesc: 'Our senior architects audit your current tech stack, eliminate technical debt, recommend vendor platforms, and design scalable technical roadmaps for sustainable growth.',
    category: 'Consulting',
    icon: 'Compass',
    features: ['Architecture Code Audits', 'Technology Stack Evaluation', 'Security & Compliance Reviews', 'Strategic Growth Roadmap'],
    deliverables: ['Executive Advisory Report', 'Risk Mitigation Plan', 'Vendor Assessment Sheet', 'Architecture Blueprint'],
    estimatedTimeline: '2 - 4 Weeks',
    startingPrice: '$3,500',
    popular: false
  },
  {
    id: 'srv-6',
    title: 'Business Automation & AI Solutions',
    shortDesc: 'Streamline repetitive enterprise operations with custom automation workflows & AI agents.',
    fullDesc: 'Connect isolated tools, automate document processing, build custom internal tools, and deploy AI assistants that save hundreds of engineering hours every month.',
    category: 'Automation',
    icon: 'Cpu',
    features: ['Workflow Automation Services', 'Custom AI Agent Integration', 'CRM & ERP System Connectors', 'Low-Code Internal Tooling'],
    deliverables: ['Automated Workflow Triggers', 'API Integration Layer', 'Employee Training Guide', 'System SLA Guarantee'],
    estimatedTimeline: '3 - 6 Weeks',
    startingPrice: '$4,000',
    popular: true
  }
];

export const activeServiceRequestsMock: ServiceRequest[] = [
  {
    id: 'req-01',
    serviceId: 'srv-3',
    serviceTitle: 'Cloud Infrastructure & DevOps',
    category: 'Cloud',
    status: 'In Progress',
    requestedAt: '2024-08-01',
    estimatedDelivery: '2024-11-15',
    budget: '$45,000',
    notes: 'Multi-region AWS setup for high availability.'
  },
  {
    id: 'req-02',
    serviceId: 'srv-1',
    serviceTitle: 'Web & Web Application Development',
    category: 'Development',
    status: 'In Progress',
    requestedAt: '2024-06-10',
    estimatedDelivery: '2024-10-30',
    budget: '$62,000',
    notes: 'EduFlow SaaS Learning Portal frontend & backend.'
  },
  {
    id: 'req-03',
    serviceId: 'srv-6',
    serviceTitle: 'Business Automation & AI Solutions',
    category: 'Automation',
    status: 'Under Review',
    requestedAt: '2024-09-24',
    estimatedDelivery: '2024-11-01',
    budget: '$15,000',
    notes: 'Automate invoice intake into QuickBooks and SAP.'
  }
];

export const notificationsMock: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Project Milestone Completed',
    message: 'Sophia Bennett completed the task "Configure Terraform AWS VPC subnets".',
    timestamp: '10 minutes ago',
    read: false,
    category: 'Project update',
    link: '/dashboard/projects/proj-101'
  },
  {
    id: 'notif-2',
    title: 'New Task Assigned',
    message: 'You have been assigned to "Implement OAuth 2.0 & Webhook Callback Service".',
    timestamp: '2 hours ago',
    read: false,
    category: 'Task assigned',
    link: '/dashboard/tasks'
  },
  {
    id: 'notif-3',
    title: 'Invoice Paid Successfully',
    message: 'Invoice #INV-2024-089 for $12,500.00 was marked as paid.',
    timestamp: '1 day ago',
    read: true,
    category: 'Payment update',
    link: '/dashboard/billing'
  },
  {
    id: 'notif-4',
    title: 'Support Response Received',
    message: 'Support ticket #TKT-8842 has been updated by Aevona Engineering Team.',
    timestamp: '2 days ago',
    read: true,
    category: 'Support response',
    link: '/dashboard/support'
  },
  {
    id: 'notif-5',
    title: 'System Maintenance Notice',
    message: 'Scheduled API gateway optimization on Sunday Oct 06 at 02:00 UTC.',
    timestamp: '3 days ago',
    read: true,
    category: 'System notification',
    link: '/dashboard/notifications'
  }
];

export const conversationsMock: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      name: 'Sophia Bennett',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      role: 'Lead Cloud Architect',
      online: true
    },
    lastMessage: 'The staging cluster deployment succeeded. Ready for your review.',
    lastMessageTime: '11:42 AM',
    unreadCount: 2
  },
  {
    id: 'conv-2',
    participant: {
      name: 'Olivia Reynolds',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      role: 'Head of UI/UX',
      online: true
    },
    lastMessage: 'I updated the color contrast ratios in the dark mode prototype.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'conv-3',
    participant: {
      name: 'Daniel Carter',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      role: 'Security & DevOps Specialist',
      online: false
    },
    lastMessage: 'Penetration test report summary is uploaded to the files tab.',
    lastMessageTime: 'Sep 24',
    unreadCount: 0
  }
];

export const messagesMock: Record<string, MessageItem[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      sender: { id: 'sophia', name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', isSelf: false },
      text: 'Hi Alex, I finished provisioning the multi-region subnets on AWS via Terraform.',
      timestamp: '10:15 AM'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      sender: { id: 'user-001', name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', isSelf: true },
      text: 'Excellent work Sophia! Did you include the health check probes for auto-healing?',
      timestamp: '10:30 AM'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      sender: { id: 'sophia', name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', isSelf: false },
      text: 'Yes, both TCP and HTTP endpoint health checks are live. The staging cluster deployment succeeded. Ready for your review.',
      timestamp: '11:42 AM',
      attachments: [{ name: 'terraform_execution_plan.pdf', size: '1.4 MB', type: 'pdf' }]
    }
  ]
};

export const teamMembersMock: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@aevona.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'Owner',
    status: 'Active',
    department: 'Executive / Product',
    joinedDate: 'Jan 2024'
  },
  {
    id: 'tm-2',
    name: 'Sophia Bennett',
    email: 'sophia.b@aevona.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    role: 'Admin',
    status: 'Active',
    department: 'Cloud & DevOps Engineering',
    joinedDate: 'Feb 2024'
  },
  {
    id: 'tm-3',
    name: 'Daniel Carter',
    email: 'daniel.c@aevona.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'Manager',
    status: 'Active',
    department: 'Data Solutions & Security',
    joinedDate: 'Mar 2024'
  },
  {
    id: 'tm-4',
    name: 'Olivia Reynolds',
    email: 'olivia.r@aevona.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    role: 'Manager',
    status: 'Active',
    department: 'Design & UX Excellence',
    joinedDate: 'Apr 2024'
  },
  {
    id: 'tm-5',
    name: 'Marcus Vance',
    email: 'marcus.v@aevona.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    role: 'Member',
    status: 'Pending',
    department: 'Frontend Engineering',
    joinedDate: 'Sep 2024'
  }
];

export const billingPlansMock: BillingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    price: '$299',
    billingPeriod: 'monthly',
    features: [
      'Up to 3 Active Projects',
      'Standard Cloud Environment',
      'Basic Analytics & Reporting',
      'Email Support (24h response)',
      '5 Team Members',
      '10 GB Encrypted File Storage'
    ]
  },
  {
    id: 'plan-pro',
    name: 'Professional',
    price: '$799',
    billingPeriod: 'monthly',
    isPopular: true,
    isCurrent: true,
    features: [
      'Up to 10 Active Projects',
      'Dedicated Cloud Cluster',
      'Advanced Real-Time Analytics',
      'Priority Support (4h response)',
      '15 Team Members',
      '100 GB Encrypted File Storage',
      'Custom API Integrations',
      'Staging & Production Environments'
    ]
  },
  {
    id: 'plan-business',
    name: 'Business',
    price: '$1,499',
    billingPeriod: 'monthly',
    features: [
      'Unlimited Active Projects',
      'Multi-Region Cloud Architecture',
      'Custom BI & Executive Analytics',
      '24/7 Dedicated Slack Channel',
      '50 Team Members',
      '500 GB File Storage',
      'SOC2 & HIPAA Compliance Tools',
      'Dedicated Solution Architect'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    price: 'Custom',
    billingPeriod: 'yearly',
    features: [
      'Custom Infrastructure & SLAs',
      'On-Premise / Hybrid Deployment',
      'Tailored Security Governance',
      '24/7 Phone & Dedicated Manager',
      'Unlimited Team Members',
      'Unlimited File Storage',
      'Custom Contract & Terms'
    ]
  }
];

export const invoicesMock: Invoice[] = [
  {
    id: 'inv-1',
    number: 'INV-2024-089',
    date: 'Sep 01, 2024',
    amount: '$12,500.00',
    status: 'Paid',
    downloadUrl: '#',
    description: 'Professional Plan Subscription - September 2024 + Cloud Ops Addon'
  },
  {
    id: 'inv-2',
    number: 'INV-2024-074',
    date: 'Aug 01, 2024',
    amount: '$12,500.00',
    status: 'Paid',
    downloadUrl: '#',
    description: 'Professional Plan Subscription - August 2024'
  },
  {
    id: 'inv-3',
    number: 'INV-2024-061',
    date: 'Jul 01, 2024',
    amount: '$9,800.00',
    status: 'Paid',
    downloadUrl: '#',
    description: 'Professional Plan Subscription - July 2024'
  }
];

export const supportTicketsMock: SupportTicket[] = [
  {
    id: 'tkt-1',
    ticketNumber: 'TKT-8842',
    subject: 'Staging Database Connection Latency Audit',
    category: 'Technical',
    priority: 'High',
    description: 'We are observing occasional 500ms query spikes in the staging PostgreSQL cluster during peak hourly loads.',
    status: 'In Progress',
    createdAt: '2024-09-24',
    updatedAt: '2024-09-25',
    attachmentsCount: 2
  },
  {
    id: 'tkt-2',
    ticketNumber: 'TKT-8210',
    subject: 'Update Billing Credit Card & Invoice VAT Details',
    category: 'Billing',
    priority: 'Low',
    description: 'Please assist in updating our EU corporate VAT ID on quarterly invoices.',
    status: 'Resolved',
    createdAt: '2024-08-14',
    updatedAt: '2024-08-15',
    attachmentsCount: 0
  }
];

export const analyticsDataMock = {
  projectCompletion: [
    { month: 'May', completed: 4, inProgress: 6 },
    { month: 'Jun', completed: 6, inProgress: 8 },
    { month: 'Jul', completed: 8, inProgress: 7 },
    { month: 'Aug', completed: 11, inProgress: 9 },
    { month: 'Sep', completed: 15, inProgress: 10 },
  ],
  usageMetrics: [
    { day: 'Mon', apiCalls: 14200, bandwidthGb: 42 },
    { day: 'Tue', apiCalls: 18900, bandwidthGb: 58 },
    { day: 'Wed', apiCalls: 24500, bandwidthGb: 74 },
    { day: 'Thu', apiCalls: 21300, bandwidthGb: 66 },
    { day: 'Fri', apiCalls: 28400, bandwidthGb: 88 },
    { day: 'Sat', apiCalls: 12100, bandwidthGb: 35 },
    { day: 'Sun', apiCalls: 9800, bandwidthGb: 28 },
  ],
  serviceDistribution: [
    { name: 'Cloud Infra', percentage: 40, count: 8 },
    { name: 'Web Applications', percentage: 30, count: 6 },
    { name: 'Mobile Apps', percentage: 15, count: 3 },
    { name: 'Automation & AI', percentage: 15, count: 3 },
  ],
  performanceMetrics: {
    uptime: '99.98%',
    avgResponseMs: '124ms',
    tasksCompletedThisMonth: 86,
    activeDeployments: 14
  }
};

export const FAQsMock = [
  {
    question: 'How do I start a new project with Aevona Solution?',
    answer: 'You can navigate to the Projects tab in your dashboard and click "Create Project", or request a dedicated service directly through the Services page.'
  },
  {
    question: 'What cloud security frameworks does Aevona adhere to?',
    answer: 'All our cloud architectures follow SOC2 Type II compliance, AWS Well-Architected Framework guidelines, end-to-end TLS 1.3 encryption, and strict IAM zero-trust policies.'
  },
  {
    question: 'Can I add additional team members to my workspace?',
    answer: 'Yes! Go to Team in your dashboard navigation to send email invitations and assign granular roles (Admin, Manager, Member).'
  },
  {
    question: 'How does payment and billing work for custom enterprise projects?',
    answer: 'We provide structured milestone-based invoicing with full transparency. Receipts and PDF invoices can be downloaded directly from the Billing tab.'
  }
];
