from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from .connection import Base

class Grievance(Base):
    __tablename__ = "grievances"
    
    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text)
    category = Column(String(100))
    priority = Column(String(50))
    region = Column(String(150))
    latitude = Column(String(50))
    longitude = Column(String(50))
    solution = Column(Text)
    status = Column(String(50), default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    