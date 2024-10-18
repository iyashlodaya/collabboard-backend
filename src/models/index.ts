const { Sequelize } = require("sequelize");
const { development } = require("../config/config");

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,
    port: development.port,
  }
);

export default sequelize;
