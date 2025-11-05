from fastapi import APIRouter, HTTPException
from app.db import models, schemas, connection
from app.services.nlp_processor import process_grievance

router = APIRouter(prefix="/grievance", tags=["Grievance"])

@router.post("/submit", response_model=schemas.GrievanceResponse)
def submit_grievance(grievance: schemas.GrievanceCreate):
    db = connection.SessionLocal()
    try:
        processed = process_grievance(grievance.description)
        new_grievance = models.Grievance(**processed)
        db.add(new_grievance)
        db.commit()
        db.refresh(new_grievance)
        return new_grievance
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()
