from sqlalchemy.orm import Session
from app.db.models import Product
from app.schemas import ProductBase

class ProductUseCases:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def create_product(self, product: ProductBase):
        product_model = Product(
            description=product.description,
            price=product.price,
            stock=product.stock,
            category_id=product.category_id
        )
        self.db_session.add(product_model)
        self.db_session.commit()
        self.db_session.refresh(product_model)
        return product_model

    def get_products(self):
        return self.db_session.query(Product).all()