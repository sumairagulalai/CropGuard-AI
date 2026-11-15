import io
from pathlib import Path

import numpy as np
import tensorflow as tf

from PIL import Image
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware


# 1. FastAPI application
app = FastAPI(title="CropGuard AI API")


# 2. Frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# 3. Model file path
APP_DIR = Path(__file__).resolve().parent

BASE_DIR = (
    APP_DIR.parent
    if APP_DIR.name == "backend"
    else APP_DIR
)

MODEL_PATH = BASE_DIR / "model" / "cropguard_model.keras"


# 4. All 24 trained classes
CLASS_NAMES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy"
]


# 5. Load trained AI model
model = tf.keras.models.load_model(
    str(MODEL_PATH),
    compile=False
)


# 6. Home API
@app.get("/")
def home():
    return {
        "status": "CropGuard AI API is running",
        "model_loaded": True
    }


# 7. Disease prediction API
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try:
        image_bytes = await file.read()

        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

        image = image.resize((224, 224))

        image_array = np.array(
            image,
            dtype=np.float32
        )

        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        predictions = model.predict(
            image_array,
            verbose=0
        )

        predicted_index = int(
            np.argmax(predictions[0])
        )

        disease = CLASS_NAMES[predicted_index]

        confidence = float(
            predictions[0][predicted_index]
        )

        return {
            "disease": disease,
            "confidence": round(confidence, 4)
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=f"Prediction failed: {str(e)}"
        )