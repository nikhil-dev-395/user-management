# Frontend Documentation

## Overview

This document provides an overview of the frontend implementation of the application.
The frontend is developed using **React.js** and communicates with the backend using **Axios**.
Authentication is handled using **session-based authentication**, where the backend manages user sessions and the frontend relies on HTTP status codes for authorization handling.

Session expiration and unauthorized access are handled **within individual components** by checking API response errors and redirecting users to the login page.

---

## Technology Stack

- **React.js** – JavaScript library for building user interfaces
- **Vite** – Development and build tool
- **Axios** – HTTP client for making API requests
- **React Router DOM** – Client-side routing
- **Session-based Authentication** – Cookie-based authentication managed by the backend

---

## Project Structure

- src
  - components
  - pages
  - utils
  - public
    .... rest same vite uses for react

#### note - here in the pages we have all page we will gonna show

---

## API Communication

The frontend communicates with the backend using **Axios** directly within React components.

### Axios Usage

- API requests include `withCredentials: true` to allow session cookies to be sent with each request.
- The backend API base URL is managed through a constants file.

Example API call:

```js
axios.get(`${API_BASE_URL}/api/user/all`, {
  withCredentials: true,
});
```

### env
```bash
VITE_SERVER_BASE_URL="http://localhost:3000"
```


