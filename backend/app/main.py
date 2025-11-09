from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import grievance
from app.routes import grievance, analytics


app = FastAPI(
    title="AI-Powered Grievance Management System",
    description="Backend for IGRS — powered by NLP, Gemini AI, and analytics",
    version="1.0.0",
)

#Frontend calling APIs
origin = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Routers
app.include_router(grievance.router)
app.include_router(analytics.router)

# app.include_router(chatbot.router)

@app.get("/")
def root():
    return{"message": "IGRS Backend is running!"}