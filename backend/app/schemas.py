from datetime import date
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

Role = Literal["Owner", "Admin", "Manager", "Member"]
Priority = Literal["Low", "Medium", "High", "Urgent"]
ProjectStatus = Literal["Planning", "In Progress", "Review", "Completed", "Archived"]
TaskStatus = Literal["To Do", "In Progress", "Review", "Completed"]


# ---------- Auth ----------
class SignupRequest(BaseModel):
    full_name: str
    email: EmailStr
    company: str
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=8)


# ---------- User ----------
class Preferences(BaseModel):
    emailNotifications: bool = True
    projectUpdates: bool = True
    taskNotifications: bool = True
    marketingEmails: bool = False
    securityAlerts: bool = True
    language: str = "English (US)"
    timezone: str = "PST (UTC-8)"
    dateFormat: str = "MM/DD/YYYY"
    theme: Literal["light", "dark", "system"] = "light"


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    avatar: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = Field(default=None, alias="jobTitle")
    phone: Optional[str] = None
    location: Optional[str] = None
    role: Role
    status: Literal["Active", "Pending", "Offline"]
    created_at: date = Field(alias="createdAt")
    onboarded: bool
    preferences: Preferences

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = Field(default=None, alias="jobTitle")
    location: Optional[str] = None
    avatar: Optional[str] = None
    onboarded: Optional[bool] = None
    preferences: Optional[Preferences] = None

    model_config = ConfigDict(populate_by_name=True)


# ---------- Project ----------
class TeamMemberEmbed(BaseModel):
    name: str
    avatar: str
    role: str


class TasksCount(BaseModel):
    completed: int
    total: int


class ProjectCreate(BaseModel):
    name: str
    description: str = ""
    service_type: str = Field(alias="serviceType", default="")
    status: ProjectStatus = "Planning"
    priority: Priority = "Medium"
    start_date: str = Field(alias="startDate", default="")
    deadline: str = ""
    budget: Optional[str] = None

    model_config = ConfigDict(populate_by_name=True)


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    service_type: Optional[str] = Field(default=None, alias="serviceType")
    status: Optional[ProjectStatus] = None
    priority: Optional[Priority] = None
    progress: Optional[int] = None
    start_date: Optional[str] = Field(default=None, alias="startDate")
    deadline: Optional[str] = None
    budget: Optional[str] = None
    team_members: Optional[list[TeamMemberEmbed]] = Field(default=None, alias="teamMembers")

    model_config = ConfigDict(populate_by_name=True)


class ProjectOut(BaseModel):
    id: str
    name: str
    description: str
    service_type: str = Field(alias="serviceType")
    status: ProjectStatus
    priority: Priority
    progress: int
    start_date: str = Field(alias="startDate")
    deadline: str
    budget: Optional[str] = None
    team_members: list[TeamMemberEmbed] = Field(alias="teamMembers")
    tasks_count: TasksCount = Field(alias="tasksCount")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# ---------- Task ----------
class AssigneeEmbed(BaseModel):
    name: str
    avatar: str
    email: str


class TaskCreate(BaseModel):
    project_id: Optional[str] = Field(default=None, alias="projectId")
    title: str
    description: str = ""
    status: TaskStatus = "To Do"
    priority: Priority = "Medium"
    assignee: AssigneeEmbed
    due_date: str = Field(alias="dueDate", default="")

    model_config = ConfigDict(populate_by_name=True)


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[Priority] = None
    assignee: Optional[AssigneeEmbed] = None
    due_date: Optional[str] = Field(default=None, alias="dueDate")

    model_config = ConfigDict(populate_by_name=True)


class TaskOut(BaseModel):
    id: str
    project_id: Optional[str] = Field(default=None, alias="projectId")
    title: str
    description: str
    status: TaskStatus
    priority: Priority
    assignee: AssigneeEmbed
    due_date: str = Field(alias="dueDate")
    created_at: str = Field(alias="createdAt")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# ---------- File ----------
class FileCreate(BaseModel):
    project_id: Optional[str] = Field(default=None, alias="projectId")
    name: str
    size: str = ""
    type: str = ""
    category: Literal["Document", "Design", "Archive", "Code", "Media"] = "Document"
    uploaded_by: str = Field(alias="uploadedBy", default="")

    model_config = ConfigDict(populate_by_name=True)


