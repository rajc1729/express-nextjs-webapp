const db = require("../models");
const countryModel = db.countryModel;

// Retrieve all countries from the database.
exports.findAll = (req, res) => {
  countryModel
    .find()
    .then((data) => {
      if (data.length === 0)
        res.status(404).send({ message: "Not countries found" });
      else res.send({ count: data.length, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries.",
      });
    });
};

// Find a single country with an id
exports.findByCode = (req, res) => {
  const code = req.params.code;

  countryModel
    .find({ code: code })
    .then((data) => {
      if (data.length === 0)
        res
          .status(404)
          .send({ message: "Not found Country with Country " + Country });
      else res.send({ count: data.length, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Country with code=" + code,
      });
    });
};

// Find a single country with an region
exports.findByRegion = (req, res) => {
  const region = req.params.region;

  countryModel
    .find({ region: region })
    .then((data) => {
      if (data.length === 0)
        res
          .status(404)
          .send({ message: "Not countries found with region " + region });
      else res.send({ count: data.length, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving countries with region=" + region,
      });
    });
};

// Find a single country with an region
exports.searchByCountryName = (req, res) => {
  const countryName = req.params.countryName;

  countryModel
    .search(countryName)
    .then((data) => {
      if (data.length === 0)
        res.status(404).send({ message: "Not countries found" });
      else res.send({ count: data.length, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving countries",
      });
    });
};
