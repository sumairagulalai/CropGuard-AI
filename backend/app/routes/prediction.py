from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.app.schemas.prediction_schema import PredictionResponse
from backend.app.services.prediction_service import predict_image
from backend.app.utils.image_processing import (
    ImageProcessingError,
    preprocess_image,
)


router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)) -> PredictionResponse:
    image_bytes = await file.read()
    try:
        image_array = preprocess_image(image_bytes)
    except ImageProcessingError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    return predict_image(image_array)
