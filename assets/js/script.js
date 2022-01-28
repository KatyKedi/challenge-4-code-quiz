//select elements in DOM
var pageContentEl = document.querySelector("#page-content");
var promptEl = document.querySelector(".prompt");
var timer = document.querySelector(".timer");

//create a form element for the finish screen
var formEl = document.createElement("form");

var names = [];
var scores = [];
var allScores = [names, scores];

//set question number
var questionNumber = 0;
//set timer start
var timerInt = 120;
//set starting score at 0
var score = 0;

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

    //if start button was clicked, reset the page and start the clock
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

        //if the correct answer matches the clicked button's text, display correct and add to score
        if (correctAnswers[questionNumber-1] === targetEl.textContent) {
            result.textContent = "Correct!";
            score += 10;
        }
        //otherwise, display wrong
        else {
            result.textContent = "Wrong!";                
        }
        if (questionNumber < correctAnswers.length) {
            //reset the page and load the next question, displaying correct or wrong from previous selection
            resetPage(newPromptEl);
            loadNextQuestion(newPromptEl, questionNumber);   
            newPromptEl.appendChild(result);
        }
        else {
            resetPage(newPromptEl);
            finishScreen();
        }
    }
};   

var finishScreen = function() {
    //create an <h1> element that reads All Done!
    var allDoneEl = document.createElement("h1");
    allDoneEl.textContent = "All Done!";

    //create a <p> element that displays the final score
    var finalScoreEl = document.createElement("p");
    finalScoreEl.textContent = "Your final score is " + score + ".";

    var formPromptEl = document.createElement("p");
    formPromptEl.textContent = "Enter initials: ";

    //create elements that allows users to input and submit their initials
    var formInputEl = document.createElement("input");
    formInputEl.setAttribute("type","text");
    var formButtonEl = document.createElement("button");
    formButtonEl.setAttribute("type","click");
    formButtonEl.className = "submit-score-button";
    formButtonEl.textContent = "Submit";

    //append children to <form> element
    formEl.appendChild(formInputEl);
    formEl.appendChild(formButtonEl);
    
    //append children to <div> element
    newPromptEl.appendChild(allDoneEl);
    newPromptEl.appendChild(finalScoreEl);
    newPromptEl.appendChild(formPromptEl);
    newPromptEl.appendChild(formEl);

    //append finishEl to pageContentEl
    pageContentEl.appendChild(newPromptEl);
};

var submitScore = function(event) {
    event.preventDefault();
    targetEl = event.target;
    if (targetEl.matches(".submit-score-button")) {
        //get the initials and save them with score
        var initials =  document.querySelector("input").value;
        names.push(initials);
        scores.push(score);
        saveScores();
        resetPage(newPromptEl);
        highScoresPage();
    }
};

var saveScores = function() {
    //reset the scores array
    localStorage.setItem("scores", JSON.stringify(allScores));
};

var loadScores = function() {
    //retrieve the string version of scores array
    var savedScores = localStorage.getItem("scores");
    if (!savedScores) {
        return false;
    }
    //change the string back into an object
    savedScores = JSON.parse(savedScores);
    //for every set of scores in the array, push the info to names and scores
    for (i = 0; i < savedScores[0].length; i++) {
        names.push(savedScores[0][i]);
        scores.push(savedScores[1][i]);
    }
};

var highScoresPage = function() {
    //set up the high scores screen
    var highScoreEl = document.createElement("h1");
    highScoreEl.textContent = "High Scores";
    //set up the list of scores
    var scoreListEl = document.createElement("ul");

    for (i=0; i < names.length; i++) {
        var scoreItemEl = document.createElement("li");
        scoreItemEl.textContent = names[i] + " - " + scores[i];
        scoreListEl.appendChild(scoreItemEl);
    }
    //create a go back button
    var goBackButtonEl = document.createElement("button");
    goBackButtonEl.type = "click";
    goBackButtonEl.className = "go-back";
    goBackButtonEl.textContent = "Go Back";
    //create a clear high scores button
    var clearHighScoresButtonEl = document.createElement("button");
    clearHighScoresButtonEl.type = "click";
    clearHighScoresButtonEl.className = "clear";
    clearHighScoresButtonEl.textContent = "Clear High Scores";

    //append elements to the main page
    pageContentEl.appendChild(highScoreEl);
    pageContentEl.appendChild(scoreListEl);
    pageContentEl.appendChild(goBackButtonEl);
    pageContentEl.appendChild(clearHighScoresButtonEl);
};

//listen for button clicks
pageContentEl.addEventListener("click", startButtonHandler);
pageContentEl.addEventListener("click", checkAnswer);
formEl.addEventListener("click", submitScore);

loadScores();