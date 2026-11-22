from io import BytesIO

import numpy as np
from PIL import Image, UnidentifiedImageError

from model.model_config import IMAGE_SIZE


class ImageProcessingError(ValueError):
    pass


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    try:
        with Image.open(BytesIO(image_bytes)) as image:
            resized_image = image.convert("RGB").resize(IMAGE_SIZE)
            image_array = np.asarray(resized_image, dtype=np.float32)
    except (UnidentifiedImageError, OSError, ValueError) as error:
        raise ImageProcessingError("Uploaded file is not a valid image.") from error

    return np.expand_dims(image_array, axis=0)
