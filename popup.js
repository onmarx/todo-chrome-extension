const form = document.querySelector(".form");
const taskContainer = document.querySelector(".task-container");
const template = document.querySelector(".template").content;
const fragment = document.createDocumentFragment();
let tasksContainer = {};

//Events

// local storage
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("taskResult")) {
    console.log("hi");
    tasksContainer = JSON.parse(localStorage.getItem("taskResult"));
  }
  drawTask();
});

// select task card
taskContainer.addEventListener("click", (e) => {
  //console.log(e.target)
  actionsBtn(e);
});

// select event submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  newTask(e);
});
//Functions

const newTask = (e) => {
  if (e.target[0].value.trim() === "") {
    console.log("vacio");
    return;
  }
  //create Task Object
  const task = {
    id: Date.now(),
    text: e.target[0].value.toUpperCase(),
    status: false,
  };
  // add task Objt to TaskContainer Objts
  tasksContainer[task.id] = task;
  form.reset();
  e.target[0].focus();
  drawTask();
};

const drawTask = () => {
  localStorage.setItem("taskResult", JSON.stringify(tasksContainer));

  if (Object.values(tasksContainer).length === 0) {
    taskContainer.innerHTML =
      '<div class="tasks-card secondary vacio"> No hay Tareas 👍😃</div>';
    return;
  }

  taskContainer.textContent = null; // container div
  Object.values(tasksContainer).forEach((elementTask) => {
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = elementTask.text;
    // changed class
    if (elementTask.status) {
      clone
        .querySelectorAll(".fas")[0]
        .classList.replace("fa-check-circle", "fa-undo-alt");
      clone
        .querySelector(".tasks-card")
        .classList.replace("warning", "secondary");
      clone.querySelector("p").style.textDecoration = "line-through";
    }
    clone.querySelectorAll(".fas")[0].dataset.id = elementTask.id;
    clone.querySelectorAll(".fas")[1].dataset.id = elementTask.id;
    fragment.appendChild(clone);
  });
  taskContainer.appendChild(fragment);
};

const actionsBtn = (e) => {
  if (e.target.classList.contains("fa-check-circle")) {
    tasksContainer[e.target.dataset.id].status = true;
    drawTask();
  }
  if (e.target.classList.contains("fa-minus-circle")) {
    delete tasksContainer[e.target.dataset.id];
    drawTask();
  }
  if (e.target.classList.contains("fa-undo-alt")) {
    tasksContainer[e.target.dataset.id].status = false;
    drawTask();
  }
};
