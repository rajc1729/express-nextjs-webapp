module.exports = (app) => {
  const country = require("../controllers/country.controller.js");

  var router = require("express").Router();

  // Retrieve all country
  router.get("/", country.findAll);

  // Retrieve a single country with code
  router.get("/:code", country.findByCode);

  // Retrieve a list of countries with region
  router.get("/region/:region", country.findByRegion);

  app.use("/api/country", router);
};
