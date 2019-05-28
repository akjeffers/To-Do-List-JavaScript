// Select the Elements //

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes Names //
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables //
let LIST, id;

// Get item from localStorage
let data = localStorage.getItem("TODO");

// Check if Data is not empty //
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list 
    loadList(LIST); // load the lists to the user interface
} else {
    LIST = [];
    id = 0;
}


// Load Items to the user's interface 
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the local storage // CLEAR BUTTON // 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();

});

// Show Today's Date //
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add To Do Function //
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    // Checking if Completed //
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = ` 
                <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Add An Item To List when User hits Enter Key // 
document.addEventListener("keyup", function (even) {
    if (even.keyCode == 13) {
        const toDo = input.value;

        // If Input isn't empty
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,

            });
            // Add item to localStorage // must be added where LIST array gets updated // 
            localStorage.setItem("TODO", JSON.stringify(LIST));


            id++;
        }
        input.value = "";

    }
});

// Build Function for User when they complete the To Do //
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to Do Function // When the User Clicks the Trash Button //
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}

// Add Event Listener // Target the items created dynamically //

list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside the list 
    const elementJob = element.attributes.job.value; // return complete or delete 

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);

    }

    // Add item to localStorage
    localStorage.setItem("TODO", JSON.stringify(LIST));



});