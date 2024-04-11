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

The server will be running at `http://localhost:3333`.

## Routes

The API has the following routes:

- `POST /api/posts`: Creates a new post
- `GET /api/posts`: Lists all posts (with pagination)
- `GET /api/posts/:id`: Gets a post by ID
- `PUT /api/posts/:id`: Updates a post by ID
- `DELETE /api/posts/:id`: Deletes a post by ID

## Pagination

This API implements pagination for the `/posts` route which lists all the posts. Pagination is done by passing the `startIndex` and `endIndex` parameters in the GET request URL.

For example:

`/posts?startIndex=0&endIndex=10` will return the first 10 posts
`/posts?startIndex=10&endIndex=20` will return the next 10 posts

Additionally, you can optionally sort the posts by passing the `sortBy` and `order` parameters. By default, posts are sorted by `title` in `asc` (ascending) order.

Examples:

- `/posts?startIndex=0&endIndex=10&sortBy=title&order=desc` will return the first 10 posts sorted by title in descending order
- `/posts?startIndex=0&endIndex=10&sortBy=createdAt&order=asc` will return the first 10 posts sorted by creation date in ascending order

You can also filter the posts by passing other relevant query parameters. For example, to filter by title:

- `/posts?startIndex=0&endIndex=10&title=My Post` will return the first 10 posts whose title contains "My Post"

Remember to adjust the values of startIndex and endIndex according to your needs to get the desired page of results.

## Testing

To run unit tests, use the following command:

```bash
$ npm test
```
