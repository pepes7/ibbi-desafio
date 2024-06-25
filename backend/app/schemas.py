from pydantic import BaseModel

class User(BaseModel):
    name: str
    password: str
    email: str
    

class UserLogin(BaseModel):
    email: str
    password: str
    
class CategoryBase(BaseModel):
    description: str
    
class ProductBase(BaseModel):
    description: str
    price: float
    stock: int
    category_id: int
