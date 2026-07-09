# Task Manager App

A simple full-stack task management application built with:
- Backend: Spring Boot + Java 17 + H2 database
- Frontend: browser-based UI served by Spring Boot

## Features
- Create tasks
- View all tasks
- Edit tasks
- Delete tasks
- Change task status
- Set due dates

## Demo
Open the app in your browser at http://localhost:8080 to manage tasks.
You can also inspect the database through the H2 console at http://localhost:8080/h2-console.

## AI Usage Reflection
This project was developed with the help of AI throughout the workflow:
- AI assisted in generating the backend structure and REST API design.
- AI helped with validation logic, debugging, and UI wiring.
- The implementation was reviewed manually to ensure the CRUD flow and project requirements were met.

## Run locally
1. Open the backend folder
2. Run:
   ```bash
   mvn spring-boot:run
   ```
3. Open: http://localhost:8080

## Testing CRUD with Postman
No authentication is required for this app. There are no API keys or auth tokens.

### Base URL
- http://localhost:8080

### Headers
For POST and PUT requests, set:
- Content-Type: application/json

### Endpoints
- GET /api/tasks
- GET /api/tasks/{id}
- POST /api/tasks
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}

### Step-by-step
1. Start the app with `mvn spring-boot:run`.
2. Open Postman and create a new request.
3. Set the request type to GET and open `http://localhost:8080/api/tasks`.
4. Click Send to view all tasks.
5. For creating a task, use POST with the URL `http://localhost:8080/api/tasks` and the following JSON body:
   ```json
   {
     "title": "Review sprint plan",
     "description": "Discuss blockers and next steps",
     "status": "TODO",
     "dueDate": "2026-07-10"
   }
   ```
6. For updating a task, use PUT with the URL `http://localhost:8080/api/tasks/1` and send updated JSON.
7. For deleting a task, use DELETE with the URL `http://localhost:8080/api/tasks/1`.
8. To fetch one task, use GET with the URL `http://localhost:8080/api/tasks/1`.

### Authentication
- Auth Type: None
- API Key: Not required

## H2 Console
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:file:./data/taskdb
- Username: sa
- Password: blank

## Persistence behavior
Task data is now stored in a local H2 file database. Data will persist across app restarts as long as the `backend/data` folder remains available.
