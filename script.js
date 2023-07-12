class TaskManager {
    constructor() {
      this.tasks = [];
      this.currentId = 0;
    }
  
    addTask(name) {
      const task = {
        id: this.currentId++,
        name: name,
        description: "",
        status: "open"
      };
      this.tasks.push(task);
      this.renderTasks();
    }
  
    updateTaskDescription(id, description) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.description = description;
        this.renderTasks();
      }
    }
  
    updateTaskStatus(id, status) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.status = status;
        this.renderTasks();
      }
    }
  
    removeTask(id) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        this.renderTasks();
      }
    }
  
    renderTasks() {
      const openList = document.getElementById("open");
      const inProgressList = document.getElementById("progress");
      const inReviewList = document.getElementById("review");
      const doneList = document.getElementById("done");
  
      // Clear task lists
      openList.innerHTML = "";
      inProgressList.innerHTML = "";
      inReviewList.innerHTML = "";
      doneList.innerHTML = "";
  
      // Render tasks based on status
      this.tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.name;
        li.draggable = true;
  
        // Add event listener for opening the description modal
        li.addEventListener("click", () => {
          this.openTaskDescriptionModal(task);
        });
  
        // Add event listener for drag start
        li.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", task.id);
        });

        // Create the circle tag
        const circle = document.createElement("span");
        circle.classList.add("circle");
  
        // Assign the task to the appropriate list based on status
        switch (task.status) {
          case "open":
            circle.style.backgroundColor = "orange";
            openList.appendChild(li);
            break;
          case "inProgress":
            circle.style.backgroundColor = "red";
            inProgressList.appendChild(li);
            break;
          case "inReview":
            circle.style.backgroundColor = "purple";
            inReviewList.appendChild(li);
            break;
          case "done":
            circle.style.backgroundColor = "green";
            doneList.appendChild(li);
            break;
        }
        li.appendChild(circle);
      });
    }
  
    openTaskDescriptionModal(task) {
      const modal = document.getElementById("taskModal");
      const description = document.getElementById("taskdescription");
      const saveBtn = document.getElementById("saveDescription");
      const deleteBtn = document.getElementById("deleteTask");
  
      description.value = task.description;
  
      saveBtn.addEventListener("click", () => {
        this.updateTaskDescription(task.id, description.value);
        modal.style.display = "none";
      });
  
      deleteBtn.addEventListener("click", () => {
        this.removeTask(task.id);
        modal.style.display = "none";
      });
  
      modal.style.display = "block";
    }
  
    closeTaskDescriptionModal() {
      const modal = document.getElementById("taskModal");
      modal.style.display = "none";
    }
}
  
  // Create an instance of the TaskManager class
  const taskManager = new TaskManager();
  
  // Event listener for form submission
  const taskForm = document.getElementById("taskform");
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskNameInput = document.getElementById("taskName");
    const taskName = taskNameInput.value.trim();
    if (taskName !== "") {
      taskManager.addTask(taskName);
      taskNameInput.value = "";
    }
  });
  
  // Event listener for drop targets
  const dropTargets = document.getElementsByClassName("task-list");
  Array.from(dropTargets).forEach(target => {
    target.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  
    target.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      const targetId = event.currentTarget.id;
  
      switch (targetId) {
        case "open":
          taskManager.updateTaskStatus(Number(taskId), "open");
          break;
        case "progress":
          taskManager.updateTaskStatus(Number(taskId), "inProgress");
          break;
        case "review":
          taskManager.updateTaskStatus(Number(taskId), "inReview");
          break;
        case "done":
          taskManager.updateTaskStatus(Number(taskId), "done");
          break;
      }
    });
  });
  
  // Event listener for closing the description modal
  const closeModalBtn = document.getElementsByClassName("close")[0];
  closeModalBtn.addEventListener("click", () => {
    taskManager.closeTaskDescriptionModal();
  });

