const env = require("./env.js");
const { applyExtraSetup } = require("../models/extraSetup");

const { Sequelize } = require("sequelize");

const db = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const modelDefiners = [
  require("../models/Roles"),
  require("../models/Users"),
  // Add more models here...
  // require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(db);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(db);

module.exports = db;
