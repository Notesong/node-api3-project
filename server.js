const express = require("express");

const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/users", userRouter);

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
