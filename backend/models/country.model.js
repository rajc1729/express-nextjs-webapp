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
      createdAt: { type: Date, expires: 10, default: Date.now },
    },
    { timestamps: true }
  );
  countrySchema.index(
    { code: 1, region: 1, createdAt: 1 },
    { expireAfterSeconds: 10 }
  );

  const countryModel = mongoose.model("country", countrySchema);

  return countryModel;
};
