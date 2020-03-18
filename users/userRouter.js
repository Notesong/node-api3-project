const express = require("express");

const Users = require("./userDb.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "Invalid user id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error:", err });
    });
}

function validateUser(req, res, next) {
  if (req.body === undefined || req.body === {}) {
    res.status(400).json({ message: "Missing user data." });
  } else if (req.body.name === undefined) {
    res.status(400).json({ message: "Missing required name field." });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (req.body === undefined || req.body === {}) {
    res.status(400).json({ message: "Missing user data." });
  } else if (req.body.text === undefined) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
