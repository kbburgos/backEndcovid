const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require('body-parser');
const markerRoutes = require('./routes/markers');


//iniciatizations
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//global

// routes
app.use("/markers", require('./routes/markers'));
app.use("/zona", require('./routes/zona'));

//public

// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
