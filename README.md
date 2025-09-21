# Colbin Recruitment Platform

A recruitment platform prototype built with Next.js, Node.js, and SQLite.

## Features

- User registration and authentication
- Profile management
- Modern UI with Tailwind CSS
- Database integration with Prisma ORM
- Input validation
- Global state management

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
- SQLite database
- JWT for authentication
- bcrypt for password hashing
- Zod for validation

## Quick Start

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Set up environment variables:
   - Copy `server/env.example` to `server/.env`
   - Copy `client/env.local.example` to `client/.env.local`

3. Set up the database:
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)

## Database Schema

The application uses a user schema with:
- Authentication fields (email, password)
- Profile information (name, bio, skills, etc.)
- Timestamps for audit trails


