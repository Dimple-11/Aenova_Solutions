from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import Conversation, MessageItem, User
from app.schemas import ConversationOut, MessageCreate, MessageOut

router = APIRouter(prefix="/api/conversations", tags=["messages"])


def _get_owned_conversation(conversation_id: str, current_user: User, db: Session) -> Conversation:
    conversation = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id, Conversation.owner_id == current_user.id)
        .first()
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found.")
    return conversation


@router.get("", response_model=list[ConversationOut])
def list_conversations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Conversation).filter(Conversation.owner_id == current_user.id).all()


@router.get("/{conversation_id}/messages", response_model=list[MessageOut])
def list_messages(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = _get_owned_conversation(conversation_id, current_user, db)
    return (
        db.query(MessageItem)
        .filter(MessageItem.conversation_id == conversation.id)
        .order_by(MessageItem.timestamp.asc())
        .all()
    )


@router.post("/{conversation_id}/messages", response_model=MessageOut, status_code=201)
def send_message(
    conversation_id: str,
    payload: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = _get_owned_conversation(conversation_id, current_user, db)
    message = MessageItem(
        conversation_id=conversation.id,
        sender={
            "id": current_user.id,
            "name": current_user.name,
            "avatar": current_user.avatar or "",
            "isSelf": True,
        },
        text=payload.text,
        attachments=[a.model_dump() for a in payload.attachments] if payload.attachments else None,
    )
    db.add(message)
    conversation.last_message = payload.text
    conversation.last_message_time = "Just now"
    db.add(conversation)
    db.commit()
    db.refresh(message)
    return message
