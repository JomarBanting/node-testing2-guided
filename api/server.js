const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/:id", (req, res) => {
  res.end()
});

server.post("/hobbits", (req, res) => {
  Hobbits.insert(req.body)
    .then(hobbit => {
      res.status(201).json(hobbit)
    }).catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
});

server.delete("/hobbits/:id", (req, res) => {
  const { id } = req.params
  Hobbits.remove(id).then(hobbit => {
    res.status(200).json(hobbit)
  }).catch(err => {
    res.status(400).json({
      message: err.message
    })
  })
});

server.put("/hobbits/:id", (req, res) => {
  const { id } = req.params
  Hobbits.update(id, req.body)
    .then(hobbit => {
      res.status(200).json(hobbit)
    }).catch(err => {
      res.status(400).json(err.message)
    })
});

module.exports = server;
