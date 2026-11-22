---
title: CropGuard AI
emoji: 🌱
colorFrom: green
colorTo: yellow
sdk: docker
app_port: 8000
---

# CropGuard AI

AI-powered crop leaf disease detection using a TensorFlow/Keras model and a React frontend.

## Project structure

```text
backend/
  app/
    main.py
    routes/prediction.py
    schemas/prediction_schema.py
    services/prediction_service.py
    utils/image_processing.py
  requirements.txt
frontend/
  src/
    assets/        # Images and image registry
    components/    # Shared interface components
    data/          # Crop, disease, and navigation data
    pages/         # Application screens
    App.jsx
    main.jsx
model/
  class_names.json
  cropguard_model.keras
  model_config.py
  train.py
docs/
```

## Run locally

Start the API from the repository root:

```bash
python -m pip install -r backend/requirements.txt
python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The API exposes `GET /` and `POST /predict` (multipart form field: `file`). The frontend currently uses its local demo flow for sign-in and detections; it is not yet connected to the prediction API.

## Model

The prediction API loads `model/cropguard_model.keras` and uses the ordered labels in `model/class_names.json`. Keep the label order aligned with the model's training classes.
