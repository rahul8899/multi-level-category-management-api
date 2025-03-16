# Project Name

## Description

This is a multi-level category management API that allows users to manage categories and subcategories in a hierarchical structure.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Details](#api-details)
- [Contributing](#contributing)
- [License]

## Installation

1. Clone the repository.
2. Install the dependencies using the package manager of your choice.
   ```bash
   npm install
   ```

## Usage

1. Configure the necessary environment variables.
2. Start the development server.
   ```bash
   npm start
   ```

# API Documentation

## API Details

### Endpoints

#### **Auth Routes**

1. **`POST /api/auth/register`**: Register a new user.

   - **Description**: Registers a user by accepting email and password. Validates the email, and if the user already exists, it returns an error. On success, it creates the user and returns a success message.
   - **Request Body Example**:
     ```json
     {
       "email": "user@example.com",
       "password": "Password123!"
     }
     ```
   - **Middleware**: `bodyValidator(userSchema)` validates the incoming request body.

2. **`POST /api/auth/login`**: Login an existing user.
   - **Description**: Logs in a user by verifying the provided email and password. On successful login, it returns a JWT token for subsequent API calls.
   - **Request Body Example**:
     ```json
     {
       "email": "user@example.com",
       "password": "Password123!"
     }
     ```

---

#### **Category Routes**

3. **`POST /api/category/`**: Create a new category.

   - **Description**: Creates a new category in the system. It optionally accepts a `parent_id` to create a subcategory.
   - **Request Body Example**:
     ```json
     {
       "name": "Electronics",
       "parent_id": "optional-parent-id"
     }
     ```
   - **Middleware**: `Auth` - Requires a valid JWT token to access this route.
   - **Middleware**: `bodyValidator(categorySchema)` validates the request body against the category schema.

4. **`GET /api/category/`**: Fetch all categories.

   - **Description**: Retrieves a list of all categories, along with any child categories in a hierarchical structure.
   - **Middleware**: `Auth` - Requires a valid JWT token to access this route.

5. **`PUT /api/category/:id`**: Update an existing category by ID.

   - **Description**: Updates the name or status of a category with the provided `id`.
   - **Request Body Example**:
     ```json
     {
       "name": "Updated Category Name",
       "status": "active"
     }
     ```
   - **Middleware**: `Auth` - Requires a valid JWT token to access this route.
   - **Middleware**: `bodyValidator(categoryUpdateSchema)` validates the incoming body for category updates.

6. **`DELETE /api/category/:id`**: Delete a category by ID.
   - **Description**: Deletes a category and updates its child categories (if any) to reflect the deletion.
   - **Middleware**: `Auth` - Requires a valid JWT token to access this route.

---

### Request Examples

#### **Auth Routes**

1. **Register User**

   - **Endpoint**: `POST /api/auth/register`
   - **Request Example**:
     ```json
     {
       "email": "user@example.com",
       "password": "Password123!"
     }
     ```

2. **Login User**
   - **Endpoint**: `POST /api/auth/login`
   - **Request Example**:
     ```json
     {
       "email": "user@example.com",
       "password": "Password123!"
     }
     ```

---

#### **Category Routes**

1. **Create Category**

   - **Endpoint**: `POST /api/category/`
   - **Request Example**:
     ```json
     {
       "name": "Electronics",
       "parent_id": "optional-parent-id"
     }
     ```

2. **Fetch Categories**

   - **Endpoint**: `GET /api/category/`
   - **Request Example**:
     - No request body required.

3. **Update Category**

   - **Endpoint**: `PUT /api/category/:id`
   - **Request Example**:
     ```json
     {
       "name": "Updated Category Name",
       "status": "active"
     }
     ```

4. **Delete Category**
   - **Endpoint**: `DELETE /api/category/:id`
   - **Request Example**:
     - No request body required, just pass the `id` in the URL to delete the category.

---

## Middleware Description

1. **`bodyValidator`**: A middleware that validates the body of the request against the provided schema (e.g., `userSchema`, `categorySchema`, `categoryUpdateSchema`).
2. **`Auth`**: A middleware that checks for a valid JWT token in the request header. Only authenticated users can access the protected routes.

---
