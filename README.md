## Prerequesites
- Clone project using `git clone https://github.com/deepdeb/login-registration-project.git`
- Create a database called "student" in MySQL using `create database student;`
- Select the database using `use student;`
- Create a table called "students" using `CREATE TABLE students (id VARCHAR(36) NOT NULL PRIMARY KEY, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, age INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, phone VARCHAR(255), createdAt DATE, updatedAt DATE, deletedAt DATE);`

## Backend
Open new terminal and navigate to '/student-backend'
- Run `npm install`
- Apply sequelize migration using `npx sequelize-cli db:migrate`
- Run `npm start`

## Frontend
- Open new terminal and navigate to '/student-frontend'
- Run npm install
- Run `ng serve`. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.



