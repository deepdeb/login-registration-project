const { Sequelize } = require("sequelize");
const config = require("./config.json");
const { execSync } = require("child_process");

const { host, username, password } = config.development;

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: "mysql",
  host,
  username,
  password,
});

// Create the database if it doesn't exist
const createDbIfNotExists = async () => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS student;`);
    console.log('Database "student" created successfully!');
  } catch (err) {
    console.error("Error creating database:", err);
  }
};

// Execute migrations on database schema
const runMigrations = async () => {
  try {
    execSync("npx sequelize-cli db:migrate", { stdio: "inherit" });
    console.log("Migrations executed successfully!");
  } catch (err) {
    console.error("Error executing migrations");
  }
};
module.exports = { createDbIfNotExists, runMigrations };
