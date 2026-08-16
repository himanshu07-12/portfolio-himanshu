# Personal Portfolio

A full-stack developer portfolio built with React, Vite, Tailwind CSS, Node.js, Express and MySQL. The site includes a public portfolio, dynamic content loaded from the backend, a contact form, and a protected admin dashboard for managing portfolio data.

## Features

- Responsive portfolio website
- Light/dark theme support
- Projects, skills, experience, education, certifications and achievements
- Contact form backed by MySQL
- Admin authentication with JWT
- Admin dashboard for managing portfolio content
- API health check and centralized error handling
- Security headers, CORS and rate limiting

## Project Structure

```text
frontend/   React + Vite client
backend/    Express API + MySQL integration
```

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Framer Motion, Lucide React

**Backend:** Node.js, Express, MySQL, JWT, bcryptjs, Helmet, express-rate-limit

## Local Setup

### Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and add your local MySQL and JWT configuration. Then start the API:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` in `frontend/.env` to the backend API URL.

## Database

The MySQL schema is available at `backend/src/config/schema.sql`. The backend also contains database initialization and seed helpers.

## Notes

Environment files and generated dependencies/build output are intentionally excluded from version control.
