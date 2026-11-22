from pathlib import Path


MODEL_DIR = Path(__file__).resolve().parent
MODEL_PATH = MODEL_DIR / "cropguard_model.keras"
CLASS_NAMES_PATH = MODEL_DIR / "class_names.json"
IMAGE_SIZE = (224, 224)
