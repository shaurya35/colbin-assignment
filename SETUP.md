# Colbin Recruitment Platform - Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (or use Neon for cloud PostgreSQL)
- Git

### 2. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd colbin-assig

# Install all dependencies
npm run install-all
```

### 3. Database Setup

#### Option A: Using Neon (Recommended)
1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new database
3. Copy the connection string

#### Option B: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database named `colbin_recruitment`

### 4. Environment Configuration

#### Server Environment
```bash
# Copy the example file
cp server/env.example server/.env

# Edit server/.env with your values
DATABASE_URL="postgresql://username:password@localhost:5432/colbin_recruitment?schema=public"
JWT_SECRET=""
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
```

#### Client Environment
```bash
# Copy the example file
cp client/env.local.example client/.env.local

# Edit client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 5. Database Migration
```bash
cd server
npx prisma generate
npx prisma db push
```

### 6. Start the Application
```bash
# From the root directory
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000) simultaneously.

### 7. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Project Structure

```
colbin-recruitment-platform/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js 13+ App Router
│   │   ├── contexts/      # React Context Providers
│   │   └── utils/         # API utilities
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth & error middleware
│   │   ├── routes/        # API routes
│   │   └── utils/         # Validation utilities
│   ├── prisma/            # Database schema
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Profile (Protected)
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Health Check
- `GET /health` - API health status

## Features Implemented

### Backend
- ✅ Express.js server with middleware
- ✅ PostgreSQL database with Prisma ORM
- ✅ JWT authentication with bcrypt password hashing
- ✅ Zod validation for all inputs
- ✅ Comprehensive error handling
- ✅ CORS and security headers
- ✅ Rate limiting

### Frontend
- ✅ Next.js 14 with App Router
- ✅ Tailwind CSS for styling
- ✅ React Context for state management
- ✅ Axios for API calls
- ✅ Responsive design
- ✅ Form validation
- ✅ Loading states and error handling

### Database Schema
- ✅ User table with authentication fields
- ✅ Profile information fields
- ✅ Skills array support
- ✅ Timestamps for audit trails

## Security Features

1. **Password Security**: bcrypt with 12 salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Input Validation**: Zod schema validation
4. **CORS Protection**: Configured for frontend domain
5. **Rate Limiting**: 100 requests per 15 minutes per IP
6. **Security Headers**: Helmet.js for security headers

## Error Handling

- **Backend**: Centralized error handling middleware
- **Frontend**: Context-based error state management
- **Validation**: Client and server-side validation
- **API**: Consistent error response format

## Scaling Suggestions

### Immediate Improvements
1. **Email Verification**: Add email verification for registration
2. **Password Reset**: Implement password reset functionality
3. **Profile Images**: Add profile image upload
4. **Search**: Add user search functionality
5. **Notifications**: Real-time notifications

### Production Considerations
1. **Environment Variables**: Use proper secret management
2. **Database**: Connection pooling and read replicas
3. **Caching**: Redis for session management
4. **Monitoring**: Application performance monitoring
5. **Testing**: Unit and integration tests
6. **CI/CD**: Automated deployment pipeline
7. **Security**: Rate limiting per user, API versioning
8. **Backup**: Automated database backups

### Architecture Scaling
1. **Microservices**: Split into auth, profile, and matching services
2. **Message Queues**: For async processing
3. **CDN**: For static assets
4. **Load Balancing**: Multiple server instances
5. **Database Sharding**: For large user bases

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check DATABASE_URL in server/.env
   - Ensure PostgreSQL is running
   - Verify database exists

2. **CORS Errors**
   - Check CLIENT_URL in server/.env
   - Ensure frontend is running on correct port

3. **JWT Errors**
   - Check JWT_SECRET is set
   - Ensure token is being sent in Authorization header

4. **Prisma Errors**
   - Run `npx prisma generate`
   - Run `npx prisma db push`

### Development Tips

1. **Database Management**
   ```bash
   # View database in Prisma Studio
   cd server && npx prisma studio
   
   # Reset database
   npx prisma db push --force-reset
   ```

2. **API Testing**
   ```bash
   # Test health endpoint
   curl http://localhost:5000/health
   
   # Test registration
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
   ```

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check server logs for error details
4. Ensure all environment variables are set correctly


