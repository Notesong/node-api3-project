const express = require("express");

const server = express();

server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let date = new Date();
  console.log(`${req.method} Request "${req.url}" | ${date.toLocaleString()}`);
  next();
}

module.exports = server;
