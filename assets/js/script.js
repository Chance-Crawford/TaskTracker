
// see google docs web API notes, the DOM
// finds the <form> element in the page and saves it to the variable 
// formEl
var formEl = document.querySelector("#task-form");

// selects the ul element by its ID
var tasksToDoEl = document.querySelector("#tasks-to-do");


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

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send the new object as an argument to createTaskEl()
    createTaskEl(taskDataObj);
    
}

// holds the code that creates a new task HTML element
// and then adds the element to the list
function createTaskEl(taskDataObj) {
    // when this variable is used, a new <li> element is created
    var listItemEl = document.createElement("li");
    // programmatically assigns a class and all the styles 
    // of the class to the new element
    listItemEl.className = "task-item";

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
    // appends the li element (listItemEl) to be the last child 
    // of the ul element
    tasksToDoEl.appendChild(listItemEl);

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