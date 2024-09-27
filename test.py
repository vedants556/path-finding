# Install OpenCV if not already installed
!pip install opencv-python-headless
import cv2
import numpy as np
import matplotlib.pyplot as plt
from google.colab import files
# Load the uploaded image
img = cv2.imread('image.jpg')
# Check if the image is loaded successfully
if img is None:
    print("Error: Could not load image. Please ensure the file name is correct and the file is uploaded.")
else:
    # Resize image
    resized_img = cv2.resize(img, (300, 300))
    # Convert to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Increase brightness
    bright_img = cv2.convertScaleAbs(img, alpha=1.2, beta=50)
    # Convert color images to RGB format for matplotlib
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    resized_img_rgb = cv2.cvtColor(resized_img, cv2.COLOR_BGR2RGB)
    bright_img_rgb = cv2.cvtColor(bright_img, cv2.COLOR_BGR2RGB)
    # Display images using matplotlib
    plt.figure(figsize=(12, 8))
    # Show Original Image
    plt.subplot(2, 2, 1)
    plt.imshow(img_rgb)
    plt.title('Original Image')
    plt.axis('off')
    # Show Resized Image
    plt.subplot(2, 2, 2)
    plt.imshow(resized_img_rgb)
    plt.title('Resized Image (300x300)')
    plt.axis('off')
    # Show Grayscale Image
    plt.subplot(2, 2, 3)
    plt.imshow(gray_img, cmap='gray')
    plt.title('Grayscale Image')
    plt.axis('off')
    # Show Brightened Image
    plt.subplot(2, 2, 4)
    plt.imshow(bright_img_rgb)
    plt.title('Brightened Image')
    plt.axis('off')
    # Adjust layout and show the plots
    plt.tight_layout()
    plt.show()