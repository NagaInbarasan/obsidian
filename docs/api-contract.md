# API Contract (v1)

## Base URL
All API requests should be prefixed with `/api/v1`

## Authentication
All currently implemented endpoints require a Bearer token in the `Authorization` header.
- Header format: `Authorization: Bearer <token>`
- Provided by B4 authentication middleware.

## Pagination Metadata Format
For endpoints returning paginated lists, the `pagination` object is included:
```json
"pagination": {
  "page": 1,
  "limit": 20,
  "total": 100,
  "totalPages": 5
}
```

---

## 1. Employees

### List Employees
- **METHOD:** GET
- **PATH:** `/employees`
- **Authentication:** Required
- **Parameters:** `?page=1&limit=20` (Optional)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid",
        "firstName": "Alice",
        "lastName": "Smith",
        "title": "Backend Engineer",
        "department": "Engineering"
      }
    ],
    "pagination": { ... }
  }
  ```

### Get Employee Basic Info
- **METHOD:** GET
- **PATH:** `/employees/:id`
- **Authentication:** Required
- **Response:** Basic employee JSON.

### Get Employee Profile
- **METHOD:** GET
- **PATH:** `/employees/:id/profile`
- **Authentication:** Required
- **Authorization:** User can only view their own profile unless they have `HR` or `Admin` role.
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "firstName": "Alice",
      ...
      "skills": [...],
      "experiences": [...],
      "projects": [...],
      "careerGoals": [...]
    }
  }
  ```

### Get Employee Matches
- **METHOD:** GET
- **PATH:** `/employees/:id/matches`
- **Authentication:** Required
- **Response:** List of matched roles for the employee.

---

## 2. Roles

### List Roles
- **METHOD:** GET
- **PATH:** `/roles`
- **Authentication:** Required
- **Parameters:** `?page=1&limit=20` (Optional)
- **Response:** Paginated list of roles.

### Get Role Details
- **METHOD:** GET
- **PATH:** `/roles/:id`
- **Authentication:** Required
- **Response:** Detailed role info including required skills (`RoleSkill`).

### Get Role Matches
- **METHOD:** GET
- **PATH:** `/roles/:id/matches`
- **Authentication:** Required
- **Authorization:** `HR` or `Admin` role.
- **Response:** List of employees matched to this role.

---

## 3. Skills

### List Skills
- **METHOD:** GET
- **PATH:** `/skills`
- **Authentication:** Required
- **Parameters:** `?page=1&limit=20` (Optional)
- **Response:** Paginated list of skills with their assigned `categoryId`.

---

## 4. Learning Resources

### List Learning Resources
- **METHOD:** GET
- **PATH:** `/learning-resources`
- **Authentication:** Required
- **Parameters:** `?page=1&limit=20` (Optional)
- **Response:** Paginated list of learning resources.

---

## Error Handling
Standard error structure:
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND | VALIDATION_ERROR | UNAUTHORIZED | FORBIDDEN | INTERNAL_SERVER_ERROR",
    "message": "Human readable message"
  }
}
```
