import uuid
from datetime import datetime, date

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


def gen_id(prefix: str) -> str:
    return f"{prefix}-{uuid.uuid4().hex[:12]}"


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("user"))
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    avatar: Mapped[str | None] = mapped_column(String, nullable=True)
    company: Mapped[str | None] = mapped_column(String, nullable=True)
    job_title: Mapped[str | None] = mapped_column(String, nullable=True)
    phone: Mapped[str | None] = mapped_column(String, nullable=True)
    location: Mapped[str | None] = mapped_column(String, nullable=True)
    role: Mapped[str] = mapped_column(String, default="Owner")
    status: Mapped[str] = mapped_column(String, default="Active")
    created_at: Mapped[date] = mapped_column(Date, default=date.today)
    onboarded: Mapped[bool] = mapped_column(Boolean, default=False)
    is_email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    preferences: Mapped[dict] = mapped_column(
        JSON,
        default=lambda: {
            "emailNotifications": True,
            "projectUpdates": True,
            "taskNotifications": True,
            "marketingEmails": False,
            "securityAlerts": True,
            "language": "English (US)",
            "timezone": "PST (UTC-8)",
            "dateFormat": "MM/DD/YYYY",
            "theme": "light",
        },
    )


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("prt"))
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"))
    token: Mapped[str] = mapped_column(String, unique=True, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime)
    used: Mapped[bool] = mapped_column(Boolean, default=False)


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("proj"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    service_type: Mapped[str] = mapped_column(String, default="")
    status: Mapped[str] = mapped_column(String, default="Planning")
    priority: Mapped[str] = mapped_column(String, default="Medium")
    progress: Mapped[int] = mapped_column(Integer, default=0)
    start_date: Mapped[str] = mapped_column(String, default="")
    deadline: Mapped[str] = mapped_column(String, default="")
    budget: Mapped[str | None] = mapped_column(String, nullable=True)
    team_members: Mapped[list] = mapped_column(JSON, default=list)  # [{name, avatar, role}]

    tasks: Mapped[list["ProjectTask"]] = relationship(back_populates="project", cascade="all, delete-orphan")
    files: Mapped[list["ProjectFile"]] = relationship(back_populates="project", cascade="all, delete-orphan")

    @property
    def tasks_count(self) -> dict:
        total = len(self.tasks)
        completed = len([t for t in self.tasks if t.status == "Completed"])
        return {"completed": completed, "total": total}


class ProjectTask(Base):
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("task"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    project_id: Mapped[str | None] = mapped_column(ForeignKey("projects.id"), nullable=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String, default="To Do")
    priority: Mapped[str] = mapped_column(String, default="Medium")
    assignee: Mapped[dict] = mapped_column(JSON, default=dict)  # {name, avatar, email}
    due_date: Mapped[str] = mapped_column(String, default="")
    created_at: Mapped[str] = mapped_column(String, default=lambda: date.today().isoformat())

    project: Mapped["Project | None"] = relationship(back_populates="tasks")


class ProjectFile(Base):
    __tablename__ = "files"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("file"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    project_id: Mapped[str | None] = mapped_column(ForeignKey("projects.id"), nullable=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    size: Mapped[str] = mapped_column(String, default="")
    type: Mapped[str] = mapped_column(String, default="")
    category: Mapped[str] = mapped_column(String, default="Document")
    uploaded_by: Mapped[str] = mapped_column(String, default="")
    uploaded_at: Mapped[str] = mapped_column(String, default=lambda: date.today().isoformat())
    url: Mapped[str | None] = mapped_column(String, nullable=True)

    project: Mapped["Project | None"] = relationship(back_populates="files")


class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("req"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    service_id: Mapped[str] = mapped_column(String)
    service_title: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String, default="")
    status: Mapped[str] = mapped_column(String, default="Requested")
    requested_at: Mapped[str] = mapped_column(String, default=lambda: date.today().isoformat())
    estimated_delivery: Mapped[str] = mapped_column(String, default="")
    budget: Mapped[str] = mapped_column(String, default="")
    notes: Mapped[str] = mapped_column(Text, default="")


class NotificationItem(Base):
    __tablename__ = "notifications"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("notif"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    title: Mapped[str] = mapped_column(String)
    message: Mapped[str] = mapped_column(Text)
    timestamp: Mapped[str] = mapped_column(String, default=lambda: datetime.utcnow().isoformat())
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    category: Mapped[str] = mapped_column(String, default="System notification")
    link: Mapped[str | None] = mapped_column(String, nullable=True)


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("conv"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    participant: Mapped[dict] = mapped_column(JSON, default=dict)  # {name, avatar, role, online}
    last_message: Mapped[str] = mapped_column(String, default="")
    last_message_time: Mapped[str] = mapped_column(String, default="")
    unread_count: Mapped[int] = mapped_column(Integer, default=0)

    messages: Mapped[list["MessageItem"]] = relationship(back_populates="conversation", cascade="all, delete-orphan")


class MessageItem(Base):
    __tablename__ = "messages"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("msg"))
    conversation_id: Mapped[str] = mapped_column(ForeignKey("conversations.id"), index=True)
    sender: Mapped[dict] = mapped_column(JSON, default=dict)  # {id, name, avatar, isSelf}
    text: Mapped[str] = mapped_column(Text)
    timestamp: Mapped[str] = mapped_column(String, default=lambda: datetime.utcnow().isoformat())
    attachments: Mapped[list | None] = mapped_column(JSON, nullable=True)

    conversation: Mapped["Conversation"] = relationship(back_populates="messages")


class TeamMember(Base):
    __tablename__ = "team_members"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("team"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    avatar: Mapped[str | None] = mapped_column(String, nullable=True)
    role: Mapped[str] = mapped_column(String, default="Member")
    status: Mapped[str] = mapped_column(String, default="Pending")
    department: Mapped[str] = mapped_column(String, default="")
    joined_date: Mapped[str] = mapped_column(String, default=lambda: date.today().isoformat())


class BillingPlan(Base):
    __tablename__ = "billing_plans"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("plan"))
    name: Mapped[str] = mapped_column(String)
    price: Mapped[str] = mapped_column(String)
    billing_period: Mapped[str] = mapped_column(String, default="monthly")
    features: Mapped[list] = mapped_column(JSON, default=list)
    is_popular: Mapped[bool] = mapped_column(Boolean, default=False)


class Subscription(Base):
    __tablename__ = "subscriptions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("sub"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    plan_id: Mapped[str] = mapped_column(ForeignKey("billing_plans.id"))
    renews_on: Mapped[str] = mapped_column(String, default="")


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("inv"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    number: Mapped[str] = mapped_column(String)
    date: Mapped[str] = mapped_column(String)
    amount: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String, default="Paid")
    download_url: Mapped[str] = mapped_column(String, default="#")
    description: Mapped[str] = mapped_column(String, default="")


class SupportTicket(Base):
    __tablename__ = "support_tickets"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("ticket"))
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    ticket_number: Mapped[str] = mapped_column(String)
    subject: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String, default="General")
    priority: Mapped[str] = mapped_column(String, default="Medium")
    description: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String, default="Open")
    created_at: Mapped[str] = mapped_column(String, default=lambda: date.today().isoformat())
    updated_at: Mapped[str] = mapped_column(String, default=lambda: date.today().isoformat())
    attachments_count: Mapped[int] = mapped_column(Integer, default=0)


class FAQ(Base):
    __tablename__ = "faqs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: gen_id("faq"))
    question: Mapped[str] = mapped_column(String)
    answer: Mapped[str] = mapped_column(Text)
class Admin(Base):
    __tablename__ = "admins"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        default=lambda: gen_id("admin"),
    )
    username: Mapped[str] = mapped_column(
        String,
        unique=True,
        index=True,
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, default="Active")
    created_at: Mapped[date] = mapped_column(Date, default=date.today)