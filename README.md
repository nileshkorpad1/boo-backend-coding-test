# Backend API Documentation

This documentation outlines the API endpoints available in the backend system, along with their expected payloads and responses.

## Base URL

The base URL for all API requests is `http://localhost:3000/api`.

## Endpoints

### 1. Create Profile

- **Endpoint**: `POST /profiles`
- **Description**: Create a new profile with the provided details.
- **Payload**:
  ```json
  {
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john@example.com",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
  ```
- **Response**:
  ```json
  {
  "message": "Profile created successfully",
  "profile": {
    "_id": "60f7c7a726b9a3c4e8aa586d",
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john@example.com",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "createdAt": "2022-07-21T10:00:00.000Z"
  }
}

  ```
  
