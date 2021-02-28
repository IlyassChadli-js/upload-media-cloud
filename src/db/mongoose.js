const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false, //to hide Deprecation warning message on console
  useUnifiedTopology: true,
});
