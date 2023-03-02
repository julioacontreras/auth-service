<a name="top"></a>
# API v1.0.0

API

# Table of contents

- [Auth](#Auth)
  - [Is authenticated](#Is-authenticated)
  - [User login](#User-login)
  - [User register](#User-register)

___


# <a name='Auth'></a> Auth

## <a name='Is-authenticated'></a> Is authenticated
[Back to top](#top)

```
POST /api/auth/is-authenticated
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| accessToken | `string` | <p>Access token</p> |
| email | `string` | <p>Email</p> |

## <a name='User-login'></a> User login
[Back to top](#top)

```
POST /api/auth/login
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `string` | <p>Email</p> |
| password | `string` | <p>Password</p> |

## <a name='User-register'></a> User register
[Back to top](#top)

```
POST /api/auth/register
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `string` | <p>Name</p> |
| email | `string` | <p>Email</p> |
| password | `string` | <p>Password</p> |
| type | `string` | <p>Type account</p> |

