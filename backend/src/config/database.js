const mongoose = require("mongoose");

const connect_db = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.gjuq7.mongodb.net/devTinder"
  );
};

module.exports = connect_db;
