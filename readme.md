# User Management System

## Overview

This is a simple **User Management System** where an admin can perform CRUD (Create, Read, Update, Delete) operations on users.
The system uses **session-based authentication**, where only logged-in users can access protected routes.

---

## Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Session-based (express-session + connect-mongo)

---

## Installation

Clone the repository:

````bash
git clone https://github.com/nikhil-dev-395/user-management
cd user-management


### for client

```bash
cd client
npm i
npm run dev

````

### for client

```bash
cd server
npm i
npm run dev
```

**note: create .env files in both client and server**

#### for the further details refer following docs file

- [client](./docs/client.md)
-  [server](./docs/server.md)
