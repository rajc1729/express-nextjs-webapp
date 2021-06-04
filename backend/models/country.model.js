module.exports = (mongoose) => {
  const countrySchema = mongoose.Schema(
    {
      name: String,
      code: {
        type: String,
        required: true,
        unique: true,
      },
      capital: String,
      region: String,
      flag: String,
      population: Number,
    },
    { timestamps: true }
  );
  countrySchema.index({ code: 1, region: 1 });

  const countryModel = mongoose.model("country", countrySchema);

  return countryModel;
};

// const Schema = require("mongoose").Schema;
// const countrySchema = new mongoose.Schema({
//   name: String,
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   capital: String,
//   region: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   flag: String,
//   population: Number,
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const countryModel = db.model("Country", countrySchema);
// module.exports = countryModel;
