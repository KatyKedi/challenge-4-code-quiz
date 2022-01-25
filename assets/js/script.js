var pageContentEl = document.querySelector("#page-content");
var promptEl = document.querySelector(".prompt");
var timer = document.querySelector(".timer");
var timerInt = 120;

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
    var promptEl = document.createElement("div");
    promptEl.className = "prompt";
    var questionEl = document.createElement("h2");
    questionEl.textContent = "This is a question?";
    var submitAnswerEl = document.createElement("button");
    submitAnswerEl.textContent = "This is an answer.";
    submitAnswerEl.setAttribute("type", "click");
    pageContentEl.appendChild(promptEl);
    promptEl.appendChild(questionEl);
    promptEl.appendChild(submitAnswerEl);
};

//listen for the start button click
pageContentEl.addEventListener("click", submitButtonHandler);