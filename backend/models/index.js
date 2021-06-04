const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const searchable = require("mongoose-regex-search");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.countryModel = require("./country.model.js")(mongoose, searchable);

module.exports = db;
