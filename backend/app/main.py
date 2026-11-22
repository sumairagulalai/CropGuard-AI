from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routes.prediction import router as prediction_router


app = FastAPI(title="CropGuard AI API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home() -> dict[str, str | bool]:
    return {
        "status": "CropGuard AI API is running",
        "model_loaded": True,
    }


app.include_router(prediction_router)
