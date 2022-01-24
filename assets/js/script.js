var pageContentEl = document.querySelector("#page-content");
var promptEl = document.querySelector(".prompt");

var submitButtonHandler = function(event) {
    event.preventDefault();
    //get target element from event
    var targetEl = event.target;

    //if submit button was clicked, run resetPage
    if (targetEl.matches(".btn")) {
        resetPage();
    }
};

var resetPage = function() {
    //remove the element with class of prompt
    promptEl.remove();
};



//listen for the start button click
pageContentEl.addEventListener("click", submitButtonHandler);

