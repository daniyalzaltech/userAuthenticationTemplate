# main.py

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import User
from schemas import UserCreate, UserLogin
from fastapi.middleware.cors import CORSMiddleware

import random

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup/")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(username=user.username, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/login/")
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user_login.username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.password != user_login.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    
    # For demonstration purposes, generate a random token
    token = str(random.randint(1000, 9999))
    return {"token": token}
