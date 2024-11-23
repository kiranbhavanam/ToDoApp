let taskList = [];
//fetching tasks by using a fetch request.
async function fetchTasks() {
  try {
    const response = await fetch("http://localhost:3000/todos");
    taskList = await response.json();
    renderTasks();
  } catch (error) {
    console.log("error occured: ", error);
  }
}

async function addTask(task, date) {
  console.log("task:" + task + " date: " + date);
  if (task && date) {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, date }),
      });
      if (response.ok) await fetchTasks();
      else throw new Error("Failed to add task");
    } catch (error) {
      console.log(error);
    }
  } else {
    document.querySelector(
      ".js-new-task"
    ).innerHTML = `<div>Please fill all details</div>`;
  }
}

async function completeTask(index) {
  try {
    // console.log("index: " + index);
    const taskId = taskList[index].id;
    // console.log("taskId: " + taskId);
    const res = await fetch(`http://localhost:3000/todos/${taskId}`, {
      method: "PUT",
    });
    if(res.ok){
      await fetchTasks();
    }
    // console.log("fetched tasks successfully.")
  } catch (error) {
    console.log(error);
  }
}

async function deleteTask(index) {
  const taskId=taskList[index].id;
  console.log("Deleting task at index:"+index+" and taskID: "+taskId)
  try {
    const res=await fetch(`http://localhost:3000/todos/${taskId}`,{
      method:"DELETE"
    })
    if(res.ok)
       fetchTasks()

  } catch (error) {
    console.log(error)
  }
}

function renderTasks() {
  let html = "";
  taskList.forEach((value, index) => {
    console.log("Value of task " +index +JSON.stringify(value));
    html += `<div class="task">${value.task}</div>
    <div class="task-date"> ${value.date}</div>
  <div><button class="mark-as-done js-done" onclick="completeTask(${index})">${
      value.completed ? "completed" : "Mark"
    }</button></div>
   <div><button class="delete" js-delete onclick="deleteTask(${index})">Delete</button></div>`;
  });
  document.querySelector(".js-new-task").innerHTML = html;
}

document.querySelector(".submit").addEventListener("click", () => {
  const inputTask = document.querySelector(".input-task");
  const inputDate = document.querySelector(".input-date");
  addTask(inputTask.value, inputDate.value);
});

document.addEventListener("DOMContentLoaded", () => fetchTasks());
