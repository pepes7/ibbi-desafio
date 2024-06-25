# app/use_cases/category_use_cases.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.db.models import Category
from app.schemas import CategoryBase

class CategoryUseCases:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def create_category(self, category: CategoryBase):
        category_model = Category(description=category.description)
        self.db_session.add(category_model)
        self.db_session.commit()
        self.db_session.refresh(category_model)
        return category_model

    def get_categories(self):
        return self.db_session.query(Category).all()
