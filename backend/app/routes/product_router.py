from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.depends import get_db_session, token_verifier
from app.schemas import ProductBase
from app.routes.product_use_cases import ProductUseCases

product_router = APIRouter(prefix='/product', dependencies=[Depends(token_verifier)])

@product_router.post("")
def create_product(
    product: ProductBase,
    db_session: Session = Depends(get_db_session),
):
    use_case = ProductUseCases(db_session)
    return use_case.create_product(product)

@product_router.get("/find-all")
def read_products(db: Session = Depends(get_db_session)):
    use_case = ProductUseCases(db)
    return use_case.get_products()
