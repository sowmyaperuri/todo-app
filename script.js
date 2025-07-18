document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTasks(task));
  addTaskButton.addEventListener("click", () => {
    const taskTest = todoInput.value.trim();
    if (taskTest === "") return;
    const newTask = {
      id: Date.now(),
      text: taskTest,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    todoInput.value = ""; //clear input
    console.log(tasks);
  });
  function renderTasks(task) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.setAttribute("data.id", task.id);
    li.innerHTML = `<span>${task.text}</span> 
    <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        //to check which part of the li is being clicked or targeted
        return;
      }
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });
    li.querySelector('button').addEventListener('click',(e)=>{
      e.stopPropagation()//prevent toggle from firing
      tasks = tasks.filter(t=>t.id!==task.id)
      li.remove();
      saveTasks();
    })

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
