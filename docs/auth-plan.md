# Authentication & Security (B4) Plan

## Overview
This document outlines the authentication strategy implemented for the Obsidian prototype. We use JSON Web Tokens (JWT) for stateless authentication.

## Database Changes
- Added `passwordHash` to `Employee` model.
- Added `systemRole` to `Employee` model (defaults to `EMPLOYEE`).

## Endpoints

### Register User
- **METHOD:** POST
- **PATH:** `/api/v1/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "password": "securepassword123",
    "systemRole": "EMPLOYEE" // Optional
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "employee": { ... },
      "token": "jwt-token-here"
    }
  }
  ```

### Login
- **METHOD:** POST
- **PATH:** `/api/v1/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```

### Get Current User
- **METHOD:** GET
- **PATH:** `/api/v1/auth/me`
- **Authentication:** Required (Bearer Token)
- **Response:** Returns the decoded JWT payload `{ id, role, email, iat, exp }`.

## Middleware
- `authenticate`: Added actual `jsonwebtoken` verification for protected routes.
- `requireRole`: Standardized role-checking middleware for RBAC.

## Dependencies
- `jsonwebtoken`
- `bcrypt`
