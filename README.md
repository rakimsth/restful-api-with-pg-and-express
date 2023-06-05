## Installation

- Create database named `auth_demo` inside your Postgres server
- Run yarn and yarn start to get started

## ENV CONFIG

- Check the `config` folder inside the `src` folder
- Update `env.js` with your env information
- If you need to change database connection, change at `db.config.js`

## Route test

1.  Once the app is running, You can check the multiple routes

2.  Sign up using, `POST` Method on route `/api/v1/auth/signup` with payload :

```json
{
  "username": "",
  "email": "",
  "password": "",
  "roles": ["admin"] // optional
}
```

`NOTE:`

- Pass role payload to override the default role(user)
- Roles are ["admin", "user", "moderator"]
- You can pass multiple roles in the array.

3. Sign in using, `POST` Method on route `/api/v1/auth/signin` with payload :

```json
{
  "username": "",
  "password": ""
}
```

4. Check the open Route which is publicly accessible to all using, `GET` Method on the route `/api/v1/users/open`

5. Check the Protected Route which is only accessible to authorized Users using, `GET` Method on the route `/api/v1/users/user`.

```json
{
  "x-access-token": ""
}
```

`NOTE:` Pass the `x-access-token` in request headers after sign in.

6. Check all other routes in the routes directory.

<br> <p style="font-size: 40px">HAPPY CODING!!</p>

:fire:
