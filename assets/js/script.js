//select elements in DOM
var pageHeaderEl = document.querySelector(".header")
var pageContentEl = document.querySelector("#page-content");
var promptEl = document.querySelector(".prompt");
var viewHighScoresEl = document.querySelector(".view-high-scores");
var timer = document.querySelector(".timer");

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
        newPromptEl.classList = "prompt questions";
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
    questionEl.className = "question";
    questionEl.textContent = Object.keys(promptContents)[number];

    //append new elements to the page
    pageContentEl.appendChild(page);
    page.appendChild(questionEl);

    //create a button for each answer
    for (i = 0; i < Object.values(promptContents)[number].length; i++) {
        //create the element
        var submitAnswerEl = document.createElement("button");

        //add answer text and attributes
        submitAnswerEl.textContent = (i+1) + ". " + Object.values(promptContents)[number][i];
        submitAnswerEl.className = "btn answer-button";
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
        result.className = "result";

        //if the correct answer matches the clicked button's text, display correct and add to score
        if (correctAnswers[questionNumber-1] === targetEl.textContent.split(". ")[1]) {
            result.textContent = "Correct!";
            score += 10;
        }
        //otherwise, display wrong and penalize timer
        else {
            result.textContent = "Wrong!";  
            timerInt -= 10;              
        }
        if (questionNumber < correctAnswers.length) {
            //reset the page and load the next question, displaying correct or wrong from previous selection
            resetPage(newPromptEl);
            newPromptEl.classList = "prompt questions";
            loadNextQuestion(newPromptEl, questionNumber);   
            newPromptEl.appendChild(result);
        }
        else {
            if (timerInt !== 0) {
                //end the clock and bring to finish screen
                timerInt = 0;
                resetPage(newPromptEl);
                newPromptEl.className = "prompt";
                finishScreen();
            }
            else {
                timerEnds();
            }
        }
    }
};  

timerEnds = function() {
    if (timerInt === 0) {
        resetPage(newPromptEl);
        newPromptEl.className = "prompt";
        finishScreen();
    }
}

//create a form element for the finish screen
var formEl = document.createElement("form");

var finishScreen = function() {
    formEl.className = "form";
    formEl.textContent = "Enter initials: "

    //create an <h2> element that reads All Done!
    var allDoneEl = document.createElement("h2");
    allDoneEl.textContent = "All Done!";

    //create a <p> element that displays the final score
    var finalScoreEl = document.createElement("p");
    finalScoreEl.textContent = "Your final score is " + score + ".";

    //create elements that allows users to input and submit their initials
    var formInputEl = document.createElement("input");
    formInputEl.setAttribute("type","text");
    var formButtonEl = document.createElement("button");
    formButtonEl.setAttribute("type","click");
    formButtonEl.classList= "btn submit-score-button";
    formButtonEl.textContent = "Submit";

    //append children to <form> element
    formEl.appendChild(formInputEl);
    formEl.appendChild(formButtonEl);
    
    //append children to <div> element
    newPromptEl.appendChild(allDoneEl);
    newPromptEl.appendChild(finalScoreEl);
    newPromptEl.appendChild(formEl);
    newPromptEl.classList = "prompt final-screen";
    //append finishEl to pageContentEl
    pageContentEl.appendChild(newPromptEl);
};

var submitScore = function(event) {
    event.preventDefault();
    targetEl = event.target;
    if (targetEl.matches(".submit-score-button")) {
        //get the initials and save them with score
        var initials =  document.querySelector("input").value;
            if (initials.length < 4 && !initials.match(/\d+/g) && initials != "") {
                initials = initials.toUpperCase();
                names.push(initials);
                scores.push(score);
                saveScores();
                resetPage(newPromptEl);
                newPromptEl.classList = "prompt high-scores";
                highScoresPage();
            } else {
                alert("You need to enter valid initials!");
            }
        
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

var viewHighScores = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".view-high-scores")) {
        timerInt = 0;
        resetPage(promptEl);
        resetPage(newPromptEl);
        newPromptEl.classList = "prompt high-scores";
        highScoresPage();
    }
};

var scoreListEl = document.createElement("ol");
scoreListEl.className = "scores";

var highScoresPage = function() {
    //set up the high scores screen
    var highScoreEl = document.createElement("h1");
    highScoreEl.textContent = "High Scores";
    //set up the list of scores

    for (i=0; i < names.length; i++) {
        var scoreItemEl = document.createElement("li");
        scoreItemEl.textContent = names[i] + " - " + scores[i];
        scoreListEl.appendChild(scoreItemEl);
    }
    var buttonsEl = document.createElement("div");
    buttonsEl.className = "end-buttons";
    //create a go back button
    var goBackButtonEl = document.createElement("button");
    goBackButtonEl.type = "click";
    goBackButtonEl.className = "btn go-back";
    goBackButtonEl.textContent = "Go Back";
    //create a clear high scores button
    var clearHighScoresButtonEl = document.createElement("button");
    clearHighScoresButtonEl.type = "click";
    clearHighScoresButtonEl.className = "btn clear";
    clearHighScoresButtonEl.textContent = "Clear High Scores";

    //append elements to the main page
    newPromptEl.appendChild(highScoreEl);
    newPromptEl.appendChild(scoreListEl);
    buttonsEl.appendChild(goBackButtonEl);
    buttonsEl.appendChild(clearHighScoresButtonEl);
    newPromptEl.appendChild(buttonsEl);

    pageContentEl.appendChild(newPromptEl);
};

var clearHighScores = function(event) {
    targetEl = event.target;
    if (targetEl.matches(".clear")) {
        //clear everythin gin local storage
        localStorage.clear();
        scoreListEl.remove();
    }
};

var goBack = function(event) {
    event.preventDefault();
    targetEl = event.target;
    if (targetEl.matches(".go-back")) {
        //reload back to the homepage
        window.location.reload();
    }
};

//listen for button clicks
pageHeaderEl.addEventListener("click", viewHighScores);
pageContentEl.addEventListener("click", startButtonHandler);
pageContentEl.addEventListener("click", checkAnswer);
formEl.addEventListener("click", submitScore);
pageContentEl.addEventListener("click", clearHighScores);
pageContentEl.addEventListener("click", goBack)

loadScores();