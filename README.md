# Backend

Backend - API v1.0

## 🚀 Get started

```console
    npm install -g win-node-env 
    npm install -g nodemon
    npm install

    # run application in develop mode
    npm run dev 

    # run application in production mode
    npm run build
    npm run start
```

## Documentation

```console
    # install depedencies
    npm install apidoc http-server -g

    # generate api documentation
    npm run doc

    # view documentation
    npm run doc:view
```

## Tests

```console
    # run tests
    npm run test:unit
```

## Endpoints

```console
    # Signin
    POST /api/auth/signin
    body{
        "email": "julio@demo.com",
        "password": "1234"
    }    

    # Signup
    POST /api/auth/signup
    body{
        "email": "julio@demo.com",
        "password": "1234"
    }    

    # Is authenticated
    POST /api/auth/is-authenticated
    body{ 
        "email": "julio@demo.com",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1bGlvQGRlbW8uY29tIiwiaWF0IjoxNjc2NjU5Mjg2LCJleHAiOjE2NzY3NDU2ODZ9.VO9M8FM0idZI7jeAxZPAtdiCzamWi2X1s3DF2ISk2Is"
    }
```
