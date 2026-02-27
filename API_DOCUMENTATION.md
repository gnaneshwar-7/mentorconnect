# 🚀 MentorConnect API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## 📚 MENTORS API

### GET /mentors
Get all mentors (sorted by newest first)
```javascript
Response: Array of mentor objects
```

### GET /mentors/:id
Get single mentor by ID
```javascript
Response: Single mentor object
```

### POST /mentors
Create a new mentor
```javascript
Request Body: {
  "name": "string (required, min 3 chars)",
  "email": "string (optional, valid email)",
  "domain": "enum (required): Web Development | Data Science & ML | Core CS / DSA | Higher Studies / Research | Career & Internships | Cybersecurity | Mobile Development | Cloud Computing | Other",
  "mode": "enum (required): Online | Offline | Hybrid",
  "experience": "number (required, 0-50)",
  "skills": "array of strings (required, min 1)",
  "rating": "number (optional, 1-5, default 4.5)"
}

Response: {
  "success": true,
  "message": "Mentor created successfully",
  "data": { mentor object }
}

Error Responses:
- 409: Duplicate mentor (same name + domain)
- 400: Validation error
```

### PUT /mentors/:id
Update existing mentor
```javascript
Request Body: (same as POST, all fields optional)

Response: {
  "success": true,
  "message": "Mentor updated successfully",
  "data": { updated mentor }
}
```

### DELETE /mentors/:id
Delete a mentor
```javascript
Response: {
  "success": true,
  "message": "Mentor deleted successfully",
  "data": { deleted mentor }
}
```

---

## 🗓️ SESSIONS API

### GET /sessions
Get all sessions (with populated mentor data)
```javascript
Response: Array of session objects with mentor details
```

### GET /sessions/:id
Get single session by ID
```javascript
Response: Single session object with mentor details
```

### POST /sessions
Create a new session
```javascript
Request Body: {
  "studentName": "string (required, min 2 chars)",
  "email": "string (required, valid email)",
  "mentor": "ObjectId (required)",
  "datetime": "Date (required)",
  "mode": "enum (required): Online | Offline | Hybrid",
  "topic": "string (required, 5-500 chars)",
  "priority": "enum (optional): Low | Medium | High (default: Medium)",
  "status": "enum (optional): Scheduled | Completed | Cancelled (default: Scheduled)"
}

Response: {
  "success": true,
  "message": "Session created successfully",
  "data": { session object with populated mentor }
}

Error Responses:
- 400: Validation error (invalid email, missing fields, etc.)
```

### PUT /sessions/:id
Update existing session
```javascript
Request Body: (same as POST, all fields optional)

Response: {
  "success": true,
  "message": "Session updated successfully",
  "data": { updated session with mentor }
}
```

### DELETE /sessions/:id
Delete a session
```javascript
Response: {
  "success": true,
  "message": "Session deleted successfully",
  "data": { deleted session }
}
```

---

## ✅ VALIDATION RULES

### Email Validation
- Must match pattern: `word@word.word`
- Automatically converted to lowercase
- Trimmed of whitespace

### Mentor Validation
- Name: min 3 characters
- Domain: must be from enum list
- Mode: must be Online, Offline, or Hybrid
- Experience: 0-50 years
- Skills: at least 1 skill required
- Rating: 1-5
- **Unique constraint**: Same name + domain combination not allowed

### Session Validation
- Student name: min 2 characters
- Email: valid email format required
- Mentor: valid ObjectId required
- Topic: 5-500 characters
- Mode: must be from enum
- Priority: must be from enum
- Status: must be from enum

---

## 🔥 ERROR RESPONSES

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Error 1", "Error 2"]
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 - Conflict
```json
{
  "success": false,
  "message": "Duplicate entry",
  "error": "Details"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details"
}
```

---

## 🧪 TESTING EXAMPLES

### Create Session (cURL)
```bash
curl -X POST http://localhost:5000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "John Doe",
    "email": "john@example.com",
    "mentor": "6998877d0281639f162229f0",
    "datetime": "2026-03-20T14:00:00",
    "mode": "Online",
    "topic": "React best practices",
    "priority": "High"
  }'
```

### Get All Mentors (JavaScript)
```javascript
const response = await fetch('http://localhost:5000/api/mentors');
const mentors = await response.json();
console.log(mentors);
```

### Delete Session (JavaScript)
```javascript
const response = await fetch('http://localhost:5000/api/sessions/SESSION_ID', {
  method: 'DELETE'
});
const result = await response.json();
console.log(result.message);
```

---

## 📊 FEATURES

✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Input validation with helpful error messages
✅ Email validation
✅ Duplicate prevention
✅ Mongoose populate() for relationships
✅ Enum validation for domains, modes, priority
✅ Error logging
✅ Consistent response format

---

**Built with:** Node.js, Express, MongoDB Atlas, Mongoose
