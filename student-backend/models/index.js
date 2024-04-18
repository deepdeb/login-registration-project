"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const filesInFolder = fs.readdirSync(__dirname);

const requiredFiles = filesInFolder
  .filter((file) => {
    const isJsFile = file.endsWith(".js");
    const isNotHiddenFile = !file.endsWith(".");
    const isNotBasenameFile = file !== basename;
    const isNotTestFile = !file.includes(".test.js");
    return isJsFile && isNotTestFile && isNotBasenameFile && isNotHiddenFile;
  })
  
  requiredFiles.forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;