const express = require("express");
const { questions } = require("./question");

const server = express();

server.use(express.json());

// RESTFUL CRUD OPERATION
// C CREATE
server.post("/", (req, res) => {
  questions.push(req.body);
  res.status(201).json({
    message: "Question added successfully!",
  });
});
// R READ
server.get("/", (req, res) => {
  res.send(questions);
});
// U UPDATE
server.patch("/", (req, res) => {
  const updatedproduct = questions.find((item) => {
    return item.id === req.body.id;
  });
  updatedproduct.title = req.body.title;

  res.status(201).json({
    message: "item updated sucessfully",
  });
});

// D DELETE

server.delete("/", (req, res) => {
  let foundObject = questions.find((question) => question.id === req.body.id);

  questions.splice(foundObject.id, 1);
  res.status(200).json({
    message: "item deleted successfully",
  });
});

server.listen(8080, () => {
  console.log("server started");
});
