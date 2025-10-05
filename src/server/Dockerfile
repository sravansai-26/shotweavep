# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install all necessary packages, including Flask dependencies and Gunicorn
# Gunicorn must be in requirements.txt (added via pip freeze)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code (app.py, db.py, etc.)
COPY . /app

# Expose the port Gunicorn will bind to (Flask default)
EXPOSE 5000

# --- PRODUCTION RUN COMMAND ---
# Run the application using Gunicorn (the production WSGI server).
# app:app refers to the Flask instance named 'app' found in the 'app.py' file.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
