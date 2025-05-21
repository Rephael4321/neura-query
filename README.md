# Neura Query – Frontend

A user-friendly frontend interface for Neura Query, enabling users to query their SQL databases using natural language.

---

## Important note!

This repo is synced with the [neura-query-backend](https://github.com/Rephael4321/neura-query-api) repo.
You can set it up and view some of the pages, but in order to use Neura Query you will have to setup the backend too. If you are encountering a problem with the setup or with the usage of this project, please let me know with a pull request.

---

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [License](#license)
- [Author](#author)

---

## Overview

Neura Query is a platform that allows users to query their SQL databases using natural language. The frontend is built with **Next.js** and hosted on **Vercel**. It communicates with the backend API (`Neura Query API`) to translate user input into SQL, execute the queries, and display the results.

---

## System Architecture

This frontend serves as the graphical user interface (GUI) of Neura Query. It includes:

- **Home Page**
- **Sign In / Sign Up**
- **Connect DB** – Users provide their database credentials.
- **Querier Page** – A GPT-like interface for submitting natural language queries.

The frontend interacts with the backend API to handle authentication, query translation, execution, and response formatting.

---

## Project Structure

This structure is concise, and display only the most important partial structure of the project.

- src/
	- app/
		- api/ # API routes used by the frontend
		- connect_db/ # DB connection page
		- querier/ # Querying interface
		- releases/ # Release notes
		- sign_in/ # Sign in page
		- sign_up/ # Sign up page
		- lib/ # Utility functions
		- layout.jsx, page.jsx # Base layout and root page
	- ui/ # UI Components
		- protected/ # JWT protected components

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Next.js](https://nextjs.org/)

---

## Quick Start
### 1. Clone the repo:

```bash
git clone https://github.com/Rephael4321/neura-query
cd neura-query
```

### 2. Set up environment variables in a .env file:

```env
# JWT Configurations
SECRET_KEY=my_key

# API Address
SERVER_ADDRESS=API_address

# This feature is disabled for now, put whatever strings you want.
DEMO_DB_USERNAME=demo_db_username
DEMO_DB_PASSWORD=demo_db_password
DEMO_DB_HOST=demo_db_hostname
DEMO_DB_DB_NAME=demo_db_dbname
```

### 3. Run the development server:

```bash
pnpm dev
```

---

## License
```pgsql
GNU AFFERO GENERAL PUBLIC LICENSE
Version 3, 19 November 2007
```

---

## Author

Rephael Sintes, a.k.a rephael4321
  - Portfolio: [https://rephael4321.com](https://rephael4321.com)
  - GitHub: [https://github.com/Rephael4321](https://github.com/Rephael4321)
  - LinkedIn: [https://linkedin.com/in/rephael-sintes-833177196](https://linkedin.com/in/rephael-sintes-833177196)
