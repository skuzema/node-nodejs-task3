## Task #3: CRUD API

#### Start the server in development mode:

```
npm run start:dev
```

#### Start the server in production mode:

```
npm run start:prod
```

#### Testing:

```
npm run start:dev
npm run test
```

###### The server will start running on the specified port (default: 3000).

#### Use API endpoints to interact with the application:

###### \* Replace {userId} with the actual ID of the user you want to retrieve, update, or delete.

#### Get all user records:

```
GET /api/users
```

#### Get a specific user record by ID

```
GET /api/users/{userId}
```

#### Create a new user record. Send the user data in the request body:

```
POST /api/users
```

#### Update an existing user record by ID. Send the updated user data in the request body:

```
PUT /api/users/{userId}
```

#### Delete a user record by ID.

```
DELETE /api/users/{userId}
```
