
// see google docs web API notes, the DOM
// finds the <form> element in the page and saves it to the variable 
// formEl
var formEl = document.querySelector("#task-form");

// selects the ul elements by their ID (gray boxes that hold the list)
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// variable which will increment everytimee a new task is created
// to give the task a unique ID.
// the ID will be used to edit, delete and change the status of tasks.
var taskIdCounter = 0;

// selects the main element
var pageContentEl = document.querySelector("#page-content");


// gets the values entered by the user and stores them in a new obj
function TaskFormHandler(event) {

    // see google docs web api - notes, the event object
    // prevents default browser behavior, in this case
    // keeps the window from refreshing after the submit button 
    // is pressed
    event.preventDefault();

    // selecting the input box, based on its name attribute
    // this is how you select an attribute of an element

    // when the submit button is clicked, we want the value
    // of what is in the input box. value is a property of the
    // input object, and it is constantly updated even
    // before you hit the submit button. but we only want 
    // to get the value of the input box, 
    // after the user presses the botton

    // console.dir() allows you to see all of the hidden properties
    // and info of any object, for future reference.
    // Now the value of the taskNameInput variable will be the text 
    // we entered in the <input> element
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // dropdown list element attribute selector. 
    // value is the current picked option
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    // empty strings are considered a falsy value
    // if they are empty, alert and then terminate the function
    if (!taskNameInput && !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    if (!taskNameInput) {
        alert("Please enter a task name!");
        return false;
    }

    if (!taskTypeInput) {
        alert("Please select a task type!");
        return false;
    }

    // resets the form element so that you dont have to delete
    // all the text manually after you submitted a task
    formEl.reset();

    // The data-task-id attribute that we added to the form will 
    // serve two purposes. One, it keeps track of which task we're 
    // editing. Two, its existence lets us know that, yes, a task 
    // is being edited in the first place. A handy way of knowing 
    // if an element has a certain attribute or not is to use the 
    // hasAttribute() method.
    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to 
    // complete edit process
    if (isEdit) {
        // if it has a data task Id, that means it is already
        // a current list item that is being edited. 
        // so get the data task id
        // of that list item and pass it into the function
        // completeEditTask()
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass 
    // to createTaskEl function
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        // send the new object as an argument to createTaskEl()
        createTaskEl(taskDataObj);
    }
    
}

// We'll use taskId to find the correct <li> element and use 
// taskName and taskType to update the <li> element's 
// children accordingly.
function completeEditTask(taskName, taskType, taskId) {
    // find the matching li element based on unique 
    // data-task-id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values on this li element by updating the text content
    // of the specific list item's HTML
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // reset the form by removing the task id and changing the 
    // button text back to normal default
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    alert("Task Updated!");
}

// holds the code that creates a new task HTML element
// and then adds the element to the list
function createTaskEl(taskDataObj) {
    // when this variable is used, a new <li> element is created
    var listItemEl = document.createElement("li");
    // programmatically assigns a class and all the styles 
    // of the class to the new element
    listItemEl.className = "task-item";

    // To the new li element, add task id as a custom attribute
    // for more info see google docs web apis - notes, custom data
    // attributes
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create a div to hold the task info.
    // this div will be inside the new li element
    var taskInfoEl = document.createElement("div");
    // assign the new div element a class
    taskInfoEl.className = "task-info"
    // HTML content being added inside of the div.
    // works a lot like the textContent property, but actually
    // allows you to add full HTML inside the object, not just text.
    // taskDataObj.name is a property holding the current value
    // of the input box, which is the text the user typed into it
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    // make the new div element, a child of the new li element.
    // put the div inside the li element
    listItemEl.appendChild(taskInfoEl);

    // we're using taskIdCounter as the argument now to create 
    // buttons and a dropdown that correspond to the current task id.
    // createTaskActions() returns a <div> DOM element, 
    // the <div> element contains the buttons and dropdown.   
    // we can store that element in a variable (taskActionsEl).
    var taskActionsEl = createTaskActions(taskIdCounter);

    // append new div to new li element.
    listItemEl.appendChild(taskActionsEl);

    // appends the new li element (listItemEl) to be the last child 
    // of the ul element
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter by 1 for next unique id whenever
    // a new li element is created
    taskIdCounter++;
}

// creates the drop down menu, edit and delete buttons
// on every new li element
function createTaskActions(taskId) {

    // create a new <div> element with the class name "task-actions"
    // This <div> will act as a container for the other elements.
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create two new <button> elements and append them to the <div>
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    // for more info see google docs web apis - notes, custom data
    // attributes
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create empty dropdown (select)
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    // gives dropdown name attribute and assigns it a value
    // of "status-change"
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // add options to the select element (dropdown)
    // using a for loop so you dont have to repeat
    // yourself
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        // set value and text content to current item in the array
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append option to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    // append select (dropdown) with all the options to be last child
    // of div
    actionContainerEl.appendChild(statusSelectEl);

    // return the div with all the elements inside it
    return actionContainerEl;
}


// this function is used in the taskButtonHandler function.
// deletes the element based on the taskId
// this function selects the li element with the same
// data-task-id as the delete button that was clicked
function deleteTask(taskId) {
    // Selecting a list item using .task-item 
    // and further narrowing the search by looking for a .task-item 
    // that has a data-task-id equal to the argument we've passed 
    // into the function.
    // notice that there's no space between the .task-item and the 
    // [data-task-id] attribute, which means that both properties 
    // must be on the same element; a space would look for a element 
    // with the [data-task-id] attribute somewhere inside a .task-item 
    // element. 
    // Ex. of what this selects .task-item[data-task-id='0']
    // 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // remove the specific li element from the page
    taskSelected.remove();
}

// this function is used in the taskButtonHandler function.
// edits the element based on the taskId
// this function selects the li element with the same
// data-task-id as the edit button that was clicked
function editTask(taskId) {
    // selects entire task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // get task name and type from the selected li element.
    // select h3 with class name "task-name" within li
    // document.querySelector() searches within the document 
    // element, which is the entire page, while 
    // taskSelected.querySelector() only searches within the 
    // tastSelected element. Thus, we can narrow our search to 
    // the task item at hand to find its name (h3.task-name).
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    // select type from li
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // loads the tasks information into the form.
    // changes the input in the input bar and select dropdown 
    // to current task, 
    // allows you to edit and save your changes in the top bar
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    // This will add the taskId to a data-task-id attribute on the 
    // form itself. It's a new attribute that users won't see but 
    // that we can use later on to save the new 
    // info to the correct task.
    formEl.setAttribute("data-task-id", taskId);
}


// this function handles the deletion, editing, and status of tasks
function taskButtonHandler(event) {
    // Checking specifically which element is being clicked
    // within the main element with event.target
    // for more info see google docs web apis - notes, event.target.
    var targetEl = event.target

    // The matches() method is similar to using the querySelector() 
    // method, but it doesn't find and return an element. 
    // Instead, it returns true if the element would be returned by 
    // a querySelector() with the same argument, and it returns 
    // false if it wouldn't.
    // checks to see if the event.target clicked is an edit button
    if (targetEl.matches(".edit-btn")) {
        // see below, delet button comments
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 
    // else, checks to see if the event.target clicked is a delete button
    else if (targetEl.matches(".delete-btn")) {
        // gets the specific data-task-id of the delete button
        // that was clicked
        // the data-task-id of the delete button is the same
        // data-task-id of the <li> element task it is inside.
        // this lets us know which specific task to delete
        var taskId = event.target.getAttribute("data-task-id");
        // this function selects the li element with the same
        // data-task-id as the delete button clicked.
        // and then removes the whole li element.
        deleteTask(taskId);
    }
}

// when the select dropdown element on a task is changed
// Based on whatever the value is, moves the whole li element from 
// one column to another.
function taskStatusChangeHandler(event) {
    // get the select element's custom id
    // (this will be the same ID as the whole task li element
    // it is inside of)
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to 
    // lowercase
    // Based on whatever the value is, we can move the 
    // taskSelected element from one column to another.
    var statusValue = event.target.value.toLowerCase();

    // find the parent task (li) item element based on the id.
    // a reference to an existing DOM <li> element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // tasksToDoEl, tasksInProgressEl, and tasksCompletedEl are 
    // references to the <ul> elements.
    // Thus, if the user selects "In Progress" from the dropdown, 
    // it will append the current task item to the 
    // <ul id="tasks-in-progress"> element and so on...
    // The interesting thing about the use of appendChild() 
    // here is that it didn't create a copy of the task. It 
    // actually moved the task item from its original location 
    // in the DOM into the other <ul>
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
}



/* event listener can have a lot of events it listens for, 
such as submit, click, etc. 

This particular listener listens for the following two events 
within the form:
When a user clicks a <button> element with a type attribute 
that has a value of "submit", like the button we currently 
have in the form
When a user presses Enter on their keyboard
*/
formEl.addEventListener("submit", TaskFormHandler);

// adds click event listener to main element.
// to know why were putting this on the main element
// see google docs web apis - notes, event bubbling.
pageContentEl.addEventListener("click", taskButtonHandler);

// change event that triggers, as the name implies, any time 
// a form element's value changes. Used for whenever a select
// dropdown menu changes inside the main element (pageContentEl).
// the select dropdown is the only form element that can change
// within pageContentEl (main section)
// this event listener will only fire when a select form is changed
// within the lists.
pageContentEl.addEventListener("change", taskStatusChangeHandler);