//create a list taskList that stores the task and date (for the sake of localstorage)
let taskList = JSON.parse(localStorage.getItem("taskDetails")) || [
  { task: "", inputDate: "" },
];

document.querySelector(".submit").addEventListener("click", () => {
  let inputTaskEle = document.querySelector(".input-task");
  let inputDateEle = document.querySelector(".input-date");
  addToList(inputTaskEle.value, inputDateEle.value);
});

function markAsComplete() {
  document.querySelectorAll(".js-done").forEach((doneEle) => {
    doneEle.addEventListener("click", () => {
      doneEle.classList.add("completed");
      doneEle.innerHTML = "completed";
    });
  });
}

function addToList(task, inputDate) {
  if (task && inputDate) {
    taskList.push({ task, inputDate });
    localStorage.setItem("taskDetails", JSON.stringify(taskList));
    document.querySelector(".input-task").value = "";
    document.querySelector(".input-date").value = "";
    //console.log(taskList);
    renderList();
    document.querySelector(".js-new-task").classList.add("task-info");
  } else {
    error = `<div class='error'>Please fill all the task details</div>`;
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
