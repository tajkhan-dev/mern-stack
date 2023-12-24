const express = require("express"); // es5

// import express from 'express' // es6

const { questions } = require("./question"); //es5

// import { questions } from './question'; // es6

const server = express();

server.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  const [, bearerToken] = token.split(" ");

  if (bearerToken === "123") {
    next();
  } else {
    return res.sendStatus(403); // Forbidden
  }
};
// // RESTFUL CRUD OPERATION
// // C CREATE
server.post("/", authenticateToken, (req, res) => {
  questions.push(req.body);
  res.status(201).json({
    message: "Question added successfully!",
  });
});
// R READ

server.get("/", authenticateToken, (request, response) => {
  response.send({
    message: "welcome to homepage",
  });
});
server.get("/api/v1/getquestions", authenticateToken, (request, response) => {
  response.send(questions);
});
// // U UPDATE
// server.patch("/", (req, res) => {
//   const updatedproduct = questions.find((item) => {
//     return item.id === req.body.id;
//   });
//   updatedproduct.title = req.body.title;

//   res.status(201).json({
//     message: "item updated sucessfully",
//   });
// });

// // D DELETE

// server.delete("/", (req, res) => {
//   let foundObject = questions.find((question) => question.id === req.body.id);

//   questions.splice(foundObject.id, 1);
//   res.status(200).json({
//     message: "item deleted successfully",
//   });
// });

server.listen(8080, () => {
  console.log("server started");
});

// // const {id}=useParams()
// const movies= [{name:"creed",id:1},{name:"prisonbreak",id:2}]
// function displayMovies(id){
//   if(!id){

//  console.log("not found")
//   }else{

//     let movie=movies.filter((movie)=>movie.id===Number(id))
//     console.log(movie)
//   }
// }

// displayMovies(1)

// // movie.map(())
