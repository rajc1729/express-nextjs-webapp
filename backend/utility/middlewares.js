const axios = require("axios");
const db = require("../models");
const countryModel = db.countryModel;

exports.checkCacheStatus = (req, res, next) => {
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
        });

        return Promise.all(promises);
      }
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving countries from api",
      });
    });
};
