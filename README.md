
# 🧾 NGO-Donation API – Auth Routes

This document describes the authentication-related API endpoints for both **Users** and **NGOs** in the NGO Donation Platform. These include routes for **registering**, **logging in**, and **logging out**.

---

## 📌 Base URL

```
http://localhost:5000/api
```

---

## 🔐 USER ROUTES

### ✅ Register a New User

**Endpoint:**
```
POST /api/user/register
```

**Body Parameters:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "strongPassword123"
}
```

**Success Response:**
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

### 🔑 Login User

**Endpoint:**
```
POST /api/user/login
```

**Body Parameters:**
```json
{
  "email": "john@example.com",
  "password": "strongPassword123"
}
```

**Success Response:**
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Cookies Set:**
- `token=<JWT_TOKEN>` (HttpOnly cookie)

---

### 🚪 Logout User

**Endpoint:**
```
POST /api/user/logout
```

**Headers (Optional):**
- Cookie: `token=<JWT_TOKEN>`

**Success Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## 🧾 NGO ROUTES

### ✅ Register a New NGO

**Endpoint:**
```
POST /api/ngo/register
```

**Body Parameters:**
```json
{
  "name": "Helping Hands",
  "email": "ngo@example.com",
  "password": "securePass123",
  "phone": "9876543210",
  "address": {
    "street": "123 Main Street",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "pincode": "110001"
  }
}
```

**Success Response:**
```json
{
  "token": "<JWT_TOKEN>",
  "ngo": {
    "_id": "ngo_id_here",
    "name": "Helping Hands",
    "email": "ngo@example.com"
  }
}
```

---

### 🔑 Login NGO

**Endpoint:**
```
POST /api/ngo/login
```

**Body Parameters:**
```json
{
  "email": "ngo@example.com",
  "password": "securePass123"
}
```

**Success Response:**
```json
{
  "token": "<JWT_TOKEN>",
  "ngo": {
    "_id": "ngo_id_here",
    "name": "Helping Hands",
    "email": "ngo@example.com"
  }
}
```

---

## 🧠 Notes

- All tokens are JWTs signed using a secret (`JWT_SECRET`) and returned via both **JSON** and **cookies**.
- Authenticated routes should include either:
  - `Authorization: Bearer <token>` header
  - OR the token as a cookie
- You should use middleware (`authUser`, `authNGO`) to protect your private routes.
- Make sure to handle environment variables using `.env`:
  ```
  JWT_SECRET=your_secret_key
  ```

---

## 🧪 Testing in Postman

1. Set `Content-Type: application/json`
2. For protected routes, either:
   - Include the `Authorization: Bearer <token>` header.
   - Or use Postman’s cookies tab to add the token.

---
