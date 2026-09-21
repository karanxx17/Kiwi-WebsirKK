# KiwiGram Dynamic Admin System

This is a complete dynamic KiwiGram system with an admin dashboard for creating and managing stories, posts, and reels.

## Project Structure

```
KIWI/
├── app/                      # Next.js app (main KiwiGram platform)
├── backend/                  # Node.js/Express API
│   ├── models/              # MongoDB models
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Auth & other middleware
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env.example
├── frontend-admin/          # React Admin Dashboard
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components (Forms)
│   │   ├── pages/           # Pages (Login, Dashboard)
│   │   ├── services/        # API service
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://admin:admin@ac-6vsbcgd-shard-00-00.balxtwx.mongodb.net:27017,ac-6vsbcgd-shard-00-01.balxtwx.mongodb.net:27017,ac-6vsbcgd-shard-00-02.balxtwx.mongodb.net:27017/?ssl=true&replicaSet=atlas-4lj0rr-shard-0&authSource=admin&appName=Cluster0/kiwigram
JWT_SECRET=your-secret-key
NODE_ENV=development
```

Start the backends:

```bash
npm run dev
```

Backend will run on `http://localhost:5100`

### 2. Frontend Admin Setup

```bash
cd frontend-admin
npm install
```

Create `.env` file:

```
REACT_APP_API_URL=http://localhost:5100/api
```

Start the frontend:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Features

### Admin Dashboard

- **Login/Register** - Authenticate as admin
- **Create Stories** - Add new stories with image and caption
- **Create Posts** - Add posts with caption, image, location, badges, tags, and music
- **Create Reels** - Add reels with caption, image, and music
- **Manage Content** - View, edit, and delete all content
- **Real-time Updates** - Content updates instantly

### Backend API Endpoints

#### Authentication

- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current user (requires auth)

#### Stories

- `GET /api/stories` - Get all stories
- `POST /api/stories` - Create story (requires auth)
- `PUT /api/stories/:id` - Update story (requires auth)
- `DELETE /api/stories/:id` - Delete story (requires auth)
- `POST /api/stories/:id/seen` - Mark story as seen

#### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)
- `POST /api/posts/:id/like` - Like post (requires auth)
- `POST /api/posts/:id/comment` - Add comment (requires auth)

#### Reels

- `GET /api/reels` - Get all reels
- `POST /api/reels` - Create reel (requires auth)
- `PUT /api/reels/:id` - Update reel (requires auth)
- `DELETE /api/reels/:id` - Delete reel (requires auth)
- `POST /api/reels/:id/like` - Like reel (requires auth)
- `POST /api/reels/:id/comment` - Add comment (requires auth)
- `POST /api/reels/:id/view` - Increment views

#### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile (requires auth)

## Database Setup

Make sure MongoDB is installed and running. The app uses MongoDB Atlas or local MongoDB.

```bash
# For local MongoDB
mongod
```

## Testing

1. Go to admin dashboard: `http://localhost:3000`
2. Register a new admin account
3. Login with your credentials
4. Create stories, posts, and reels
5. Manage your content

## Integration with Main App

The main Next.js app in `/app` can be modified to fetch data from this API instead of using static data. Update `app/kiwigram/page.tsx` to call the backend API endpoints.

Example:

```javascript
const { data: posts } = await fetch("http://localhost:5100/api/posts");
const { data: stories } = await fetch("http://localhost:5100/api/stories");
const { data: reels } = await fetch("http://localhost:5100/api/reels");
```

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend**: React, Axios, React Router
- **Main App**: Next.js, TypeScript, Tailwind CSS

## Next Steps

1. Set up MongoDB connection
2. Install dependencies for both backend and frontend
3. Configure environment variables
4. Run backend and frontend servers
5. Start creating and managing content!
