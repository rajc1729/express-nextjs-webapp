module.exports = (mongoose, searchable) => {
  const countrySchema = mongoose.Schema(
    {
      name: {
        type: String,
        searchable: true,
      },
      code: {
        type: String,
        required: true,
        unique: true,
      },
      capital: String,
      region: String,
      flag: String,
      population: Number,
      borders: [{ type: String }],
      createdAt: { type: Date, expires: 86400, default: Date.now },
    },
    { timestamps: true }
  );
  countrySchema.index(
    { code: 1, region: 1, createdAt: 1 },
    { expireAfterSeconds: 86400 }
  );
  countrySchema.plugin(searchable);

  const countryModel = mongoose.model("country", countrySchema);

  return countryModel;
};
