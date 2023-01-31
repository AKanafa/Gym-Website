var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


var indexRouter = require("./routes/index");
const clientRoute = require("./routes/clientRoute");
const locationRoute = require("./routes/locationRoute");
const registerRoute = require("./routes/registerRoute");

const sequelizeInit = require("./config/sequelize/init");
sequelizeInit().catch((err) => {
  console.log(err);
});


var app = express();



const fmt = require('./utils/dateFormating');
app.use((req, res, next) => {
    res.locals.fmt = fmt;
    next();
});


const i18n = require("i18n");
i18n.configure({
  locales: ["pl", "en"],
  directory: path.join(__dirname, "i18n"),
  objectNotation: true,
  defaultLocale: "en",
  cookie: "acme-hr-lang",
});

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, "public")));
app.use(i18n.init);

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});



app.use("/", indexRouter);
app.use("/client", clientRoute);
app.use("/location", locationRoute);
app.use("/register", registerRoute);

const ClientApiRoute = require("./routes/api/ClientApiRoute");
const LocationApiRoute = require("./routes/api/LocationApiRoute");
const RegisterApiRoute = require("./routes/api/RegisterApiRoute");

app.use("/api/client", ClientApiRoute);
app.use("/api/location", LocationApiRoute);
app.use("/api/register", RegisterApiRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});




module.exports = app;
