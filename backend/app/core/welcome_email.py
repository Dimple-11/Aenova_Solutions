import logging
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr

from app.core.config import settings

logger = logging.getLogger(__name__)


def send_client_welcome_email(name: str, recipient: str) -> bool:
    """Send a welcome message for a newly created client account."""
    username = settings.smtp_username.strip()
    password = settings.smtp_password.strip()
    sender = settings.smtp_from_email.strip() or username
    if not username or not password or not sender:
        logger.warning("Welcome email skipped: Gmail SMTP credentials are not configured.")
        return False

    first_name = (name or "there").strip().split()[0]
    message = EmailMessage()
    message["Subject"] = "Welcome to Aevona Solutions"
    message["From"] = formataddr((settings.smtp_from_name, sender))
    message["To"] = recipient
    message.set_content(
        f"""Hi {first_name},

Welcome to Aevona Solutions. Your client account is ready.

Sign in to your client portal: {settings.frontend_url.rstrip("/")}/login

If you did not create this account, please contact our support team.

The Aevona Solutions team
"""
    )

    try:
        if settings.smtp_use_ssl:
            with smtplib.SMTP_SSL(
                settings.smtp_host, settings.smtp_port, timeout=15,
                context=ssl.create_default_context(),
            ) as server:
                server.login(username, password)
                server.send_message(message)
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
                server.starttls(context=ssl.create_default_context())
                server.login(username, password)
                server.send_message(message)
        return True
    except (OSError, smtplib.SMTPException) as exc:
        logger.warning("Welcome email could not be sent: %s", exc)
        return False