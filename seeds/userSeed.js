const mongoose = require('mongoose');
const User = require('../models/User');
const db_URL = require('../config/db');

mongoose.connect(db_URL.DB_URL, {useMongoClient: true});

const users = [
  {
    firstname: "Andrei",
    dniNumber: "123ajajaj123",
  },

  {
    firstname: "Paolo",
    dniNumber: "132561rqeqr"
  }
];

/*products.forEach(p => {
  new Product(p).save();
});
mongoose.connection.close();*/

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach(p => console.log(p.dniNumber));
  mongoose.connection.close();
});
