# Backend API

## Register a user

Creates a user account and returns the created user together with an authentication
token.

### Endpoint

```http
POST /users/register
Content-Type: application/json
```

The server listens on port `3000` by default. Set the `PORT` environment variable
to use a different port.

### Request body

Send a JSON object with these fields:

| Field | Required | Type | Requirements |
| --- | --- | --- | --- |
| `fullname.firstname` | Yes | String | At least 3 characters |
| `fullname.lastname` | No | String | Optional |
| `email` | Yes | String | Must be a valid email address |
| `password` | Yes | String | At least 6 characters |

Example:

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Morgan"
  },
  "email": "alex@example.com",
  "password": "secret123"
}
```

`fullname` must be an object containing `firstname`. The `lastname` property may
be omitted. The password is hashed before it is stored.

### Responses

#### `201 Created`

Registration succeeded. The response contains the created user and a JWT
authentication token:

```json
{
  "user": {
    "_id": "created-user-id",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex@example.com"
  },
  "token": "jwt-token"
}
```

The actual user fields are determined by the Mongoose user document.

#### `400 Bad Request`

One or more request fields failed validation. The response includes the
validation errors:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

The `errors` array can contain multiple validation errors, including messages
for an invalid email or a password shorter than 6 characters.

## Log in a user

Authenticates an existing user and returns the user together with an
authentication token.

### Endpoint

```http
POST /users/login
Content-Type: application/json
```

### Request body

Send a JSON object with these fields:

| Field | Required | Type | Requirements |
| --- | --- | --- | --- |
| `email` | Yes | String | Must be a valid email address |
| `password` | Yes | String | Must not be empty |

Example:

```json
{
  "email": "alex@example.com",
  "password": "secret123"
}
```

### Responses

#### `200 OK`

Login succeeded. The response contains the user and a JWT authentication token:

```json
{
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex@example.com"
  },
  "token": "jwt-token"
}
```

The actual user fields are determined by the Mongoose user document.

#### `400 Bad Request`

The email or password failed request validation. The response includes the
validation errors:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`

No user was found for the supplied email, or the password did not match:

```json
{
  "message": "Invalid credentials"
}
```

The message is `"Invalid Password"` when the email belongs to a user but the
password does not match.

## Get user profile

Returns the authenticated user's profile. This route requires a valid JWT
provided in the `token` cookie or in the `Authorization` header as a bearer
token.

### Endpoint

```http
GET /users/profile
Authorization: Bearer <jwt-token>
```

### Responses

#### `200 OK`

The request was authenticated successfully and the current user profile is
returned:

```json
{
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex@example.com"
  }
}
```

The actual user fields are determined by the Mongoose user document.

#### `401 Unauthorized`

The request did not include a valid token:

```json
{
  "message": "No token provided"
}
```

This can also return `"Invalid token"` or `"Unauthorized access"` when the JWT
is expired, malformed, or has been blacklisted after logout.

## Log out a user

Logs the current user out by clearing the authentication cookie and blacklisting
the current token so it cannot be used again.

### Endpoint

```http
POST /users/logout
Authorization: Bearer <jwt-token>
```

### Responses

#### `200 OK`

The user was logged out successfully:

```json
{
  "message": "logged out successfully"
}
```

The token is removed from the `token` cookie, and the server stores the token in
`BlacklistToken` so future requests using the same JWT are rejected.

#### `401 Unauthorized`

The request did not include a valid token or the token was invalid:

```json
{
  "message": "No token provided"
}
```

Possible auth failures include `"Invalid token"`, `"Unauthorized access"`, and
`"No token provided"`.
