# Colbin Recruitment Platform

A full-stack recruitment platform prototype built with Next.js, Node.js, and PostgreSQL.

## Features

- User registration and authentication with JWT
- Secure password hashing with bcrypt
- User profile management
- Modern UI with Tailwind CSS
- Database integration with Prisma ORM
- Input validation with Zod
- Global state management with React Context

## Tech Stack

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Axios for API calls
- React Context for state management

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- JWT for authentication
- bcrypt for password hashing
- Zod for validation

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   - Copy `server/.env.example` to `server/.env`
   - Copy `client/.env.example` to `client/.env.local`
   - Fill in your database URL and JWT secret

3. **Set up the database:**
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development servers:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
colbin-recruitment-platform/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # Auth and Profile contexts
│   │   ├── pages/          # Next.js pages
│   │   └── utils/          # API utilities
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Prisma models
│   │   └── routes/         # API routes
│   ├── prisma/             # Database schema
│   └── .env.example        # Environment variables template
└── README.md
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation with Zod
- CORS protection
- Rate limiting (recommended for production)

## Database Schema

The application uses a simple user schema with:
- User authentication fields (email, password)
- Profile information (name, bio, skills, etc.)
- Timestamps for audit trails

## Contributing

This is a prototype assignment for Colbin. For production use, consider:
- Adding comprehensive error logging
- Implementing rate limiting
- Adding email verification
- Setting up proper CI/CD pipelines
- Adding comprehensive testing


