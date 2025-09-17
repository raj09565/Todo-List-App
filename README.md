# MERN To-Do List (Full CRUD)

A full-stack To-Do app using MongoDB, Express, React (Vite), and Node.js. Includes Create, Read, Update, Delete with live UI updates.

## Tech Stack

- Backend: Node.js, Express, Mongoose, MongoDB Atlas
- Frontend: React 18 + Vite

## Project Structure

```
mern-todo/
  server/
    src/
      index.js
      db.js
      models/Task.js
      routes/tasks.js
    package.json
    .env.example
  client/
    src/
      App.jsx
      main.jsx
      styles.css
      api.js
      components/
        TaskForm.jsx
        TaskItem.jsx
    index.html
    vite.config.js
    package.json
  .gitignore
  README.md
```

## Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB). Get a connection string (URI).

## Setup

1) Backend

- Copy `server/.env.example` to `server/.env` and set values:

```
PORT=5000
MONGODB_URI=your_mongodb_uri_here
CORS_ORIGIN=http://localhost:5173
```

- Install and run the server:

```powershell
# from project root
npm install --prefix server
npm run dev --prefix server
```

Server runs at http://localhost:5000 and exposes:

- `GET /api/health` – health check
- `GET /api/tasks` – list tasks
- `POST /api/tasks` – create task { text }
- `PUT /api/tasks/:id` – update task { text?, completed? }
- `DELETE /api/tasks/:id` – delete task

2) Frontend

- Install and run the client in a second terminal:

```powershell
# from project root
npm install --prefix client
npm run dev --prefix client
```

Vite dev server runs at http://localhost:5173 and proxies `/api` to the backend at 5000.

## Environment (optional)

If your backend is not running on localhost:5000, create `client/.env` and set:

```
VITE_API_URL=http://your-backend-host:port
```

## Notes

- CRUD is fully implemented. UI updates optimistically after operations.
- Data schema: `{ _id, text, completed, createdAt, updatedAt }`
- For production, build the client with `npm run build --prefix client` and deploy frontend and backend separately, or serve the built assets via a static host.

## Troubleshooting

- If API requests fail due to CORS, verify `CORS_ORIGIN` in `server/.env` matches the client origin.
- Ensure your MongoDB IP Access List allows your current IP.
- Windows PowerShell may require `Set-ExecutionPolicy` for scripts; you can run using `npm run` without changes.
