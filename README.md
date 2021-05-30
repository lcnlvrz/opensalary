# Open Salary

Open Salary is a free web application created with the objective of recollecting data to make salaries more fair. In this platform you can post job salary as anonymous and find a salary by occupation, location and currency.

## Architecture

Open Salary architecture is based on microservices. This was possible thanks Kong API Gateway, the entrypoint of all microservices and responsible about authentication

![alt text](https://i.imgur.com/S8p3QD6.png)

### Frontend

- React with Typescript
- TailwindCSS
- Ant Design

### Backend

- NodeJS with Typescript
- NestJS 
- PostgreSQL
- Kong API Gateway
- Docker


## Project Status
This project is currently in production and you can test it clicking in the following link:

[Open Salary](https://open-salary.netlify.app)


## Instructions
Each service is a nodeJS application, so if you want to up the services:
```javascript
yarn install

## Create .env file with the followings key
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=xxxx
DB_NAME=open-user-service

## For create SSL certificates, use mkcert
SSL=true
SSL_KEY_PATH="./.cert/key.pem"
SSL_CERT_PATH="./.cert/cert.pem"

APP_BASE_URL=https://localhost:9000

JWT_SECRET=testing
JWT_PUBLIC=testing

yarn start:dev
```

And if you want to up the kong API Gateway:
```javascript
## Create and .env with the following keys:

USER_SERVICE=https://localhost:8001/user
SALARY_SERVICE=https://localhost:8002/salary

#Frontend application
AWS_CLIENT=https://localhost:9000

JWT_KEY=xxx
JWT_SECRET=xxx

## And then:
docker-compose up -d
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
