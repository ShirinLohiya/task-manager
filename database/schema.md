# Database Schema Documentation

This application uses **MongoDB** as its database. Below are the collection schemas.

## Collections

### 1. Users Collection

Stores user account information with authentication details.

```javascript
{
  _id: ObjectId,
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date (default: Date.now)
}
```

**Indexes:**
- `email` (unique)

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$XQj9Y5Z8Q9Z8Q9Z8Q9Z8Qe",
  "role": "user",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Tasks Collection

Stores task information with user relationships.

```javascript
{
  _id: ObjectId,
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  category: String (required, enum: ['Personal', 'Work', 'Urgent']),
  status: String (enum: ['pending', 'in-progress', 'completed'], default: 'pending'),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  dueDate: Date,
  attachment: {
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    mimetype: String,
    uploadedAt: Date
  },
  user: ObjectId (ref: 'User', required),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- `user, category, status` (compound index for faster queries)

**Example Document:**
```json
{
  "_id": "507f191e810c19729de860ea",
  "title": "Complete project proposal",
  "description": "Finish writing the Q1 project proposal document",
  "category": "Work",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-01-20T23:59:59.000Z",
  "attachment": {
    "filename": "attachment-1234567890-123456789.pdf",
    "originalName": "proposal-draft.pdf",
    "path": "uploads/attachment-1234567890-123456789.pdf",
    "size": 2048576,
    "mimetype": "application/pdf",
    "uploadedAt": "2024-01-15T14:20:00.000Z"
  },
  "user": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T14:20:00.000Z"
}
```

---

## Relationships

### One-to-Many: User → Tasks
- Each user can have multiple tasks
- Each task belongs to exactly one user
- Foreign key: `tasks.user` references `users._id`
- On user deletion, all associated tasks are deleted (cascade)

---

## Data Validation

### User Collection
- **Email**: Must be valid email format, converted to lowercase
- **Password**: Minimum 6 characters, automatically hashed before storage
- **Role**: Can only be 'user' or 'admin'
- **Name**: Required, cannot exceed 50 characters

### Task Collection
- **Title**: Required, cannot exceed 100 characters
- **Description**: Optional, cannot exceed 500 characters
- **Category**: Must be one of: Personal, Work, Urgent
- **Status**: Must be one of: pending, in-progress, completed
- **Priority**: Must be one of: low, medium, high
- **Attachment**: Optional, validated file size (max 5MB) and type

---

## MongoDB Connection String

### Local MongoDB
```
mongodb://localhost:27017/taskmanager
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
```

---

## Initial Setup

No manual database setup is required. The application will:
1. Automatically create the database on first connection
2. Create collections on first document insertion
3. Create indexes automatically via Mongoose

---

## Sample Data for Testing

To create an admin user, use the registration endpoint with:

```json
{
  "name": "Admin User",
  "email": "admin@taskmanager.com",
  "password": "Admin@123",
  "role": "admin"
}
```

To create a regular user:

```json
{
  "name": "Test User",
  "email": "user@example.com",
  "password": "User@123"
}
```

---

## Performance Considerations

1. **Indexes** are created on frequently queried fields:
   - Users: `email` (unique)
   - Tasks: `user`, `category`, `status`

2. **Compound Index** on tasks collection for efficient filtering:
   - `{ user: 1, category: 1, status: 1 }`

3. **Password Hashing** uses bcrypt with salt rounds of 10

4. **Auto-updated timestamps** on task modifications

---

## Backup Recommendations

For production environments:
- Enable MongoDB Atlas automated backups (if using cloud)
- Schedule regular mongodump exports for local instances
- Store backups in secure, off-site location
- Test restoration procedures regularly

```bash
# Backup command
mongodump --db taskmanager --out /backup/location

# Restore command
mongorestore --db taskmanager /backup/location/taskmanager
```
