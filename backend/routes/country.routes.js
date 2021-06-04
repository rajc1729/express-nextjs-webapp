module.exports = (app) => {
  const country = require("../controllers/country.controller.js");
  const middlewares = require("../utility/middlewares.js");

  var router = require("express").Router();

  // Retrieve all country
  router.get("/", middlewares.checkCacheStatus, country.findAll);

  // Retrieve a single country with code
  router.get("/:code", middlewares.checkCacheStatus, country.findByCode);

  // Retrieve a list of countries with region
  router.get(
    "/region/:region",
    middlewares.checkCacheStatus,
    country.findByRegion
  );

  app.use("/api/country", router);
};
