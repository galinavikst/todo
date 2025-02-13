# Todo

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker -  [Download & Install Docker](https://docs.docker.com/engine/install/).
- PostgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/download/).


## Technology Stack

- [Nest](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Typescript](https://www.typescriptlang.org/): A modern programming language.
- [PostgreSQL](https://www.postgresql.org/): A powerful, open source object-relational database system.
- [TypeORM](https://typeorm.io/): Object–relational mapping tool - a programming technique for converting data between a relational database and the memory 
  of an object-oriented programming language.
- [Swagger](https://swagger.io/): Api documentation.


## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/galinavikst/todo.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd todo/be
    ```
    
-----

### Run docker

```
docker compose up
```

or 

### Run locally
 **Install the dependencies:**

```bash
npm install
```

> Connect to postgress server and create new db named 'todo' or other name but make sure fix .env file then

```
psql -U postgres
```
- provide the password for the postgres user and press Enter
```
CREATE DATABASE "todo"; 
```
> you may fix .env file with your password.
> please, make sure your postgres server is running on your machine

Use migrations for creating db entities.


**Start the development server:**

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
-----

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.







