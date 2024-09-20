# Recruitment Platform

### Overview
This is a **backend** implementation of **Job Posting and Application Platform** using Express and PostgreSQL. 
This app provides APIs for job posting, job application management and includes basic JWT-based authentication.
### Requirements
**Objective**: Build the backend for a **Job Posting** and **Application Platform** using **Node.js** and **PostgreSQL**.

**Task Overview**:
- [x] **Job Posting API**:
    - Create an API where recruiters can:
        - **Create** job postings (e.g., title, description, salary range, location).
        - **Update** and **delete** job postings.
        - **Fetch** job postings with pagination and filtering (e.g., by title, location).
- [x] 2. **Job Application API**:
    - Create an API where job seekers can **submit job applications** (e.g., name, email, resume).
    - Allow recruiters to **view** and **manage** job applications (e.g., shortlist, reject).
- [x] **Authentication and Authorization**:
    - Implement basic **JWT-based authentication**:
        - Recruiters should be able to create, edit, and delete their job postings only after logging in.
        - Job seekers should be able to submit job applications without logging in.
- [x] **Email Notifications**:
    - Simulate sending an email notification (via a console log) to recruiters when a job seeker applies for a job.
- [x] **Database**:
    - Use **PostgreSQL** to store job postings, applications, and user data (recruiters).
    - Ensure data integrity, security, and scalability.
### Setup Guide 
#### 1. Clone the repository
```
git clone https://github.com/yourusername/recruitment-app.git
```
#### 2. Install dependencies
```
cd recruitment-app/
npm install
```
#### 3. Configure Environment Variables
```
NODE_ENV=your-node-env
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
- `DB_TYPE` - postgres
- `DB_USERNAME` - The username for connecting to the database. 
- `DB_PASSWORD` - The password for the database user `DB_USERNAME`
- `DB_NAME` - The name of the database where data will be stored. Make sure this database exists, or the app will fail to connect.
- `DB_HOST` -  The address (hostname or IP) where your database is hosted.
- `DB_PORT` - The port number on which the database is running. 
#### 4. Run the application
```
npm run dev
```
#### 5. API Endpoints

#### Job Posting API
#### Create Job Posting: `POST /api/jobs`\
**Description**: Create a job posting\
** Request Example **:\
Body: <br>
  ```json
   {
      "minSalary": 15000,
      "maxSalary": 49000,
      "currencyCode": "USD",
      "location": "London",
      "company": "Amazon",
      "title": "Senior Developer",
      "description": "You have to do 1 and 2"
  }
  ```
#### Update Job Posting: `PUT /api/jobs/:id`
**Description**: Update a specific job posting\
** Request Example **:\
Body: <br>
  ```json
  {
     "minSalary": 15000,
     "maxSalary": 49000,
     "currencyCode": "USD",
     "location": "London",
     "company": "Amazon",
     "title": "Senior Developer",
     "description": "You have to do 1 and 2"
   }
  ```
#### Delete Job Posting: `DELETE /api/jobs/:id`\
**Description**: Delete a job posting (soft-delete)\
#### Fetch Job Postings: `GET /api/jobs?page={#pageNumber}&limit={#limit}`\
**Description**: Get job postings using pagination and filtering by (location, title, minSalary, maxSalary, description, company)\
  
#### Job Application API
##### Submit Job Application: `POST /api/jobs/:id/apply`
**Description**: Update a specific job posting\
** Request Example **:\
Body (form-data): <br>
  ```json
  {
     "name": Alex,
     "email": alex_dev@gmail.com,
     "resume": file.pdf
   }
  ```
##### Manage Job Applications: `GET /api/applications?page={#pageNumber}&limit={#limit}`, `PUT /api/applications/:id`
#### Authentication
##### Signup: `POST /api/auth/signup`
##### Login: `POST /api/auth/login`
