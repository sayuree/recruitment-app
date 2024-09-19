# Recruitment Platform

### Overview
This is a **backend** implementation of **Job Posting and Application Platform** using Express and PostgreSQL. 
This app provides APIs for job posting, job application management and includes basic JWT-based authentication.

### Setup Guide 
1. Clone the repository
```
git clone https://github.com/yourusername/recruitment-app.git
```
2. Install dependencies
```
cd recruitment-app/
npm install
```
3. Configure Environment Variables
```
NODE_ENV=
PORT=3000

#DB CREDENTIALS
DB_TYPE=your-db-type 
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DB_HOST=localhost
DB_PORT=5432


# JWT Info
JWT_SECRET_KEY=your-jwt-secret
JWT_EXPIRES_IN=your-jwt-expiration
```
- `DB_TYPE`
- `DB_USERNAME`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_HOST`
- `DB_PORT`
4. Run the application
```
npm run dev
```
5. API Endpoints

Job Posting API
Create Job Posting: `POST /api/jobs`
Update Job Posting: `PUT /api/jobs/:id`
Delete Job Posting: `DELETE /api/jobs/:id`
Fetch Job Postings: `GET /api/jobs` (pagination & filtering)
Job Application API
Submit Job Application: POST /api/applications
Manage Job Applications: `GET /api/applications`, `PUT /api/applications/:id`, `DELETE /api/applications/:id`
Authentication
Signup: `POST /api/auth/signup`
Login: `POST /api/auth/login`
