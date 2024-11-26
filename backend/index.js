const express = require("express");
// const bodyParser=require("body-parser")
const app = express();
// app.use(bodyParser.json())
const cors = require("cors");
app.use(cors());

const todos = [];
let id = 1;
//counting number of requests
let number_of_requests = 0;
function countReq(req, res, next) {
  number_of_requests++;
  console.log(`${req.method} method is called for ${req.url}`);
  console.log("number of requests unitll now: " + number_of_requests);
  next();
}
app.use(countReq);
app.use(express.json());
app.get("/todos", (req, res) => {
  return res.status(200).json(todos);
});
app.post("/todos", (req, res) => {
  const { task, date } = req.body;
  if (!task || !date)
    return res.status(400).send("Task and date are required!");
  const newTodo = {
    id: id++,
    completed: false,
    task,
    date,
  };
  todos.push(newTodo);
  return res.status(201).send(newTodo);
});
app.put("/todos/:id", (req, res) => {
  // console.log("put request recieved for:"+req.params.id)
  const target = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!target) return res.status(400).send("No such task");
  target.completed = true;
  return res.status(200).json(target);
});
app.delete("/todos/:id", (req, res) => {
  const targetIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );
  if (targetIndex === -1) return res.status(400);
  todos.splice(targetIndex, 1);
  return res.status(200).json(todos);
});
// app.all("*",(req,res)=>{
//     return res.status(404);

// })
app.listen(3000, () => {
  console.log("Server is listening...");
});
