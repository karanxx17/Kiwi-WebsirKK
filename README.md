# KiwiGram - Connect Digital

A full-stack social media platform with a public Next.js frontend and an admin React portal for managing stories, posts, and reels.

## Project Structure

```
├── app/                    # Main Next.js application (public frontend)
├── backend/                # Node.js + Express API server
├── frontend-admin/         # React admin dashboard
└── package.json           # Root dependencies
```

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or Atlas)

## Environment Setup

### 1. Backend Configuration

Navigate to `backend/` and create `.env` file:

```env
PORT=5000

JWT_SECRET=kiwigram-secret-key
NODE_ENV=development
DEFAULT_ADMIN_EMAIL=admin@gmail.com
DEFAULT_ADMIN_PASSWORD=admin@123
```

### 2. Frontend Admin Configuration

Navigate to `frontend-admin/` and create `.env.local` file:

```env
REACT_APP_API_URL=http://localhost:5100/api
```

## Installation & Setup

### Install Root Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Install Frontend Admin Dependencies

```bash
cd frontend-admin
npm install
cd ..
```

## Running the Application

Open **three separate terminals** and run the following commands:

### Terminal 1: Backend Server (Port 5000)

```bash
cd backend
npm run dev
```

Expected output:

```
✓ MongoDB connected
✓ Default admin exists: admin@gmail.com
✓ Server running on port 5000
```

### Terminal 2: Frontend Admin Dashboard (Port 3000)

```bash
cd frontend-admin
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000)

**Default Admin Credentials:**

- Email: `admin@gmail.com`
- Password: `admin@123`

### Terminal 3: Main Next.js Application (Port 3001)

```bash
npm run dev
```

Navigate to [http://localhost:3001](http://localhost:3001) to view the public KiwiGram site.

## Features

- **Public Frontend:** Next.js site displaying stories, posts, and reels
- **Admin Dashboard:** React-based admin portal to manage content
- **Authentication:** JWT-based auth with bcrypt password hashing
- **Database:** MongoDB with Mongoose ODM
- **API:** RESTful Express API with full CRUD operations

## API Endpoints

**Base URL:** `http://localhost:5100/api`

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user profile

### Posts

- `GET /posts` - Get all posts
- `POST /posts` - Create new post (admin)
- `PUT /posts/:id` - Update post (admin)
- `DELETE /posts/:id` - Delete post (admin)
- `POST /posts/:id/like` - Like a post
- `POST /posts/:id/comment` - Add comment to post

### Stories

- `GET /stories` - Get all stories
- `POST /stories` - Create story (admin)
- `DELETE /stories/:id` - Delete story (admin)

### Reels

- `GET /reels` - Get all reels
- `POST /reels` - Create reel (admin)
- `PUT /reels/:id` - Update reel (admin)
- `DELETE /reels/:id` - Delete reel (admin)

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user profile

## Troubleshooting

### Port Already in Use

If port 5000, 3000, or 3001 is already in use:

```bash
# Kill Node.js processes (Windows PowerShell)
Stop-Process -Name "node" -Force
```

### MongoDB Connection Failed

- Verify MongoDB is running (local) or check Atlas credentials and IP whitelist
- Ensure `MONGODB_URI` in `backend/.env` is correct
- Check that the IP whitelist in Atlas includes your machine's IP

### CORS Errors

Backend already has CORS enabled for frontend connections. If issues persist, verify:

- Backend API URL in `frontend-admin/.env.local` matches your backend URL
- Backend server is running on port 5000

## Development

- **Backend:** Uses `nodemon` for auto-reloading on file changes
- **Frontend Admin:** Uses `react-scripts` with hot module reloading
- **Main App:** Next.js with fast refresh

## Build for Production

### Backend

```bash
cd backend
npm start
```

### Frontend Admin

```bash
cd frontend-admin
npm run build
npm install -g serve
serve -s build
```

### Main Next.js App

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)

## License

MIT
