from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import Conversation, MessageItem, TeamMember, User
from app.schemas import ConversationCreate, ConversationOut, MessageCreate, MessageOut

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


@router.post("", response_model=ConversationOut, status_code=201)
def create_conversation(
    payload: ConversationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    member = (
        db.query(TeamMember)
        .filter(TeamMember.id == payload.team_member_id, TeamMember.owner_id == current_user.id)
        .first()
    )
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found.")

    conversations = db.query(Conversation).filter(Conversation.owner_id == current_user.id).all()
    existing = next(
        (conversation for conversation in conversations
         if isinstance(conversation.participant, dict) and conversation.participant.get("id") == member.id),
        None,
    )
    if existing:
        return existing

    conversation = Conversation(
        owner_id=current_user.id,
        participant={
            "id": member.id,
            "name": member.name,
            "avatar": member.avatar or "",
            "role": member.role,
            "online": member.status == "Active",
        },
        last_message="",
        last_message_time="",
        unread_count=0,
    )
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


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
