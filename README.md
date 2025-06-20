# Mini Task Manager

A full-stack CRUD Task Manager app built with Next.js (frontend), Express (backend), and mock data (in-memory, easy to swap for PostgreSQL).

---

## Project Structure

```
/ (root)
  /backend      # Express API server
    server.js
    package.json
  /frontend     # Next.js + Tailwind CSS UI
    app/
    package.json
    ...
```

**Rationale:**
- **Separation of concerns:** Frontend and backend are decoupled for easy scaling and deployment.
- **Mock data:** Simple for demo/testing, can be swapped for a real database (PostgreSQL) later.

---

## Steps to Run Locally

1. **Clone the repo:**
   ```sh
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies:**
   - Backend:
     ```sh
     cd backend
     npm install
     ```
   - Frontend:
     ```sh
     cd ../frontend
     npm install
     ```

3. **Start the backend:**
   ```sh
   cd ../backend
   node server.js
   ```
   The API will run at `http://localhost:4000`.

4. **Start the frontend:**
   ```sh
   cd ../frontend
   npm run dev
   ```
   The app will run at `http://localhost:3000`.

---

## API Details

### Base URL: `http://localhost:4000`

### Endpoints

#### `GET /tasks`
- **Description:** Get all tasks
- **Response:**
```json
[
  {
    "id": "1",
    "title": "Sample Task",
    "status": "pending",
    "createdAt": "2024-06-20T12:00:00.000Z"
  }
]
```

#### `POST /tasks`
- **Description:** Add a new task
- **Body:**
```json
{
  "title": "New Task",
  "status": "pending"
}
```
- **Response:**
```json
{
  "id": "2",
  "title": "New Task",
  "status": "pending",
  "createdAt": "2024-06-20T12:01:00.000Z"
}
```

#### `GET /tasks/:id`
- **Description:** Get a single task by ID
- **Response:**
```json
{
  "id": "1",
  "title": "Sample Task",
  "status": "pending",
  "createdAt": "2024-06-20T12:00:00.000Z"
}
```

#### `PUT /tasks/:id`
- **Description:** Update a task
- **Body:**
```json
{
  "title": "Updated Task",
  "status": "done"
}
```
- **Response:**
```json
{
  "id": "1",
  "title": "Updated Task",
  "status": "done",
  "createdAt": "2024-06-20T12:00:00.000Z"
}
```

#### `DELETE /tasks/:id`
- **Description:** Delete a task
- **Response:**
```json
{
  "id": "1",
  "title": "Sample Task",
  "status": "pending",
  "createdAt": "2024-06-20T12:00:00.000Z"
}
```

---

