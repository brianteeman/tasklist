document.addEventListener("DOMContentLoaded", tasklist);

function tasklist() {
  addTask();
  const add = document.getElementById("add-btn");
  const txtInput = document.querySelector(".txt-input");
  add.addEventListener("click", function () {
    const taskTitle = txtInput.value.trim();
    if (taskTitle) {
      txtInput.value = "";
      const tasks = !localStorage.getItem("tasks")
        ? []
        : JSON.parse(localStorage.getItem("tasks"));
      const currentTask = {
        taskTitle,
        isCompleted: false,
      };
      addTask([currentTask]);
      tasks.push(currentTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    txtInput.focus();
  });
  txtInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      add.click();
    }
  });
  document.querySelector(".filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".tasks").className = `tasks ${id}`;
    }
  });
  document.getElementById("clear-completed").addEventListener("click", function () {
      deleteIndexes = [];
      document.querySelectorAll(".card.checked").forEach(function (card) {
        deleteIndexes.push(
          [...document.querySelectorAll(".tasks .card")].indexOf(card)
        );
          setTimeout(function () {
            card.remove();
          }, 100);
        });
      removeManyTask(deleteIndexes);
    });
}

function stateTask(index, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].isCompleted = completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeManyTask(indexes) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter(function (task, index) {
    return !indexes.includes(index);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(tasks = JSON.parse(localStorage.getItem("tasks"))) {
  if (!tasks) {
    return null;
  }
  const itemsLeft = document.getElementById("items-left");
  tasks.forEach(function (task) {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    // Add classes
    card.classList.add("card");
    button.classList.add("clear");
    cbContainer.classList.add("cb-container");
    check.classList.add("check");
    button.classList.add("clear");
    cbInput.setAttribute("type", "checkbox");
    button.setAttribute("aria-label", Joomla.Text._('MOD_TASKLIST_DELETE'));
    item.textContent = task.taskTitle;
    if (task.isCompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }
    cbInput.addEventListener("click", function () {
      const correspondingCard = this.parentElement.parentElement;
      const checked = this.checked;
      stateTask(
        [...document.querySelectorAll(".tasks .card")].indexOf(
          correspondingCard
        ),
        checked
      );
      checked
        ? correspondingCard.classList.add("checked")
        : correspondingCard.classList.remove("checked");
      itemsLeft.textContent = document.querySelectorAll(
        ".tasks .card:not(.checked)"
      ).length;
      itemsLeft.textContent = Joomla.Text._('MOD_TASKLIST_TODO') . replace('%s', itemsLeft.textContent);
    });
    button.addEventListener("click", function () {
      const correspondingCard = this.parentElement;
      removeTask(
        [...document.querySelectorAll(".tasks .card")].indexOf(
          correspondingCard
        )
      );
        setTimeout(function () {
          correspondingCard.remove();
          itemsLeft.textContent = document.querySelectorAll(
            ".tasks .card:not(.checked)"
          ).length;
          itemsLeft.textContent = Joomla.Text._('MOD_TASKLIST_TODO') . replace('%s', itemsLeft.textContent);
        }, 100);
    });
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(button);
    document.querySelector(".tasks").appendChild(card);
  });
  itemsLeft.textContent = document.querySelectorAll(
    ".tasks .card:not(.checked)"
  ).length;
  itemsLeft.textContent = Joomla.Text._('MOD_TASKLIST_TODO') . replace('%s', itemsLeft.textContent);
}
