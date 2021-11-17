
// see google docs web API notes, the DOM
var buttonEl = document.querySelector("#save-task");

// selects the ul element by its ID
var tasksToDoEl = document.querySelector("#tasks-to-do");

function createTaskHandler() {
    // when this variable is used, a new <li> element is created
    var listItemEl = document.createElement("li");

    // changes text content between the li tags of the new object
    listItemEl.textContent = "hello";

    // programmatically assigns a class and all the styles 
    // of the class to the new element
    listItemEl.className = "task-item";

    // appends the li element (taskItemEl) to be the last child 
    // of the ul element
    tasksToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);