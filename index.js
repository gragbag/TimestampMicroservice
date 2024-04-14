// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date?', (req, res, next) => {
  if (isValidDate(req.params.date)) {
    req.time = new Date(req.params.date);
  } else if(!isNaN(req.params.date) && Number.parseInt(req.params.date) > 0) {
    req.time = new Date(Number.parseInt(req.params.date));
  } else if(!req.params.date) {
    req.time = new Date()
  } else {
    res.send({
      "error": "Invalid Date"
    })
    return;
  }
  next();
}, (req, res) => {
    res.send({
      "unix": req.time.getTime(),
      "utc": req.time.toGMTString()
    })
})

const isValidDate = (date) => {
  return !isNaN(new Date(date));
}