# Backend API Documentation

This documentation outlines the API endpoints available in the backend system, along with their expected payloads and responses.

## Installation
1. Clone the repository:

```bash
git clone https://github.com/nileshkorpad1/boo-backend-coding-test.git
```
2. Navigate to the project directory:

```bash
cd boo-backend-coding-test
```

3. Install dependencies using npm or yarn:

```bash
npm install
# or
yarn install

```

## Running Tests

To run tests using Yarn, execute the following command:

```bash
yarn test
```
## Running Test coverage

To run tests using Yarn, execute the following command:

```bash
yarn test:coverage
```

<img width="765" alt="image" src="https://github.com/nileshkorpad1/boo-backend-coding-test/assets/6122065/a82165cb-2217-4253-bf3e-3614daf54ef3">


## Base URL

The base URL for all API requests is 

##### localhost: `http://localhost:3000/api` 
##### Production: [https://bifrost-bxrl.onrender.com/api](https://bifrost-bxrl.onrender.com/api)


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
### 2. GET All Profiles

- **Method**: `GET`
- **Endpoint**: `api/profiles`
- **Description**: Create a new profile with the provided details.
- **Payload**: NA
- **Response**:
  ```json
  [
    {
    "_id": "60f7c7a726b9a3c4e8aa586e",
    "name": "Jane Doe",
    "phone": "987-654-3210",
    "email": "jane@example.com",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "createdAt": "2022-07-21T10:05:00.000Z"
  },
    {
    "_id": "60f7c7a726b9a3c4e8aa586d",
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john@example.com",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "createdAt": "2022-07-21T10:00:00.000Z"
  }
  ]
  ```
### 3. Update Profile

- **Method**: `PUT`
- **Endpoint**: `api/profiles/:id`
- **Description**: Updates an existing profile.
- **Payload**:
 ```json
  {
    "name": "John Doe",
  "phone": "123-456-7890",
  "email": "john@example.com",
  "description": "Updated description"
  }
  ```
- **Response**:
 ```json
 {
  "message": "Profile updated successfully"
}
 ```
### 4. Delete Profile

- **Method**: `DELETE`
- **Endpoint**: `api/profiles/:id`
- **Description**: Updates an existing profile.
- **Payload**:
 ```json
  {
    "name": "John Doe",
  "phone": "123-456-7890",
  "email": "john@example.com",
  "description": "Updated description"
  }
  ```
- **Response**:
 ```json
 {
  "message": "Profile updated successfully"
}
 ```
### 5. Get Profile by ID

- **Method**: `GET`
- **Endpoint**: `api/profiles/:id`
- **Description**: Retrieves a profile by its ID.
- **Payload**: N/A
- **Response**:
```json
{
  "_id": "60f7c7a726b9a3c4e8aa586d",
  "name": "John Doe",
  "phone": "123-456-7890",
  "email": "john@example.com",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "createdAt": "2022-07-21T10:00:00.000Z"
}
```
### 6. Create Comment

- **Method**: `POST`
- **Endpoint**: `api/comments`
- **Description**: Creates a new comment.
- **Payload**:
```json
{
  "profileId": "60f7c7a726b9a3c4e8aa586e",
  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}
```
- **Response**:
```json
{
  "message": "Comment created successfully",
  "comment": {
    "_id": "60f7c7a726b9a3c4e8aa586d",
    "profileId": "60f7c7a726b9a3c4e8aa586e",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "createdAt": "2022-07-21T10:00:00.000Z"
  }
}

```
### 7. Get All Comments

- **Method**: `GET`
- **Endpoint**: `api/comments`
- **Description**: Retrieves all comments.
- **Payload**: N/A
- **Response**:
```json
[
  {
    "_id": "60f7c7a726b9a3c4e8aa586d",
    "profileId": "60f7c7a726b9a3c4e8aa586e",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "createdAt": "2022-07-21T10:00:00.000Z"
  },
  {
    "_id": "60f7c7a726b9a3c4e8aa586e",
    "profileId": "60f7c7a726b9a3c4e8aa586f",
    "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "createdAt": "2022-07-21T10:05:00.000Z"
  }
  // More comments...
]

```
### 8. Get Comment by ID

- **Method**: `GET`
- **Endpoint**: `api/comments/:id`
- **Description**: Retrieves a comment by its ID.
- **Payload**: N/A
- **Response**:
```json
{
  "_id": "60f7c7a726b9a3c4e8aa586d",
  "profileId": "60f7c7a726b9a3c4e8aa586e",
  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "createdAt": "2022-07-21T10:00:00.000Z"
}
```
### 9. Update Comment

- **Method**: `PUT`
- **Endpoint**: `api/comments/:id`
- **Description**: Retrieves a comment by its ID.
- **Payload**:
```json
{
  "text": "Updated comment text"
}

```
- **Response**:
```json
{
  "message": "Comment updated successfully"
}
```
### 10. Delete Comment

- **Method**: `DELETE`
- **Endpoint**: `api/comments/:id`
- **Description**: Deletes a comment by its ID.
- **Payload**: N/A
- **Response**:
```json
{
  "message": "Comment deleted successfully"
}
```
### 11. Submit Vote

- **Endpoint**: `POST /votes`
- **Description**: Submit a vote for a specific profile's personality.
- **Payload**:
```json
{
  "profileId": "60f7c7a726b9a3c4e8aa586d",
  "personalitySystem": "MBTI",
  "personalityType": "INFP"
}
```
- **Payload**:
```json
{
  "message": "Vote submitted successfully"
}
```

### Error Handling
If an error occurs while processing a request, the API will respond with an appropriate error message and status code. Error responses will include a JSON object with a message field describing the error.

