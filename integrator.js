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

function renderTasks() {
  let html = "";
  taskList.forEach((value) => {
    html += `<div class="task">${value.task}</div>
    <div class="task-date"> ${value.date}</div>
   <div><button class="mark-as-done js-done">Mark as Done</button></div>
   <div><button class="delete js-delete">Delete</button></div>`;
  });
  document.querySelector(".js-new-task").innerHTML = html;
}

document.querySelector(".submit").addEventListener("click", () => {
  const inputTask = document.querySelector(".input-task");
  const inputDate = document.querySelector(".input-date");
  addTask(inputTask.value, inputDate.value);
});

document.addEventListener("DOMContentLoaded", () => fetchTasks());
