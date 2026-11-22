import json

import numpy as np
import tensorflow as tf

from backend.app.schemas.prediction_schema import PredictionResponse
from model.model_config import CLASS_NAMES_PATH, MODEL_PATH


with CLASS_NAMES_PATH.open(encoding="utf-8") as class_names_file:
    CLASS_NAMES: list[str] = json.load(class_names_file)

model = tf.keras.models.load_model(str(MODEL_PATH), compile=False)


def predict_image(image_array: np.ndarray) -> PredictionResponse:
    predictions = model.predict(image_array, verbose=0)
    predicted_index = int(np.argmax(predictions[0]))

    return PredictionResponse(
        disease=CLASS_NAMES[predicted_index],
        confidence=round(float(predictions[0][predicted_index]), 4),
    )
