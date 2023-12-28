const express = require("express"); // es5

// import express from 'express' // es6

const { questions } = require("./question"); //es5

// import { questions } from './question'; // es6

const server = express();

server.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token); // "Bearer 123"

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  // array destructuring getting the second index after splitting
  const [, bearerToken] = token.split(" ");

  if (bearerToken === "123") {
    next();
  } else {
    return res.sendStatus(403); // Forbidden
  }
};
// // RESTFUL CRUD OPERATION
// // C CREATE
server.post("/api/v1/postQuestions", authenticateToken, (request, response) => {
  questions.push(request.body);
  if (questions.length > 1) {
    response.status(201).json({
      message: "Question added successfully!",
    });
  }
});
// // R READ

// server.get("/",(request, response) => {
//   response.send({
//     message: "welcome to homepage",
//   });
// });

server.get("/api/v1/getquestions", authenticateToken, (request, response) => {
  response.send(questions);
});
// for getting data through query parameter
server.get(
  "/api/v1/getSinglequestion",
  authenticateToken,
  (request, response) => {
    let id = request.query.id; //to get  query
    let question = questions.filter((q) => {
      return q.id === Number(id);
    });
    response.send(question);
  }
);
// U UPDATE
server.patch("/api/v1/updateQuestion", authenticateToken, (req, res) => {
  const updatedproduct = questions.find((item) => {
    return item.id === req.body.id;
  });
  updatedproduct.title = req.body.title;

  res.status(200).json({
    message: "item updated sucessfully",
  });
});

// // D DELETE

server.delete("/api/v1/deleteQuestion", authenticateToken, (req, res) => {
  let foundObject = questions.find((question) => question.id === req.body.id);

  questions.splice(foundObject.id, 1);
  res.status(202).json({
    message: "item deleted successfully",
  });
});

server.listen(8080, () => {
  console.log("server started");
});
