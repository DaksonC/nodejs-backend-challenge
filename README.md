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
$ npm run dev
```

3. Start Prisma Server:
```bash
$ prisma studio
```

The server will be running at `http://localhost:3333`.

To access route documentation `http://localhost:3333/api-docs`

## Routes

NOTE: with the exception of the `POST /api/users`, `GET /api/auth/login` and `GET /api/posts/all` routes, all routes require authentication.

The API has the following routes:

### `POST /api/users`

Create user.

- Body Parameters:
  - `name`: String (required) - Username to be registered
  - `email`: String (required) - E-mail of the user to be registered
  - `password`: String (required) - Password for the user to be registered

### `GET /api/auth/login`

Login

- Body Parameters:
  - `email`: String (required) - E-mail of the user to be registered
  - `password`: String (required) - Password for the user to be registered

### `POST /api/posts`

Creates a new post.

- Body Parameters:
  - `title`: String (required) - The title of the post
  - `body`: String (required) - The body/content of the post
  - `tags`: Array of Strings - Optional tags for categorizing the post
  - `authorId`: String (required) - The ID of the author of the post

### `GET /api/posts`

Lists all user posts with optional pagination and filtering.

### `GET /api/posts/all`

Lists all posts from all users with optional pagination and filtering.

- Query Parameters:
  - `startIndex`: Number (optional) - Index of the first post to fetch (default: 0)
  - `endIndex`: Number (optional) - Index of the last post to fetch (default: 10)
  - `sortBy`: String (optional) - Field to sort the posts by (default: "title")
  - `order`: String (optional) - Sort order ("asc" for ascending, "desc" for descending)
  - `title`: String (optional) - Filter posts by title
  - `authorId`: String (optional) - Filter posts by author ID

Examples:

`/api/posts?startIndex=0&endIndex=10&sortBy=title&order=desc` - Fetches the first 10 posts sorted by title in descending order
`/api/posts?startIndex=0&endIndex=10&title=My Post` - Fetches the first 10 posts with title containing "My Post"

### `GET /api/posts/:id`

Gets a post by ID.

### `PUT /api/posts/:id`

Updates a post by ID.

Body Parameters (same as POST /api/posts)

### `DELETE /api/posts/:id`

Deletes a post by ID.

Pagination
Pagination is implemented for the` /api/posts` route. You can use the `startIndex` and `endIndex` query parameters to paginate the results.

## Testing

To run unit tests, use the following command:

```bash
$ npm run test
```
