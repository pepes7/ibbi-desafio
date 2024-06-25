from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.depends import get_db_session, token_verifier
from app.schemas import CategoryBase
from app.routes.category_use_cases import CategoryUseCases

category_router = APIRouter(prefix='/category', dependencies=[Depends(token_verifier)])

@category_router.post("")
def user_register(
    user: CategoryBase,
    db_session: Session = Depends(get_db_session),
):
    use_case = CategoryUseCases(db_session=db_session)
    return use_case.create_category(category=user)

@category_router.get("/find-all")
def read_categories(db: Session = Depends(get_db_session)):
    use_case = CategoryUseCases(db)
    return use_case.get_categories()