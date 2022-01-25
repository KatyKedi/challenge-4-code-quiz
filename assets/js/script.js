//select elements in DOM
var pageContentEl = document.querySelector("#page-content");
var promptEl = document.querySelector(".prompt");
var timer = document.querySelector(".timer");

//set timer start
var timerInt = 120;

//questions and answers together in object
var promptContents = {
    "This is question 1": ["This is answer 1", "This is answer 2", "This is answer 3", "This is answer 4"],
    "This is question 2": ["This is answer 1", "This is answer 2", "This is answer 3", "This is answer 4"]
};

var submitButtonHandler = function(event) {
    event.preventDefault();
    //get target element from event
    var targetEl = event.target;

    //if submit button was clicked, reset the page and start the clock
    if (targetEl.matches("#start-quiz")) {
        resetPage();
        startTimer();
        loadNextQuestion();
    }
    else if (targetEl.matches(".btn")) {
        resetPage();
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
        //add the second count after "Time: "
        timer.textContent = "Time: " + timerString;
        //if the timer is greater than 0, keep running the interval
        if (timerInt > 0) {
            timerInt--;
        }
        //if the timer gets down to 0, clear the interval
        else {
            clearInterval(timerInterval);
        }
    };

    //run the function on an interval
    var timerInterval = setInterval(decrementTimer, 1000);
};

var loadNextQuestion = function() {
    //create a div to wrap the whole prompt
    var promptEl = document.createElement("div");
    promptEl.className = "prompt";

    //create an h2 to hold the question
    var questionEl = document.createElement("h2");
    questionEl.textContent = Object.keys(promptContents)[0];

    //append new elements to the page
    pageContentEl.appendChild(promptEl);
    promptEl.appendChild(questionEl);

    //create a button for each answer
    for (i = 0; i < Object.values(promptContents)[0].length; i++) {
    
        var submitAnswerEl = document.createElement("button");
        submitAnswerEl.textContent = Object.values(promptContents)[0][i];
        submitAnswerEl.setAttribute("type", "click");
        promptEl.appendChild(submitAnswerEl);
    }

    
};

//listen for the start button click
pageContentEl.addEventListener("click", submitButtonHandler);