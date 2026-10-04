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
