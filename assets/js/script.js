//select elements in DOM
var pageContentEl = document.querySelector("#page-content");
var promptEl = document.querySelector(".prompt");
var timer = document.querySelector(".timer");

//set question number
var questionNumber = 0;
//set timer start
var timerInt = 120;

//questions and corresponding answers together in object
var promptContents = {
    "Which is not the correct word for one of the initials in rgba()?": 
    ["red", "green", "black", "alpha"],

    "What does MVP stand for in programming?": 
    ["minimal value produced", "minimal viable product", "most versatile program", "most valuable person"],

    "How do you write comments in CSS? (works for long JavaScript comments as well)": 
    ["//comment", "*comment*", "<!--Comment-->", "/*comment*/"],

    "Which syntax allows us to check if two values are equal in type and value?": 
    ["value1 != value2", "value1 = value2", "value1 == value2", "value1 === value2"],

    "Pick the answer that is not a falsy value.": 
    ["0.5", "''(empty string)", "undefined", "null"],

    "Pick the answer that is not a primitive data type.": 
    ["array", "boolean", "string", "symbol"],

    "Which is an example of a short circuit conditional statement?": 
    ["variable1 += variable2", "variable1 -= variable2", "variable = variable || 0", "variable = variable && 0"],

    "What can be used with a <select> element to create a dropdown list?": 
    ["<option> elements", "name attribute", "value attribute", "all of the above"],

    "How do you update or add any attribute on an HTML element?": 
    ["hasAttribute()", "setAttribute()", "getAttribute()", "removeAttribute()"],

    "What does JSON stand for?": 
    ["JavaScript Only Network", "JavaScript Object Notation", "JavaScript Optional Nodes", "JavaScript Overhaul News"]
};

//array of correct answers
var correctAnswers = [
    "black", 
    "minimal viable product", 
    "/*comment*/", 
    "value1 === value2", 
    "0.5", 
    "array", 
    "variable = variable || 0", 
    "all of the above", 
    "setAttribute()", 
    "JavaScript Object Notation"
];

var startButtonHandler = function(event) {
    event.preventDefault();
    //get target element from event
    var targetEl = event.target;

    //if submit button was clicked, reset the page and start the clock
    if (targetEl.matches("#start-quiz")) {
        resetPage(promptEl);
        startTimer();
        loadNextQuestion(newPromptEl, questionNumber);
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

var loadNextQuestion = function(page, number) {
    //create an h2 to hold the question
    var questionEl = document.createElement("h2");
    questionEl.textContent = Object.keys(promptContents)[number];

    //append new elements to the page
    pageContentEl.appendChild(page);
    page.appendChild(questionEl);

    //create a button for each answer
    for (i = 0; i < Object.values(promptContents)[number].length; i++) {
        //create the element
        var submitAnswerEl = document.createElement("button");

        //add answer text and attributes
        submitAnswerEl.textContent = Object.values(promptContents)[number][i];
        submitAnswerEl.className = "answer-button";
        submitAnswerEl.setAttribute("id", i);
        submitAnswerEl.setAttribute("type", "click");

        //append new element to the page
        page.appendChild(submitAnswerEl);
    }
    //increase question number counter after each new load
    questionNumber++;
};

var checkAnswer = function(event) {
    event.preventDefault();
    //target the clicked element
    var targetEl = event.target;

    //if an answer button is clicked
    if (targetEl.matches(".answer-button")) {
        //create an element to display correct or wrong result
        var result = document.createElement("p");

        //if the correct answer matches the clicked button's text, display correct
        if (correctAnswers[questionNumber-1] === targetEl.textContent) {
            result.textContent = "Correct!";
        }
        //otherwise, display wrong
        else {
            result.textContent = "Wrong!";                
        }
        //reset the page and load the next question, displaying correct or wrong from previous selection
        resetPage(newPromptEl);
        if (questionNumber < correctAnswers.length) {
            loadNextQuestion(newPromptEl, questionNumber);   
            newPromptEl.appendChild(result);
        }
        else {
            finishScreen();
        }
    }
};   

var finishScreen = function() {
    //create a <div> element to hold the finish screen content
    var finishEl = document.createElement("div");

    //create an <h1> element that reads All Done!
    var allDoneEl = document.createElement("h1");
    allDoneEl.textContent = "All Done!";

    //create a <p> element that displays the final score
    var finalScoreEl = document.createElement("p");
    finalScoreEl.textContent = "Your final score is awesome."

    //create a <form> element that allows users to input their initials
    var formEl = document.createElement("form");
    var formPromptEl = document.createElement("p");
    formPromptEl.textContent = "Enter initials: ";
    var formInputEl = document.createElement("input");
    formInputEl.type = "text";
    var formButtonEl = document.createElement("button");
    formButtonEl.type = "submit";
    formButtonEl.textContent = "Submit";

    //append finishEl to pageContentEl
    pageContentEl.appendChild(finishEl);

    //append children to <div> element
    finishEl.appendChild(allDoneEl);
    finishEl.appendChild(finalScoreEl);
    finishEl.appendChild(formEl);

    //append children to <form> element
    formEl.appendChild(formPromptEl);
    formEl.appendChild(formInputEl);
    formEl.appendChild(formButtonEl);
};

//listen for button clicks
pageContentEl.addEventListener("click", startButtonHandler);
pageContentEl.addEventListener("click", checkAnswer);