# Client Task Management System Design

## 1. Database Schema Design

The system uses MongoDB collections with clear relationships between users, clients, projects, tasks, and comments.

### Users

Stores authentication and authorization data.

- name
- email
- password
- role (`ADMIN`, `EMPLOYEE`)
- createdAt
- updatedAt

### Clients

Stores customer or company information.

- name
- email
- phone
- companyName
- address
- createdAt
- updatedAt

### Projects

Each project belongs to one client.

- client (ObjectId -> Clients)
- name
- description
- startDate
- dueDate
- status (`NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`)
- createdAt
- updatedAt

### Tasks

Each task belongs to one project and is assigned to one user.

- title
- description
- project (ObjectId -> Projects)
- assignedUser (ObjectId -> Users)
- priority (`LOW`, `MEDIUM`, `HIGH`)
- status (`PENDING`, `IN_PROGRESS`, `COMPLETED`)
- dueDate
- createdAt
- updatedAt

### Comments

Each comment belongs to one task and one user.

- task (ObjectId -> Tasks)
- user (ObjectId -> Users)
- content
- createdAt
- updatedAt

## 2. API Structure

The application uses REST APIs grouped by domain.

### Auth APIs

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/logout`
- `GET /auth/me`

### User APIs

- `GET /users`

### Client APIs

- `POST /clients`
- `GET /clients`
- `GET /clients/:id`
- `PATCH /clients/:id`
- `DELETE /clients/:id`

### Project APIs

- `POST /projects`
- `GET /projects`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

### Task APIs

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

### Comment APIs

- `GET /tasks/:taskId/comments`
- `POST /tasks/:taskId/comments`

### Dashboard API

- `GET /dashboard`

## 3. Authentication Flow

The system uses JWT-based authentication.

1. User signs up or logs in.
2. Backend validates credentials.
3. Backend returns an access token and refresh token mechanism.
4. Frontend stores the access token and attaches it to protected API requests.
5. Protected routes check user authentication before rendering pages.
6. On token expiry, the refresh flow issues a new access token.
7. Logout clears authentication state.

## 4. Role-Based Access Control

### Admin

Admin has full access to management operations:

- Manage clients
- Manage projects
- Manage tasks
- Assign tasks to employees
- View all tasks
- Access complete dashboard statistics

### Employee

Employee has limited access:

- View assigned tasks only
- Update own task status
- Add comments to assigned tasks
- Access only personal task statistics

Role checks are enforced in backend middleware and reflected in frontend UI.

## 5. Scaling for 10,000 Daily Users

If the application grows to 10,000 daily users, the following improvements should be made:

### Application Layer

- Add load balancer for backend instances
- Use horizontal scaling for API servers

### Database Layer

- Optimize queries with indexes
- Use query pagination everywhere
- Monitor slow queries
- Add read replicas if needed

### Performance

- Cache dashboard stats with Redis
- Use background jobs for expensive operations
- Avoid loading large lists in one request

## 6. Database Indexes

### Users

- `email` unique index for login lookup

### Clients

- `email` unique index to avoid duplicate clients
- `companyName` index for listing and lookup

### Projects

- `client` index to fetch projects by client
- `(client, name)` compound unique index to prevent duplicate project names under same client
- `status` index for filtering

### Tasks

- `assignedUser` index to fetch employee tasks
- `status` index for dashboard and filters
- `priority` index for filtering
- `dueDate` index for overdue queries
- `(assignedUser, status)` compound index for employee task dashboard
- `(project, title)` compound unique index to prevent duplicate task titles inside same project

### Comments

- `task` index to fetch comments by task
- `(task, createdAt)` compound index to fetch latest comments efficiently

## 7. Overdue Task Reminders

A background reminder system can be implemented using a scheduler or queue worker.

### Approach

1. Run a scheduled job every hour or once per day.
2. Query tasks where:
   - dueDate is less than current date
   - status is not completed
3. Group overdue tasks by assigned user.
4. Send reminder notifications using email or in-app notifications.
5. Track reminder history to avoid duplicate reminders.

### Tools

- Cron jobs for simple scheduling
- BullMQ or RabbitMQ for scalable background job processing
- Email provider such as Nodemailer, SendGrid, or SES

## Design Decisions

### Why MongoDB

MongoDB fits this assignment well because:

- Relationships are simple and manageable with ObjectId references
- Development is fast
- Mongoose provides schema validation and population

### Why JWT

JWT is suitable because:

- Stateless authentication scales well
- Easy to use with SPA frontend
- Fits protected API design

### Why REST APIs

REST works well for CRUD-heavy systems because:

- Predictable endpoint structure
- Easy frontend-backend integration
- Good fit for admin dashboards

## Conclusion

This design keeps the project simple enough for an assignment while still showing proper schema design, API structure, authentication, authorization, pagination, indexing, and scalability planning.
