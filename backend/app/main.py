from fastapi import FastAPI
from app.routes.user_router import user_router
from app.routes.category_router import category_router
from app.routes.product_router import product_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

@app.get('/')
def health_check():
    return "Ok, it's working"

app.include_router(user_router)
app.include_router(category_router)
app.include_router(product_router)

