var pageContentEl = document.querySelector("#page-content");
var promptEl = document.querySelector(".prompt");
var timer = document.querySelector(".timer");
var timerInt = 10;

var submitButtonHandler = function(event) {
    event.preventDefault();
    //get target element from event
    var targetEl = event.target;

    //if submit button was clicked, reset the page and start the clock
    if (targetEl.matches(".btn")) {
        resetPage();
        startTimer();
    }
};

var resetPage = function() {
    //remove the element with class of prompt
    promptEl.remove();
};

var startTimer = function() {
    //timer starts at 120 seconds and counts down until 0
    var decrementTimer = function() { 
        //convert the integer to a string
        timerString = JSON.stringify(timerInt);
        //add the count after "Time: "
        timer.textContent = "Time: " + timerString;
        console.log("still going");
        if (timerInt > 0) {
            timerInt--;
        }
        else {
            clearInterval(timerInterval);
        }
    };

    //run the function on an interval
    var timerInterval = setInterval(decrementTimer, 1000);
};

//listen for the start button click
pageContentEl.addEventListener("click", submitButtonHandler);