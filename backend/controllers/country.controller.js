const db = require("../models");
const axios = require("axios");
const countryModel = db.countryModel;

// Retrieve all countries from the database.
exports.findAll = (req, res) => {
  axios
    .get("https://restcountries.eu/rest/v2/all")
    .then((res) => {
      if (res.status == 200) {
        const countries = res.data;
        const promises = [];
        // console.log(countries);
        countries.forEach((country) => {
          const countryUpdateData = {
            name: country.name,
            code: country.alpha3Code,
            capital: country.capital,
            region: country.region,
            flag: country.flag,
            population: country.population,
          };

          promises.push(
            countryModel.findOneAndUpdate(
              { code: country.alpha3Code },
              countryUpdateData,
              {
                useFindAndModify: false,
                upsert: true,
              }
            )
          );
          // .then((data) => {
          //   // console.log(data);
          //   // const counrtyStoreData = new countryModel({
          //   //   name: country.name,
          //   //   code: country.alpha3Code,
          //   //   capital: country.capital,
          //   //   region: country.region,
          //   //   flag: country.flag,
          //   //   population: country.population,
          //   // });
          //   // if (!data) {
          //   //   // no find
          //   //   promises.push(countryModel.create(countryUpdateData));
          //   // }
          // });
        });

        return Promise.all(promises);
      }
    })
    .then(() => {
      countryModel.find({}, function (err, countries) {
        if (err) {
          console.log("Error getting the countries");
        } else {
          res.send({ count: countries.length, data: countries });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
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
          .send({ message: "Not found Country with region " + region });
      else res.send({ count: data.length, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving countries with region=" + region,
      });
    });
};
