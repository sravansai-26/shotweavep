# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code (app.py, db.py, etc.)
# The dot '.' refers to the current folder where the Dockerfile is located (the project root)
COPY . /app

# Expose the port Flask listens on
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]