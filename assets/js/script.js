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

var correctAnswers = ["This is answer 1", "This is answer 3"];

var submitButtonHandler = function(event) {
    event.preventDefault();
    //get target element from event
    var targetEl = event.target;

    //if submit button was clicked, reset the page and start the clock
    if (targetEl.matches("#start-quiz")) {
        resetPage(promptEl);
        startTimer();
        loadNextQuestion(newPromptEl);
    }
};

var resetPage = function(page) {
    //remove the element with name of prompt
    page.remove();
    return newPromptEl = document.createElement("div");
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

var loadNextQuestion = function(page) {

    //create an h2 to hold the question
    var questionEl = document.createElement("h2");
    questionEl.textContent = Object.keys(promptContents)[0];

    //append new elements to the page
    pageContentEl.appendChild(page);
    page.appendChild(questionEl);

    //create a button for each answer
    for (i = 0; i < Object.values(promptContents)[0].length; i++) {
        //create the element
        var submitAnswerEl = document.createElement("button");

        //add answer text and attribute
        submitAnswerEl.textContent = Object.values(promptContents)[0][i];
        submitAnswerEl.className = "answer-button";
        submitAnswerEl.setAttribute("type", "click");

        //append new element to the page
        page.appendChild(submitAnswerEl);
    }
};

var checkAnswer = function(event) {
    event.preventDefault();
    var targetEl = event.target;
    if (targetEl.matches(".answer-button")) {
        resetPage(newPromptEl);
        loadNextQuestion(newPromptEl);
        var result = document.createElement("p");
        if (correctAnswers[0] == targetEl.textContent) {
            result.textContent = "Correct!";
        }
        else {
            result.textContent = "Wrong!";
        }
        newPromptEl.appendChild(result);
    }
};   


//listen for button clicks
pageContentEl.addEventListener("click", submitButtonHandler);
pageContentEl.addEventListener("click", checkAnswer);