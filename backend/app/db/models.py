from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.db.base import Base
from sqlalchemy.orm import relationship

class UserModel(Base):
    __tablename__ = 'users'
    id = Column('id', Integer, primary_key=True, nullable=False, autoincrement=True)
    email = Column('email', String, nullable=False, unique=True)
    name = Column('name', String, nullable=False)
    password = Column('password', String, nullable=False)
    
class Category(Base):
    __tablename__ = "categories"
    id = Column('id', Integer, primary_key=True, nullable=False, autoincrement=True)
    description = Column('description', String, nullable=False)
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"
    id = Column('id', Integer, primary_key=True, nullable=False, autoincrement=True)
    description = Column('description', String, nullable=False)
    price = Column('price', Float, nullable=False)
    stock = Column('stock', Integer, nullable=False)
    category_id = Column('category_id', Integer, ForeignKey("categories.id"), nullable=False)
    category = relationship("Category", back_populates="products")