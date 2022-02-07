const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('public'));
app.use("/images", express.static("uploads"));

app.use(session({
  secret: 'fghjvbhvbwu',

}));

app.use(function(req, res, next) {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
});

require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end("Error...");
    console.log(err);
});

var server = app.listen(3000, () => console.log("On: 3000"));