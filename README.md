# Mini LinkedIn Clone

A full-stack community platform built with React, Django, and MySQL.

## Features

- User Registration & Authentication
- Create and view text posts
- User profiles with bio and post history
- Responsive design
- Real-time post feed

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Django, Django REST Framework
- **Database**: MySQL
- **Styling**: CSS3

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- MySQL Server

### Backend Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd linkedin-clone

2. Create virtual environment

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

3. Install dependencies

cd backend
pip install -r requirements.txt

4. Create MySQL database

sqlCREATE DATABASE linkedin_clone;

5. Create .env file in backend directory

SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=linkedin_clone
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_HOST=localhost
DB_PORT=3306

6. Run migrations

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

7. Start Django server

python manage.py runserver


Frontend Setup

1. Install dependencies

cd frontend
npm install


2. Start React development server

npm start

Demo Users

-Create users through the registration form or use Django admin panel.
-API Endpoints

Authentication

-POST /api/auth/register/ - User registration
-POST /api/auth/login/ - User login
-POST /api/auth/logout/ - User logout
-GET /api/auth/me/ - Get current user
-GET /api/auth/profile/<username>/ - Get user profile

Posts

-GET /api/posts/ - Get all posts
-POST /api/posts/ - Create new post
-GET /api/posts/user/<username>/ - Get user's posts


Deployment

-The application can be deployed using:

-Backend: Railway, Render, or Heroku
-Frontend: Vercel, Netlify, or Firebase Hosting
-Database: PlanetScale, Railway, or AWS RDS

## Additional Features (Optional Enhancements)

### 1. Search Functionality
Add search for users and posts

### 2. Like/Comment System
Extend posts with reactions and comments

### 3. Image Upload
Add profile pictures and post images

### 4. Real-time Updates
Implement WebSocket for live post updates

### 5. Email Verification
Add email verification during registration

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure CORS settings are correct in Django
2. **Database Connection**: Verify MySQL credentials and database exists
3. **Authentication Issues**: Check session/cookie settings
4. **API Errors**: Use browser dev tools to debug API calls

### Debug Commands

```bash
# Check Django logs
python manage.py runserver --verbosity=2

# Check database connection
python manage.py dbshell

# Create sample data
python manage.py shell