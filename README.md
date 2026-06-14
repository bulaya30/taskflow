# TaskFlow

A modern full-stack task management application built with React, TypeScript, Express, Firebase, and Clean Architecture principles.

The application allows users to create, manage, prioritize, and track tasks while receiving smart reminders for upcoming deadlines.

---

## Features

### Authentication

- Firebase Authentication
- JWT session handling
- Protected routes

### Task Management

- Create tasks
- Update tasks
- Delete tasks
- Complete tasks
- High priority task restriction
- Due today and due soon indicators

### Notifications

- Automatic reminder generation
- Due today notifications
- Due soon notifications
- Mark notifications as read

### User Settings

- Theme preferences
- Reminder preferences
- Email notification preferences

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Zustand
- TanStack Query
- React Router
- Shadcn UI
- TailwindCSS
- Zod

### Backend

- Express
- TypeScript
- Firebase
- Awilix (Dependency Injection)
- Node Cron
- JWT

---

## Project Structure

```
src/

├── controllers/
├── services/
├── repositories/
├── interfaces/
├── middlewares/
├── routes/
├── container/
├── config/
└── lib/
```

The backend follows a layered architecture:

```
Route
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Business rules are handled inside services while repositories are responsible for data access.

---

## Architecture

This project follows several Clean Architecture concepts:

- Dependency Injection using Awilix
- Repository Pattern
- Service Layer
- Separation of Concerns
- Single Responsibility Principle

---

## Validation

Frontend validation is implemented using **Zod**.

Backend business validation is handled inside the service layer before repository operations.

---

## Installation

### Clone repository

```bash
git clone https://github.com/bulaya30/taskflow.git
```

### Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

---

## Environment Variables

Backend

```
JWT_SECRET=

FIREBASE_API_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

Frontend

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN= 
VITE_FIREBASE_PROJECT_ID= 
VITE_FIREBASE_APP_ID= 
```

---

## Running the project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## Learning Objectives

This project was built to practice modern full-stack development using:

- Clean Architecture
- Repository Pattern
- Dependency Injection
- State Management with Zustand
- Server State Management with TanStack Query
- Form Validation with Zod
- Firebase Authentication
- TypeScript

---

## Future Improvements

- Drag and drop tasks
- Calendar view
- Email reminders
- Team collaboration
- Task labels
- Analytics dashboard

---

## Author

Norbert Bulaya

Full Stack JavaScript / TypeScript Developer

GitHub: https://github.com/bulaya30
LinkedIn: https://linkedin.com/in/bulaya-norbert-6a8b44165