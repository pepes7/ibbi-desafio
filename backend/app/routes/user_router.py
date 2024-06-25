from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.depends import get_db_session
from app.auth_user import UserUseCases
from app.schemas import User, UserLogin

user_router = APIRouter(prefix='/user')

@user_router.post('/register')
def user_register(
    user: User,
    db_session: Session = Depends(get_db_session),
):
    uc = UserUseCases(db_session=db_session)
    uc.user_register(user=user)
    return JSONResponse(
        content={'message': 'User created successfully'},
        status_code=status.HTTP_201_CREATED
    )


@user_router.post('/login')
def user_register(
    request_form_user: UserLogin,
    db_session: Session = Depends(get_db_session),
):
    uc = UserUseCases(db_session=db_session)
    
    auth_data = uc.user_login(request_form_user.email, request_form_user.password)
    return JSONResponse(
        content=auth_data,
        status_code=status.HTTP_200_OK
    )