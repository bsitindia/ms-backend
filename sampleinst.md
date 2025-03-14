# Project Development Instructions

## Database Schema

### Users Table
- **id**: integer, primary key, auto-increment
- **username**: varchar(255), unique, not null
- **password**: varchar(255), not null
- **user_type**: integer, not null (0 for admin, 1 for regular user)

### JobPosts Table
- **id**: integer, primary key, auto-increment
- **title**: varchar(255), not null
- **description**: text, not null
- **created_at**: timestamp, default current_timestamp

### Bidders Table
- **id**: integer, primary key, auto-increment
- **name**: varchar(255), not null
- **email**: varchar(255), unique, not null

### Bids Table
- **id**: integer, primary key, auto-increment
- **job_post_id**: integer, not null, foreign key references JobPosts(id)
- **bidder_id**: integer, not null, foreign key references Bidders(id)
- **amount**: decimal, not null
- **created_at**: timestamp, default current_timestamp

### Jobs Table
- **id**: integer, primary key, auto-increment
- **title**: varchar(255), not null
- **description**: text, not null
- **created_at**: timestamp, default current_timestamp

## API Endpoints

### Admin Endpoints

#### `POST /admin/login`
- **Description**: Admin login
- **Request**: 
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM users WHERE username = ? AND password = ? AND user_type = 0;
  ```

#### `GET /admin/dashboard`
- **Description**: Get admin dashboard stats
- **Request**: None
- **Response**:
  ```json
  {
    "stats": {
      "total_users": 100,
      "total_job_posts": 50
    }
  }
  ```
- **SQL Query**:
  ```sql
  SELECT COUNT(*) as total_users FROM users;
  SELECT COUNT(*) as total_job_posts FROM job_posts;
  ```

#### `GET /admin/job-posts`
- **Description**: Get all job posts
- **Request**: None
- **Response**:
  ```json
  {
    "jobPosts": [
      {
        "id": 1,
        "title": "Job Title",
        "description": "Job Description",
        "created_at": "2023-01-01T00:00:00Z"
      }
    ]
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM job_posts;
  ```

#### `POST /admin/job-posts`
- **Description**: Create a new job post
- **Request**:
  ```json
  {
    "title": "Job Title",
    "description": "Job Description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Job Title",
    "description": "Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  INSERT INTO job_posts (title, description) VALUES (?, ?);
  ```

#### `GET /admin/job-posts/:id`
- **Description**: Get a specific job post
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Job Title",
    "description": "Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM job_posts WHERE id = ?;
  ```

#### `PUT /admin/job-posts/:id`
- **Description**: Update a specific job post
- **Request**:
  ```json
  {
    "title": "Updated Job Title",
    "description": "Updated Job Description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Updated Job Title",
    "description": "Updated Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  UPDATE job_posts SET title = ?, description = ? WHERE id = ?;
  ```

#### `DELETE /admin/job-posts/:id`
- **Description**: Delete a specific job post
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Job post deleted successfully"
  }
  ```
- **SQL Query**:
  ```sql
  DELETE FROM job_posts WHERE id = ?;
  ```

### Auth Endpoints

#### `POST /auth/login`
- **Description**: User login
- **Request**: 
  ```json
  {
    "username": "user",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM users WHERE username = ? AND password = ?;
  ```

### JobPosts Endpoints

#### `GET /job-posts`
- **Description**: Get all job posts
- **Request**: None
- **Response**:
  ```json
  {
    "jobPosts": [
      {
        "id": 1,
        "title": "Job Title",
        "description": "Job Description",
        "created_at": "2023-01-01T00:00:00Z"
      }
    ]
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM job_posts;
  ```

#### `POST /job-posts`
- **Description**: Create a new job post
- **Request**:
  ```json
  {
    "title": "Job Title",
    "description": "Job Description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Job Title",
    "description": "Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  INSERT INTO job_posts (title, description) VALUES (?, ?);
  ```

#### `GET /job-posts/:id`
- **Description**: Get a specific job post
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Job Title",
    "description": "Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM job_posts WHERE id = ?;
  ```

#### `PUT /job-posts/:id`
- **Description**: Update a specific job post
- **Request**:
  ```json
  {
    "title": "Updated Job Title",
    "description": "Updated Job Description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Updated Job Title",
    "description": "Updated Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  UPDATE job_posts SET title = ?, description = ? WHERE id = ?;
  ```

#### `DELETE /job-posts/:id`
- **Description**: Delete a specific job post
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Job post deleted successfully"
  }
  ```
- **SQL Query**:
  ```sql
  DELETE FROM job_posts WHERE id = ?;
  ```

### Bidders Endpoints

#### `GET /bidders`
- **Description**: Get all bidders
- **Request**: None
- **Response**:
  ```json
  {
    "bidders": [
      {
        "id": 1,
        "name": "Bidder Name",
        "email": "bidder@example.com"
      }
    ]
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM bidders;
  ```

#### `POST /bidders`
- **Description**: Create a new bidder
- **Request**:
  ```json
  {
    "name": "Bidder Name",
    "email": "bidder@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Bidder Name",
    "email": "bidder@example.com"
  }
  ```
- **SQL Query**:
  ```sql
  INSERT INTO bidders (name, email) VALUES (?, ?);
  ```

#### `GET /bidders/:id`
- **Description**: Get a specific bidder
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Bidder Name",
    "email": "bidder@example.com"
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM bidders WHERE id = ?;
  ```

#### `PUT /bidders/:id`
- **Description**: Update a specific bidder
- **Request**:
  ```json
  {
    "name": "Updated Bidder Name",
    "email": "updated@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Updated Bidder Name",
    "email": "updated@example.com"
  }
  ```
- **SQL Query**:
  ```sql
  UPDATE bidders SET name = ?, email = ? WHERE id = ?;
  ```

#### `DELETE /bidders/:id`
- **Description**: Delete a specific bidder
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Bidder deleted successfully"
  }
  ```
- **SQL Query**:
  ```sql
  DELETE FROM bidders WHERE id = ?;
  ```

### Bids Endpoints

#### `GET /bids`
- **Description**: Get all bids
- **Request**: None
- **Response**:
  ```json
  {
    "bids": [
      {
        "id": 1,
        "job_post_id": 1,
        "bidder_id": 1,
        "amount": 100.00,
        "created_at": "2023-01-01T00:00:00Z"
      }
    ]
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM bids;
  ```

#### `POST /bids`
- **Description**: Create a new bid
- **Request**:
  ```json
  {
    "job_post_id": 1,
    "bidder_id": 1,
    "amount": 100.00
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "job_post_id": 1,
    "bidder_id": 1,
    "amount": 100.00,
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  INSERT INTO bids (job_post_id, bidder_id, amount) VALUES (?, ?, ?);
  ```

#### `GET /bids/:id`
- **Description**: Get a specific bid
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "job_post_id": 1,
    "bidder_id": 1,
    "amount": 100.00,
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM bids WHERE id = ?;
  ```

#### `PUT /bids/:id`
- **Description**: Update a specific bid
- **Request**:
  ```json
  {
    "amount": 150.00
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "job_post_id": 1,
    "bidder_id": 1,
    "amount": 150.00,
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  UPDATE bids SET amount = ? WHERE id = ?;
  ```

#### `DELETE /bids/:id`
- **Description**: Delete a specific bid
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Bid deleted successfully"
  }
  ```
- **SQL Query**:
  ```sql
  DELETE FROM bids WHERE id = ?;
  ```

### Jobs Endpoints

#### `GET /jobs`
- **Description**: Get all jobs
- **Request**: None
- **Response**:
  ```json
  {
    "jobs": [
      {
        "id": 1,
        "title": "Job Title",
        "description": "Job Description",
        "created_at": "2023-01-01T00:00:00Z"
      }
    ]
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM jobs;
  ```

#### `POST /jobs`
- **Description**: Create a new job
- **Request**:
  ```json
  {
    "title": "Job Title",
    "description": "Job Description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Job Title",
    "description": "Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  INSERT INTO jobs (title, description) VALUES (?, ?);
  ```

#### `GET /jobs/:id`
- **Description**: Get a specific job
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Job Title",
    "description": "Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  SELECT * FROM jobs WHERE id = ?;
  ```

#### `PUT /jobs/:id`
- **Description**: Update a specific job
- **Request**:
  ```json
  {
    "title": "Updated Job Title",
    "description": "Updated Job Description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Updated Job Title",
    "description": "Updated Job Description",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```
- **SQL Query**:
  ```sql
  UPDATE jobs SET title = ?, description = ? WHERE id = ?;
  ```

#### `DELETE /jobs/:id`
- **Description**: Delete a specific job
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Job deleted successfully"
  }
  ```
- **SQL Query**:
  ```sql
  DELETE FROM jobs WHERE id = ?;
  ```

### Dashboard Endpoints

#### `GET /dashboard/stats`
- **Description**: Get dashboard statistics
- **Request**: None
- **Response**:
  ```json
  {
    "total_users": 100,
    "total_job_posts": 50,
    "total_bidders": 30,
    "total_bids": 200,
    "total_jobs": 40
  }
  ```
- **SQL Query**:
  ```sql
  SELECT COUNT(*) as total_users FROM users;
  SELECT COUNT(*) as total_job_posts FROM job_posts;
  SELECT COUNT(*) as total_bidders FROM bidders;
  SELECT COUNT(*) as total_bids FROM bids;
  SELECT COUNT(*) as total_jobs FROM jobs;
  ```

## Data Processing

- **Login**: Validate user credentials and generate JWT token.
- **Dashboard**: Aggregate statistics from the database.
- **Job Posts**: CRUD operations on job posts.
- **Bidders**: CRUD operations on bidders.
- **Bids**: CRUD operations on bids.
- **Jobs**: CRUD operations on jobs.

## Data Sources

- **Users**: Data is gathered from the `users` table.
- **Job Posts**: Data is gathered from the `job_posts` table.
- **Bidders**: Data is gathered from the `bidders` table.
- **Bids**: Data is gathered from the `bids` table.
- **Jobs**: Data is gathered from the `jobs` table.

## SQL Queries

- **Login**:
  ```sql
  SELECT * FROM users WHERE username = ? AND password = ? AND user_type = 0;
  ```
- **Dashboard**:
  ```sql
  SELECT COUNT(*) as total_users FROM users;
  SELECT COUNT(*) as total_job_posts FROM job_posts;
  SELECT COUNT(*) as total_bidders FROM bidders;
  SELECT COUNT(*) as total_bids FROM bids;
  SELECT COUNT(*) as total_jobs FROM jobs;
  ```
- **Get All Job Posts**:
  ```sql
  SELECT * FROM job_posts;
  ```
- **Create Job Post**:
  ```sql
  INSERT INTO job_posts (title, description) VALUES (?, ?);
  ```
- **Get Job Post by ID**:
  ```sql
  SELECT * FROM job_posts WHERE id = ?;
  ```
- **Update Job Post**:
  ```sql
  UPDATE job_posts SET title = ?, description = ? WHERE id = ?;
  ```
- **Delete Job Post**:
  ```sql
  DELETE FROM job_posts WHERE id = ?;
  ```
- **Get All Bidders**:
  ```sql
  SELECT * FROM bidders;
  ```
- **Create Bidder**:
  ```sql
  INSERT INTO bidders (name, email) VALUES (?, ?);
  ```
- **Get Bidder by ID**:
  ```sql
  SELECT * FROM bidders WHERE id = ?;
  ```
- **Update Bidder**:
  ```sql
  UPDATE bidders SET name = ?, email = ? WHERE id = ?;
  ```
- **Delete Bidder**:
  ```sql
  DELETE FROM bidders WHERE id = ?;
  ```
- **Get All Bids**:
  ```sql
  SELECT * FROM bids;
  ```
- **Create Bid**:
  ```sql
  INSERT INTO bids (job_post_id, bidder_id, amount) VALUES (?, ?, ?);
  ```
- **Get Bid by ID**:
  ```sql
  SELECT * FROM bids WHERE id = ?;
  ```
- **Update Bid**:
  ```sql
  UPDATE bids SET amount = ? WHERE id = ?;
  ```
- **Delete Bid**:
  ```sql
  DELETE FROM bids WHERE id = ?;
  ```
- **Get All Jobs**:
  ```sql
  SELECT * FROM jobs;
  ```
- **Create Job**:
  ```sql
  INSERT INTO jobs (title, description) VALUES (?, ?);
  ```
- **Get Job by ID**:
  ```sql
  SELECT * FROM jobs WHERE id = ?;
  ```
- **Update Job**:
  ```sql
  UPDATE jobs SET title = ?, description = ? WHERE id = ?;
  ```
- **Delete Job**:
  ```sql
  DELETE FROM jobs WHERE id = ?;
  ```

This document provides a comprehensive guide for the AI to create the project, ensuring all necessary details are included.
