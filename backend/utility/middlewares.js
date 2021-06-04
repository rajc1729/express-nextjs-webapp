const axios = require("axios");
const db = require("../models");
const countryModel = db.countryModel;

exports.checkCacheStatus = (req, res, next) => {
  countryModel.find({}, function (err, countries) {
    console.log(countries.length);
    if (err) {
      console.log("Error getting the countries");
    } else if (countries.length !== 0) {
      next();
    } else {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((res) => {
          if (res.status == 200) {
            const countries = res.data;
            console.log("Request sent");
            const promises = [];
            countries.forEach((country) => {
              const countryUpdateData = {
                name: country.name,
                code: country.alpha3Code,
                capital: country.capital,
                region: country.region,
                flag: country.flag,
                population: country.population,
                borders: country.borders,
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
    }
  });
};