class FileOut(BaseModel):
    id: str
    project_id: Optional[str] = Field(default=None, alias="projectId")
    name: str
    size: str
    type: str
    category: str
    uploaded_by: str = Field(alias="uploadedBy")
    uploaded_at: str = Field(alias="uploadedAt")
    url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# ---------- Service Requests ----------
class ServiceRequestCreate(BaseModel):
    service_id: str = Field(alias="serviceId")
    service_title: str = Field(alias="serviceTitle")
    category: str
    budget: str = ""
    notes: str = ""

    model_config = ConfigDict(populate_by_name=True)


class ServiceRequestOut(BaseModel):
    id: str
    service_id: str = Field(alias="serviceId")
    service_title: str = Field(alias="serviceTitle")
    category: str
    status: Literal["Requested", "Under Review", "In Progress", "Completed"]
    requested_at: str = Field(alias="requestedAt")
    estimated_delivery: str = Field(alias="estimatedDelivery")
    budget: str
    notes: str

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# ---------- Notifications ----------
class NotificationOut(BaseModel):
    id: str
    title: str
    message: str
    timestamp: str
    read: bool
    category: Literal["Project update", "Task assigned", "Payment update", "System notification", "Support response"]
    link: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# ---------- Messages ----------
class SenderEmbed(BaseModel):
    id: str
    name: str
    avatar: str
    isSelf: bool


class AttachmentEmbed(BaseModel):
    name: str
    size: str
    type: str


class ParticipantEmbed(BaseModel):
    name: str
    avatar: str
    role: str
    online: bool = False


class ConversationOut(BaseModel):
    id: str
    participant: ParticipantEmbed
    last_message: str = Field(alias="lastMessage")
    last_message_time: str = Field(alias="lastMessageTime")
    unread_count: int = Field(alias="unreadCount")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class MessageOut(BaseModel):
    id: str
    conversation_id: str = Field(alias="conversationId")
    sender: SenderEmbed
    text: str
    timestamp: str
    attachments: Optional[list[AttachmentEmbed]] = None

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class MessageCreate(BaseModel):
    text: str
    attachments: Optional[list[AttachmentEmbed]] = None


# ---------- Team ----------
class TeamMemberOut(BaseModel):
    id: str
    name: str
    email: str
    avatar: Optional[str] = None
    role: Role
    status: Literal["Active", "Pending", "Inactive"]
    department: str
    joined_date: str = Field(alias="joinedDate")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class TeamMemberInvite(BaseModel):
    name: str
    email: EmailStr
    role: Role = "Member"
    department: str = ""


class TeamMemberRoleUpdate(BaseModel):
    role: Role


# ---------- Billing ----------
class BillingPlanOut(BaseModel):
    id: str
    name: Literal["Starter", "Professional", "Business", "Enterprise"]
    price: str
    billing_period: Literal["monthly", "yearly"] = Field(alias="billingPeriod")
    features: list[str]
    is_popular: Optional[bool] = Field(default=None, alias="isPopular")
    is_current: Optional[bool] = Field(default=None, alias="isCurrent")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class InvoiceOut(BaseModel):
    id: str
    number: str
    date: str
    amount: str
    status: Literal["Paid", "Pending", "Overdue"]
    download_url: str = Field(alias="downloadUrl")
    description: str

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class UpgradePlanRequest(BaseModel):
    plan_id: str = Field(alias="planId")

    model_config = ConfigDict(populate_by_name=True)


# ---------- Support ----------
class SupportTicketCreate(BaseModel):
    subject: str
    category: Literal["Technical", "Billing", "Project", "Consulting", "General"]
    priority: Priority
    description: str


class SupportTicketOut(BaseModel):
    id: str
    ticket_number: str = Field(alias="ticketNumber")
    subject: str
    category: Literal["Technical", "Billing", "Project", "Consulting", "General"]
    priority: Priority
    description: str
    status: Literal["Open", "In Progress", "Resolved", "Closed"]
    created_at: str = Field(alias="createdAt")
    updated_at: str = Field(alias="updatedAt")
    attachments_count: Optional[int] = Field(default=None, alias="attachmentsCount")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class FAQOut(BaseModel):
    question: str
    answer: str

    model_config = ConfigDict(from_attributes=True)
