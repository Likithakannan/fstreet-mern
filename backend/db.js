const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://likithakannan:lIKI110502@cluster0.1x5unsy.mongodb.net/Fstreet?retryWrites=true&w=majority";
const mongoDB = () => {
  mongoose
    .connect(mongoURI)
    .then(response => {
      console.log("Connected");
      const fetch_data = mongoose.connection.db.collection('food_items');
      fetch_data
        .find({}).toArray().then(data => {
          const food_category = mongoose.connection.db.collection('food_category');
          food_category
            .find({})
            .toArray()
            .then(cat_data => {
              global.food_items = data;
              global.food_category = cat_data;
            })
            //global.food_items = data;
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        })
        
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = mongoDB;
