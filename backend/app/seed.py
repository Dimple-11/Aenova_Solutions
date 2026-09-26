from sqlalchemy.orm import Session

from app.models import FAQ, BillingPlan

DEFAULT_PLANS = [
    {
        "name": "Starter",
        "price": "$199",
        "billing_period": "monthly",
        "features": ["1 active project", "5 GB storage", "2 team seats", "Email support"],
        "is_popular": False,
    },
    {
        "name": "Professional",
        "price": "$799",
        "billing_period": "monthly",
        "features": ["10 active projects", "100 GB storage", "15 team seats", "Priority support"],
        "is_popular": True,
    },
    {
        "name": "Business",
        "price": "$1,999",
        "billing_period": "monthly",
        "features": ["Unlimited projects", "500 GB storage", "50 team seats", "Dedicated account manager"],
        "is_popular": False,
    },
    {
        "name": "Enterprise",
        "price": "Custom",
        "billing_period": "monthly",
        "features": ["Unlimited everything", "Custom SLA", "Unlimited seats", "24/7 white-glove support"],
        "is_popular": False,
    },
]

DEFAULT_FAQS = [
    {
        "question": "How do I request a new service or project?",
        "answer": "Navigate to the Services page from your dashboard, choose the service you need, and submit a request with your budget and requirements.",
    },
    {
        "question": "How can I invite teammates to my workspace?",
        "answer": "Go to Team & Access Control, click Invite Team Member, and provide their name, email, role, and department.",
    },
    {
        "question": "Where can I download my invoices?",
        "answer": "All invoices are available under Billing & Subscription in the Billing History section as downloadable PDFs.",
    },
]


def seed_defaults(db: Session) -> None:
    if db.query(BillingPlan).count() == 0:
        for plan in DEFAULT_PLANS:
            db.add(BillingPlan(**plan))
    if db.query(FAQ).count() == 0:
        for faq in DEFAULT_FAQS:
            db.add(FAQ(**faq))
    db.commit()
