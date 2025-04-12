/* todos-js */

document.addEventListener("DOMContentLoaded", function () {
    let list = JSON.parse(localStorage.getItem("todos")) || [];
  
    const form = document.querySelector("#add-todo");
    const input = document.querySelector("#task");
    const ul = document.querySelector("ul");
  
    function generateTodos() {
      ul.innerHTML = "";
  
      list.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
  
        const span = document.createElement("span");
        span.textContent = task.todo;
        if (task.isChecked) {
          span.classList.add("crossed-todo");
        }
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.isChecked;
        checkbox.classList.add("me-3");
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("btn", "btn-sm", "btn-danger");
  
        const content = document.createElement("div");
        content.classList.add("d-flex", "align-items-center");
        content.appendChild(checkbox);
        content.appendChild(span);
  
        li.appendChild(content);
        li.appendChild(removeButton);
        ul.appendChild(li);
  
        // Event: check/uncheck task
        checkbox.addEventListener("change", function () {
          list[index].isChecked = checkbox.checked;
          localStorage.setItem("todos", JSON.stringify(list));
          generateTodos();
        });
  
        // Event: remove task
        removeButton.addEventListener("click", function () {
          list.splice(index, 1);
          localStorage.setItem("todos", JSON.stringify(list));
          generateTodos();
        });
      });
    }
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const taskValue = input.value.trim();
      if (!taskValue) return;
  
      list.push({ todo: taskValue, isChecked: false });
      localStorage.setItem("todos", JSON.stringify(list));
      input.value = "";
      generateTodos();
    });
  
    generateTodos();
  });
  