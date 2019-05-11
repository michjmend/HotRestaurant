// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservation Queue (DATA)
// =============================================================
var reservations = [
  {
    Name: "Andrew",
    phone_no: '222-333-4444',
    email: 'Andrew@Wait.com',
    id: 'A1'
  },
  {
    Name: "Mick",
    phone_no: '201-555-1234',
    email: 'mick@mick.com',
    id: 'A2'
  },
  {
    Name: "Trisha",
    phone_no: '303-981-1171',
    email: 'trish@trish.com',
    id: 'A3'
  },
];
var waiting = []

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables.html", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation.html", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// Displays all reservations
app.get("/", function(req, res) {
  return res.json(reservations);
});

app.get('/api/reservations', function(req,res) {
  return res.json(reservations)
})
app.get('/api/waiting', function(req,res) {
  return res.json(waiting)
})
// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < reservation.length; i++) {
    if (chosen === reservation[i].routeName) {
      return res.json(reservation[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/reservation", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newreservation = req.body;

  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newreservation);

  reservations.push(newreservation);

  res.json(newreservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
