# Posts API

This is a simple RESTful API to manage posts (CRUD). The API was developed using Node.js, Express, and Prisma ORM with SQLite as the database.

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/index.html)

## Installation

1. Clone this repository:

```bash
$ https://github.com/DaksonC/nodejs-backend-challenge
```

2. Navigate to the project directory:

```bash
$ nodejs-backend-challenge
```

3. Install dependencies:

```bash
$ npm install
```

## Database Configuration

This project uses SQLite as the database. Prisma will automatically create a `dev.db` file in the root directory of the project during migration.

## Running the Application

1. Run Prisma migrations to create tables in the database:

```bash
$ npx prisma migrate dev --name init
```

2. Start the server:

```bash
$ npm start
```

The server will be running at `http://localhost:3000`.
Documentation will be in `http://localhost:3000/docs`.

## Routes

The API has the following routes:

- `POST /api/posts`: Creates a new post
- `GET /api/posts`: Lists all posts (with pagination)
- `GET /api/posts/:id`: Gets a post by ID
- `PUT /api/posts/:id`: Updates a post by ID
- `DELETE /api/posts/:id`: Deletes a post by ID

## Testing

To run unit tests, use the following command:

```bash
$ npm test
```
