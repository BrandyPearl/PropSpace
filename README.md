Run the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173` (or next available port).

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Log in, returns JWT |
| GET | /api/auth/me | Yes | Get current authenticated user |
| GET | /api/properties | No | Get all properties (supports ?city, ?minPrice, ?maxPrice) |
| GET | /api/properties/:id | No | Get a single property |
| GET | /api/properties/mine | Yes | Get current user's properties |
| POST | /api/properties | Yes | Create a property |
| PUT | /api/properties/:id | Yes (owner only) | Update a property |
| DELETE | /api/properties/:id | Yes (owner only) | Delete a property |
| PUT | /api/users/me | Yes | Update profile |
| PUT | /api/users/me/password | Yes | Change password |

## Author

Built as a class exam project (B.Tech Software Engineering, full-stack web development module).
'@ | Set-Content -Path README.md -Encoding utf8