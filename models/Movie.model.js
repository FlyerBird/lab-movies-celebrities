const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
   
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  cast: {
    type: [Schema.Types.ObjectId],
    ref: "Celebrity.model",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;