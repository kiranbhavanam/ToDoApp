const { error } = require("console");

//create a list taskList that stores the task and date (for the sake of localstorage)
// let taskList = JSON.parse(localStorage.getItem("taskDetails")) || [
//   { task: "", inputDate: "" },
// ];
let taskList;
function fetchTasks(){
  fetch("https://localhost:3000/todos")
    .then((response)=>response.json())
    .then((data)=>{
      taskList=data;
      renderList();
    }).catch((error)=>console.error("error fetchning tasks: ",error));
}
document.querySelector(".submit").addEventListener("click", () => {
  let inputTaskEle = document.querySelector(".input-task");
  let inputDateEle = document.querySelector(".input-date");
  addToList(inputTaskEle.value, inputDateEle.value);
});

// function markAsComplete() {
//   document.querySelectorAll(".js-done").forEach((doneEle) => {
//     doneEle.addEventListener("click", () => {
//       doneEle.classList.add("completed");
//       doneEle.innerHTML = "completed";
//     });
//   });
// }
function markAsComplete() {
  document.querySelectorAll(".js-done").forEach((doneEle, index) => {
    doneEle.addEventListener("click", () => {
      const taskId = taskList[index].id; // Use the task ID from the backend
      fetch(`http://localhost:3000/todos/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to mark task as complete");
        })
        .then((updatedTask) => {
          taskList[index] = updatedTask; // Update the task in the local list
          renderList();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
}

function addToList(task, date) {
  if (task && inputDate) {
    // taskList.push({ task, date }); to connect with backend when updating your array, post the request 
    fetch("https://localhost:3000/todos",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({task,date})
    }).then((response)=>{
        if(response.ok){
          return response.json();
        }
        throw new Error("Failed to add task");
    }).then((newTask)=>{
      taskList.push(newTask);
      renderList();
      document.querySelector(".input-task").value = "";
    document.querySelector(".input-date").value = "";
    }).catch((error)=>{
      console.error(error);
    })
    // localStorage.setItem("taskDetails", JSON.stringify(taskList));
    
    // //console.log(taskList);
    // renderList();
    // document.querySelector(".js-new-task").classList.add("task-info");
  } else {
    const error = `<div class='error'>Please fill all the task details</div>`;
    document.querySelector(".js-new-task").classList.remove("task-info");
    document.querySelector(".js-new-task").innerHTML = error;
  }
}
function renderList() {
  let html = "";
  taskList.forEach((value) => {
    html += `<div class="task">${value.task}</div>
    <div class="task-date"> ${value.inputDate}</div>
   <div><button class="mark-as-done js-done">Mark as Done</button></div>
   <div><button class="delete js-delete">Delete</button></div>`;
  });
  document.querySelector(".js-new-task").innerHTML = html;
  deleteTask();
  markAsComplete();
}

function deleteTask() {
  document.querySelectorAll(".js-delete").forEach((button, index) => {
    button.addEventListener("click", () => {
      //   console.log(button); <button class="delete js-delete">Delete</button>
      //   console.log(index);  respective index starting from 0
      taskList.splice(index, 1);
      localStorage.setItem("taskDetails", JSON.stringify(taskList));
      // console.log(taskList);
      document.querySelector(".js-new-task").innerHTML = "";
      renderList();
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  fetchTasks();
});