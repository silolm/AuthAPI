const express = require("express"),
  bodyParser = require("body-parser"),
  config = require("./config/config");
app = express();// 1

app.set("masterKey", config.masterKey);// 2
app.use(bodyParser.urlencoded({ extended: true }));// 3
app.use(bodyParser.json());// 4
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY," +
    " Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

require("./app/routes/authAPI.routes")(app);

app.listen(3000, () => {
  console.log("Corriendo en http://localhost:3000");
});// 5