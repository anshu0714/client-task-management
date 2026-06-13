# ER Diagram / Schema Overview

## Entities

### User

- id
- name
- email
- password
- role
- createdAt
- updatedAt

### Client

- id
- name
- email
- phone
- companyName
- address
- createdAt
- updatedAt

### Project

- id
- clientId
- name
- description
- startDate
- dueDate
- status
- createdAt
- updatedAt

### Task

- id
- projectId
- assignedUserId
- title
- description
- priority
- status
- dueDate
- createdAt
- updatedAt

### Comment

- id
- taskId
- userId
- content
- createdAt
- updatedAt

## Relationships

- One **Client** can have many **Projects**
- One **Project** belongs to one **Client**
- One **Project** can have many **Tasks**
- One **Task** belongs to one **Project**
- One **User** can be assigned many **Tasks**
- One **Task** is assigned to one **User**
- One **Task** can have many **Comments**
- One **Comment** belongs to one **Task**
- One **User** can create many **Comments**
- One **Comment** belongs to one **User**

## Text ERD

## Text ERD

```text
Client
  1
  |
  +------< Project
             1
             |
             +------< Task >------+
                        ^          |
                        |          |
                        |          v
                  assignedUser    Comment
                        ^          ^
                        |          |
                        +---- User -+
```

## Notes

- `clientId` is stored in Project, not directly in Task, to avoid duplicate data.
- Task client information is derived through Project -> Client.
- This keeps the schema normalized and avoids unnecessary repetition.
