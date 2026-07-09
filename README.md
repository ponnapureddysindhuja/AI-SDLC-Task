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

## Run locally
1. Open the backend folder
2. Run:
   ```bash
   mvn spring-boot:run
   ```
3. Open: http://localhost:8080

## H2 Console
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:taskdb
- Username: sa
- Password: blank
