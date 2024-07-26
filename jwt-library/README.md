# @tanu-chahal/jwt-library

Encode, decode, and validate JSON Web Tokens (JWTs) with ease.

This library provides simple and efficient methods for working with JWTs in both JavaScript and TypeScript projects.

## Features

- Encode (create) JWT tokens
- Decode JWT tokens
- Validate JWT tokens

## Library Demo

Check out the library's [demo application](https://jwt-library.vercel.app/).

## Installation

You can install the package via npm:

```bash
npm install @tanu-chahal/jwt-library
```

Or with yarn:

```bash
yarn add @tanu-chahal/jwt-library
```

## Usage
First, import the methods you need:

```js
import { encode_jwt, decode_jwt, validate_jwt } from '@tanu-chahal/jwt-library';
```

### Methods


#### 1. `encode_jwt`

Creates a JWT token.

Arguments:

- `secret` (string, required): The secret key used to sign/encode the JWT.
- `id` (string | number, required): An identifier (user ID, etc.) to include in the payload.
- `payload` (object, required): The payload data you want to encode.
- `ttl` (number, optional): Time to live in seconds. If provided, the token will have an expiration time.

Returns: A signed JWT token as a string.

Example:

```javascript
const secret = 'your-secret-key';
const id = 'user123';
const payload = { role: 'admin', name: 'John Doe' };
const token = encode_jwt(secret, id, payload, 3600);
console.log(token);
```

#### 2. `decode_jwt`

Decodes a JWT token, verifies its signature & returns the encoded data and expiration date (if `ttl` was passed while encoding).

Arguments:

- `secret` (string, required): The same secret key used to encode the JWT signature.
- `jwt` (string, required): The JWT token to decode.

Returns: An object containing the `id`, `payload`, and `expires_at` (as a Date or null).

Example:

```javascript
const secret = 'your-secret-key';
const token = 'your-jwt-token';
try {
  const decoded = decode_jwt(secret, token);
  console.log(decoded);
} catch (error) {
  console.error(error.message);
}
```

#### 3. `validate_jwt`

Validates a JWT token by decoding it and checking the signature.

Arguments:

- `secret` (string, required): The same secret key used to encode the JWT signature.
- `jwt` (string, required): The JWT token to validate.

Returns: A boolean indicating whether the JWT is valid.

Example:

```javascript
const secret = 'your-secret-key';
const token = 'your-jwt-token';
const isValid = validate_jwt(secret, token);
console.log(isValid); // true or false
```

## GitHub

[Repository Link](https://github.com/tanu-chahal/jwt-library)


### Author - Tanu Chahal

[GitHub](https://github.com/tanu-chahal)

[LinkedIn](https://www.linkedin.com/in/tanuchahal/)